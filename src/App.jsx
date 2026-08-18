import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
  chakra,
  shouldForwardProp,
} from '@chakra-ui/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Sparkles, Stars, Wireframe } from '@react-three/drei';
import { Bloom, ChromaticAberration, EffectComposer } from '@react-three/postprocessing';
import {
  isValidMotionProp,
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import {
  FaBrain,
  FaCode,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaRocket,
  FaSatellite,
  FaShieldAlt,
  FaTerminal,
  FaTrophy,
  FaUniversity,
} from 'react-icons/fa';
import { FiExternalLink, FiCpu, FiActivity } from 'react-icons/fi';
import { VscTerminalCmd } from 'react-icons/vsc';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const bg = '#011101';
const panel = 'rgba(0, 50, 0, 0.4)';
const neon = '#00ff00';
const toxic = '#39ff14';
const dim = 'rgba(57, 255, 20, 0.72)';
const border = '1px solid #00ff00';
const violentGlitch = {
  x: [0, -10, 8, -6, 5, -3, 0],
  y: [0, 4, -5, 3, -2, 1, 0],
  filter: [
    'drop-shadow(0 0 6px #00ff00)',
    'drop-shadow(8px 0 0 rgba(57,255,20,0.72))',
    'drop-shadow(-8px 0 0 rgba(0,255,0,0.72))',
    'drop-shadow(0 0 18px #39ff14)',
    'drop-shadow(0 0 6px #00ff00)',
  ],
};

const contacts = [
  { label: 'EMAIL', href: 'mailto:ravibhushansharma730@gmail.com', icon: FaEnvelope },
  { label: 'GITHUB', href: 'https://github.com/TechieRS', icon: FaGithub },
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/techiers/', icon: FaLinkedin },
];

const skillGroups = [
  { group: 'CORE', skills: ['C', 'C++', 'Python', 'JavaScript'] },
  { group: 'FRONTEND', skills: ['HTML', 'CSS', 'React', 'Bootstrap'] },
  { group: 'BACKEND & TOOLS', skills: ['FastAPI', 'Git', 'System Architecture'] },
];

const projects = [
  {
    type: 'STARTUP VENTURE',
    title: 'Lokmadad',
    detail: 'Independent startup venture building a real-time form validation Chrome Extension.',
    href: 'https://lokmadad.com/',
    icon: FaRocket,
  },
  {
    type: 'OPEN SOURCE FIREWALL',
    title: 'Aegis-AI',
    detail: 'High-performance Sidecar firewall for AI traffic inspection and policy control.',
    href: 'https://github.com/TechieRS/Ages_Ai',
    icon: FaShieldAlt,
  },
  {
    type: 'AI SYSTEM',
    title: 'Language Translator AI',
    detail: 'Gemini-powered translation interface with direct repository access.',
    href: 'https://github.com/TechieRS/Language-Translator-AI',
    icon: FaBrain,
  },
  {
    type: 'C SYSTEM',
    title: 'Bank Account System',
    detail: 'Console banking application using C control flow and account operations.',
    href: 'https://github.com/TechieRS/Bank_Account_Management_System_Using_C',
    icon: FaUniversity,
  },
  {
    type: 'ALGORITHM NODE',
    title: 'Tic Tac Toe',
    detail: 'Algorithmic game logic in C with deterministic win-state evaluation.',
    href: 'https://github.com/TechieRS/Tic_Tac_Toe_Using_C',
    icon: FaCode,
  },
];

const timeline = [
  {
    type: 'EDUCATION',
    title: 'B.Tech in CSE',
    meta: 'Amity University',
    detail: '2025-2029',
    icon: FaUniversity,
  },
  {
    type: 'EDUCATION',
    title: 'Senior Secondary',
    meta: 'Sinha Model High School',
    detail: 'Academic systems foundation',
    icon: FaUniversity,
  },
  {
    type: 'HACKATHON',
    title: 'Smart India Hackathon 2024',
    meta: 'Top 20 Team',
    detail: 'College Level',
    icon: FaRocket,
  },
  {
    type: 'HACKATHON',
    title: 'AI Hackathon Winner',
    meta: 'IIT Patna',
    detail: 'Winner protocol confirmed',
    icon: FaTrophy,
  },
  {
    type: 'HACKATHON',
    title: 'NASA Space Apps',
    meta: 'Top 15 Finalist',
    detail: 'Space data mission node',
    icon: FaSatellite,
  },
];

function CrosshairCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const move = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <MotionBox
      display={{ base: 'none', md: 'block' }}
      position="fixed"
      left="0"
      top="0"
      zIndex="10000"
      pointerEvents="none"
      w="34px"
      h="34px"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    >
      <Box position="absolute" left="50%" top="0" bottom="0" w="1px" bg={neon} boxShadow="0 0 12px #00ff00" />
      <Box position="absolute" top="50%" left="0" right="0" h="1px" bg={neon} boxShadow="0 0 12px #00ff00" />
      <Box position="absolute" left="50%" top="50%" w="5px" h="5px" borderRadius="full" bg={toxic} transform="translate(-50%, -50%)" boxShadow="0 0 16px #39ff14" />
    </MotionBox>
  );
}

function BootSequence() {
  const lines = ['> INITIALIZING SECURE CONNECTION...', '> BYPASSING FIREWALL...', '> ACCESS GRANTED.'];
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    const timers = lines.map((line, index) =>
      window.setTimeout(() => {
        setVisibleLines((current) => [...current, line]);
      }, index * 620),
    );

    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <Terminal title="BOOT_SEQUENCE">
      <Stack spacing={3} minH="118px">
        {visibleLines.map((line) => (
          <Text key={line} color={toxic} fontFamily="'Fira Code', monospace" fontWeight="900" textShadow="0 0 14px rgba(57,255,20,0.58)">
            {line}
          </Text>
        ))}
        <MotionBox as="span" color={neon} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.62 }}>
          _
        </MotionBox>
      </Stack>
    </Terminal>
  );
}

function DecodeText({ text, duration = 2000 }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const startedAt = performance.now();
    let frameId;

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const reveal = Math.floor(progress * text.length);
      const next = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < reveal) return char;
          return Math.random() > 0.5 ? '1' : '0';
        })
        .join('');

      setValue(next);
      if (progress < 1) frameId = requestAnimationFrame(tick);
      else setValue(text);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [text, duration]);

  return <>{value}</>;
}

function CyberCore() {
  const group = useRef();
  const inner = useRef();

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.x += delta * 0.11;
      group.current.rotation.y += delta * 0.18;
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.36) * 0.14;
    }
    if (inner.current) {
      inner.current.rotation.x -= delta * 0.27;
      inner.current.rotation.y += delta * 0.34;
      inner.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.8) * 0.035);
    }
  });

  return (
    <group ref={group}>
      <Icosahedron args={[2.8, 2]}>
        <meshBasicMaterial color={neon} transparent opacity={0.05} />
        <Wireframe stroke={toxic} thickness={0.035} squeeze={false} simplify={false} />
      </Icosahedron>
      <Icosahedron ref={inner} args={[1.42, 1]}>
        <meshBasicMaterial color={toxic} wireframe transparent opacity={0.72} />
      </Icosahedron>
      {Array.from({ length: 22 }).map((_, index) => {
        const angle = (index / 22) * Math.PI * 2;
        return (
          <mesh key={index} position={[Math.cos(angle) * 2.05, Math.sin(angle * 1.3) * 1.4, Math.sin(angle) * 2.05]} scale={[0.035, 0.035, 0.035]}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshBasicMaterial color={toxic} />
          </mesh>
        );
      })}
    </group>
  );
}

function CyberCoreBackground() {
  return (
    <Box position="fixed" inset="0" zIndex={0} pointerEvents="none">
      <Canvas camera={{ position: [0, 0, 7.2], fov: 48 }} dpr={[1, 1.65]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.24} />
        <pointLight color={toxic} intensity={12} distance={12} position={[0, 0, 3]} />
        <Stars radius={90} depth={48} count={1400} factor={2.4} fade speed={0.4} />
        <Sparkles count={90} scale={6} size={2.4} speed={0.32} color={toxic} opacity={0.48} />
        <CyberCore />
        <EffectComposer>
          <Bloom luminanceThreshold={0.02} luminanceSmoothing={0.18} intensity={3.8} height={420} />
          <ChromaticAberration offset={[0.003, 0.003]} />
        </EffectComposer>
      </Canvas>
    </Box>
  );
}

function Terminal({ title, children, ...props }) {
  return (
    <Box
      bg={panel}
      backdropFilter="blur(12px)"
      border={border}
      borderRadius="2px"
      boxShadow="0 0 28px rgba(0,255,0,0.2), inset 0 0 28px rgba(0,255,0,0.07)"
      overflow="hidden"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        backgroundImage:
          'linear-gradient(rgba(0,255,0,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.045) 1px, transparent 1px)',
        backgroundSize: '100% 8px, 34px 34px',
        opacity: 0.42,
      }}
      {...props}
    >
      <Flex position="relative" zIndex="1" align="center" justify="space-between" px={4} py={3} borderBottom={border} bg="rgba(1, 17, 1, 0.72)">
        <HStack spacing={2}>
          <Icon as={VscTerminalCmd} color={toxic} />
          <Text color={toxic} fontFamily="'Fira Code', monospace" fontWeight="950" fontSize="xs">
            {title}
          </Text>
        </HStack>
        <HStack spacing={2}>
          {[neon, toxic, '#8cff76'].map((color) => (
            <Box key={color} w="8px" h="8px" borderRadius="full" bg={color} boxShadow={`0 0 10px ${color}`} />
          ))}
        </HStack>
      </Flex>
      <Box position="relative" zIndex="1" p={{ base: 4, md: 5 }}>
        {children}
      </Box>
    </Box>
  );
}

function GlitchButton({ href, icon, children }) {
  return (
    <MotionBox whileHover={violentGlitch} transition={{ duration: 0.34, ease: 'easeInOut' }} display="inline-block">
      <Button
        as="a"
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer' : undefined}
        leftIcon={icon ? <Icon as={icon} /> : undefined}
        rightIcon={!icon ? <FiExternalLink /> : undefined}
        bg="rgba(0, 50, 0, 0.4)"
        color={toxic}
        border={border}
        borderRadius="2px"
        px={6}
        py={6}
        fontFamily="'Fira Code', monospace"
        fontWeight="950"
        position="relative"
        overflow="hidden"
        boxShadow="0 0 18px rgba(0,255,0,0.24)"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-90%',
          w: '70%',
          h: '100%',
          bg: 'linear-gradient(90deg, transparent, rgba(57,255,20,0.72), transparent)',
          transform: 'skewX(-20deg)',
          transition: 'left 0.28s ease',
        }}
        _hover={{
          bg: 'rgba(57,255,20,0.14)',
          boxShadow: '0 0 46px rgba(57,255,20,0.72), inset 0 0 18px rgba(57,255,20,0.22)',
          _before: { left: '125%' },
        }}
      >
        {children}
      </Button>
    </MotionBox>
  );
}

function Hero() {
  return (
    <Box id="home" as="section" minH="100vh" position="relative" zIndex="2" px={{ base: 4, md: 8 }} pt={{ base: 24, md: 28 }} pb={12}>
      <Container maxW="7xl">
        <Flex direction={{ base: 'column', lg: 'row' }} gap={6} align="stretch">
          <Stack w={{ base: '100%', lg: '55%' }} spacing={6}>
            <BootSequence />
            <Terminal title="OPERATOR_IDENTITY">
              <Stack spacing={7}>
                <MotionBox initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 150, damping: 18, delay: 1.65 }}>
                  <Badge bg="rgba(57,255,20,0.14)" color={toxic} border={border} borderRadius="2px" px={3} py={1} fontFamily="'Fira Code', monospace">
                    CLASSIFIED PORTFOLIO INTERFACE
                  </Badge>
                </MotionBox>
                <MotionBox initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 150, damping: 18, delay: 1.85 }}>
                  <Heading
                    color={neon}
                    fontSize={{ base: '4xl', md: '6xl', xl: '7xl' }}
                    lineHeight="0.86"
                    letterSpacing="0"
                    fontWeight="950"
                    textShadow="0 0 18px #00ff00, 0 0 58px rgba(57,255,20,0.48)"
                  >
                    <DecodeText text="RAVI BHUSHAN SHARMA" duration={2000} />
                  </Heading>
                </MotionBox>
                <MotionBox
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 150, damping: 18, delay: 2.1 }}
                >
                  <Text
                    color={toxic}
                    fontFamily="'Fira Code', monospace"
                    fontSize={{ base: 'lg', md: '2xl' }}
                    fontWeight="900"
                    animate={{ opacity: [0.72, 1, 0.72] }}
                    as={motion.p}
                    textShadow="0 0 22px rgba(57,255,20,0.62)"
                  >
                    Software Developer & Startup Founder
                  </Text>
                </MotionBox>
                <HStack spacing={3} flexWrap="wrap">
                  {contacts.map((contact) => (
                    <GlitchButton key={contact.label} href={contact.href} icon={contact.icon}>
                      {contact.label}
                    </GlitchButton>
                  ))}
                </HStack>
              </Stack>
            </Terminal>
          </Stack>
          <Box w={{ base: '100%', lg: '45%' }}>
            <Terminal title="LIVE_CYBER_CORE_MIRROR" h="100%">
              <Flex minH={{ base: '340px', lg: '100%' }} align="center" justify="center">
                <Stack align="center" spacing={4} textAlign="center">
                  <Icon as={FiCpu} color={toxic} boxSize={12} filter="drop-shadow(0 0 18px #39ff14)" />
                  <Heading color={neon} fontSize={{ base: '3xl', md: '5xl' }} lineHeight="0.9">
                    CYBER-CORE ONLINE
                  </Heading>
                  <Text color={dim} fontFamily="'Fira Code', monospace" maxW="420px">
                    Massive WebGL wireframe icosahedron active behind all classified terminal layers.
                  </Text>
                </Stack>
              </Flex>
            </Terminal>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

function SkillsMatrix() {
  const flattened = skillGroups.flatMap((group) => group.skills.map((skill) => ({ skill, group: group.group })));
  const marquee = [...flattened, ...flattened];

  return (
    <Box id="skills" as="section" position="relative" zIndex="2" px={{ base: 4, md: 8 }} py={{ base: 12, md: 18 }}>
      <Container maxW="7xl">
        <Terminal title="SYSTEM_CAPABILITIES_SKILLS_MATRIX">
          <Stack spacing={7}>
            <Flex justify="space-between" align="end" gap={4} wrap="wrap">
              <Stack spacing={2}>
                <Text color={toxic} fontFamily="'Fira Code', monospace" fontWeight="950">
                  ACTIVE SERVER NODES
                </Text>
                <Heading color={neon} fontSize={{ base: '3xl', md: '5xl' }} textShadow="0 0 24px rgba(0,255,0,0.48)">
                  Skills Matrix
                </Heading>
              </Stack>
              <Icon as={FiActivity} color={toxic} boxSize={9} filter="drop-shadow(0 0 14px #39ff14)" />
            </Flex>
            <Box overflow="hidden" sx={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
              <MotionBox display="flex" gap={4} w="max-content" animate={{ x: ['0%', '-50%'] }} transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}>
                {marquee.map((node, index) => (
                  <MotionBox
                    key={`${node.skill}-${index}`}
                    flex="0 0 auto"
                    minW="190px"
                    p={4}
                    bg="rgba(0, 50, 0, 0.4)"
                    border={border}
                    borderRadius="2px"
                    boxShadow="inset 0 0 18px rgba(0,255,0,0.08), 0 0 18px rgba(0,255,0,0.2)"
                    animate={{ opacity: [0.62, 1, 0.62], y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.7, delay: (index % 8) * 0.12 }}
                  >
                    <HStack spacing={3}>
                      <Box w="10px" h="10px" borderRadius="full" bg={toxic} boxShadow="0 0 16px #39ff14" />
                      <Stack spacing={0}>
                        <Text color={neon} fontWeight="950" fontFamily="'Fira Code', monospace">
                          {node.skill}
                        </Text>
                        <Text color={dim} fontSize="xs" fontFamily="'Fira Code', monospace">
                          {node.group}
                        </Text>
                      </Stack>
                    </HStack>
                  </MotionBox>
                ))}
              </MotionBox>
            </Box>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              {skillGroups.map((group) => (
                <Box key={group.group} border={border} bg="rgba(1,17,1,0.68)" p={4} borderRadius="2px">
                  <Text color={toxic} fontFamily="'Fira Code', monospace" fontWeight="950" mb={3}>
                    {group.group}
                  </Text>
                  <Flex gap={2} wrap="wrap">
                    {group.skills.map((skill) => (
                      <Badge key={skill} bg="rgba(57,255,20,0.14)" color={neon} border={border} borderRadius="2px" px={2} py={1}>
                        {skill}
                      </Badge>
                    ))}
                  </Flex>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Terminal>
      </Container>
    </Box>
  );
}

function ProjectCard({ project, index }) {
  const ProjectIcon = project.icon;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 90, scale: 0.86 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: 'spring', stiffness: 170, damping: 20, delay: index * 0.08 }}
      whileHover={{ scale: 1.04, y: -8 }}
    >
      <Terminal title={`DATA_NODE_${String(index + 1).padStart(2, '0')}`} minH="350px">
        <Stack spacing={5} h="100%">
          <Flex justify="space-between" align="start" gap={4}>
            <Icon as={ProjectIcon} color={toxic} boxSize={9} filter="drop-shadow(0 0 14px #39ff14)" />
            <Badge bg="rgba(57,255,20,0.14)" color={toxic} border={border} borderRadius="2px" fontFamily="'Fira Code', monospace">
              {project.type}
            </Badge>
          </Flex>
          <Stack spacing={3} flex="1">
            <Heading color={neon} size="lg" letterSpacing="0">
              {project.title}
            </Heading>
            <Text color={dim} fontFamily="'Fira Code', monospace" lineHeight="1.8">
              {project.detail}
            </Text>
          </Stack>
          <GlitchButton href={project.href}>ACCESS REPOSITORY</GlitchButton>
        </Stack>
      </Terminal>
    </MotionBox>
  );
}

function Projects() {
  return (
    <Box id="projects" as="section" position="relative" zIndex="2" px={{ base: 4, md: 8 }} py={{ base: 12, md: 18 }}>
      <Container maxW="7xl">
        <Stack spacing={7}>
          <Terminal title="CLASSIFIED_PROJECTS_AND_STARTUPS_HEADER">
            <Stack spacing={2}>
              <Text color={toxic} fontFamily="'Fira Code', monospace" fontWeight="950">
                DATA NODES / STARTUPS / REPOSITORIES
              </Text>
              <Heading color={neon} fontSize={{ base: '3xl', md: '5xl' }} textShadow="0 0 24px rgba(0,255,0,0.48)">
                Classified Projects & Startups
              </Heading>
            </Stack>
          </Terminal>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={5}>
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}

function TimelineNode({ item, index }) {
  const ItemIcon = item.icon;

  return (
    <Flex position="relative" justify={{ base: 'flex-start', md: index % 2 === 0 ? 'flex-start' : 'flex-end' }} pl={{ base: 12, md: 0 }}>
      <MotionBox
        position="absolute"
        left={{ base: '8px', md: 'calc(50% - 12px)' }}
        top="31px"
        w="24px"
        h="24px"
        bg={neon}
        borderRadius="full"
        boxShadow="0 0 18px #00ff00, 0 0 42px rgba(57,255,20,0.7)"
        animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 1.8, delay: index * 0.12 }}
      />
      <Box w={{ base: '100%', md: '46%' }}>
        <MotionBox initial={{ opacity: 0, y: 90, scale: 0.92 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ type: 'spring', stiffness: 170, damping: 20, delay: index * 0.06 }}>
          <Terminal title={`${item.type}_LOG`}>
            <HStack spacing={4} align="start">
              <Icon as={ItemIcon} color={toxic} boxSize={8} filter="drop-shadow(0 0 14px #39ff14)" />
              <Stack spacing={1}>
                <Text color={toxic} fontFamily="'Fira Code', monospace" fontSize="xs" fontWeight="950">
                  {item.type}
                </Text>
                <Heading color={neon} size="md" letterSpacing="0">
                  {item.title}
                </Heading>
                <Text color={toxic} fontFamily="'Fira Code', monospace" fontWeight="900">
                  {item.meta}
                </Text>
                <Text color={dim} fontFamily="'Fira Code', monospace">
                  {item.detail}
                </Text>
              </Stack>
            </HStack>
          </Terminal>
        </MotionBox>
      </Box>
    </Flex>
  );
}

function OperatorTimeline() {
  return (
    <Box id="timeline" as="section" position="relative" zIndex="2" px={{ base: 4, md: 8 }} py={{ base: 12, md: 20 }}>
      <Container maxW="7xl">
        <Stack spacing={8}>
          <Terminal title="OPERATOR_TIMELINE_HEADER">
            <Stack spacing={2}>
              <Text color={toxic} fontFamily="'Fira Code', monospace" fontWeight="950">
                EDUCATION / HACKATHON TELEMETRY
              </Text>
              <Heading color={neon} fontSize={{ base: '3xl', md: '5xl' }} textShadow="0 0 24px rgba(0,255,0,0.48)">
                Operator Timeline
              </Heading>
            </Stack>
          </Terminal>
          <Box position="relative" py={3}>
            <MotionBox
              position="absolute"
              top="0"
              bottom="0"
              left={{ base: '18px', md: '50%' }}
              w="3px"
              bg={`linear-gradient(${neon}, ${toxic}, ${neon})`}
              boxShadow="0 0 16px #00ff00, 0 0 42px rgba(57,255,20,0.7)"
              transform={{ base: 'none', md: 'translateX(-50%)' }}
              animate={{ opacity: [0.5, 1, 0.5], scaleY: [0.96, 1.02, 0.96] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            />
            <Stack spacing={7}>
              {timeline.map((item, index) => (
                <TimelineNode key={`${item.title}-${item.detail}`} item={item} index={index} />
              ))}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

function FloatingNav() {
  const links = [
    ['HOME', '#home'],
    ['SKILLS', '#skills'],
    ['PROJECTS', '#projects'],
    ['TIMELINE', '#timeline'],
  ];

  return (
    <Flex
      position="fixed"
      top="18px"
      left="50%"
      transform="translateX(-50%)"
      zIndex="50"
      bg="rgba(0, 50, 0, 0.4)"
      backdropFilter="blur(12px)"
      border={border}
      borderRadius="2px"
      p={2}
      gap={1}
      boxShadow="0 0 28px rgba(0,255,0,0.24)"
    >
      {links.map(([label, href]) => (
        <MotionBox key={label} whileHover={violentGlitch} transition={{ duration: 0.3 }}>
          <Button
            as="a"
            href={href}
            size="sm"
            bg="transparent"
            color={toxic}
            borderRadius="2px"
            fontFamily="'Fira Code', monospace"
            fontWeight="950"
            _hover={{ bg: 'rgba(57,255,20,0.14)', boxShadow: '0 0 22px rgba(57,255,20,0.52)' }}
          >
            {label}
          </Button>
        </MotionBox>
      ))}
    </Flex>
  );
}

export default function App() {
  return (
    <Box
      minH="100vh"
      bg={bg}
      color={neon}
      overflowX="hidden"
      position="relative"
      fontFamily="'Fira Code', 'SFMono-Regular', Consolas, monospace"
      sx={{
        cursor: { md: 'none' },
        '*': { cursor: { md: 'none !important' } },
        'html, body': { background: bg },
      }}
    >
      <CyberCoreBackground />
      <Box
        position="fixed"
        inset="0"
        zIndex="1"
        pointerEvents="none"
        bg="radial-gradient(circle at 50% 18%, rgba(57,255,20,0.16), transparent 30%), linear-gradient(rgba(0,255,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.035) 1px, transparent 1px)"
        backgroundSize="100% 100%, 42px 42px, 42px 42px"
      />
      <CrosshairCursor />
      <FloatingNav />
      <Hero />
      <SkillsMatrix />
      <Projects />
      <OperatorTimeline />
      <Box as="footer" position="relative" zIndex="2" px={{ base: 4, md: 8 }} py={10}>
        <Container maxW="7xl">
          <Terminal title="END_OF_TRANSMISSION">
            <Flex justify="space-between" align="center" gap={4} wrap="wrap">
              <Text color={toxic} fontFamily="'Fira Code', monospace" fontWeight="950">
                RAVI_BHUSHAN_SHARMA // CLASSIFIED_INTERFACE_ACTIVE
              </Text>
              <HStack spacing={4}>
                {contacts.map((contact) => (
                  <Link key={contact.label} href={contact.href} isExternal={contact.href.startsWith('http')} color={toxic} _hover={{ color: neon }}>
                    <Icon as={contact.icon} boxSize={5} />
                  </Link>
                ))}
              </HStack>
            </Flex>
          </Terminal>
        </Container>
      </Box>
    </Box>
  );
}
