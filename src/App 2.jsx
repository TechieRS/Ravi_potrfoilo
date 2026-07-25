import {
  Badge,
  Box,
  Button,
  Container,
  Divider,
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
} from '@chakra-ui/react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
  FiZap,
} from 'react-icons/fi';
import { FaCode, FaJava, FaPython, FaReact } from 'react-icons/fa';
import { SiFastapi, SiSpringboot, SiMysql, SiJavascript } from 'react-icons/si';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const links = [
  { label: 'GitHub', icon: FiGithub, href: 'https://github.com/' },
  { label: 'LinkedIn', icon: FiLinkedin, href: 'https://www.linkedin.com/' },
  { label: 'Email', icon: FiMail, href: 'mailto:ravi@example.com' },
];

const ventures = [
  {
    title: 'Aegis-AI',
    type: 'Open Source',
    icon: FiShield,
    summary:
      'A high-performance "Sidecar" firewall sitting between users and LLMs. Built with Rust, Bytewax, and React/Chakra UI. Features real-time UMAP vector math to detect AI drift and PII redaction.',
    tags: ['Rust', 'Bytewax', 'React', 'Chakra UI', 'UMAP', 'PII Redaction'],
  },
  {
    title: 'Lokmadad',
    type: 'Startup',
    icon: FiZap,
    summary:
      'An independent startup venture. A Chrome extension designed for real-time form validation to prevent submission rejections.',
    tags: ['Chrome Extension', 'Validation', 'Startup', 'Product'],
  },
];

const projects = [
  {
    title: 'Language Translator',
    detail: 'AI-powered tool built with HTML5, CSS3, JavaScript, and the Gemini AI API.',
  },
  {
    title: 'Bank Account Management System',
    detail: 'Console-based system built in C using modular programming and file handling.',
  },
  {
    title: 'Tic Tac Toe Game',
    detail: 'Console-based game focusing on algorithmic logic in C.',
  },
];

const achievements = [
  'Hackathon Winner (Feb 2025): 1st place in Artificial Intelligence Hackathon at IIT Patna.',
  'Smart India Hackathon 2024: Top 20 Team at the school level.',
  'NASA Space Apps Hackathon: Top 15 Finalist (Noida Edition) for space data analysis.',
  'ISRO Hackathon: Participant showcasing space-tech prototypes.',
  'Google Agentic AI Program: Participant building intelligent AI agents.',
];

const skills = [
  { group: 'Languages', items: ['C', 'C++', 'Python', 'JavaScript', 'Java'], icon: FaCode },
  {
    group: 'Core Concepts',
    items: ['Data Structures & Algorithms (DSA)', 'OOP', 'Algorithmic Thinking'],
    icon: FiZap,
  },
  {
    group: 'Web & Frameworks',
    items: ['React', 'FastAPI', 'Spring Boot', 'HTML5', 'CSS3'],
    icon: FaReact,
  },
  { group: 'Tools', items: ['Git', 'GitHub', 'MySQL', 'Visual Studio Code'], icon: SiMysql },
];

const education = [
  'B.Tech in Computer Science and Engineering, Amity University (2025-2029).',
  'Senior Secondary, Sinha Model High School (2023-2024).',
  'Secondary, DAV Public School, Rihandnagar (2021-2022).',
];

const techIcons = [FaPython, SiJavascript, FaJava, FaReact, SiFastapi, SiSpringboot];

function reveal(shouldReduceMotion) {
  return {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-90px' },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  };
}

function CommandGeometry() {
  const shouldReduceMotion = useReducedMotion();
  const points = [
    [8, 20],
    [28, 10],
    [48, 26],
    [68, 12],
    [88, 28],
    [76, 62],
    [54, 48],
    [36, 76],
    [14, 58],
  ];

  return (
    <Box position="absolute" inset="0" overflow="hidden" opacity="0.75" pointerEvents="none">
      <MotionBox
        position="absolute"
        inset={{ base: '-10% -30%', lg: '-18% -12%' }}
        animate={shouldReduceMotion ? {} : { rotate: [0, 1.5, -1.5, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '50% 50%', willChange: 'transform' }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gridLine" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#20F4FF" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#2AF598" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.03" />
            </linearGradient>
          </defs>
          <path
            d="M 8 20 L 28 10 L 48 26 L 68 12 L 88 28 L 76 62 L 54 48 L 36 76 L 14 58 Z"
            fill="none"
            stroke="url(#gridLine)"
            strokeWidth="0.18"
          />
          <path
            d="M 28 10 L 54 48 L 88 28 M 8 20 L 54 48 L 14 58 M 36 76 L 68 12"
            fill="none"
            stroke="#20F4FF"
            strokeOpacity="0.12"
            strokeWidth="0.12"
          />
          {points.map(([cx, cy], index) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={index % 2 === 0 ? 0.75 : 0.52}
              fill={index % 3 === 0 ? '#2AF598' : '#20F4FF'}
              opacity="0.75"
            />
          ))}
        </svg>
      </MotionBox>
    </Box>
  );
}

function Section({ id, eyebrow, title, children }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionBox id={id} as="section" py={{ base: 14, md: 20 }} {...reveal(shouldReduceMotion)}>
      <Container maxW="7xl">
        <Stack spacing={{ base: 8, md: 10 }}>
          <Stack spacing={3} maxW="3xl">
            <Badge
              alignSelf="flex-start"
              colorScheme="cyan"
              variant="outline"
              borderColor="cyan.300"
              color="cyan.200"
              px={3}
              py={1}
              borderRadius="full"
            >
              {eyebrow}
            </Badge>
            <Heading size={{ base: 'xl', md: '2xl' }}>{title}</Heading>
          </Stack>
          {children}
        </Stack>
      </Container>
    </MotionBox>
  );
}

function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Box as="header" position="relative" minH="100vh" overflow="hidden">
      <CommandGeometry />
      <Box
        position="absolute"
        inset="0"
        bg="radial-gradient(circle at 72% 20%, rgba(32,244,255,0.16), transparent 32%), linear-gradient(180deg, rgba(3,7,11,0.6), #03070B 84%)"
      />
      <Container maxW="7xl" position="relative" zIndex="1" pt={{ base: 5, md: 7 }}>
        <Flex as="nav" justify="space-between" align="center" gap={4}>
          <HStack spacing={3}>
            <Box h="10px" w="10px" borderRadius="full" bg="#2AF598" boxShadow="0 0 22px #2AF598" />
            <Text fontWeight="800" letterSpacing="0">RBS</Text>
          </HStack>
          <HStack spacing={{ base: 2, md: 4 }}>
            {links.map((item) => (
              <Button
                key={item.label}
                as={Link}
                href={item.href}
                isExternal
                size={{ base: 'sm', md: 'md' }}
                variant="ghost"
                color="whiteAlpha.900"
                leftIcon={<Icon as={item.icon} />}
                _hover={{ bg: 'whiteAlpha.100', color: 'cyan.200', textDecoration: 'none' }}
              >
                {item.label}
              </Button>
            ))}
          </HStack>
        </Flex>

        <Grid
          minH={{ base: 'calc(100vh - 76px)', lg: 'calc(100vh - 84px)' }}
          templateColumns={{ base: '1fr', lg: '1.05fr 0.95fr' }}
          alignItems="center"
          gap={{ base: 12, lg: 16 }}
          py={{ base: 12, md: 16 }}
        >
          <MotionBox
            initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Stack spacing={7}>
              <Stack spacing={4}>
                <Badge
                  alignSelf="flex-start"
                  color="green.200"
                  border="1px solid"
                  borderColor="green.300"
                  bg="rgba(42,245,152,0.1)"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  Tactical Command Center Portfolio
                </Badge>
                <Heading
                  as="h1"
                  fontSize={{ base: '4xl', sm: '5xl', md: '7xl' }}
                  lineHeight="0.96"
                  maxW="760px"
                >
                  Ravi Bhushan Sharma
                </Heading>
                <Text color="cyan.100" fontSize={{ base: 'lg', md: '2xl' }} fontWeight="700">
                  College Student, Software Developer, and Startup Founder.
                </Text>
              </Stack>

              <Text color="whiteAlpha.800" fontSize={{ base: 'md', md: 'lg' }} maxW="680px">
                Passionate about programming, technology, and continuous learning. I enjoy tackling complex
                challenges and building scalable software solutions.
              </Text>

              <Flex gap={3} flexWrap="wrap">
                <Tag size="lg" bg="whiteAlpha.100" color="whiteAlpha.900">
                  <Icon as={FiPhone} mr={2} />
                  8002355915
                </Tag>
                <Tag size="lg" bg="whiteAlpha.100" color="whiteAlpha.900">
                  <Icon as={FiMapPin} mr={2} />
                  Patna, Bihar, India
                </Tag>
              </Flex>
            </Stack>
          </MotionBox>

          <MotionFlex
            display={{ base: 'none', lg: 'flex' }}
            justify="center"
            animate={shouldReduceMotion ? {} : { y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ willChange: 'transform' }}
          >
            <Box
              w="min(420px, 100%)"
              aspectRatio="1"
              border="1px solid"
              borderColor="cyan.300"
              borderRadius="8px"
              bg="rgba(3, 12, 18, 0.64)"
              boxShadow="0 0 80px rgba(32, 244, 255, 0.16), inset 0 0 60px rgba(42, 245, 152, 0.05)"
              p={8}
            >
              <Stack h="100%" justify="space-between">
                <Text color="green.200" fontSize="sm" fontWeight="800">
                  SYSTEM STATUS: FOUNDER ONLINE
                </Text>
                <SimpleGrid columns={3} spacing={5}>
                  {techIcons.map((item, index) => (
                    <Flex
                      key={index}
                      h="78px"
                      align="center"
                      justify="center"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      bg="whiteAlpha.50"
                      borderRadius="8px"
                    >
                      <Icon as={item} boxSize={8} color={index % 2 ? 'green.200' : 'cyan.200'} />
                    </Flex>
                  ))}
                </SimpleGrid>
                <Text color="whiteAlpha.700" fontSize="sm">
                  AI systems, full-stack tools, algorithms, and product experiments routed through one disciplined
                  command surface.
                </Text>
              </Stack>
            </Box>
          </MotionFlex>
        </Grid>
      </Container>
    </Box>
  );
}

function Ventures() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section id="ventures" eyebrow="Ventures & Open Source" title="High-signal builds with real product intent.">
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
        {ventures.map((venture, index) => (
          <MotionBox
            key={venture.title}
            p={{ base: 6, md: 8 }}
            minH="360px"
            border="1px solid"
            borderColor={index === 0 ? 'cyan.300' : 'green.300'}
            borderRadius="8px"
            bg="linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.026))"
            boxShadow={index === 0 ? '0 24px 90px rgba(32,244,255,0.12)' : '0 24px 90px rgba(42,245,152,0.1)'}
            whileHover={shouldReduceMotion ? {} : { y: -10, scale: 1.01 }}
            transition={{ duration: 0.25 }}
            style={{ willChange: 'transform' }}
          >
            <Stack h="100%" justify="space-between" spacing={8}>
              <Stack spacing={5}>
                <Flex justify="space-between" align="flex-start" gap={4}>
                  <Flex
                    h="54px"
                    w="54px"
                    align="center"
                    justify="center"
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                    borderRadius="8px"
                    bg="blackAlpha.400"
                  >
                    <Icon as={venture.icon} boxSize={7} color={index === 0 ? 'cyan.200' : 'green.200'} />
                  </Flex>
                  <Badge colorScheme={index === 0 ? 'cyan' : 'green'}>{venture.type}</Badge>
                </Flex>
                <Heading size="xl">{venture.title}</Heading>
                <Text color="whiteAlpha.800" fontSize="lg">
                  {venture.summary}
                </Text>
              </Stack>
              <Flex gap={2} wrap="wrap">
                {venture.tags.map((tag) => (
                  <Tag key={tag} bg="whiteAlpha.100" color="whiteAlpha.900">
                    {tag}
                  </Tag>
                ))}
              </Flex>
            </Stack>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Section>
  );
}

function BentoGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section id="projects" eyebrow="Projects & Hackathons" title="A practical build log across AI, C, and space-tech.">
      <Grid templateColumns={{ base: '1fr', lg: 'repeat(6, 1fr)' }} gap={5}>
        {projects.map((project, index) => (
          <GridItem key={project.title} colSpan={{ base: 1, lg: index === 0 ? 3 : 3 }}>
            <MotionBox
              h="100%"
              minH="220px"
              p={6}
              border="1px solid"
              borderColor="whiteAlpha.200"
              borderRadius="8px"
              bg="rgba(255,255,255,0.055)"
              whileHover={shouldReduceMotion ? {} : { y: -8 }}
              transition={{ duration: 0.25 }}
              style={{ willChange: 'transform' }}
            >
              <Stack h="100%" justify="space-between">
                <Stack spacing={4}>
                  <Badge alignSelf="flex-start" colorScheme="cyan">
                    Project
                  </Badge>
                  <Heading size="md">{project.title}</Heading>
                  <Text color="whiteAlpha.800">{project.detail}</Text>
                </Stack>
                <Icon as={FiArrowUpRight} color="cyan.200" boxSize={6} />
              </Stack>
            </MotionBox>
          </GridItem>
        ))}
        <GridItem colSpan={{ base: 1, lg: 6 }}>
          <Box p={{ base: 6, md: 8 }} border="1px solid" borderColor="green.300" borderRadius="8px" bg="blackAlpha.300">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {achievements.map((item) => (
                <HStack key={item} align="flex-start" spacing={3}>
                  <Box mt="2" h="8px" w="8px" flex="0 0 auto" borderRadius="full" bg="green.200" />
                  <Text color="whiteAlpha.850">{item}</Text>
                </HStack>
              ))}
            </SimpleGrid>
          </Box>
        </GridItem>
      </Grid>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="A compact stack for shipping software from idea to interface.">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5}>
        {skills.map((skill) => (
          <Box
            key={skill.group}
            p={6}
            border="1px solid"
            borderColor="whiteAlpha.200"
            borderRadius="8px"
            bg="rgba(255,255,255,0.052)"
          >
            <Stack spacing={5}>
              <HStack>
                <Icon as={skill.icon} color="cyan.200" boxSize={6} />
                <Heading size="sm">{skill.group}</Heading>
              </HStack>
              <Flex gap={2} wrap="wrap">
                {skill.items.map((item) => (
                  <Tag key={item} bg="whiteAlpha.100" color="whiteAlpha.900">
                    {item}
                  </Tag>
                ))}
              </Flex>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Computer science foundations with an engineering trajectory.">
      <VStack align="stretch" spacing={0} border="1px solid" borderColor="whiteAlpha.200" borderRadius="8px" overflow="hidden">
        {education.map((item, index) => (
          <Box key={item}>
            <Flex p={{ base: 5, md: 6 }} align="center" gap={4}>
              <Text color="cyan.200" fontWeight="900">
                0{index + 1}
              </Text>
              <Text color="whiteAlpha.850">{item}</Text>
            </Flex>
            {index < education.length - 1 && <Divider borderColor="whiteAlpha.200" />}
          </Box>
        ))}
      </VStack>
    </Section>
  );
}

function Footer() {
  return (
    <Box as="footer" py={10} borderTop="1px solid" borderColor="whiteAlpha.200">
      <Container maxW="7xl">
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" gap={4}>
          <Text color="whiteAlpha.700">Ravi Bhushan Sharma</Text>
          <HStack spacing={4}>
            {links.map((item) => (
              <Link key={item.label} href={item.href} isExternal color="whiteAlpha.700" _hover={{ color: 'cyan.200' }}>
                <Icon as={item.icon} boxSize={5} />
              </Link>
            ))}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default function App() {
  return (
    <Box minH="100vh" bg="#03070B" color="whiteAlpha.900">
      <Hero />
      <Box bg="linear-gradient(180deg, #03070B, #061014 42%, #03070B)">
        <Ventures />
        <BentoGrid />
        <Skills />
        <Education />
      </Box>
      <Footer />
    </Box>
  );
}
