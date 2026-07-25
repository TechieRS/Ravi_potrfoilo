import React, { useCallback } from 'react';
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
import { isValidMotionProp, motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import Spline from '@splinetool/react-spline';
import {
  FaBolt,
  FaBrain,
  FaChevronDown,
  FaChrome,
  FaCode,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaLaptopCode,
  FaRocket,
  FaShieldAlt,
  FaSpaceShuttle,
  FaTrophy,
} from 'react-icons/fa';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const cardBg = '#111111';
const neonHover = {
  borderColor: 'green.400',
  boxShadow: '0 0 25px 2px rgba(72, 187, 120, 0.4)',
};

const fadeUp = {
  hidden: { opacity: 0, y: 42, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
};

const starfieldOptions = {
  fullScreen: { enable: false },
  detectRetina: true,
  fpsLimit: 60,
  background: { color: '#000000' },
  particles: {
    number: {
      value: 95,
      density: { enable: true, area: 900 },
    },
    color: {
      value: ['#00ff88', '#00e5ff', '#ffffff'],
    },
    shape: { type: 'circle' },
    opacity: {
      value: { min: 0.16, max: 0.75 },
      animation: {
        enable: true,
        speed: 0.45,
        sync: false,
      },
    },
    size: {
      value: { min: 0.8, max: 2.7 },
      animation: {
        enable: true,
        speed: 1.1,
        sync: false,
      },
    },
    links: {
      enable: true,
      distance: 155,
      color: '#00ff88',
      opacity: 0.18,
      width: 1,
      triangles: {
        enable: true,
        opacity: 0.025,
      },
    },
    move: {
      enable: true,
      speed: 0.28,
      direction: 'none',
      random: true,
      straight: false,
      outModes: { default: 'out' },
    },
  },
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onHover: {
        enable: true,
        mode: 'grab',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 170,
        links: { opacity: 0.45 },
      },
    },
  },
};

const ventures = [
  {
    title: 'Aegis-AI',
    label: 'Open Source',
    icon: FaShieldAlt,
    description:
      'High-performance Sidecar firewall sitting between users and LLMs. Built with Rust, Bytewax, and UMAP vector math to detect AI drift.',
    tags: ['Rust', 'Bytewax', 'UMAP vector math', 'AI Firewall'],
    links: [{ label: 'View Project', href: 'https://lnkd.in/gqkzSiz7' }],
  },
  {
    title: 'Lokmadad',
    label: 'Startup',
    icon: FaChrome,
    description:
      'Independent startup venture building a real-time form validation Chrome Extension to prevent submission rejections.',
    tags: ['Chrome Extension', 'Real-time validation', 'Startup venture'],
    links: [
      { label: 'Website', href: 'https://lokmadad.com/' },
      {
        label: 'Extension',
        href: 'https://chromewebstore.google.com/detail/Lokmadad/flhmceacmkjcfdikjhbjhjhfieeaeggh',
      },
    ],
  },
];

const projects = [
  {
    title: 'Language Translator',
    icon: FaBrain,
    description: 'AI-powered language translation tool built with the Gemini AI API.',
    tags: ['Gemini AI API', 'HTML', 'CSS', 'JS'],
  },
  {
    title: 'Bank Account Management System',
    icon: FaLaptopCode,
    description: 'Console-based banking system written in C with modular design and file handling.',
    tags: ['C', 'Modular design', 'File handling'],
  },
  {
    title: 'Tic Tac Toe Game',
    icon: FaCode,
    description: 'Console-based game in C focused on algorithmic logic and deterministic win checks.',
    tags: ['C', 'Algorithmic logic', 'Game state'],
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
    type: 'Education',
    title: 'Senior Secondary',
    meta: 'Sinha Model High School',
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

function FloatingNav() {
  const links = ['Home', 'Ventures', 'Projects', 'Education'];

  return (
    <Flex
      position="fixed"
      top={{ base: 4, md: 6 }}
      left="50%"
      transform="translateX(-50%)"
      zIndex="100"
      px={3}
      py={2}
      bg="whiteAlpha.100"
      border="1px solid"
      borderColor="whiteAlpha.200"
      borderRadius="full"
      backdropFilter="blur(10px)"
      boxShadow="0 12px 40px rgba(0,0,0,0.55)"
      gap={2}
    >
      {links.map((link, index) => (
        <Button
          key={link}
          as="a"
          href={`#${link.toLowerCase()}`}
          size="sm"
          borderRadius="full"
          bg={index === 0 ? 'green.400' : 'transparent'}
          color={index === 0 ? 'black' : 'whiteAlpha.800'}
          fontWeight="900"
          _hover={{
            bg: 'green.400',
            color: 'black',
            boxShadow: '0 0 22px rgba(72, 187, 120, 0.55)',
          }}
        >
          {link}
        </Button>
      ))}
    </Flex>
  );
}

function SplineLanding() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Box
      id="home"
      as="section"
      position="relative"
      w="100vw"
      h="100vh"
      minH="100vh"
      overflow="hidden"
      bg="black"
    >
      <Box position="absolute" inset="0" zIndex="0">
        <Particles id="deep-space-starfield" init={particlesInit} options={starfieldOptions} width="100%" height="100%" />
      </Box>

      <Box
        position="absolute"
        inset="0"
        zIndex="1"
        pointerEvents="none"
        backgroundImage="
          radial-gradient(circle at 50% 50%, rgba(0,255,136,0.16), transparent 28%),
          radial-gradient(circle at 70% 34%, rgba(0,229,255,0.11), transparent 24%),
          radial-gradient(circle at 28% 72%, rgba(72,187,120,0.10), transparent 22%)
        "
      />

      <Flex position="relative" zIndex="10" w="100%" h="100%" align="center" justify="center">
        <MotionBox
          w={{ base: '100vw', md: '88vw', xl: '76vw' }}
          h={{ base: '78vh', md: '82vh' }}
          maxW="1180px"
          initial={{ opacity: 0, scale: 0.86, rotateX: 12 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          sx={{
            canvas: {
              outline: 'none',
            },
          }}
        >
          <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
        </MotionBox>
      </Flex>

      <MotionBox
        position="absolute"
        bottom={{ base: 7, md: 9 }}
        left="50%"
        zIndex="20"
        transform="translateX(-50%)"
        animate={{ y: [0, 10, 0], opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Flex
          as="a"
          href="#intro"
          align="center"
          justify="center"
          w="46px"
          h="46px"
          borderRadius="full"
          bg="whiteAlpha.100"
          border="1px solid"
          borderColor="green.400"
          backdropFilter="blur(10px)"
          boxShadow="0 0 24px rgba(72, 187, 120, 0.35)"
          color="green.300"
        >
          <Icon as={FaChevronDown} boxSize={5} />
        </Flex>
      </MotionBox>
    </Box>
  );
}

function MassiveHeading({ children }) {
  return (
    <Box position="relative" mb={{ base: 8, md: 12 }}>
      <Box
        position="absolute"
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
        w={{ base: '240px', md: '520px' }}
        h={{ base: '90px', md: '150px' }}
        bg="green.500"
        filter="blur(80px)"
        opacity={0.15}
      />
      <Heading
        position="relative"
        zIndex="1"
        color="green.400"
        fontSize={{ base: '4xl', md: '7xl', xl: '8xl' }}
        lineHeight="0.9"
        textAlign="center"
        fontWeight="950"
        letterSpacing="0"
        textShadow="0 0 28px rgba(0,255,0,0.38)"
      >
        {children}
      </Heading>
    </Box>
  );
}

function HologramCard({ children, ...props }) {
  return (
    <Box
      bg={cardBg}
      border="1px solid #222"
      borderRadius="12px"
      p={{ base: 5, md: 6 }}
      transition="all 0.25s ease"
      _hover={neonHover}
      {...props}
    >
      {children}
    </Box>
  );
}

function TechTag({ children }) {
  return (
    <Tag
      size="sm"
      borderRadius="full"
      bg="black"
      color="green.300"
      border="1px solid"
      borderColor="green.900"
      fontWeight="800"
    >
      {children}
    </Tag>
  );
}

function MainIntro() {
  return (
    <Box id="intro" as="section" py={{ base: 20, md: 28 }}>
      <Container maxW="7xl">
        <MotionBox variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <Stack spacing={6} align="center" textAlign="center">
            <Heading
              color="green.400"
              fontSize={{ base: '4xl', sm: '6xl', md: '8xl', xl: '9xl' }}
              lineHeight="0.86"
              fontWeight="950"
              textShadow="0 0 34px rgba(0,255,0,0.46)"
              maxW="1120px"
            >
              HEY I'M RAVI BHUSHAN SHARMA
            </Heading>
            <Text color="whiteAlpha.800" fontSize={{ base: 'md', md: 'xl' }} maxW="780px" lineHeight="1.8">
              Transforming ideas into reality with the power of software and futuristic development.
            </Text>
            <Button
              leftIcon={<FaBolt />}
              bg="green.400"
              color="black"
              size="lg"
              borderRadius="full"
              fontWeight="950"
              _hover={{
                bg: 'green.300',
                boxShadow: '0 0 25px 2px rgba(72, 187, 120, 0.4)',
                transform: 'translateY(-5px)',
              }}
            >
              READY FOR TRANSFORMATION
            </Button>
          </Stack>
        </MotionBox>
      </Container>
    </Box>
  );
}

function Ventures() {
  return (
    <Box id="ventures" as="section" py={{ base: 16, md: 24 }}>
      <Container maxW="7xl">
        <MotionBox variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }}>
          <MassiveHeading>VENTURES</MassiveHeading>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            {ventures.map((venture) => {
              const VentureIcon = venture.icon;

              return (
                <HologramCard key={venture.title} minH="380px">
                  <Stack h="100%" spacing={6}>
                    <Flex justify="space-between" align="start">
                      <Icon as={VentureIcon} boxSize={11} color="green.400" filter="drop-shadow(0 0 16px rgba(0,255,0,0.72))" />
                      <Badge colorScheme="green" borderRadius="full" px={3} py={1}>
                        {venture.label}
                      </Badge>
                    </Flex>
                    <Stack spacing={3} flex="1">
                      <Heading color="white" size="xl">
                        {venture.title}
                      </Heading>
                      <Text color="whiteAlpha.700" lineHeight="1.8">
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
                            boxShadow: '0 0 25px 2px rgba(72, 187, 120, 0.4)',
                          }}
                        >
                          {link.label}
                        </Button>
                      ))}
                    </HStack>
                  </Stack>
                </HologramCard>
              );
            })}
          </SimpleGrid>
        </MotionBox>
      </Container>
    </Box>
  );
}

function Projects() {
  return (
    <Box id="projects" as="section" py={{ base: 16, md: 24 }}>
      <Container maxW="7xl">
        <MotionBox variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }}>
          <MassiveHeading>PROJECTS</MassiveHeading>
          <Grid templateColumns={{ base: '1fr', lg: '1.15fr 0.85fr' }} gap={6}>
            {projects.map((project, index) => {
              const ProjectIcon = project.icon;

              return (
                <GridItem key={project.title} rowSpan={{ base: 1, lg: index === 0 ? 2 : 1 }}>
                  <HologramCard h="100%" minH={index === 0 ? '430px' : '250px'}>
                    <Flex direction="column" h="100%" gap={5}>
                      <Icon as={ProjectIcon} boxSize={10} color="green.400" filter="drop-shadow(0 0 16px rgba(0,255,0,0.72))" />
                      <Stack spacing={3} flex="1">
                        <Heading color="white" size={index === 0 ? 'xl' : 'lg'}>
                          {project.title}
                        </Heading>
                        <Text color="whiteAlpha.700" lineHeight="1.75">
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
                        mt="auto"
                        bg="green.400"
                        color="black"
                        borderRadius="full"
                        fontWeight="950"
                        _hover={{
                          bg: 'green.300',
                          boxShadow: '0 0 25px 2px rgba(72, 187, 120, 0.4)',
                        }}
                      >
                        Live Demo
                      </Button>
                    </Flex>
                  </HologramCard>
                </GridItem>
              );
            })}
          </Grid>
        </MotionBox>
      </Container>
    </Box>
  );
}

function Timeline() {
  return (
    <Box id="education" as="section" py={{ base: 16, md: 24 }}>
      <Container maxW="6xl">
        <MotionBox variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }}>
          <MassiveHeading>EDUCATION</MassiveHeading>
          <Box position="relative">
            <Box
              position="absolute"
              top="0"
              bottom="0"
              left={{ base: '18px', md: '50%' }}
              width="4px"
              bg="green.400"
              boxShadow="0 0 10px #48BB78"
              transform={{ base: 'none', md: 'translateX(-50%)' }}
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
                    <Box
                      position="absolute"
                      left={{ base: '10px', md: 'calc(50% - 9px)' }}
                      top="24px"
                      w="20px"
                      h="20px"
                      borderRadius="full"
                      bg="green.400"
                      boxShadow="0 0 18px 4px rgba(72, 187, 120, 0.45)"
                      border="3px solid"
                      borderColor="#050505"
                    />
                    <Box w={{ base: '100%', md: '46%' }}>
                      <HologramCard>
                        <HStack spacing={4} align="start">
                          <Icon as={TimelineIcon} boxSize={7} color="green.400" filter="drop-shadow(0 0 12px rgba(0,255,0,0.72))" />
                          <Stack spacing={1}>
                            <Text color="green.300" fontWeight="900" fontSize="xs" textTransform="uppercase">
                              {item.type}
                            </Text>
                            <Heading color="white" size="md">
                              {item.title}
                            </Heading>
                            <Text color="whiteAlpha.700">{item.meta}</Text>
                          </Stack>
                        </HStack>
                      </HologramCard>
                    </Box>
                  </Flex>
                );
              })}
            </VStack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}

export default function App() {
  return (
    <Box
      minH="100vh"
      bg="#050505"
      color="whiteAlpha.900"
      overflowX="hidden"
      backgroundImage="
        linear-gradient(rgba(0,255,0,0.045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,0,0.045) 1px, transparent 1px),
        radial-gradient(circle at 50% 0%, rgba(0,255,0,0.12), transparent 30%)
      "
      backgroundSize="52px 52px, 52px 52px, 100% 100%"
    >
      <FloatingNav />
      <SplineLanding />
      <MainIntro />
      <Ventures />
      <Projects />
      <Timeline />
    </Box>
  );
}
