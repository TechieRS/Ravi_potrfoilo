import React, { useEffect, useRef, useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  VStack,
  chakra,
  shouldForwardProp,
} from '@chakra-ui/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Sparkles, Stars, Torus } from '@react-three/drei';
import { Bloom, ChromaticAberration, EffectComposer } from '@react-three/postprocessing';
import {
  isValidMotionProp,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import Tilt from 'react-parallax-tilt';
import {
  FaBrain,
  FaChrome,
  FaCode,
  FaExternalLinkAlt,
  FaGithub,
  FaGraduationCap,
  FaLinkedin,
  FaLaptopCode,
  FaRocket,
  FaShieldAlt,
  FaSpaceShuttle,
  FaTrophy,
} from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const neon = '#00ff00';
const neonSoft = '#00cc00';
const glassBg = 'whiteAlpha.50';
const glassBorder = 'rgba(0,255,0,0.55)';
const spring = { type: 'spring', stiffness: 100, damping: 15 };

const sectionVariants = {
  hidden: { opacity: 0, y: 70, rotateX: -8 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { ...spring, staggerChildren: 0.12 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: spring },
};

const glitchHeadlineVariants = {
  initial: {
    opacity: 0,
    x: 0,
    y: 0,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: [0, 1, 0.62, 1, 0.78, 1, 1],
    x: [0, -10, 8, -6, 5, -2, 0],
    y: [0, 5, -4, 3, -2, 1, 0],
    filter: ['blur(8px)', 'blur(0px)', 'blur(2px)', 'blur(0px)', 'blur(1px)', 'blur(0px)', 'blur(0px)'],
    textShadow: [
      '0 0 8px #00ff00',
      '8px 0 0 rgba(0,255,0,0.45), -8px 0 0 rgba(0,229,255,0.35), 0 0 44px #00ff00',
      '-6px 0 0 rgba(0,255,0,0.45), 6px 0 0 rgba(0,229,255,0.35), 0 0 70px #00ff00',
      '0 0 22px rgba(0,255,0,0.82), 0 0 80px rgba(0,255,0,0.42)',
    ],
    transition: {
      duration: 1.5,
      times: [0, 0.16, 0.32, 0.48, 0.64, 0.82, 1],
      ease: 'easeInOut',
    },
  },
};

const socialButtonVariants = {
  rest: { x: 0, filter: 'blur(0px)' },
  hover: {
    x: [0, -8, 7, -5, 4, -2, 0],
    filter: ['blur(0px)', 'blur(1px)', 'blur(0px)', 'blur(1px)', 'blur(0px)'],
    transition: { duration: 0.36, ease: 'easeInOut' },
  },
  tap: { scale: 0.96 },
};

const ventures = [
  {
    title: 'Lokmadad',
    label: 'Startup Venture',
    icon: FaChrome,
    description:
      'Independent startup venture building a real-time form validation Chrome Extension to prevent rejected submissions before they happen.',
    tags: ['Chrome Extension', 'Real-time validation', 'Founder-led'],
    links: [
      { label: 'Website', href: 'https://lokmadad.com/' },
      {
        label: 'Extension',
        href: 'https://chromewebstore.google.com/detail/Lokmadad/flhmceacmkjcfdikjhbjhjhfieeaeggh',
      },
    ],
  },
  {
    title: 'Aegis-AI',
    label: 'Open Source',
    icon: FaShieldAlt,
    description:
      'High-performance Sidecar firewall between users and LLMs. Built with Rust, Bytewax, React/Chakra UI, and UMAP vector math for AI drift detection.',
    tags: ['Rust', 'Bytewax', 'UMAP', 'AI Firewall'],
    links: [{ label: 'View Project', href: 'https://lnkd.in/gqkzSiz7' }],
  },
];

const projects = [
  {
    title: 'Language Translator',
    icon: FaBrain,
    description: 'AI-powered translation interface using the Gemini AI API.',
    tags: ['Gemini AI API', 'HTML', 'CSS', 'JavaScript'],
    area: { base: 'auto', lg: 'span 2' },
  },
  {
    title: 'Bank Account Management System',
    icon: FaLaptopCode,
    description: 'Console banking system in C with modular design and file handling.',
    tags: ['C', 'Modular Design', 'File Handling'],
    area: { base: 'auto', lg: 'auto' },
  },
  {
    title: 'Tic Tac Toe Game',
    icon: FaCode,
    description: 'Algorithmic console game with deterministic win checks and state transitions.',
    tags: ['C', 'Algorithms', 'Game Logic'],
    area: { base: 'auto', lg: 'auto' },
  },
];

const timeline = [
  {
    type: 'Education',
    title: 'B.Tech in CSE',
    meta: 'Amity University / 2025-2029',
    icon: FaGraduationCap,
  },
  {
    type: 'Hackathon',
    title: '1st Place AI Hackathon',
    meta: 'IIT Patna',
    icon: FaTrophy,
  },
  {
    type: 'Hackathon',
    title: 'Top 15 NASA Space Apps',
    meta: 'Noida Edition',
    icon: FaSpaceShuttle,
  },
  {
    type: 'Hackathon',
    title: 'Top 20 Smart India Hackathon',
    meta: 'School Level',
    icon: FaRocket,
  },
];

function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.5 });

  useEffect(() => {
    const move = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  return (
    <Box pointerEvents="none" display={{ base: 'none', md: 'block' }}>
      <MotionBox
        position="fixed"
        left="0"
        top="0"
        zIndex="10001"
        w="8px"
        h="8px"
        borderRadius="full"
        bg={neon}
        boxShadow="0 0 12px #00ff00, 0 0 26px rgba(0,255,0,0.72)"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%', willChange: 'transform' }}
      />
      <MotionBox
        position="fixed"
        left="0"
        top="0"
        zIndex="10000"
        w="54px"
        h="54px"
        borderRadius="full"
        border="2px solid #00ff00"
        bg="rgba(0,255,0,0.045)"
        backdropFilter="blur(8px)"
        boxShadow="0 0 22px #00ff00, 0 0 70px rgba(0,255,0,0.32), inset 0 0 18px rgba(0,255,0,0.36)"
        animate={{ scale: [1, 1.24, 1], opacity: [0.82, 0.42, 0.82] }}
        transition={{ duration: 1.25, repeat: Infinity, ease: 'easeInOut' }}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%', willChange: 'transform' }}
      />
    </Box>
  );
}

function HackerText({ text, delay = 0 }) {
  const [value, setValue] = useState('');
  const chars = '01X#<>/{}[]_$%&@RAVI';

  useEffect(() => {
    let frame = 0;
    let rafId;
    let timeoutId;

    const tick = () => {
      const progress = Math.floor(frame / 2);
      setValue(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < progress) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(''),
      );

      frame += 1;
      if (progress <= text.length) {
        rafId = requestAnimationFrame(tick);
      } else {
        setValue(text);
      }
    };

    timeoutId = window.setTimeout(tick, delay);
    return () => {
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [text, delay]);

  return <>{value}</>;
}

function TerminalTypewriter({ text, delay = 0 }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    let index = 0;
    let intervalId;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1;
        setValue(text.slice(0, index));
        if (index >= text.length) {
          window.clearInterval(intervalId);
        }
      }, 42);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [text, delay]);

  return (
    <>
      {value}
      <MotionBox
        as="span"
        display="inline-block"
        ml="2px"
        color="green.300"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
      >
        _
      </MotionBox>
    </>
  );
}

function ScrambleText({ text, duration = 2000 }) {
  const [value, setValue] = useState('');
  const symbols = '!@#$%&*<>[]{}?/\\|+=-_01';

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
          return symbols[Math.floor(Math.random() * symbols.length)];
        })
        .join('');

      setValue(next);
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setValue(text);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [text, duration]);

  return <>{value}</>;
}

function AnimatedCyberGrid() {
  return (
    <MotionBox
      position="absolute"
      inset="-30% 0 0 0"
      zIndex="0"
      pointerEvents="none"
      opacity="0.35"
      backgroundImage="
        linear-gradient(rgba(0,255,0,0.16) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,0,0.16) 1px, transparent 1px),
        radial-gradient(circle, rgba(0,255,0,0.22) 1px, transparent 1px)
      "
      backgroundSize="62px 62px, 62px 62px, 30px 30px"
      transformOrigin="50% 100%"
      sx={{
        transform: 'perspective(800px) rotateX(62deg)',
        maskImage: 'linear-gradient(to top, black, transparent 78%)',
      }}
      animate={{ backgroundPosition: ['0px 0px, 0px 0px, 0px 0px', '0px 248px, 0px 248px, 0px 120px'] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
    />
  );
}

function TechStackTicker() {
  const capabilities = ['React', 'Python', 'FastAPI'];
  const loop = [...capabilities, ...capabilities, ...capabilities, ...capabilities];

  return (
    <Box
      w={{ base: '100%', md: '520px' }}
      maxW="100%"
      overflow="hidden"
      border="1px solid"
      borderColor="rgba(0,255,0,0.28)"
      borderRadius="full"
      bg="rgba(0,255,0,0.035)"
      boxShadow="inset 0 0 22px rgba(0,255,0,0.08), 0 0 24px rgba(0,255,0,0.12)"
      py={2}
      sx={{
        maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
      }}
    >
      <MotionBox
        display="flex"
        gap={3}
        w="max-content"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'linear' }}
      >
        {loop.map((capability, index) => (
          <HStack
            key={`${capability}-${index}`}
            spacing={2}
            flex="0 0 auto"
            px={4}
            py={1}
            borderRadius="full"
            bg="rgba(0,255,0,0.08)"
            border="1px solid"
            borderColor="rgba(0,255,0,0.24)"
          >
            <Box w="7px" h="7px" borderRadius="full" bg={neon} boxShadow="0 0 12px #00ff00" />
            <Text color="green.200" fontFamily="'Fira Code', monospace" fontSize="xs" fontWeight="950">
              {capability}
            </Text>
          </HStack>
        ))}
      </MotionBox>
    </Box>
  );
}

function Reticle({ top, bottom, left, right, reverse = false }) {
  return (
    <MotionBox
      position="absolute"
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      zIndex="2"
      pointerEvents="none"
      w={{ base: '72px', md: '110px' }}
      h={{ base: '72px', md: '110px' }}
      borderRadius="full"
      border="1px solid rgba(0,255,0,0.3)"
      boxShadow="0 0 24px rgba(0,255,0,0.18), inset 0 0 24px rgba(0,255,0,0.08)"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
    >
      <Box position="absolute" top="50%" left="10%" right="10%" h="1px" bg="rgba(0,255,0,0.55)" />
      <Box position="absolute" left="50%" top="10%" bottom="10%" w="1px" bg="rgba(0,255,0,0.55)" />
      {[['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']].map(([y, x]) => (
        <Box
          key={`${y}-${x}`}
          position="absolute"
          {...{ [y]: 0, [x]: 0 }}
          w="24px"
          h="24px"
          borderColor="#00ff00"
          borderTopWidth={y === 'top' ? '2px' : 0}
          borderBottomWidth={y === 'bottom' ? '2px' : 0}
          borderLeftWidth={x === 'left' ? '2px' : 0}
          borderRightWidth={x === 'right' ? '2px' : 0}
        />
      ))}
    </MotionBox>
  );
}

function AlienCore() {
  const groupRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.32;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.45) * 0.18;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.72;
      innerRef.current.rotation.z += delta * 0.52;
    }
  });

  return (
    <group ref={groupRef}>
      <pointLight color={neon} intensity={9} distance={11} position={[0, 0, 0]} />
      <pointLight color="#00e676" intensity={3} distance={14} position={[2.8, 1.8, 3]} />
      <Float speed={2.2} rotationIntensity={0.7} floatIntensity={0.9}>
        <Torus args={[2.15, 0.055, 22, 180]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color={neonSoft} emissive={neon} emissiveIntensity={2.4} roughness={0.18} metalness={0.82} />
        </Torus>
        <Torus args={[1.48, 0.038, 18, 160]} rotation={[0.2, Math.PI / 2, 0]}>
          <meshStandardMaterial color={neon} emissive={neon} emissiveIntensity={2.9} roughness={0.25} metalness={0.9} />
        </Torus>
        <Torus args={[0.92, 0.025, 16, 130]} rotation={[Math.PI / 2.45, 0.6, 0.4]}>
          <meshStandardMaterial color="#88ff88" emissive={neon} emissiveIntensity={1.8} roughness={0.22} metalness={0.7} />
        </Torus>
        <group ref={innerRef}>
          <Icosahedron args={[0.92, 2]}>
            <meshStandardMaterial
              color="#021602"
              emissive={neon}
              emissiveIntensity={2.1}
              roughness={0.08}
              metalness={0.95}
              wireframe
            />
          </Icosahedron>
        </group>
        <Icosahedron args={[1.95, 1]} rotation={[0.3, 0.8, 0.2]}>
          <meshStandardMaterial color="#001a00" emissive={neon} emissiveIntensity={0.55} roughness={0.2} metalness={0.75} wireframe transparent opacity={0.45} />
        </Icosahedron>
        {Array.from({ length: 8 }).map((_, index) => {
          const angle = (index / 8) * Math.PI * 2;
          const x = Math.cos(angle) * 1.45;
          const y = Math.sin(angle) * 0.9;
          const z = Math.sin(angle * 1.7) * 0.9;

          return (
            <mesh key={`node-${index}`} position={[x, y, z]} scale={[0.045, 0.045, 0.045]}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial color={neon} emissive={neon} emissiveIntensity={5} />
            </mesh>
          );
        })}
        {Array.from({ length: 12 }).map((_, index) => {
          const angle = (index / 12) * Math.PI * 2;
          const x = Math.cos(angle) * 2.14;
          const y = Math.sin(angle) * 2.14;

          return (
            <mesh key={index} position={[x, y, 0]} scale={[0.08, 0.08, 0.08]}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial color={neon} emissive={neon} emissiveIntensity={4} />
            </mesh>
          );
        })}
      </Float>
    </group>
  );
}

function WebGLHero() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, 72]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0.12]);
  const smoothY = useSpring(heroY, { stiffness: 70, damping: 22 });

  return (
    <Flex
      id="home"
      as="section"
      align="center"
      bg="black"
      direction={{ base: 'column', md: 'row' }}
      h="100vh"
      justify="space-between"
      overflow="hidden"
      position="relative"
      pt="100px"
      w="100vw"
      backgroundImage="radial-gradient(circle at 74% 46%, rgba(0,255,0,0.22), transparent 28%)"
      backgroundSize="100% 100%"
    >
      <AnimatedCyberGrid />
      <Reticle top={{ base: 5, md: 8 }} left={{ base: 5, md: 8 }} />
      <Reticle top={{ base: 5, md: 8 }} right={{ base: 5, md: 8 }} reverse />
      <Reticle bottom={{ base: 5, md: 8 }} left={{ base: 5, md: 8 }} reverse />
      <Reticle bottom={{ base: 5, md: 8 }} right={{ base: 5, md: 8 }} />
      <Box
        position="absolute"
        inset="0"
        zIndex="0"
        pointerEvents="none"
        backgroundImage="
          linear-gradient(rgba(0,255,0,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,0,0.035) 1px, transparent 1px)
        "
        backgroundSize="100% 100%, 56px 56px, 56px 56px"
        sx={{ maskImage: 'radial-gradient(circle at center, black 42%, transparent 88%)' }}
      />

      <MotionBox
        as={Flex}
        direction="column"
        h={{ base: '48%', md: '100%' }}
        justify="center"
        pl={{ base: '5%', md: '10%' }}
        pr={{ base: '5%', md: 0 }}
        w={{ base: '100%', md: '50%' }}
        zIndex="10"
        order={{ base: 2, md: 1 }}
        style={{ y: smoothY, opacity: heroOpacity, willChange: 'transform, opacity' }}
      >
        <Stack spacing={5} align="flex-start" w="100%">
          <MotionBox
            border="1px solid"
            borderColor="rgba(0,255,0,0.32)"
            bg="rgba(0,255,0,0.045)"
            px={4}
            py={2}
            borderRadius="full"
            boxShadow="0 0 22px rgba(0,255,0,0.16), inset 0 0 20px rgba(0,255,0,0.06)"
            animate={{
              opacity: [0.55, 1, 0.55],
              borderColor: ['rgba(0,255,0,0.24)', 'rgba(0,255,0,0.72)', 'rgba(0,255,0,0.24)'],
            }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Text
              color="green.300"
              fontFamily="'Fira Code', 'Space Mono', monospace"
              fontSize={{ base: 'xs', md: 'sm' }}
              fontWeight="900"
              letterSpacing="0"
              textShadow="0 0 16px #00ff00"
            >
              [ SYSTEM STATUS: ONLINE // ACTIVE NODES: REACT, PYTHON, FASTAPI ]
            </Text>
          </MotionBox>
          <Text
            color="green.300"
            fontFamily="'Fira Code', 'Space Mono', monospace"
            fontWeight="900"
            letterSpacing="0"
            textShadow="0 0 20px #00ff00"
          >
            OMNITRIX_INTERFACE / PORTFOLIO_CORE
          </Text>
          <MotionBox
            variants={glitchHeadlineVariants}
            initial="initial"
            animate="animate"
          >
            <Heading
              color={neon}
              fontSize={{ base: '4xl', sm: '6xl', md: '8xl', xl: '9xl' }}
              lineHeight="0.82"
              fontWeight="950"
              letterSpacing="0"
              maxW="1200px"
              textShadow="0 0 22px rgba(0,255,0,0.82), 0 0 80px rgba(0,255,0,0.42)"
            >
              <ScrambleText text="RAVI BHUSHAN SHARMA" duration={2000} />
            </Heading>
          </MotionBox>
          <MotionBox animate={{ opacity: [0.72, 1, 0.72], textShadow: ['0 0 10px rgba(0,255,0,0.22)', '0 0 22px rgba(0,255,0,0.48)', '0 0 10px rgba(0,255,0,0.22)'] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
          <Text color="whiteAlpha.850" fontSize={{ base: 'lg', md: '2xl' }} maxW="780px" fontWeight="700">
            <TerminalTypewriter text="Software Developer & Startup Founder" delay={900} />
          </Text>
          </MotionBox>
          <HStack mt={6} spacing={4} flexWrap="wrap">
            {[
              {
                label: 'Email Me',
                href: 'mailto:ravibhushansharma730@gmail.com',
                icon: FiMail,
              },
              {
                label: 'GitHub',
                href: 'YOUR_GITHUB_LINK',
                icon: FaGithub,
                target: '_blank',
              },
              {
                label: 'LinkedIn',
                href: 'YOUR_LINKEDIN_LINK',
                icon: FaLinkedin,
                target: '_blank',
              },
            ].map((button) => (
              <MotionBox
                key={button.label}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                variants={socialButtonVariants}
                whileHover="hover"
                whileTap="tap"
                transition={{ ...spring, delay: 1.35 }}
              >
                <Button
                  as="a"
                  href={button.href}
                  target={button.target}
                  rel={button.target ? 'noreferrer' : undefined}
                  leftIcon={<Icon as={button.icon} />}
                  bg="transparent"
                  border="1px solid #00ff00"
                  color={neon}
                  borderRadius="full"
                  px={7}
                  py={6}
                  fontWeight="950"
                  letterSpacing="0"
                  position="relative"
                  overflow="hidden"
                  boxShadow="inset 0 0 18px rgba(0,255,0,0.08), 0 0 18px rgba(0,255,0,0.18)"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-90%',
                    w: '70%',
                    h: '100%',
                    bg: 'linear-gradient(90deg, transparent, rgba(0,255,0,0.42), transparent)',
                    transform: 'skewX(-22deg)',
                    transition: 'left 0.45s ease',
                  }}
                  _hover={{
                    bg: 'rgba(0,255,0,0.12)',
                    color: '#00ff00',
                    boxShadow: '0px 0px 15px #00ff00, inset 0px 0px 10px #00ff00',
                    _before: {
                      left: '125%',
                    },
                  }}
                >
                  {button.label}
                </Button>
              </MotionBox>
            ))}
          </HStack>
          <MotionBox
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 1.65 }}
            pt={2}
            w="100%"
          >
            <TechStackTicker />
          </MotionBox>
        </Stack>
      </MotionBox>

      <Box
        h={{ base: '52%', md: '100%' }}
        position="relative"
        w={{ base: '100%', md: '50%' }}
        zIndex="1"
        order={{ base: 1, md: 2 }}
        pointerEvents="none"
      >
        <Canvas
          camera={{ position: [0, 0, 6.2], fov: 48 }}
          dpr={[1, 1.8]}
          gl={{ antialias: true, alpha: false }}
          style={{ pointerEvents: 'none' }}
        >
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.16} />
          <Stars radius={90} depth={42} count={3800} factor={4} saturation={0} fade speed={0.85} />
          <Sparkles count={110} scale={7} size={2.8} speed={0.35} color={neon} opacity={0.45} />
          <group scale={0.82}>
            <AlienCore />
          </group>
          <EffectComposer>
            <Bloom height={300} luminanceSmoothing={0.9} luminanceThreshold={0.2} intensity={2.7} />
            <ChromaticAberration offset={[0.002, 0.002]} />
          </EffectComposer>
        </Canvas>
      </Box>
    </Flex>
  );
}

function FloatingNav() {
  const links = ['Home', 'Ventures', 'Projects', 'Timeline'];

  return (
    <Flex
      position="fixed"
      top="20px"
      left="50%"
      transform="translateX(-50%)"
      zIndex="9999"
      px={3}
      py={2}
      bg="whiteAlpha.100"
      border="1px solid"
      borderColor="rgba(0,255,0,0.45)"
      borderRadius="full"
      backdropFilter="blur(14px)"
      boxShadow="0 0 30px rgba(0,255,0,0.18), inset 0 0 20px rgba(0,255,0,0.05)"
      gap={2}
    >
      {links.map((link, index) => (
        <Button
          key={link}
          as="a"
          href={`#${index === 3 ? 'timeline' : link.toLowerCase()}`}
          size="sm"
          borderRadius="full"
          bg={index === 0 ? 'green.400' : 'transparent'}
          color={index === 0 ? 'black' : 'whiteAlpha.900'}
          fontWeight="950"
          _hover={{
            bg: 'green.400',
            color: 'black',
            boxShadow: '0 0 28px #00ff00',
          }}
        >
          {link}
        </Button>
      ))}
    </Flex>
  );
}

function SectionHeading({ eyebrow, children }) {
  return (
    <Stack spacing={3} align="center" textAlign="center" mb={{ base: 10, md: 14 }}>
      <Text color="green.300" fontFamily="'Fira Code', monospace" fontSize="sm" fontWeight="900">
        {eyebrow}
      </Text>
      <Box position="relative">
        <Box
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          w={{ base: '260px', md: '560px' }}
          h={{ base: '90px', md: '150px' }}
          bg="green.500"
          filter="blur(90px)"
          opacity={0.22}
        />
        <Heading
          position="relative"
          color={neon}
          fontSize={{ base: '4xl', md: '7xl', xl: '8xl' }}
          lineHeight="0.86"
          fontWeight="950"
          letterSpacing="0"
          textShadow="0 0 36px rgba(0,255,0,0.56)"
        >
          {children}
        </Heading>
      </Box>
    </Stack>
  );
}

function HologramCard({ children, ...props }) {
  return (
    <MotionBox
      variants={childVariants}
      bg={glassBg}
      backdropFilter="blur(20px)"
      border="1px solid"
      borderColor={glassBorder}
      borderRadius="16px"
      p={{ base: 5, md: 6 }}
      boxShadow="inset 0 0 30px rgba(0,255,0,0.05), 0 12px 60px rgba(0,0,0,0.5)"
      transition="all 0.22s ease"
      _hover={{
        borderColor: neon,
        boxShadow: '0 0 40px #00ff00',
        transform: 'scale(1.05)',
      }}
      {...props}
    >
      {children}
    </MotionBox>
  );
}

function TechTag({ children }) {
  return (
    <Tag
      size="sm"
      borderRadius="full"
      bg="rgba(0,255,0,0.08)"
      color="green.300"
      border="1px solid"
      borderColor="rgba(0,255,0,0.35)"
      fontWeight="900"
      fontFamily="'Fira Code', monospace"
      boxShadow="0 0 14px rgba(0,255,0,0.12)"
    >
      {children}
    </Tag>
  );
}

function Ventures() {
  return (
    <Box id="ventures" as="section" py={{ base: 18, md: 28 }}>
      <Container maxW="7xl">
        <MotionBox variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }}>
          <SectionHeading eyebrow="STARTUP_CORE / OPEN_SOURCE_FIREWALL">VENTURES</SectionHeading>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={7}>
            {ventures.map((venture) => {
              const VentureIcon = venture.icon;

              return (
                <Tilt
                  key={venture.title}
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  perspective={900}
                  scale={1.02}
                  glareEnable
                  glareMaxOpacity={0.34}
                  glareColor={neon}
                  glarePosition="all"
                >
                  <HologramCard minH="410px">
                    <Stack h="100%" spacing={6}>
                      <Flex justify="space-between" align="start">
                        <Icon as={VentureIcon} boxSize={12} color="green.400" filter="drop-shadow(0 0 18px #00ff00)" />
                        <Badge bg="green.400" color="black" borderRadius="full" px={3} py={1} fontWeight="950">
                          {venture.label}
                        </Badge>
                      </Flex>
                      <Stack spacing={3} flex="1">
                        <Heading color="white" size="xl" textShadow="0 0 24px rgba(0,255,0,0.22)">
                          {venture.title}
                        </Heading>
                        <Text color="whiteAlpha.760" lineHeight="1.8">
                          {venture.description}
                        </Text>
                      </Stack>
                      <Flex gap={2} wrap="wrap">
                        {venture.tags.map((tag) => (
                          <TechTag key={tag}>{tag}</TechTag>
                        ))}
                      </Flex>
                      <HStack gap={3} wrap="wrap">
                        {venture.links.map((link) => (
                          <Button
                            key={link.href}
                            as={Link}
                            href={link.href}
                            isExternal
                            rightIcon={<FaExternalLinkAlt />}
                            bg="green.400"
                            color="black"
                            borderRadius="full"
                            fontWeight="950"
                            _hover={{
                              bg: 'green.300',
                              textDecoration: 'none',
                              boxShadow: '0 0 30px #00ff00',
                            }}
                          >
                            {link.label}
                          </Button>
                        ))}
                      </HStack>
                    </Stack>
                  </HologramCard>
                </Tilt>
              );
            })}
          </SimpleGrid>
        </MotionBox>
      </Container>
    </Box>
  );
}

function ScrollFlyProject({ project, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end center'],
  });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [180, 0]), { stiffness: 95, damping: 18 });
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.72], [0, 1]), { stiffness: 90, damping: 20 });
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 1], [18, 0]), { stiffness: 80, damping: 18 });
  const ProjectIcon = project.icon;

  return (
    <GridItem ref={ref} colSpan={project.area} minH={index === 0 ? { base: '330px', lg: '450px' } : '300px'}>
      <MotionBox style={{ y, opacity, rotateX, willChange: 'transform, opacity' }} h="100%" transformStyle="preserve-3d">
        <HologramCard h="100%">
          <Flex direction="column" h="100%" gap={5}>
            <Icon as={ProjectIcon} boxSize={11} color="green.400" filter="drop-shadow(0 0 18px #00ff00)" />
            <Stack spacing={3} flex="1">
              <Heading color="white" size={index === 0 ? '2xl' : 'xl'}>
                {project.title}
              </Heading>
              <Text color="whiteAlpha.760" lineHeight="1.8" fontSize={index === 0 ? 'lg' : 'md'}>
                {project.description}
              </Text>
            </Stack>
            <Flex gap={2} wrap="wrap">
              {project.tags.map((tag) => (
                <TechTag key={tag}>{tag}</TechTag>
              ))}
            </Flex>
            <Button
              w="100%"
              bg="green.400"
              color="black"
              borderRadius="full"
              fontWeight="950"
              _hover={{
                bg: 'green.300',
                boxShadow: '0 0 35px #00ff00',
              }}
            >
              Live Demo
            </Button>
          </Flex>
        </HologramCard>
      </MotionBox>
    </GridItem>
  );
}

function Projects() {
  return (
    <Box id="projects" as="section" py={{ base: 18, md: 28 }}>
      <Container maxW="7xl">
        <SectionHeading eyebrow="BENTO_GRID / SCROLL_PHYSICS">PROJECTS</SectionHeading>
        <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={7} sx={{ perspective: '1200px' }}>
          {projects.map((project, index) => (
            <ScrollFlyProject key={project.title} project={project} index={index} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function EnergyTimeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 78%', 'end 45%'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 95, damping: 24 });

  return (
    <Box id="timeline" as="section" py={{ base: 18, md: 28 }}>
      <Container maxW="6xl">
        <SectionHeading eyebrow="ENERGY_BEAM / MILESTONES">TIMELINE</SectionHeading>
        <Box ref={ref} position="relative" py={3}>
          <Box
            position="absolute"
            top="0"
            bottom="0"
            left={{ base: '18px', md: '50%' }}
            w="4px"
            bg="rgba(0,255,0,0.12)"
            transform={{ base: 'none', md: 'translateX(-50%)' }}
          />
          <MotionBox
            position="absolute"
            top="0"
            bottom="0"
            left={{ base: '18px', md: '50%' }}
            w="4px"
            bg="green.400"
            boxShadow="0 0 12px #00ff00, 0 0 34px rgba(0,255,0,0.7)"
            transform={{ base: 'none', md: 'translateX(-50%)' }}
            transformOrigin="top"
            style={{ scaleY: lineScale, willChange: 'transform' }}
          />
          <VStack spacing={8} align="stretch">
            {timeline.map((item, index) => {
              const TimelineIcon = item.icon;
              const alignLeft = index % 2 === 0;

              return (
                <Flex
                  key={`${item.type}-${item.title}`}
                  position="relative"
                  justify={{ base: 'flex-start', md: alignLeft ? 'flex-start' : 'flex-end' }}
                  pl={{ base: 12, md: 0 }}
                >
                  <MotionBox
                    position="absolute"
                    left={{ base: '8px', md: 'calc(50% - 11px)' }}
                    top="28px"
                    w="24px"
                    h="24px"
                    borderRadius="full"
                    bg="green.400"
                    border="4px solid"
                    borderColor="#000000"
                    boxShadow="0 0 22px 7px rgba(0,255,0,0.45)"
                    animate={{ scale: [1, 1.28, 1], opacity: [0.74, 1, 0.74] }}
                    transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut', delay: index * 0.18 }}
                  />
                  <Box w={{ base: '100%', md: '46%' }}>
                    <MotionBox
                      initial={{ opacity: 0, x: alignLeft ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={spring}
                      style={{ willChange: 'transform, opacity' }}
                    >
                      <HologramCard>
                        <HStack spacing={4} align="start">
                          <Icon as={TimelineIcon} boxSize={8} color="green.400" filter="drop-shadow(0 0 16px #00ff00)" />
                          <Stack spacing={1}>
                            <Text color="green.300" fontWeight="950" fontSize="xs" textTransform="uppercase" fontFamily="'Fira Code', monospace">
                              {item.type}
                            </Text>
                            <Heading color="white" size="md">
                              {item.title}
                            </Heading>
                            <Text color="whiteAlpha.760">{item.meta}</Text>
                          </Stack>
                        </HStack>
                      </HologramCard>
                    </MotionBox>
                  </Box>
                </Flex>
              );
            })}
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.075, duration: 1.25, smoothWheel: true, wheelMultiplier: 0.92 }}>
      <Box
        minH="100vh"
        bg="#000000"
        color="whiteAlpha.900"
        overflowX="hidden"
        sx={{
          cursor: { md: 'none' },
          '*': { cursor: { md: 'none !important' } },
          'html, body': { background: '#000000' },
        }}
        backgroundImage="
          linear-gradient(rgba(0,255,0,0.045) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,0,0.045) 1px, transparent 1px),
          radial-gradient(circle at 50% 0%, rgba(0,255,0,0.14), transparent 30%),
          radial-gradient(circle at 10% 70%, rgba(0,204,0,0.10), transparent 22%)
        "
        backgroundSize="54px 54px, 54px 54px, 100% 100%, 100% 100%"
      >
        <CustomCursor />
        <FloatingNav />
        <WebGLHero />
        <Ventures />
        <Projects />
        <EnergyTimeline />
      </Box>
    </ReactLenis>
  );
}
