import { useState, useEffect, useRef, useMemo } from 'react';
import styles from './LandingPage.module.css';
import FloatingAstronaut from './FloatingAstronaut';

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('');
  const [expandedDotsCount, setExpandedDotsCount] = useState(0);
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates'>('projects');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const lastMouseMoveTime = useRef(0);
  const roles = useMemo(() => ['Front-End Developer', 'UI Designer', 'Student'], []);

  // Data Projects (9 item)
  const projects = [
    {
      id: 1,
      title: '',
      description: '',
      tags: [''],
      link: ''
    },
    {
      id: 2,
      title: '',
      description: '',
      tags: [''],
      link: ''
    },
    {
      id: 3,
      title: '',
      description: '',
      tags: [''],
      link: ''
    },
    {
      id: 4,
      title: '',
      description: '',
      tags: [''],
      link: ''
    },
    {
      id: 5,
      title: '',
      description: '',
      tags: [''],
      link: ''
    },
    {
      id: 6,
      title: '',
      description: '',
      tags: [''],
      link: ''
    },
    {
      id: 7,
      title: '',
      description: '',
      tags: [''],
      link: ''
    },
    {
      id: 8,
      title: '',
      description: '',
      tags: [''],
      link: ''
    },
    {
      id: 9,
      title: '',
      description: '',
      tags: [''],
      link: ''
    }
  ];

  // Data Pengalaman Kerja
  const workExperiences = [
    {
      id: 1,
      period: '2023 - Present',
      title: 'Frontend Developer',
      company: 'Tech Company Inc.',
      description: 'Developing modern web applications using React and TypeScript. Collaborated with cross-functional teams to deliver high-quality products that exceed client expectations. Implemented responsive designs and optimized performance.',
      tags: ['React', 'TypeScript', 'Next.js', 'Tailwind']
    }
  ];

  // Data Sertifikat (6 item)
  const certificates = [
    {
      id: 1,
      title: '',
      issuer: '',
      date: '',
      description: '',
      tags: [''],
      link: ''
    },
    {
      id: 2,
      title: '',
      issuer: '',
      date: '',
      description: '',
      tags: [''],
      link: ''
    },
    {
      id: 3,
      title: '',
      issuer: '',
      date: '',
      description: '',
      tags: [''],
      link: ''
    },
    {
      id: 4,
      title: '',
      issuer: '',
      date: '',
      description: '',
      tags: [''],
      link: ''
    },
    {
      id: 5,
      title: '',
      issuer: '',
      date: '',
      description: '',
      tags: [''],
      link: ''
    },
    {
      id: 6,
      title: '',
      issuer: '',
      date: '',
      description: '',
      tags: [''],
      link: ''
    }
  ];

  // Data Tech Stack
  const techStack = [
    { name: 'React', icon: 'devicon-react-original' },
    { name: 'Node.js', icon: 'devicon-nodejs-plain' },
    { name: 'Next.js', icon: 'devicon-nextjs-plain' },
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
    { name: 'HTML', icon: 'devicon-html5-plain' },
    { name: 'CSS', icon: 'devicon-css3-plain' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain' },
    { name: 'TypeScript', icon: 'devicon-typescript-plain' },
    { name: 'Tailwind', icon: 'devicon-tailwindcss-original' },
    { name: 'Three.js', icon: 'devicon-threejs-original' },
    { name: 'Git', icon: 'devicon-git-plain' },
    { name: 'Figma', icon: 'figma-svg' },
    { name: 'Postman', icon: 'devicon-postman-plain' },
    { name: 'Vite', icon: 'devicon-vitejs-plain' }
  ];

  // Item unggulan untuk carousel mobile (4 item masing-masing)
  const featuredProjects = [projects[0], projects[1], projects[3], projects[5]];
  const featuredCertificates = [certificates[0], certificates[1], certificates[3], certificates[4]];

  // Tentukan item yang akan ditampilkan
  const displayedProjects = isMobile ? featuredProjects : (showAllProjects ? projects : projects.slice(0, 3));
  const displayedCertificates = isMobile ? featuredCertificates : (showAllCertificates ? certificates : certificates.slice(0, 3));

  // Throttle pergerakan mouse untuk mengurangi re-render dari 300/s ke 20/s
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Update setiap 50ms (20fps) untuk optimasi performa
      if (now - lastMouseMoveTime.current >= 50) {
        setMousePosition({ x: e.clientX, y: e.clientY });
        lastMouseMoveTime.current = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Deteksi viewport mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Efek rotasi role dengan animasi typing
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4000); // Ganti setiap 4 detik

    return () => clearInterval(interval);
  }, [roles]);

  // Deteksi active section saat scroll dengan throttle dan RAF
  useEffect(() => {
    let ticking = false;
    let lastScrollTime = 0;

    const handleScroll = () => {
      const now = Date.now();

      // Throttle maksimal 100ms (10fps) untuk update scroll
      if (!ticking && now - lastScrollTime >= 100) {
        ticking = true;

        // Gunakan requestAnimationFrame untuk update yang smooth
        window.requestAnimationFrame(() => {
          const sections = [
            { id: 'home', element: document.getElementById('home'), index: 0 },
            { id: 'about', element: document.getElementById('about'), index: 1 },
            { id: 'experience', element: document.getElementById('experience'), index: 2 },
            { id: 'projects', element: document.getElementById('projects'), index: 3 },
            { id: 'contact', element: document.getElementById('contact'), index: 4 }
          ];

          const scrollPosition = window.scrollY + window.innerHeight / 3;
          let newExpandedCount = 0;
          let foundActive = false;

          // Cek jika di paling atas - tampilkan home sebagai aktif
          if (window.scrollY < 100) {
            setActiveSection('home');
            setExpandedDotsCount(0);
            ticking = false;
            lastScrollTime = now;
            return;
          }

          // Cek jika mendekati bagian bawah halaman
          const isNearBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 50;

          // Tentukan section mana yang aktif dan berapa banyak dots yang ditampilkan
          for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            if (section.element) {
              const offsetTop = section.element.offsetTop;
              const offsetHeight = section.element.offsetHeight;

              // Tampilkan dot jika sudah scroll mendekati section
              if (window.scrollY + window.innerHeight * 0.7 > offsetTop) {
                newExpandedCount = i + 1;
              }

              // Set active section dengan deteksi yang lebih akurat
              if (!foundActive && scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveSection(section.id);
                foundActive = true;
              }
            }
          }

          // Jika mendekati bawah, tampilkan semua dots dan set section terakhir sebagai aktif
          if (isNearBottom) {
            newExpandedCount = sections.length;
            if (!foundActive) {
              setActiveSection(sections[sections.length - 1].id);
            }
          }

          // Jika tidak ada section yang aktif (bagian bawah halaman), set section terakhir sebagai aktif
          if (!foundActive && sections[sections.length - 1].element) {
            setActiveSection(sections[sections.length - 1].id);
          }

          setExpandedDotsCount(newExpandedCount);
          ticking = false;
          lastScrollTime = now;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Panggilan awal

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.landingContainer}>
      {/* Efek cahaya cursor */}
      <div
        className={styles.cursorGlow}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {/* Navigasi dots */}
      <nav className={styles.nav}>
        <div
          className={`${styles.navDot} ${expandedDotsCount >= 1 ? styles.navDotVisible : ''} ${activeSection === 'home' ? styles.navDotActive : ''}`}
          data-label="Home"
          onClick={() => scrollToSection('home')}
        />
        <div
          className={`${styles.navDot} ${expandedDotsCount >= 2 ? styles.navDotVisible : ''} ${activeSection === 'about' ? styles.navDotActive : ''}`}
          data-label="About"
          onClick={() => scrollToSection('about')}
        />
        <div
          className={`${styles.navDot} ${expandedDotsCount >= 3 ? styles.navDotVisible : ''} ${activeSection === 'experience' ? styles.navDotActive : ''}`}
          data-label="Experience"
          onClick={() => scrollToSection('experience')}
        />
        <div
          className={`${styles.navDot} ${expandedDotsCount >= 4 ? styles.navDotVisible : ''} ${activeSection === 'projects' ? styles.navDotActive : ''}`}
          data-label="Projects"
          onClick={() => scrollToSection('projects')}
        />
        <div
          className={`${styles.navDot} ${expandedDotsCount >= 5 ? styles.navDotVisible : ''} ${activeSection === 'contact' ? styles.navDotActive : ''}`}
          data-label="Contact"
          onClick={() => scrollToSection('contact')}
        />
      </nav>

      {/* Section Hero */}
      <section id="home" className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.glitchText}>
            <span className="line" style={{ fontSize: '0.5em' }}>Hello, I'm</span>
            <br />
            <span className="line highlight">Aziz Al-Habibie Simatupang</span>
          </h1>
          <p className={styles.subtitle}>
            <span className={styles.roleText} key={currentRoleIndex}>{roles[currentRoleIndex]}</span>
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className={styles.ctaButton} onClick={() => scrollToSection('about')} style={{ minWidth: '180px' }}>
              Learn More
            </button>
            <a href="/resume.pdf" download className={styles.ctaButton} style={{ minWidth: '180px' }}>
              Download Resume
            </a>
          </div>
        </div>

        {/* Astronaut 3D Melayang */}
        <div className="floating-laptop-container">
          <FloatingAstronaut />
        </div>

        <div className={styles.scrollIndicator}>
          <span>Scroll</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* Section Tentang Saya */}
      <section id="about" className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>About Me</h2>
          <p className={styles.sectionSubtitle}>
            Just a developer who loves building things that people enjoy using
          </p>
          <div className={styles.aboutText} style={{ maxWidth: '900px', margin: '3rem auto 0', textAlign: 'justify' }}>
            <p>
              Hi! I'm a Computer Engineering undergraduate and front-end developer who loves turning ideas into interactive, beautifully designed web experiences.
            </p>
            <p>
              My journey in web development started several years ago, and I've been fortunate to work
              on diverse projects that have shaped my skills and broadened my perspective on technology.
            </p>
            <p>
              I believe in writing clean, maintainable code and staying up-to-date with the latest
              technologies to deliver the best solutions for every project.
            </p>
            <p>
              I specialize in modern web technologies and frameworks, with a focus on creating
              performant and scalable applications. I'm always eager to learn new technologies
              and best practices to improve my craft.
            </p>
            <p style={{ marginBottom: 0 }}>
              When I'm not coding, you can find me exploring new technologies, contributing to
              open-source projects, or sharing knowledge with the developer community.
            </p>
          </div>

          {/* Section Tech Stack */}
          <div style={{ marginTop: '4rem' }}>
            <h3 style={{ color: '#8be9fd', marginBottom: '1rem', fontSize: '2.5rem', textAlign: 'center', fontWeight: '600' }}>Tech Stack</h3>
            <p style={{ color: 'rgba(248, 248, 242, 0.65)', fontSize: '1.125rem', textAlign: 'center', marginBottom: '3rem', fontWeight: '400' }}>
              Technologies and tools I use to build amazing projects
            </p>
            
            {isMobile ? (
              /* Mobile: Scroll Horizontal Infinite */
              <div className={styles.techScrollContainer}>
                <div className={styles.techScrollTrack}>
                  {/* Set pertama icons */}
                  {techStack.map((tech) => (
                    <div key={`first-${tech.name}`} className={styles.techIcon}>
                      {tech.name === 'Figma' ? (
                        <svg className={styles.techIconSvg} viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 28.5C19 23.8056 22.8056 20 27.5 20C32.1944 20 36 23.8056 36 28.5C36 33.1944 32.1944 37 27.5 37C22.8056 37 19 33.1944 19 28.5Z" fill="#1ABCFE"/>
                          <path d="M2 46.5C2 41.8056 5.80558 38 10.5 38H19V46.5C19 51.1944 15.1944 55 10.5 55C5.80558 55 2 51.1944 2 46.5Z" fill="#0ACF83"/>
                          <path d="M19 2V20H27.5C32.1944 20 36 16.1944 36 11.5C36 6.80558 32.1944 3 27.5 3H19V2Z" fill="#FF7262"/>
                          <path d="M2 11.5C2 16.1944 5.80558 20 10.5 20H19V3H10.5C5.80558 3 2 6.80558 2 11.5Z" fill="#F24E1E"/>
                          <path d="M2 28.5C2 33.1944 5.80558 37 10.5 37H19V20H10.5C5.80558 20 2 23.8056 2 28.5Z" fill="#A259FF"/>
                        </svg>
                      ) : (
                        <i className={`${tech.icon} colored ${styles.techIconSvg}`}></i>
                      )}
                      <span className={styles.techIconName}>{tech.name}</span>
                    </div>
                  ))}
                  {/* Set duplikat untuk loop seamless */}
                  {techStack.map((tech) => (
                    <div key={`second-${tech.name}`} className={styles.techIcon}>
                      {tech.name === 'Figma' ? (
                        <svg className={styles.techIconSvg} viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 28.5C19 23.8056 22.8056 20 27.5 20C32.1944 20 36 23.8056 36 28.5C36 33.1944 32.1944 37 27.5 37C22.8056 37 19 33.1944 19 28.5Z" fill="#1ABCFE"/>
                          <path d="M2 46.5C2 41.8056 5.80558 38 10.5 38H19V46.5C19 51.1944 15.1944 55 10.5 55C5.80558 55 2 51.1944 2 46.5Z" fill="#0ACF83"/>
                          <path d="M19 2V20H27.5C32.1944 20 36 16.1944 36 11.5C36 6.80558 32.1944 3 27.5 3H19V2Z" fill="#FF7262"/>
                          <path d="M2 11.5C2 16.1944 5.80558 20 10.5 20H19V3H10.5C5.80558 3 2 6.80558 2 11.5Z" fill="#F24E1E"/>
                          <path d="M2 28.5C2 33.1944 5.80558 37 10.5 37H19V20H10.5C5.80558 20 2 23.8056 2 28.5Z" fill="#A259FF"/>
                        </svg>
                      ) : (
                        <i className={`${tech.icon} colored ${styles.techIconSvg}`}></i>
                      )}
                      <span className={styles.techIconName}>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Desktop: Grid Statis */
              <>
                <div className={styles.techStackGrid}>
                  {/* React */}
                  <div className={styles.techIcon}>
                    <i className={`devicon-react-original colored ${styles.techIconSvg}`}></i>
                    <span className={styles.techIconName}>React</span>
                  </div>

                  {/* Node.js */}
                  <div className={styles.techIcon}>
                    <i className={`devicon-nodejs-plain colored ${styles.techIconSvg}`}></i>
                    <span className={styles.techIconName}>Node.js</span>
                  </div>

                  {/* Next.js */}
                  <div className={styles.techIcon}>
                    <i className={`devicon-nextjs-plain colored ${styles.techIconSvg}`}></i>
                    <span className={styles.techIconName}>Next.js</span>
                  </div>

                  {/* PostgreSQL */}
                  <div className={styles.techIcon}>
                    <i className={`devicon-postgresql-plain colored ${styles.techIconSvg}`}></i>
                    <span className={styles.techIconName}>PostgreSQL</span>
                  </div>

                  {/* HTML */}
                  <div className={styles.techIcon}>
                    <i className={`devicon-html5-plain colored ${styles.techIconSvg}`}></i>
                    <span className={styles.techIconName}>HTML</span>
                  </div>

                  {/* CSS */}
                  <div className={styles.techIcon}>
                    <i className={`devicon-css3-plain colored ${styles.techIconSvg}`}></i>
                    <span className={styles.techIconName}>CSS</span>
                  </div>

                  {/* JavaScript */}
                  <div className={styles.techIcon}>
                    <i className={`devicon-javascript-plain colored ${styles.techIconSvg}`}></i>
                    <span className={styles.techIconName}>JavaScript</span>
                  </div>
                </div>

                {/* Baris 2 - 7 items */}
                <div className={styles.techStackGrid} style={{ marginTop: '2rem' }}>
                  {/* TypeScript */}
                  <div className={styles.techIcon}>
                    <i className={`devicon-typescript-plain colored ${styles.techIconSvg}`}></i>
                    <span className={styles.techIconName}>TypeScript</span>
                  </div>

                  {/* Tailwind CSS */}
                  <div className={styles.techIcon}>
                    <i className={`devicon-tailwindcss-original colored ${styles.techIconSvg}`}></i>
                    <span className={styles.techIconName}>Tailwind</span>
                  </div>

                  {/* Three.js */}
                  <div className={styles.techIcon}>
                    <i className={`devicon-threejs-original colored ${styles.techIconSvg}`}></i>
                    <span className={styles.techIconName}>Three.js</span>
                  </div>

                  {/* Git */}
                  <div className={styles.techIcon}>
                    <i className={`devicon-git-plain colored ${styles.techIconSvg}`}></i>
                    <span className={styles.techIconName}>Git</span>
                  </div>

                  {/* Figma */}
                  <div className={styles.techIcon}>
                    <svg className={styles.techIconSvg} viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 28.5C19 23.8056 22.8056 20 27.5 20C32.1944 20 36 23.8056 36 28.5C36 33.1944 32.1944 37 27.5 37C22.8056 37 19 33.1944 19 28.5Z" fill="#1ABCFE"/>
                      <path d="M2 46.5C2 41.8056 5.80558 38 10.5 38H19V46.5C19 51.1944 15.1944 55 10.5 55C5.80558 55 2 51.1944 2 46.5Z" fill="#0ACF83"/>
                      <path d="M19 2V20H27.5C32.1944 20 36 16.1944 36 11.5C36 6.80558 32.1944 3 27.5 3H19V2Z" fill="#FF7262"/>
                      <path d="M2 11.5C2 16.1944 5.80558 20 10.5 20H19V3H10.5C5.80558 3 2 6.80558 2 11.5Z" fill="#F24E1E"/>
                      <path d="M2 28.5C2 33.1944 5.80558 37 10.5 37H19V20H10.5C5.80558 20 2 23.8056 2 28.5Z" fill="#A259FF"/>
                    </svg>
                    <span className={styles.techIconName}>Figma</span>
                  </div>

                  {/* Postman */}
                  <div className={styles.techIcon}>
                    <i className={`devicon-postman-plain colored ${styles.techIconSvg}`}></i>
                    <span className={styles.techIconName}>Postman</span>
                  </div>

                  {/* Vite */}
                  <div className={styles.techIcon}>
                    <i className={`devicon-vitejs-plain colored ${styles.techIconSvg}`}></i>
                    <span className={styles.techIconName}>Vite</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Section Pengalaman Kerja */}
      <section id="experience" className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Work Experience</h2>
          <p className={styles.sectionSubtitle}>
            My professional journey and the roles that shaped my expertise
          </p>
          
          {/* Desktop: Tampilan Timeline */}
          {!isMobile && (
            <div className={styles.timeline}>
              {workExperiences.map((exp) => (
                <div key={exp.id} className={styles.timelineItem}>
                  <span className={styles.timelinePeriod}>{exp.period}</span>
                  <h3 className={styles.timelineTitle}>{exp.title}</h3>
                  <p className={styles.timelineCompany}>{exp.company}</p>
                  <p className={styles.timelineDescription}>
                    {exp.description}
                  </p>
                  <div className={styles.timelineTags}>
                    {exp.tags.map((tag, index) => (
                      <span key={index} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mobile: Tampilan Card Stack */}
          {isMobile && (
            <div className={styles.cardStackContainer}>
              <div className={styles.cardStack}>
                {workExperiences.map((exp, index) => {
                  const offset = index - currentExperienceIndex;
                  const isActive = index === currentExperienceIndex;
                  const isPrev = index < currentExperienceIndex;
                  
                  return (
                    <div
                      key={exp.id}
                      className={`${styles.stackCard} ${isActive ? styles.stackCardActive : ''} ${isPrev ? styles.stackCardPrev : ''}`}
                      style={{
                        transform: `translateY(${offset * 20}px) scale(${1 - Math.abs(offset) * 0.05})`,
                        opacity: isPrev ? 0 : (1 - Math.abs(offset) * 0.3),
                        zIndex: workExperiences.length - index,
                        pointerEvents: isActive ? 'auto' : 'none'
                      }}
                      onTouchStart={(e) => {
                        touchStartX.current = e.touches[0].clientX;
                        touchStartY.current = e.touches[0].clientY;
                      }}
                      onTouchMove={(e) => {
                        touchEndX.current = e.touches[0].clientX;
                        touchEndY.current = e.touches[0].clientY;
                      }}
                      onTouchEnd={() => {
                        const deltaX = touchStartX.current - touchEndX.current;
                        const deltaY = Math.abs(touchStartY.current - touchEndY.current);
                        
                        // Hanya swipe jika gerakan horizontal lebih besar dari vertikal
                        if (Math.abs(deltaX) > 80 && Math.abs(deltaX) > deltaY) {
                          if (deltaX > 0 && currentExperienceIndex < workExperiences.length - 1) {
                            setCurrentExperienceIndex(prev => prev + 1);
                          } else if (deltaX < 0 && currentExperienceIndex > 0) {
                            setCurrentExperienceIndex(prev => prev - 1);
                          }
                        }
                      }}
                    >
                      <div className={styles.stackCardHeader}>
                        <span className={styles.stackCardPeriod}>{exp.period}</span>
                        <span className={styles.stackCardCounter}>
                          {index + 1} / {workExperiences.length}
                        </span>
                      </div>
                      <h3 className={styles.stackCardTitle}>{exp.title}</h3>
                      <p className={styles.stackCardCompany}>{exp.company}</p>
                      <p className={styles.stackCardDescription}>
                        {exp.description}
                      </p>
                      <div className={styles.timelineTags}>
                        {exp.tags.map((tag, idx) => (
                          <span key={idx} className={styles.tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Dots Navigasi */}
              {workExperiences.length > 1 && (
                <>
                  <div className={styles.stackDots}>
                    {workExperiences.map((_, idx) => (
                      <button
                        key={idx}
                        className={`${styles.stackDot} ${idx === currentExperienceIndex ? styles.stackDotActive : ''}`}
                        onClick={() => setCurrentExperienceIndex(idx)}
                      />
                    ))}
                  </div>
                  
                  <p className={styles.swipeHint}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '0.5rem' }}>
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Swipe to navigate
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Section Projects */}
      <section id="projects" className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Featured Projects & Certificates</h2>
          <p className={styles.sectionSubtitle}>
            A showcase of my recent work, personal projects, and professional certifications
          </p>

          {/* Tombol Tab */}
          <div className={styles.tabContainer}>
            <button
              className={`${styles.tabButton} ${activeTab === 'projects' ? styles.tabButtonActive : ''}`}
              onClick={() => {
                setActiveTab('projects');
                setCurrentSlide(0);
              }}
            >
              Projects
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'certificates' ? styles.tabButtonActive : ''}`}
              onClick={() => {
                setActiveTab('certificates');
                setCurrentSlide(0);
              }}
            >
              Certificates
            </button>
          </div>

          {/* Konten Tab Projects */}
          {activeTab === 'projects' && (
            <div className={styles.tabContent}>
              {isMobile ? (
                <div 
                  className={styles.carouselContainer}
                  onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                  onTouchMove={(e) => { touchEndX.current = e.touches[0].clientX; }}
                  onTouchEnd={() => {
                    if (touchStartX.current - touchEndX.current > 50) {
                      setCurrentSlide((prev) => (prev + 1) % displayedProjects.length);
                    }
                    if (touchEndX.current - touchStartX.current > 50) {
                      setCurrentSlide((prev) => (prev - 1 + displayedProjects.length) % displayedProjects.length);
                    }
                  }}
                >
                  <div className={styles.carouselTrack} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {displayedProjects.map((project) => (
                      <div key={project.id} className={styles.carouselSlide}>
                        <div className={styles.projectCard}>
                    <div className={styles.projectImage}></div>
                    <div className={styles.projectContent}>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <p className={styles.projectDescription}>
                        {project.description}
                      </p>
                      <div className={styles.timelineTags}>
                        {project.tags.map((tag, index) => (
                          <span key={index} className={styles.tag}>{tag}</span>
                        ))}
                      </div>
                      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-start' }}>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.viewButton}>
                          View Project
                        </a>
                      </div>
                        </div>
                      </div>
                    </div>
                    ))}
                  </div>
                  <div className={styles.carouselDots}>
                    {displayedProjects.map((_, index) => (
                      <button
                        key={index}
                        className={`${styles.carouselDot} ${currentSlide === index ? styles.carouselDotActive : ''}`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.grid}>
                    {displayedProjects.map((project) => (
                      <div key={project.id} className={styles.projectCard}>
                        <div className={styles.projectImage}></div>
                        <div className={styles.projectContent}>
                          <h3 className={styles.projectTitle}>{project.title}</h3>
                          <p className={styles.projectDescription}>
                            {project.description}
                          </p>
                          <div className={styles.timelineTags}>
                            {project.tags.map((tag, index) => (
                              <span key={index} className={styles.tag}>{tag}</span>
                            ))}
                          </div>
                          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-start' }}>
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.viewButton}>
                              View Project
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {projects.length > 3 && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                      <button 
                        className={styles.ctaButton}
                        onClick={() => setShowAllProjects(!showAllProjects)}
                        style={{ minWidth: '200px' }}
                      >
                        {showAllProjects ? 'Show Less' : 'Show More'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Konten Tab Certificates */}
          {activeTab === 'certificates' && (
            <div className={styles.tabContent}>
              {isMobile ? (
                <div 
                  className={styles.carouselContainer}
                  onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                  onTouchMove={(e) => { touchEndX.current = e.touches[0].clientX; }}
                  onTouchEnd={() => {
                    if (touchStartX.current - touchEndX.current > 50) {
                      setCurrentSlide((prev) => (prev + 1) % displayedCertificates.length);
                    }
                    if (touchEndX.current - touchStartX.current > 50) {
                      setCurrentSlide((prev) => (prev - 1 + displayedCertificates.length) % displayedCertificates.length);
                    }
                  }}
                >
                  <div className={styles.carouselTrack} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {displayedCertificates.map((cert) => (
                      <div key={cert.id} className={styles.carouselSlide}>
                        <div className={styles.certificateCard}>
                    <div className={styles.certificateImage}></div>
                    <div className={styles.certificateContent}>
                      <h3 className={styles.certificateTitle}>{cert.title}</h3>
                      <p className={styles.certificateIssuer}>{cert.issuer}</p>
                      <p className={styles.certificateDate}>Issued: {cert.date}</p>
                      <p className={styles.certificateDescription}>
                        {cert.description}
                      </p>
                      <div className={styles.timelineTags}>
                        {cert.tags.map((tag, index) => (
                          <span key={index} className={styles.tag}>{tag}</span>
                        ))}
                      </div>
                      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-start' }}>
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className={styles.viewButton}>
                          View Certificate
                        </a>
                      </div>
                        </div>
                      </div>
                    </div>
                    ))}
                  </div>
                  <div className={styles.carouselDots}>
                    {displayedCertificates.map((_, index) => (
                      <button
                        key={index}
                        className={`${styles.carouselDot} ${currentSlide === index ? styles.carouselDotActive : ''}`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.grid}>
                    {displayedCertificates.map((cert) => (
                      <div key={cert.id} className={styles.certificateCard}>
                        <div className={styles.certificateImage}></div>
                        <div className={styles.certificateContent}>
                          <h3 className={styles.certificateTitle}>{cert.title}</h3>
                          <p className={styles.certificateIssuer}>{cert.issuer}</p>
                          <p className={styles.certificateDate}>Issued: {cert.date}</p>
                          <p className={styles.certificateDescription}>
                            {cert.description}
                          </p>
                          <div className={styles.timelineTags}>
                            {cert.tags.map((tag, index) => (
                              <span key={index} className={styles.tag}>{tag}</span>
                            ))}
                          </div>
                          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-start' }}>
                            <a href={cert.link} target="_blank" rel="noopener noreferrer" className={styles.viewButton}>
                              View Certificate
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {certificates.length > 3 && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                      <button 
                        className={styles.ctaButton}
                        onClick={() => setShowAllCertificates(!showAllCertificates)}
                        style={{ minWidth: '200px' }}
                      >
                        {showAllCertificates ? 'Show Less' : 'Show More'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Section Kontak */}
      <section id="contact" className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Let's Connect</h2>
          <p className={styles.sectionSubtitle}>
            Feel free to reach out for collaborations or just a friendly chat
          </p>
          <div className={styles.contactLinks}>
            {/* GitHub */}
            <div className={styles.contactItem}>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className={styles.contactIconLink}>
                <svg className={styles.contactIconSvg} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C20.565 21.795 24 17.295 24 12C24 5.37 18.63 0 12 0Z"/>
                </svg>
              </a>
              <span className={styles.contactLabel}>GitHub</span>
            </div>

            {/* Instagram */}
            <div className={styles.contactItem}>
              <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className={styles.contactIconLink}>
                <svg className={styles.contactIconSvg} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C20.102 2.381 21.621 3.924 21.769 7.152C21.827 8.417 21.838 8.797 21.838 12.001C21.838 15.206 21.826 15.585 21.769 16.85C21.62 20.075 20.105 21.621 16.85 21.769C15.584 21.827 15.206 21.839 12 21.839C8.796 21.839 8.416 21.827 7.151 21.769C3.891 21.62 2.38 20.07 2.232 16.849C2.174 15.584 2.162 15.205 2.162 12C2.162 8.796 2.175 8.417 2.232 7.151C2.381 3.924 3.896 2.38 7.151 2.232C8.417 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C2.695 0.272 0.273 2.69 0.073 7.052C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.668 0.072 16.948C0.272 21.306 2.69 23.728 7.052 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.668 23.986 16.948 23.928C21.302 23.728 23.73 21.31 23.927 16.948C23.986 15.668 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.732 2.699 21.311 0.273 16.949 0.073C15.668 0.014 15.259 0 12 0ZM12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.163 12 18.163C15.403 18.163 18.162 15.404 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.21 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.21 14.209 16 12 16ZM18.406 4.155C17.61 4.155 16.965 4.8 16.965 5.595C16.965 6.39 17.61 7.035 18.406 7.035C19.201 7.035 19.845 6.39 19.845 5.595C19.845 4.8 19.201 4.155 18.406 4.155Z"/>
                </svg>
              </a>
              <span className={styles.contactLabel}>Instagram</span>
            </div>

            {/* Gmail */}
            <div className={styles.contactItem}>
              <a href="mailto:your.email@gmail.com" className={styles.contactIconLink}>
                <svg className={styles.contactIconSvg} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 5.457V18.543C24 19.893 22.893 21 21.543 21H2.457C1.107 21 0 19.893 0 18.543V5.457C0 4.107 1.107 3 2.457 3H21.543C22.893 3 24 4.107 24 5.457ZM21.543 5.457L12 11.793L2.457 5.457V6.771L12 13.107L21.543 6.771V5.457Z"/>
                </svg>
              </a>
              <span className={styles.contactLabel}>Email</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLinks}>
            <a href="#about" className={styles.footerLink}>About</a>
            <a href="#experience" className={styles.footerLink}>Experience</a>
            <a href="#projects" className={styles.footerLink}>Projects</a>
            <a href="#contact" className={styles.footerLink}>Contact</a>
          </div>
          <p className={styles.footerText}>
            © {new Date().getFullYear()} Aziz Al-Habibie Simatupang. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
