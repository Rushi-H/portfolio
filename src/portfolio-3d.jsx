import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Stars } from '@react-three/drei';
import * as THREE from 'three';

const GITHUB_USERNAME = 'RUSHI-H';
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`;

const COLORS = {
  neonPink: '#FF006E',
  neonBlue: '#00F5FF',
  neonPurple: '#BD00FF',
  darkBg: '#0A0E27',
  gridGreen: '#39FF14',
  orange: '#FF6B35',
};

// --- DATA ---

const DEMO_REPOS = [
  { id: 1, name: 'cyber-neural-net', description: 'Advanced AI neural network for pattern recognition in cyberspace anomalies.', language: 'Python', html_url: '#', stargazers_count: 404, fork: false },
  { id: 2, name: 'neon-grid-ui', description: 'React component library featuring retro-futuristic synthwave aesthetics.', language: 'TypeScript', html_url: '#', stargazers_count: 1337, fork: false },
  { id: 3, name: 'anti-gravity-engine', description: 'WebGL based 3D physics engine focusing on zero-g environments.', language: 'JavaScript', html_url: '#', stargazers_count: 2049, fork: false },
];

const EXPERIENCE_DATA = [
  {
    id: 'exp1',
    company: 'Yalmar Infotech Pvt Ltd',
    role: 'Full Stack Developer',
    duration: 'Apr 2025 – Present | Pune',
    points: [
      'Built 15+ REST APIs using Node.js & Express',
      'Improved database performance by ~25% via MongoDB optimization',
      'Implemented JWT authentication & role-based access control',
      'Integrated 3+ third-party APIs (payments, notifications)'
    ]
  },
  {
    id: 'exp2',
    company: 'GeeksforGeeks',
    role: 'MERN Stack Intern',
    duration: 'Feb 2025 – May 2025',
    points: [
      'Built full-stack Airbnb clone with 20+ API endpoints',
      'Implemented OAuth authentication & real-time booking',
      'Reduced DB latency by 35% using indexing & aggregation'
    ]
  },
  {
    id: 'exp3',
    company: 'Innovative Technologies',
    role: 'Web Developer',
    duration: 'Apr 2024 – Dec 2024',
    points: [
      'Developed React components improving performance by 20%',
      'Managed AWS EC2 & S3 deployments'
    ]
  }
];

const EDUCATION_DATA = [
  {
    id: 'edu1',
    institution: 'Modern College, Pune',
    degree: 'M.Sc. Computer Science',
    duration: '2023–2025',
    details: 'Postgraduate Degree'
  },
  {
    id: 'edu2',
    institution: 'Savitribai Phule Pune University',
    degree: 'B.Sc. Computer Science',
    duration: '2019–2022',
    details: 'CGPA: 8.34'
  }
];

const ABOUT_DATA = [
  {
    id: 'about1',
    content: "I'm a MERN Stack Developer who enjoys building modern, scalable web applications that solve real-world problems.\n\nWith experience in MongoDB, Express.js, React, and Node.js, I focus on creating clean, user-friendly, and performance-driven digital products. I've worked on projects like AI-powered chatbots and full-stack platforms, where I combine functionality with great user experience.\n\nCurrently, I'm exploring the integration of AI with web applications — building smarter systems that don't just work, but actually help users.\n\nI'm always looking to learn, improve, and take on new challenges that push my skills to the next level."
  }
];

// --- 3D COMPONENTS ---

const ParticleSystem = ({ count = 1000 }) => {
  const points = useRef();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40; // z
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      points.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={COLORS.neonBlue}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Generic Floating Card Component Wrapper
const FloatingCard = ({ position, index, children, hoverColor, boxArgs = [4.2, 5.2, 0.1], customClass = "project-card" }) => {
  const group = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (group.current) {
      const time = state.clock.getElapsedTime();
      group.current.position.y = position[1] + Math.sin(time * 1.5 + index) * 0.2;

      if (hovered) {
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(time * 2) * 0.1, 0.1);
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.sin(time * 2) * 0.1, 0.1);
      } else {
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, 0, 0.1);
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0, 0.1);
      }
    }
  });

  return (
    <group ref={group} position={position}>
      <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <boxGeometry args={boxArgs} />
        <meshBasicMaterial color={hovered ? hoverColor : COLORS.darkBg} transparent opacity={hovered ? 0.2 : 0} />
      </mesh>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.1]}
        style={{
          transition: 'all 0.3s ease',
          opacity: hovered ? 1 : 0.8,
          transform: hovered ? 'scale(1.05)' : 'scale(1)'
        }}
      >
        <div
          className={customClass}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ '--hover-color': hoverColor }}
        >
          {children}
        </div>
      </Html>
    </group>
  );
};

const ProjectCard = ({ project, position, index }) => {
  return (
    <FloatingCard position={position} index={index} hoverColor={COLORS.neonPink}>
      <h2>{project.name}</h2>

      <div className="project-meta">
        <span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          {new Date(project.updated_at || Date.now()).toLocaleDateString()}
        </span>
        <span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          {project.stargazers_count}
        </span>
      </div>

      <p>{project.description || 'No description provided. Initiating neural scan to determine function...'}</p>

      <div className="project-tags">
        {project.language && <span className="project-tag">{project.language}</span>}
        {project.topics && project.topics.slice(0, 3).map(topic => (
          <span key={topic} className="project-tag">{topic}</span>
        ))}
      </div>

      <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="project-link">
        ACCESS REPOSITORY
      </a>
    </FloatingCard>
  );
};

const ExperienceCard = ({ exp, position, index }) => {
  return (
    <FloatingCard position={position} index={index} hoverColor={COLORS.orange}>
      <h2 style={{ color: COLORS.orange, textShadow: `0 0 5px ${COLORS.orange}` }}>{exp.company}</h2>
      <div className="project-meta" style={{ color: COLORS.neonBlue }}>
        <span>{exp.role}</span>
      </div>
      <div className="project-meta" style={{ color: '#aaa', marginBottom: '10px' }}>
        <span>{exp.duration}</span>
      </div>

      <div className="experience-points">
        {exp.points.map((point, i) => (
          <p key={i} style={{ marginBottom: '8px', fontSize: '0.85rem' }}>• {point}</p>
        ))}
      </div>
    </FloatingCard>
  );
};

const EducationCard = ({ edu, position, index }) => {
  return (
    <FloatingCard position={position} index={index} hoverColor={COLORS.neonPurple}>
      <h2 style={{ color: COLORS.neonPurple, textShadow: `0 0 5px ${COLORS.neonPurple}` }}>{edu.degree}</h2>
      <div className="project-meta" style={{ color: COLORS.gridGreen, fontSize: '1rem', marginTop: '10px' }}>
        <span>{edu.institution}</span>
      </div>
      <div className="project-meta" style={{ color: '#aaa' }}>
        <span>{edu.duration}</span>
      </div>
      <p style={{ color: '#E0E0E0', fontSize: '1.1rem', marginTop: '10px' }}>{edu.details}</p>
    </FloatingCard>
  );
};

const CelestialBodies = () => {
  const sunRef = useRef();
  const moonRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (sunRef.current) sunRef.current.rotation.y = time * 0.05;
    if (moonRef.current) moonRef.current.rotation.y = time * 0.1;
  });

  return (
    <group>
      {/* Realistic Sun Light casting onto the scene & Moon */}
      <pointLight position={[-35, 15, -50]} intensity={3} color="#ffccaa" distance={300} decay={1.5} />

      {/* Sun */}
      <mesh ref={sunRef} position={[-35, 15, -50]}>
        <sphereGeometry args={[12, 64, 64]} />
        <meshStandardMaterial
          color="#ffaa00"
          emissive="#ff5500"
          emissiveIntensity={2.5}
          roughness={1}
          toneMapped={false}
        />
      </mesh>

      {/* Moon */}
      <mesh ref={moonRef} position={[35, -10, -40]}>
        <sphereGeometry args={[7, 64, 64]} />
        <meshStandardMaterial
          color="#cccccc"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
};

const AboutCard = ({ about, position, index }) => {
  return (
    <FloatingCard
      position={position}
      index={index}
      hoverColor={COLORS.neonBlue}
      boxArgs={[8, 5, 0.1]}
      customClass="about-card"
    >
      <h2 style={{ color: COLORS.neonBlue, textShadow: `0 0 5px ${COLORS.neonBlue}`, fontSize: '2.5rem', marginBottom: '20px' }}>ABOUT ME</h2>
      {about.content.split('\n\n').map((paragraph, i) => (
        <p key={i} style={{ color: '#E0E0E0', fontSize: '1.15rem', lineHeight: '1.6', marginBottom: '15px' }}>
          {paragraph}
        </p>
      ))}
    </FloatingCard>
  );
};

// --- MAIN PORTFOLIO COMPONENT ---

export default function Portfolio3D({ activeSection = 'about' }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(GITHUB_API);
        if (!response.ok) throw new Error('API Rate limit or other error');
        const data = await response.json();
        const filtered = data.filter(repo => !repo.fork).slice(0, 12);
        setRepos(filtered.length > 0 ? filtered : DEMO_REPOS);
      } catch (error) {
        console.error('Error fetching GitHub repos, using demo data:', error);
        setRepos(DEMO_REPOS);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader-text">INITIALIZING SYSTEM...</div>
        <div className="loader-bar">
          <div className="loader-progress"></div>
        </div>
      </div>
    );
  }

  // Determine which data to show
  const currentData = activeSection === 'about' ? ABOUT_DATA :
    activeSection === 'projects' ? repos :
      activeSection === 'experience' ? EXPERIENCE_DATA :
        EDUCATION_DATA;

  // Calculate positions in a cylinder or sphere shape around the camera
  const baseRadius = currentData.length > 4 ? 8 : 5;
  const radius = activeSection === 'about' ? 0 : (isMobile ? baseRadius * 0.7 : baseRadius);
  const cardPositions = currentData.map((_, i) => {
    if (activeSection === 'about') return [0, 0, 0];
    const angle = (i / currentData.length) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = currentData.length > 2 ? (i % 2 === 0 ? 7 : -1.5) : 0;
    return [x, y, z];
  });

  return (
    <Canvas camera={{ position: [0, 0, 12], fov: isMobile ? 75 : 60 }} dpr={[1, isMobile ? 1.5 : 2]}>
      <color attach="background" args={[COLORS.darkBg]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color={COLORS.neonBlue} />
      <pointLight position={[-10, -10, -10]} intensity={1} color={COLORS.neonPink} />

      <ParticleSystem count={isMobile ? 500 : 1500} />
      <Stars radius={50} depth={50} count={isMobile ? 1000 : 3000} factor={isMobile ? 2 : 4} saturation={1} fade speed={0.5} />

      <CelestialBodies />

      <group>
        {activeSection === 'about' && ABOUT_DATA.map((about, i) => (
          <AboutCard key={about.id} about={about} index={i} position={cardPositions[i]} />
        ))}
        {activeSection === 'projects' && repos.map((repo, i) => (
          <ProjectCard key={repo.id} project={repo} index={i} position={cardPositions[i]} />
        ))}
        {activeSection === 'experience' && EXPERIENCE_DATA.map((exp, i) => (
          <ExperienceCard key={exp.id} exp={exp} index={i} position={cardPositions[i]} />
        ))}
        {activeSection === 'education' && EDUCATION_DATA.map((edu, i) => (
          <EducationCard key={edu.id} edu={edu} index={i} position={cardPositions[i]} />
        ))}
      </group>

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        maxDistance={40}
        minDistance={3}
        autoRotate={true}
        autoRotateSpeed={0.2}
      />
    </Canvas>
  );
}
