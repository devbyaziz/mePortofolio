import { useState, useEffect, useRef, useMemo, lazy, Suspense } from 'react';
import styles from './landing-page.module.css';

const FloatingAstronaut = lazy(() => import('../FloatingAstronaut'));

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
      title: 'Web Coffee Bean Quality',
      description: 'A coffee bean quality assessment expert system based on SCAA and SNI standards using rule-based reasoning method',
      tags: ['HTML', 'CSS', 'JavaScript'],
      image: '/images/projects/coffe-project.webp',
      link: 'https://github.com/devbyaziz/web-coffee-bean-quality'
    },
    {
      id: 2,
      title: 'myPortfolio v1',
      description: 'My personal portfolio website version 1 showcasing projects and skills',
      tags: ['React', 'CSS', 'TypeScript'],
      image: '/images/projects/porto-project.webp',
      link: 'https://github.com/devbyaziz/myPortfolio-v1'
    },
    {
      id: 3,
      title: 'Restful API e-Commerce',
      description: 'A simple RESTful API for e-commerce application with complete CRUD operations',
      tags: ['Express.js', 'Node.js', 'SQLite', 'Prisma'],
      image: '/images/projects/restapi-project.webp',
      link: 'https://github.com/devbyaziz/restfulAPI-Training'
    },
    {
      id: 4,
      title: 'Mario Game',
      description: 'A simple 2D Mario game built using vanilla HTML, CSS, and JavaScript',
      tags: ['HTML', 'CSS', 'JavaScript'],
      image: '/images/projects/mario-project.webp',
      link: 'https://github.com/devbyaziz/mario-js'
    },
    {
      id: 5,
      title: 'Weather App',
      description: 'A modern and interactive weather forecast application using OpenWeather API',
      tags: ['HTML', 'CSS', 'JavaScript'],
      image: '/images/projects/weather-project.webp',
      link: 'https://github.com/devbyaziz/weather-app/tree/main'
    },
    {
      id: 6,
      title: 'Tic Tac Toe Game',
      description: 'A simple Tic Tac Toe game with unbeatable AI using Minimax algorithm',
      tags: ['HTML', 'CSS', 'JavaScript'],
      image: '/images/projects/tictactoe-project.webp',
      link: 'https://github.com/devbyaziz/tic-tac-toe'
    },
    {
      id: 7,
      title: 'SOS Game',
      description: 'A basic SOS game implementation with interactive gameplay',
      tags: ['HTML', 'CSS', 'JavaScript'],
      image: '/images/projects/sos-project.webp',
      link: 'https://github.com/devbyaziz/sosGame'
    },
    {
      id: 8,
      title: 'Berita Oleh Aziz',
      description: 'A news website that provides the latest news articles from various sources using GNews API',
      tags: ['HTML', 'CSS', 'JavaScript'],
      image: '/images/projects/news-project.webp',
      link: 'https://github.com/devbyaziz/beritaolehAziz'
    },
    {
      id: 9,
      title: 'CCTV Traffic Forecasting',
      description: 'A forecasting system for CCTV traffic prediction using SARIMAX statistical model',
      tags: ['Python'],
      image: '',
      link: 'https://github.com/devbyaziz/forecast-project'
    }
  ];

  // Data Pengalaman Kerja
  const workExperiences = [
    {
      id: 1,
      period: 'Sept 2025 - Nov 2025',
      title: 'Frontend Developer Intern',
      company: 'BigBox AI – Telkom Indonesia',
      description: 'As a Frontend Developer Intern at BigBox AI – Telkom Indonesia, I contributed to the development of the big data and AI ecosystem, focusing on bug fixing, design slicing, API integration, and new feature development across various application modules. This experience strengthened my ability to build responsive user interfaces, collaborate across teams, and understand the end-to-end product development process within an enterprise-scale environment at Telkom Indonesia.',
      tags: ['React', 'TypeScript', 'Next.js', 'Tailwind']
    }
  ];

  // Data Sertifikat (6 item)
  const certificates = [
    {
      id: 1,
      title: 'Start Programming with Python',
      issuer: 'Dicoding Indonesia',
      date: '13 May 2025',
      description: 'Mastered the fundamentals of Python programming based on industry standards, including program development using Visual Studio Code, Jupyter Notebook, and Google Colaboratory.',
      tags: ['Python', 'Programming Basics', 'IDE'],
      image: '/images/certificates/python-sertif.webp',
      link: 'https://www.dicoding.com/certificates/N9ZO9VDORXG5'
    },
    {
      id: 2,
      title: 'Learn Basic SQL',
      issuer: 'Dicoding Indonesia',
      date: '12 May 2025',
      description: 'Learned fundamental SQL concepts and mastered essential queries for data management, analysis, and database operations aimed at aspiring data analysts and data scientists.',
      tags: ['SQL', 'Database', 'Data Management'],
      image: '/images/certificates/sql-sertif.webp',
      link: 'https://www.dicoding.com/certificates/6RPNREK89X2M'
    },
    {
      id: 3,
      title: 'Learn Basic Data Visualization',
      issuer: 'Dicoding Indonesia',
      date: '10 May 2025',
      description: 'Acquired skills in creating effective and insightful visual representations of data using industry-standard tools and techniques to communicate data-driven insights.',
      tags: ['Data Visualization', 'Data Analysis', 'Charts'],
      image: '/images/certificates/visualisasi-data-sertif.webp',
      link: 'https://www.dicoding.com/certificates/07Z63Y1LJZQR'
    },
    {
      id: 4,
      title: 'Learn Basic Data Science',
      issuer: 'Dicoding Indonesia',
      date: '29 April 2025',
      description: 'Learned fundamental data science concepts including data collection, cleaning, analysis, and visualization techniques to solve real-world problems.',
      tags: ['Data Science', 'Data Analysis', 'Python'],
      image: '/images/certificates/data-science-sertif.webp',
      link: 'https://www.dicoding.com/certificates/72ZD5WWE9ZYW'
    },
    {
      id: 5,
      title: 'Learn Basic AI',
      issuer: 'Dicoding Indonesia',
      date: '28 April 2025',
      description: 'Gained foundational knowledge in artificial intelligence, including core concepts, machine learning principles, and AI development techniques.',
      tags: ['Artificial Intelligence', 'Machine Learning', 'AI'],
      image: '/images/certificates/ai-sertif.webp',
      link: 'https://www.dicoding.com/certificates/98XWEYM60XM3'
    },
    {
      id: 6,
      title: 'Learn Basic Cloud and Gen AI AWS',
      issuer: 'Dicoding Indonesia',
      date: '27 April 2025',
      description: 'Acquired foundational knowledge in cloud computing and generative AI using AWS services, including practical skills for cloud infrastructure and AI implementation.',
      tags: ['Cloud Computing', 'Generative AI', 'AWS'],
      image: '/images/certificates/cloud-sertif.webp',
      link: 'https://www.dicoding.com/certificates/N9ZO25VO6PG5'
    },
    {
      id: 7,
      title: 'Data Science Bootcamp',
      issuer: 'Satya Negara University x Maxy Academy',
      date: '16 Dec 2025',
      description: 'Responsible for supporting the planning, coordination, and execution of the bootcamp activities, ensuring smooth operations, and assisting in strategic decision-making to achieve the program objectives.',
      tags: ['Data Science', 'Machine Learning', 'Python', 'Analytics'],
      image: '/images/certificates/bootcamp-sertif.webp',
      link: '/bootcamp-sertif1.pdf'
    },
    {
      id: 8,
      title: 'Learn Data Visualization with Tableau',
      issuer: 'Zenith Academy x Tableau',
      date: '3 Jul 2025',
      description: 'Mastered data visualization techniques using Tableau, learning to create interactive dashboards, reports, and visual analytics to communicate data insights effectively for business intelligence.',
      tags: ['Tableau', 'Data Visualization', 'Business Intelligence', 'Dashboards'],
      image: '/images/certificates/tableau-sertif.webp',
      link: '/tableau-sertif1.pdf'
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
  const featuredCertificates = [certificates[0], certificates[3], certificates[4], certificates[5]];

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

      <main>
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
            <a href="/Resume Aziz Al-Habibie Simatupang.pdf" target="_blank" rel="noopener noreferrer" className={styles.ctaButton} style={{ minWidth: '180px' }}>
              View Resume
            </a>
          </div>
        </div>

        {/* Astronaut 3D Melayang */}
        <div className="floating-laptop-container">
          <Suspense fallback={<div />}>
            <FloatingAstronaut />
          </Suspense>
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
              Hi, I am a final year computer engineering student and a programmer who focuses on front-end development. I'm passionate about turning creative ideas into interactive, beautifully designed web experiences that solve real problems.
            </p>
            <p>
              Throughout my journey, I've worked on diverse projects ranging from expert systems to data visualization tools, which have strengthened my technical skills and broadened my understanding of technology. I specialize in modern web technologies like React and TypeScript, and I'm always eager to explore new tools and frameworks.
            </p>
            <p style={{ marginBottom: 0 }}>
              Beyond coding, I value collaboration, clean code, and continuous learning. I'm passionate about expanding my knowledge and skills, constantly seeking new challenges and technologies to master. I believe great software is built when technical expertise meets user-centric design.
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
                    <div className={styles.projectImage}>
                      <img src={project.image} alt={project.title} loading="lazy" />
                    </div>
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
                        <div className={styles.projectImage}>
                          <img src={project.image} alt={project.title} loading="lazy" />
                        </div>
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
                    <div className={styles.certificateImage}>
                      <img src={cert.image} alt={cert.title} loading="lazy" />
                    </div>
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
                        <div className={styles.certificateImage}>
                          <img src={cert.image} alt={cert.title} loading="lazy" />
                        </div>
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
              <a href="https://github.com/devbyaziz" target="_blank" rel="noopener noreferrer" className={styles.contactIconLink} aria-label="Visit my GitHub profile">
                <svg className={styles.contactIconSvg} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C20.565 21.795 24 17.295 24 12C24 5.37 18.63 0 12 0Z"/>
                </svg>
              </a>
              <span className={styles.contactLabel}>GitHub</span>
            </div>

            {/* LinkedIn */}
            <div className={styles.contactItem}>
              <a href="https://linkedin.com/in/aziz-al-habibie-simatupang" target="_blank" rel="noopener noreferrer" className={styles.contactIconLink} aria-label="Visit my LinkedIn profile">
                <svg className={styles.contactIconSvg} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <span className={styles.contactLabel}>LinkedIn</span>
            </div>

            {/* Gmail */}
            <div className={styles.contactItem}>
              <a href="mailto:azizhabibie2002@gmail.com" className={styles.contactIconLink} aria-label="Send me an email">
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
      </main>
    </div>
  );
};

export default LandingPage;
