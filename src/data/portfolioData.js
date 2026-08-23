// Centralized Portfolio Data for SANJAYKUMAR // TRACKER

export const profile = {
  name: 'SHRI SANJAYKUMAR V',
  handle: '@shri_sanjaykumar',
  tagline: 'Software Engineering Student',
  positioning: 'Software Engineering Student | Generative AI | Cloud | Full-Stack Development',
  location: 'Vellore, India',
  email: 'v.shrisanjaykumar@gmail.com',
  github: 'https://github.com/Shri-Sanjaykumar',
  linkedin: 'https://www.linkedin.com/in/shri-sanjaykumar-v-588bab28a/',
  resumeUrl: '/resume/Shri_Sanjaykumar_V_Resume.pdf',
  images: {
    profile: '/images/profile.jpg',
    profileAlt: '/images/profile-alt.jpg',
    professional: '/images/professional.jpg',
    og: '/images/og-image.jpg',
  },
  bio: 'Software Engineering student focused on building intelligent, scalable and practical software systems across Generative AI, cloud computing, backend engineering, full-stack development and machine learning.',
  education: {
    institution: 'Vellore Institute of Technology',
    degree: 'M.Tech Integrated in Software Engineering',
    period: 'Aug 2023 – Present',
    cgpa: '9.12 / 10.0',
    graduation: 'Expected 2028',
    coursework: [
      'Data Structures and Algorithms',
      'Object-Oriented Programming',
      'Software Engineering',
      'Computer Networks',
      'Operating Systems',
      'Database Management Systems',
      'Cloud Computing',
      'Machine Learning',
      'Statistics and Probability',
    ],
  },
};

export const trackerNodes = [
  {
    id: 'node-campusllm',
    name: 'CampusLLM',
    codename: 'MISSION // CAMPUS-RAG',
    category: 'AI & RAG',
    type: 'project',
    status: 'CONFIRMED',
    icon: 'spider-green',
    lat: 12.9692,
    lng: 79.1559,
    region: 'VIT Vellore / Cloud Pipeline',
    year: '2026',
    date: 'AUG 18, 2026',
    shortDesc: 'Personalized university assistant utilizing Retrieval-Augmented Generation to deliver source-cited answers from university documents.',
    thumbnail: '/images/profile.jpg',
    featured: true,
    result: '~3.0s Average End-to-End Latency',
    tech: ['Python', 'Next.js', 'React', 'RAG', 'Vector Search', 'OpenAI API'],
    problem: 'University academic policies, syllabus data, and campus guidelines are scattered across fragmented PDFs and portals, creating friction for students seeking fast, reliable, source-backed answers.',
    solution: 'Engineered an end-to-end RAG architecture with document ingestion, chunking, dense vector embeddings, intelligent query classification, cosine semantic search, LLM context generation, and dynamic web fallback.',
    architecture: [
      { step: '01', title: 'Document Ingestion', desc: 'University PDFs, handbooks & portals ingested and sanitized.' },
      { step: '02', title: 'Embedding Pipeline', desc: 'Text chunked into semantic units & vectorized into dense embeddings.' },
      { step: '03', title: 'Vector Store & Index', desc: 'Indexed in low-latency vector database for similarity search.' },
      { step: '04', title: 'Semantic Retrieval', desc: 'Top-k nearest neighbor search with query-intent reranking.' },
      { step: '05', title: 'Context-Augmented LLM', desc: 'Context-injected prompt synthesis with strict source attribution.' },
      { step: '06', title: 'Verified Output', desc: 'Delivered in ~3s with verifiable citation markers.' }
    ],
    highlights: [
      'Dense vector embeddings & cosine semantic similarity',
      'Context-aware answer generation with exact source citations',
      'Intelligent intent routing & fallback mechanisms',
      'Engineered for 3-second average response time across the pipeline'
    ]
  },
  {
    id: 'node-tforce',
    name: 'TForce India (Qcloud Tech)',
    codename: 'INTEL // ENTERPRISE-GENAI',
    category: 'EXPERIENCE',
    type: 'experience',
    status: 'CONFIRMED',
    icon: 'spider-green',
    lat: 13.0827,
    lng: 80.2707,
    region: 'Chennai, Tamil Nadu, India',
    year: '2026',
    date: 'MAY 2026 – JUL 2026',
    shortDesc: 'Academic Intern — Generative AI & SAP Technologies. Enterprise RAG workflows and SAP BTP backend integration.',
    thumbnail: '/images/profile-alt.jpg',
    featured: true,
    confidential: true,
    confidentialNote: 'Selected implementation details are omitted where required by company confidentiality.',
    tech: ['Python', 'Jupyter', 'SAP Generative AI Hub SDK', 'SAP BTP', 'RAG', 'Vector Search', 'SAP ABAP Cloud'],
    problem: 'Enterprise business workflows require contextual AI reasoning over proprietary enterprise schemas without violating data governance or performance constraints.',
    solution: 'Developed enterprise Generative AI workflows with Python and SAP Generative AI Hub SDK on SAP BTP, implementing retrieval-augmented generation and backend service integration.',
    highlights: [
      'Developed enterprise Generative AI workflows using Python & SAP Gen AI Hub SDK',
      'Implemented enterprise RAG workflows using vector search & context generation',
      'Integrated Gen AI components with backend application workflows',
      'Gained exposure to API-driven architecture and SAP ABAP Cloud',
      'Evaluated AI behavior through systematic Python-based experimentation'
    ]
  },
  {
    id: 'node-mumbai-sighting',
    name: 'Mumbai Tech Hub Mission',
    codename: 'MISSION // MUMBAI-CORRIDOR',
    category: 'FULL STACK',
    type: 'project',
    status: 'CONFIRMED',
    icon: 'spider-green',
    lat: 19.0760,
    lng: 72.8777,
    region: 'Bandra East / Kurla, Mumbai, India',
    year: '2026',
    date: 'AUG 11, 2026',
    shortDesc: 'Real-time high-throughput API gateway and event streaming architecture handling distributed client transmissions.',
    thumbnail: '/images/og-image.jpg',
    featured: false,
    tech: ['Node.js', 'Express', 'WebSockets', 'Redis', 'Docker'],
    problem: 'High concurrency mobile client requests create network congestion and uneven load distribution.',
    solution: 'Engineered an asynchronous event queue with Redis caching and WebSocket synchronization.',
    highlights: [
      'Sub-50ms message propagation across active client instances',
      'Fault-tolerant WebSocket connection recovery and state replay',
      'Rate-limited endpoints protecting backend compute resources'
    ]
  },
  {
    id: 'node-legitify',
    name: 'LEGITIFY',
    codename: 'DEFENSE // REPO-SECURITY',
    category: 'SECURITY',
    type: 'project',
    status: 'CONFIRMED',
    icon: 'spider-green',
    lat: 37.7749,
    lng: -122.4194,
    region: 'San Francisco, CA, USA',
    year: '2026',
    date: 'JUL 14, 2026',
    shortDesc: 'Security and compliance analysis platform designed to identify repository-level security and configuration risks.',
    thumbnail: '/images/professional.jpg',
    featured: false,
    tech: ['Python', 'DevSecOps', 'Static Analysis', 'Security Policies', 'Git Hook Integration'],
    problem: 'Manual inspection of repository permissions, branch protections, secrets policies, and CI configurations is slow and prone to security drift.',
    solution: 'Engineered an automated security analysis tool in Python that evaluates repository state against compliance baselines and security policies, flagging misconfigurations.',
    highlights: [
      'Repository-level security and configuration risk identification',
      'Policy-based automated rule evaluation',
      'Alignment with DevSecOps and secure software development principles',
      'Structured audit reporting and actionable risk classification'
    ]
  },
  {
    id: 'node-solar',
    name: 'Solar Energy Forecasting',
    codename: 'ML // SOLAR-PREDICT',
    category: 'MACHINE LEARNING',
    type: 'project',
    status: 'CONFIRMED',
    icon: 'spider-green',
    lat: 28.6139,
    lng: 77.2090,
    region: 'New Delhi / Atmospheric Satellite Grid',
    year: '2026',
    date: 'JUN 28, 2026',
    shortDesc: 'End-to-end machine learning pipeline for solar energy generation forecasting using satellite weather data and temporal modeling.',
    thumbnail: '/images/profile.jpg',
    featured: false,
    result: 'Automated 7-Day Forecasting Output',
    tech: ['Python', 'scikit-learn', 'XGBoost', 'LSTM', 'NASA POWER API', 'Pandas', 'NumPy'],
    problem: 'Solar energy generation is stochastic and dependent on atmospheric weather dynamics, requiring multi-step temporal forecasting for grid reliability.',
    solution: 'Built a modular ML pipeline acquiring historical and solar radiation data from NASA POWER API, engineered temporal features, and trained comparative models (Linear Regression, Random Forest, XGBoost, Gradient Boosting, LSTM).',
    highlights: [
      'Automated satellite & weather data acquisition from NASA POWER API',
      'Engineered cyclic time features, irradiance lag, and weather metrics',
      'Compared tree-based ensembles against recurrent LSTM architectures',
      'Evaluated performance using MAE and RMSE metrics for 7-day projections'
    ]
  },
  {
    id: 'node-fintrack',
    name: 'FinTrack',
    codename: 'ALGO // GROUP-FINANCE',
    category: 'FULL STACK',
    type: 'project',
    status: 'CONFIRMED',
    icon: 'spider-green',
    lat: 51.5074,
    lng: -0.1278,
    region: 'London, UK / Global Finance Cloud',
    year: '2026',
    date: 'MAY 10, 2026',
    shortDesc: 'Personal finance and group settlement platform featuring graph-based debt optimization, real-time sync, and natural-language AI insights.',
    thumbnail: '/images/profile-alt.jpg',
    featured: false,
    tech: ['Python', 'React', 'Node.js', 'Firebase', 'REST APIs', 'Graph Algorithms', 'OpenAI API'],
    problem: 'Multi-party shared expenses create complex debt cycles that are difficult to settle efficiently and lack actionable spending insights.',
    solution: 'Developed a full-stack platform using graph min-cost flow algorithms to simplify multi-party debt cycles, Firebase for real-time state sync, and OpenAI API for natural language financial analysis.',
    highlights: [
      'Graph-based debt settlement algorithm minimizing total transactions',
      'Real-time multi-user synchronization via Firebase Realtime Database',
      'Modular architecture with clean fault isolation and REST API design',
      'Natural-language spending pattern insights powered by OpenAI API'
    ]
  },
  {
    id: 'node-cloud',
    name: 'Cloud-Based Scalable Architecture',
    codename: 'INFRA // MULTI-CLOUD',
    category: 'CLOUD & DEVOPS',
    type: 'project',
    status: 'CONFIRMED',
    icon: 'spider-green',
    lat: 47.6062,
    lng: -122.3321,
    region: 'Seattle, WA, USA / Multi-Cloud Cluster',
    year: '2025–2026',
    date: 'DEC 2025',
    shortDesc: 'Containerized multi-cloud infrastructure deploying microservice tiers across AWS EC2 and Microsoft Azure Virtual Machines.',
    thumbnail: '/images/professional.jpg',
    featured: false,
    tech: ['AWS EC2', 'Microsoft Azure', 'Docker', 'Docker Compose', 'Linux', 'Microservices', 'CI/CD', 'Azure NSG'],
    problem: 'Modern systems need cloud-agnostic deployment patterns that can operate reliably across multiple infrastructure providers with secured networking.',
    solution: 'Designed and deployed a containerized architecture with Docker Compose, orchestrating Frontend, Backend, and MongoDB services across AWS EC2 instances and Azure VMs with hardened NSG and Security Group rules.',
    highlights: [
      'Multi-cloud deployment model across AWS EC2 and Microsoft Azure',
      'Container orchestration using Docker Compose with isolated network bridges',
      'Configured Linux host environments, SSH keys, and Network Security Groups',
      'Automated deployment readiness aligned with CI/CD workflows'
    ]
  },
  {
    id: 'node-vit',
    name: 'Vellore Institute of Technology',
    codename: 'ACADEMY // VIT-VELLORE',
    category: 'EDUCATION',
    type: 'education',
    status: 'EDUCATION',
    icon: 'star-blue',
    lat: 12.9692,
    lng: 79.1559,
    region: 'Vellore, Tamil Nadu, India',
    year: '2023–2028',
    date: 'AUG 2023 – PRESENT',
    shortDesc: 'M.Tech Integrated in Software Engineering • CGPA: 9.12/10.0 • Focus on Generative AI, Cloud Systems & Systems Design.',
    thumbnail: '/images/profile.jpg',
    featured: true,
    tech: ['Data Structures & Algorithms', 'Operating Systems', 'Cloud Computing', 'DBMS', 'Networks', 'Machine Learning'],
    highlights: [
      'Academic Record: 9.12 / 10.0 Cumulative Grade Point Average',
      'Degree: M.Tech Integrated in Software Engineering (5-Year Master\'s program)',
      'Core coursework: DSA, System Design, Cloud Computing, ML, OS, Networks, DBMS',
      'Active student leader and technical coordinator for major university initiatives'
    ]
  },
  {
    id: 'node-healthclub',
    name: 'VIT Health Club — Leadership',
    codename: 'LEAD // HACK-THE-HOSPITAL',
    category: 'LEADERSHIP',
    type: 'leadership',
    status: 'EVENT',
    icon: 'star-blue',
    lat: 12.9716,
    lng: 77.5946,
    region: 'Vellore / Bangalore Hub',
    year: '2025–PRESENT',
    date: 'FEB 2025',
    shortDesc: 'Vice Chairperson & Core Member • Directed execution of "Hack the Hospital" hackathon with 200+ active participants.',
    thumbnail: '/images/profile-alt.jpg',
    featured: false,
    tech: ['Team Leadership', 'Hackathon Execution', 'Technical Workshops', 'Cross-Functional Coordination'],
    highlights: [
      'Directed execution of the "Hack the Hospital" healthcare hackathon for 200+ participants',
      'Coordinated cross-functional teams spanning judging, technical workshops, logistics and timelines',
      'Facilitated problem statement curation and technical mentor support for participant teams',
      'Demonstrated ownership, strategic planning, and operational execution under tight deadlines'
    ]
  },
  {
    id: 'node-riviera',
    name: 'Riviera & Gravitas Tech Festivals',
    codename: 'LEAD // SPONSORSHIP-LEAD',
    category: 'LEADERSHIP',
    type: 'leadership',
    status: 'EVENT',
    icon: 'star-blue',
    lat: 13.0827,
    lng: 80.2707,
    region: 'Vellore / South Zone',
    year: '2025–2026',
    date: '2025 – 2026',
    shortDesc: 'Sponsorship Lead • Secured INR 60+ Lakhs in non-monetary sponsorships across two 1,000+ attendee university festivals.',
    thumbnail: '/images/professional.jpg',
    featured: false,
    tech: ['Stakeholder Communication', 'Contract Negotiation', 'Sponsorship Management', 'Public Relations'],
    highlights: [
      'Secured INR 60+ Lakhs in non-monetary corporate and brand sponsorships',
      'Led external stakeholder communication and commercial negotiations with brand executives',
      'Coordinated brand deliverables and sponsor activations across two 1,000+ attendee mega-festivals',
      'Built high-impact professional communication, pitch strategy, and closing capabilities'
    ]
  },
  {
    id: 'node-rag-research',
    name: 'Enterprise RAG & Context Routing',
    codename: 'RESEARCH // RAG-OPTIMIZE',
    category: 'AI & RAG',
    type: 'research',
    status: 'RUMORED',
    icon: 'spider-red',
    lat: 1.3521,
    lng: 103.8198,
    region: 'Singapore / APAC AI Lab',
    year: '2026',
    date: 'ONGOING',
    shortDesc: 'Exploratory engineering into adaptive context pruning, hybrid keyword-vector search, and low-latency LLM stream pipelines.',
    thumbnail: '/images/profile.jpg',
    featured: false,
    tech: ['Vector DBs', 'Hybrid Search', 'BM25 + Dense Vectors', 'Reranking Models', 'FastAPI'],
    highlights: [
      'Investigating hybrid lexical + dense vector search ranking algorithms',
      'Low-latency token streaming and memory caching techniques',
      'Evaluation of query embedding quantization and cache hit efficiency'
    ]
  },
  {
    id: 'node-sysdesign-research',
    name: 'Distributed Systems & Concurrency',
    codename: 'RESEARCH // SYSTEM-DESIGN',
    category: 'CLOUD & DEVOPS',
    type: 'research',
    status: 'RUMORED',
    icon: 'spider-red',
    lat: 35.6762,
    lng: 139.6503,
    region: 'Tokyo / East Asia Grid',
    year: '2026',
    date: 'ONGOING',
    shortDesc: 'Deep-dive study and implementation of distributed consensus, message queues, rate limiting, and fault isolation architectures.',
    thumbnail: '/images/profile-alt.jpg',
    featured: false,
    tech: ['System Design', 'Concurrency', 'Multithreading', 'CAP Theorem', 'Load Balancing'],
    highlights: [
      'High-concurrency thread safety & synchronization models in Java & C++',
      'Distributed rate limiting algorithms (Token Bucket, Leaky Bucket)',
      'Designing fault-tolerant service boundaries and circuit breakers'
    ]
  },
  {
    id: 'node-nyc',
    name: 'New York Distributed Cloud Sighting',
    codename: 'MISSION // NYC-GATEWAY',
    category: 'CLOUD & DEVOPS',
    type: 'project',
    status: 'CONFIRMED',
    icon: 'spider-green',
    lat: 40.7128,
    lng: -74.0060,
    region: 'New York City, NY, USA',
    year: '2026',
    date: 'AUG 06, 2026',
    shortDesc: 'High-availability reverse proxy gateway and SSL termination cluster.',
    thumbnail: '/images/professional.jpg',
    featured: false,
    tech: ['Nginx', 'Docker', 'Certbot', 'Linux', 'AWS'],
    highlights: [
      'Automated TLS/SSL renewal pipeline with zero-downtime certificate rotation',
      'Configured HTTP/2 multiplexing and dynamic upstream load balancing'
    ]
  },
  {
    id: 'node-auckland',
    name: 'Auckland Tech Event',
    codename: 'EVENT // EDEN-PARK-SUMMIT',
    category: 'LEADERSHIP',
    type: 'leadership',
    status: 'EVENT',
    icon: 'star-blue',
    lat: -36.8485,
    lng: 174.7633,
    region: 'Auckland, New Zealand',
    year: '2026',
    date: 'AUG 04, 2026',
    shortDesc: 'Global Developer Summit delegate participant representing student engineering innovation.',
    thumbnail: '/images/profile-alt.jpg',
    featured: false,
    tech: ['Technical Presentation', 'Community Building', 'Developer Relations'],
    highlights: [
      'Participated in collaborative open-source sessions and architecture roundtables'
    ]
  }
];

export const activityLog = [
  {
    id: 'act-1',
    nodeId: 'node-campusllm',
    year: '2026',
    category: 'PROJECT',
    badgeType: 'CONFIRMED',
    title: 'CAMPUSLLM — UNIVERSITY RAG ASSISTANT (~3S LATENCY)',
    date: 'AUG 18, 2026',
    summary: 'Built end-to-end RAG assistant for university documents using Python, Next.js, and Vector Search with source citations.'
  },
  {
    id: 'act-2',
    nodeId: 'node-mumbai-sighting',
    year: '2026',
    category: 'PROJECT',
    badgeType: 'CONFIRMED',
    title: 'MUMBAI TECH CORRIDOR — REAL-TIME EVENT BUS DEPLOYED',
    date: 'AUG 11, 2026',
    summary: 'High-throughput event streaming architecture with Redis caching and sub-50ms message propagation.'
  },
  {
    id: 'act-3',
    nodeId: 'node-nyc',
    year: '2026',
    category: 'PROJECT',
    badgeType: 'CONFIRMED',
    title: 'NYC GATEWAY — HIGH AVAILABILITY REVERSE PROXY CLUSTER',
    date: 'AUG 06, 2026',
    summary: 'Zero-downtime Nginx reverse proxy with automated SSL rotation and HTTP/2 stream multiplexing.'
  },
  {
    id: 'act-4',
    nodeId: 'node-auckland',
    year: '2026',
    category: 'LEADERSHIP',
    badgeType: 'EVENT',
    title: 'AUCKLAND GLOBAL DEVELOPER SUMMIT DELEGATE',
    date: 'AUG 04, 2026',
    summary: 'Represented student engineering innovation in open-source AI and scalable web infrastructure roundtables.'
  },
  {
    id: 'act-5',
    nodeId: 'node-tforce',
    year: '2026',
    category: 'EXPERIENCE',
    badgeType: 'CONFIRMED',
    title: 'TFORCE INDIA — ACADEMIC INTERN (GENERATIVE AI & SAP BTP)',
    date: 'JUL 30, 2026',
    summary: 'Developed enterprise Generative AI workflows with SAP Gen AI Hub SDK, vector retrieval, and SAP ABAP Cloud.'
  },
  {
    id: 'act-6',
    nodeId: 'node-legitify',
    year: '2026',
    category: 'PROJECT',
    badgeType: 'CONFIRMED',
    title: 'LEGITIFY — REPOSITORY SECURITY & DEVSECOPS AUDITOR',
    date: 'JUL 14, 2026',
    summary: 'Automated Python security platform analyzing repository-level risks, configuration hygiene, and compliance baselines.'
  },
  {
    id: 'act-7',
    nodeId: 'node-solar',
    year: '2026',
    category: 'PROJECT',
    badgeType: 'CONFIRMED',
    title: 'SOLAR ENERGY FORECASTING — 7-DAY ML & LSTM PIPELINE',
    date: 'JUN 28, 2026',
    summary: 'Acquired NASA POWER satellite data to train and evaluate 5 predictive models with automated 7-day forecast output.'
  },
  {
    id: 'act-8',
    nodeId: 'node-fintrack',
    year: '2026',
    category: 'PROJECT',
    badgeType: 'CONFIRMED',
    title: 'FINTRACK — GRAPH-BASED DEBT SETTLEMENT & AI INSIGHTS',
    date: 'MAY 10, 2026',
    summary: 'Full-stack platform with graph algorithms for multi-party debt reduction, Firebase sync, and OpenAI analysis.'
  },
  {
    id: 'act-9',
    nodeId: 'node-riviera',
    year: '2025–2026',
    category: 'LEADERSHIP',
    badgeType: 'EVENT',
    title: 'RIVIERA & GRAVITAS TECH FESTIVALS — SPONSORSHIP LEAD',
    date: 'MAR 2026',
    summary: 'Negotiated stakeholder partnerships securing INR 60+ Lakhs non-monetary sponsorships across two 1,000+ attendee festivals.'
  },
  {
    id: 'act-10',
    nodeId: 'node-cloud',
    year: '2025',
    category: 'PROJECT',
    badgeType: 'CONFIRMED',
    title: 'MULTI-CLOUD SCALABLE ARCHITECTURE (AWS EC2 + AZURE VM)',
    date: 'DEC 2025',
    summary: 'Docker Compose containerization orchestrating frontend, backend, and DB across AWS and Azure cloud nodes.'
  },
  {
    id: 'act-11',
    nodeId: 'node-healthclub',
    year: '2025',
    category: 'LEADERSHIP',
    badgeType: 'EVENT',
    title: 'VIT HEALTH CLUB — VICE CHAIRPERSON (HACK THE HOSPITAL)',
    date: 'FEB 2025',
    summary: 'Directed execution of healthcare hackathon for 200+ participants with workshops, judging, and deliverable pipelines.'
  },
  {
    id: 'act-12',
    nodeId: 'node-vit',
    year: '2023',
    category: 'EDUCATION',
    badgeType: 'EDUCATION',
    title: 'VELLORE INSTITUTE OF TECHNOLOGY — M.TECH SE (9.12 CGPA)',
    date: 'AUG 2023',
    summary: 'Began 5-Year Integrated Software Engineering Master\'s degree with focus on AI, Cloud, and System Architecture.'
  }
];

export const engineeringWatchItems = [
  {
    id: 'ew-1',
    edition: 'WEB WATCH 1.0',
    title: 'CAMPUSLLM & RAG ARCHITECTURE',
    subtitle: 'High-Density Retrieval & Context Attribution',
    image: '/images/profile.jpg',
    badge: 'AI / RAG',
    desc: 'How I engineered a 3-second end-to-end RAG pipeline using dense vector embeddings, intelligent query classification, and dynamic web fallback to query university policies.',
    bulletPoints: [
      'Vector chunking strategy optimized for tabular and policy data',
      'Cosine similarity ranking with threshold-based query routing',
      'Strict contextual citation prompting preventing hallucination'
    ]
  },
  {
    id: 'ew-2',
    edition: 'WEB WATCH 2.0',
    title: 'ENTERPRISE AI & SAP BTP INTEGRATION',
    subtitle: 'Secure LLM Integration with Enterprise Schemas',
    image: '/images/profile-alt.jpg',
    badge: 'ENTERPRISE AI',
    desc: 'Architecting enterprise-grade Generative AI workflows with the SAP Generative AI Hub SDK, vector retrieval, and SAP ABAP Cloud while maintaining strict confidentiality and security.',
    bulletPoints: [
      'Decoupled orchestration between LLM models and core business logic',
      'Secure vector search context retrieval inside enterprise boundary',
      'Iterative Python-driven behavioral evaluation and latency testing'
    ]
  },
  {
    id: 'ew-3',
    edition: 'WEB WATCH 3.0',
    title: 'SOLAR FORECASTING & TIME-SERIES LSTM',
    subtitle: 'Atmospheric Data Modeling & 7-Day Forecasts',
    image: '/images/professional.jpg',
    badge: 'MACHINE LEARNING',
    desc: 'Designing an end-to-end predictive machine learning pipeline from NASA POWER API satellite data ingestion to LSTM temporal sequence learning evaluated with MAE & RMSE.',
    bulletPoints: [
      'Automated weather data extraction and cyclic feature engineering',
      'Multi-model benchmark: Linear vs Random Forest vs XGBoost vs LSTM',
      'Automated 7-day forecast generation for energy planning'
    ]
  },
  {
    id: 'ew-4',
    edition: 'WEB WATCH 4.0',
    title: 'FINTRACK: GRAPH ALGORITHMS & SETTLEMENT',
    subtitle: 'Minimizing Multi-Party Transaction Flow',
    image: '/images/og-image.jpg',
    badge: 'FULL STACK / ALGO',
    desc: 'How graph algorithms reduce cyclic debts between multiple users into minimal settlement transactions, combined with real-time Firebase sync and OpenAI financial commentary.',
    bulletPoints: [
      'Directed debt graph simplification minimizing payment hops',
      'Firebase Realtime Database state synchronization with fault isolation',
      'Natural-language spending pattern insights synthesized via LLMs'
    ]
  },
  {
    id: 'ew-5',
    edition: 'WEB WATCH 5.0',
    title: 'MULTI-CLOUD HYBRID DEPLOYMENT',
    subtitle: 'Containerized Microservices on AWS & Azure',
    image: '/images/profile.jpg',
    badge: 'CLOUD & DEVOPS',
    desc: 'Orchestrating containerized full-stack services with Docker Compose across AWS EC2 and Microsoft Azure Virtual Machines, configured with custom Network Security Groups.',
    bulletPoints: [
      'Docker Compose orchestration for multi-container services',
      'Hardened Linux hosts, SSH key authentication, and Azure NSG rules',
      'Continuous deployment pipeline setup for microservice updates'
    ]
  }
];

export const socialPosts = [
  {
    id: 'post-1',
    author: 'Shri Sanjaykumar V',
    handle: '@shri_sanjaykumar',
    time: '2H AGO',
    text: 'Building software that solves meaningful problems. Open for Software Engineering, Generative AI, and Full-Stack opportunities for 2026/2027!',
    badge: 'STATUS: ACTIVE'
  },
  {
    id: 'post-2',
    author: 'Shri Sanjaykumar V',
    handle: '@shri_sanjaykumar',
    time: '1D AGO',
    text: 'Completed enterprise Gen AI workflows & RAG integration during my internship at TForce India using Python, SAP Generative AI Hub SDK & SAP BTP concepts.',
    badge: 'EXPERIENCE'
  },
  {
    id: 'post-3',
    author: 'Shri Sanjaykumar V',
    handle: '@shri_sanjaykumar',
    time: '3D AGO',
    text: 'CampusLLM achieved ~3.0 second average latency for university document RAG queries with source-cited precision. Check out the project dossier on the tracker map!',
    badge: 'PROJECT MILESTONE'
  },
  {
    id: 'post-4',
    author: 'Shri Sanjaykumar V',
    handle: '@shri_sanjaykumar',
    time: '1W AGO',
    text: 'Led sponsorship operations securing INR 60+ Lakhs in non-monetary sponsorships across Riviera & Gravitas Tech Festivals (1,000+ attendees). Strong execution takes disciplined teamwork.',
    badge: 'LEADERSHIP'
  }
];

export const skillsCategories = {
  'Languages': ['Python', 'Java', 'C++', 'C', 'JavaScript', 'TypeScript', 'SQL', 'PHP'],
  'Computer Science': [
    'Data Structures & Algorithms',
    'Graph Algorithms',
    'Object-Oriented Programming',
    'Design Patterns',
    'Concurrency & Multithreading',
    'Synchronization',
    'System Design'
  ],
  'Software Engineering': [
    'Software Architecture',
    'REST APIs',
    'Microservices',
    'Backend Development',
    'SDLC (Agile & Scrum)',
    'CI/CD Pipelines',
    'Software Testing & Debugging',
    'Git & GitHub'
  ],
  'Cloud & DevOps': [
    'Microsoft Azure (VMs, IaaS, NSG)',
    'AWS EC2 & Security Groups',
    'Docker & Docker Compose',
    'Linux System Administration',
    'SSH & Cloud Networking',
    'Infrastructure Deployment'
  ],
  'Generative AI & ML': [
    'Generative AI & LLMs',
    'Retrieval-Augmented Generation (RAG)',
    'Vector Embeddings & Vector Search',
    'Semantic Search & Prompt Engineering',
    'OpenAI API Integration',
    'SAP Generative AI Hub SDK',
    'scikit-learn, XGBoost, LSTM',
    'Random Forest & Gradient Boosting'
  ],
  'Web & Data Engineering': [
    'React & Next.js',
    'Node.js & Express.js',
    'Firebase & Realtime Database',
    'MongoDB',
    'Tailwind CSS',
    'Pandas, NumPy, Matplotlib'
  ],
  'Enterprise Technologies': [
    'SAP BTP Concepts',
    'SAP ABAP Cloud Basics',
    'Jupyter Notebooks',
    'Enterprise AI Workflows',
    'Backend API Integration'
  ]
};

export const engineeringPrinciples = [
  {
    number: '01',
    title: 'Understand the Problem',
    tag: 'DEEP DIVE',
    desc: 'Before writing code, I define constraints, user workflows, and success metrics. The best code is the one that directly addresses the root bottleneck.'
  },
  {
    number: '02',
    title: 'Design the System',
    tag: 'ARCHITECTURE',
    desc: 'I map service boundaries, data schemas, vector flows, and failure modes on paper. Systems should be resilient, modular, and easy to maintain.'
  },
  {
    number: '03',
    title: 'Build the Core',
    tag: 'EXECUTION',
    desc: 'I implement the critical path first with clean, idiomatic code, robust error handling, and high-performance algorithms.'
  },
  {
    number: '04',
    title: 'Test & Optimize',
    tag: 'VERIFICATION',
    desc: 'I measure against empirical benchmarks (latency, MAE/RMSE, throughput, security baselines) to ensure reliable real-world behavior.'
  },
  {
    number: '05',
    title: 'Ship & Iterate',
    tag: 'DELIVERY',
    desc: 'I deploy containerized services, monitor outcomes, and continuously refine based on real usage and stakeholder feedback.'
  }
];
