import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import styles from './floating-astronaut.module.css';

interface AstronautModelProps {
  position?: [number, number, number];
}

// Komponen Bintang/Partikel
function Stars({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Posisi acak dalam ruang yang lebih besar
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      // Ukuran acak
      sizes[i] = Math.random() * 1.5 + 0.5;
    }

    return { positions, sizes };
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      // Rotasi lambat untuk efek kedalaman
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particles.positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(particles.sizes, 1));
    return geo;
  }, [particles]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.1}
        color="#8be9fd"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface AstronautModelInternalProps extends AstronautModelProps {
  isMobile: boolean;
}

function AstronautModel({ position = [0, 0, 0], isMobile }: AstronautModelInternalProps) {
  const orbitGroupRef = useRef<THREE.Group>(null);
  const astronautGroupRef = useRef<THREE.Group>(null);

  // Muat model GLB
  const { scene } = useGLTF('/Astronaut.glb');

  // FIX #3: Cache scene yang di-clone untuk mencegah memory leak dan meningkatkan performa
  // Clone hanya sekali saat komponen mount, bukan setiap render!
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Animation untuk orbital (mengelilingi) dan floating effect
  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Animasi orbit - mengelilingi section hero
    if (orbitGroupRef.current) {
      // Sesuaikan radius berdasarkan ukuran layar
      const radiusX = isMobile ? 8 : 15;
      const radiusY = isMobile ? 5 : 8;
      const speed = 0.15;

      // Orbit dalam bidang XY (kiri-kanan dan atas-bawah) - membentuk elips penuh
      orbitGroupRef.current.position.x = Math.cos(time * speed) * radiusX;
      orbitGroupRef.current.position.y = Math.sin(time * speed) * radiusY;

      // Posisi Z tetap dekat dengan kamera agar selalu terlihat
      orbitGroupRef.current.position.z = 0;
    }

    if (astronautGroupRef.current) {
      // Rotasi astronaut agar selalu menghadap ke tengah
      astronautGroupRef.current.rotation.y = -time * 0.15;

      // Animasi miring lembut untuk tampilan dinamis
      astronautGroupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
      astronautGroupRef.current.rotation.z = Math.cos(time * 0.35) * 0.06;
    }
  });

  // Skala berdasarkan perangkat
  const scale = isMobile ? 0.035 : 0.05;

  return (
    <group ref={orbitGroupRef} position={position}>
      <group ref={astronautGroupRef} scale={scale}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

// Komponen fallback loading
function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color="#8be9fd"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

export default function FloatingAstronaut() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Cek apakah perangkat mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Preload model dengan error handling
    const loadModel = () => {
      try {
        useGLTF.preload('/Astronaut.glb');
        // Beri waktu sebentar untuk loading
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 200);

        return () => {
          clearTimeout(timer);
          window.removeEventListener('resize', checkMobile);
        };
      } catch (error) {
        console.error('Failed to load astronaut model:', error);
        setHasError(true);
        setIsLoading(false);
        return () => window.removeEventListener('resize', checkMobile);
      }
    };

    return loadModel();
  }, []);

  return (
    <div className={styles.container}>
      <Canvas
        className={styles.canvas}
        gl={{
          alpha: true,
          antialias: !isMobile, // FIX #4: Nonaktifkan antialiasing pada mobile
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
        shadows={!isMobile} // FIX #4: Nonaktifkan bayangan pada mobile untuk performa lebih baik
      >
        {/* Kamera */}
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={60} />

        {/* Pencahayaan - ukuran shadow map dioptimasi */}
        <ambientLight intensity={0.6} />

        {/* Main Key Light */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.5}
          castShadow={!isMobile} // Hanya cast shadow pada desktop
          shadow-mapSize-width={512} // Dikurangi dari 1024 untuk performa lebih baik
          shadow-mapSize-height={512}
        />

        {/* Cahaya Pengisi */}
        <directionalLight
          position={[-5, 3, -5]}
          intensity={0.5}
          color="#7dd3fc"
        />

        {/* Cahaya Rim */}
        <pointLight
          position={[0, 5, -5]}
          intensity={0.8}
          color="#8be9fd"
          distance={15}
        />

        {/* Cahaya Aksen - disederhanakan pada mobile */}
        {!isMobile && (
          <>
            <spotLight
              position={[3, 4, 3]}
              angle={0.4}
              penumbra={1}
              intensity={0.6}
              color="#ff79c6"
              castShadow={false} // Dinonaktifkan untuk performa
            />
            <pointLight
              position={[-3, 2, 3]}
              intensity={0.4}
              color="#bd93f9"
              distance={10}
            />
          </>
        )}

        {/* Bintang/Partikel - lebih sedikit pada mobile */}
        <Stars count={isMobile ? 100 : 200} />

        {/* Model Astronaut dengan error boundary */}
        {!isLoading && !hasError && <AstronautModel position={[0, 0, 0]} isMobile={isMobile} />}
        {!isLoading && hasError && <LoadingFallback />}
      </Canvas>
    </div>
  );
}
