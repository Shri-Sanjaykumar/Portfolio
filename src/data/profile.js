export const profile = {
  name: 'Shri Sanjaykumar V',
  tagline: 'Software Engineering Student',
  positioning: 'Generative AI · Cloud · Full-Stack Development',
  location: 'Vellore, India',
  email: 'v.shrisanjaykumar@gmail.com',
  github: 'https://github.com/Shri-Sanjaykumar',
  linkedin: 'https://www.linkedin.com/in/shri-sanjaykumar-v-588bab28a/',
  resume: '/Shri_Sanjaykumar_V_Resume.pdf',
  images: {
    profile: '/images/profile.jpg',
    profileAlt: '/images/profile-alt.jpg',
    professional: '/images/professional.jpg',
    og: '/images/og-image.jpg',
  },
};

export const education = [
  {
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
];

export const experience = [
  {
    company: 'TForce India Private Limited',
    formerName: 'Formerly Qcloud Tech Private Limited',
    role: 'Academic Intern — Generative AI and SAP Technologies',
    location: 'Chennai, India',
    period: 'May 2026 – July 2026',
    confidential: true,
    responsibilities: [
      'Developed enterprise Generative AI workflows using Python, Jupyter, SAP Generative AI Hub SDK and SAP BTP concepts.',
      'Implemented enterprise RAG workflows using vector search and retrieval-based context generation.',
      'Integrated Generative AI components with backend application workflows.',
      'Gained exposure to API-driven development and SAP ABAP Cloud.',
      'Evaluated AI workflow behavior through Python-based experimentation and iterative testing.',
    ],
    confidentialNote: 'Selected implementation details are omitted where required by confidentiality.',
    tech: ['Python', 'Jupyter', 'SAP Generative AI Hub SDK', 'SAP BTP', 'RAG', 'Vector Search', 'SAP ABAP Cloud'],
  },
];

export const projects = [
  {
    id: '01',
    name: 'LEGITIFY',
    category: 'Security / Application Security / DevSecOps',
    description: 'Security and compliance analysis platform designed to identify repository-level security and configuration risks through automated, policy-based analysis.',
    problem: 'Identifying security and configuration risks across codebases is time-consuming and error-prone when done manually.',
    approach: 'Built an automated platform that applies policy-based analysis to surface repository-level vulnerabilities and misconfigurations.',
    highlights: [
      'Security-focused repository analysis',
      'Automated compliance and risk identification',
      'Policy-based analysis workflows',
      'DevSecOps-aligned design principles',
      'Secure software development practices',
    ],
    tech: ['Python'],
    github: null,
    demo: null,
    featured: false,
    color: '#22d3ee',
  },
  {
    id: '02',
    name: 'CampusLLM',
    category: 'Generative AI / RAG / Full Stack',
    description: 'A personalized university assistant that uses Retrieval-Augmented Generation to deliver source-cited, context-aware answers from university documents.',
    problem: 'University information is scattered across PDFs, portals and documents, making it hard for students to get precise, source-backed answers quickly.',
    approach: 'Built an end-to-end RAG pipeline: document ingestion → vector embedding → semantic retrieval → LLM generation with source citation and web fallback.',
    architecture: {
      stages: [
        { label: 'Documents', desc: 'University PDFs & data ingested' },
        { label: 'Embedding', desc: 'Chunked & vectorised with embeddings' },
        { label: 'Vector Store', desc: 'Stored in a vector database for semantic search' },
        { label: 'Retrieval', desc: 'Semantic search retrieves top-k relevant chunks' },
        { label: 'Generation', desc: 'LLM generates answer with retrieved context' },
        { label: 'Response', desc: 'Source-cited answer with web fallback' },
      ]
    },
    highlights: [
      'End-to-end RAG pipeline',
      'Vector embeddings and semantic search',
      'Intelligent query routing',
      'Source-cited responses',
      'Context-aware generation',
      'Web fallback mechanism',
      '~3s average end-to-end latency',
    ],
    result: 'Approximately 3-second average latency across the end-to-end response pipeline.',
    tech: ['Python', 'Next.js', 'React', 'RAG', 'Vector Search', 'OpenAI API'],
    github: null,
    demo: null,
    featured: true,
    color: '#818cf8',
  },
  {
    id: '03',
    name: 'Solar Energy Forecasting',
    category: 'Machine Learning',
    description: 'End-to-end ML pipeline for solar energy forecasting using weather and satellite data, supporting automated 7-day predictions.',
    problem: 'Solar energy output is highly variable; reliable forecasting is essential for grid planning and efficient energy utilisation.',
    approach: 'Built a complete pipeline from data acquisition (NASA POWER API) through feature engineering, model training, evaluation, and automated forecasting.',
    pipeline: [
      'Data Acquisition (NASA POWER API)',
      'Feature Engineering',
      'Model Training',
      'Evaluation (MAE / RMSE)',
      '7-Day Forecasting',
    ],
    models: ['Linear Regression', 'Random Forest', 'XGBoost', 'Gradient Boosting', 'LSTM'],
    metrics: ['MAE', 'RMSE'],
    highlights: [
      'NASA POWER API integration for weather data',
      'Multiple model comparison',
      'LSTM for temporal sequence learning',
      'MAE and RMSE evaluation',
      'Automated 7-day forecasting output',
    ],
    result: 'Automated 7-day solar energy forecast output across multiple model architectures.',
    tech: ['Python', 'scikit-learn', 'XGBoost', 'LSTM', 'NASA POWER API', 'Pandas', 'NumPy'],
    github: null,
    demo: null,
    featured: false,
    color: '#fbbf24',
  },
  {
    id: '04',
    name: 'FinTrack',
    category: 'Full Stack / Finance / Algorithms',
    description: 'Personal finance and group settlement platform with graph-based debt optimisation, real-time sync, and AI-powered financial insights.',
    problem: 'Tracking shared expenses across groups is complex and error-prone, particularly when settling overlapping debts.',
    approach: 'Designed a modular full-stack system with graph algorithms for debt simplification, real-time Firebase sync, and natural-language insights via OpenAI.',
    architecture: 'Frontend (React) → Backend (Node.js/Express REST API) → Firebase Realtime Database → AI Analysis (OpenAI API)',
    highlights: [
      'Graph-based debt settlement algorithm',
      'Real-time synchronisation via Firebase',
      'Modular backend with fault isolation',
      'Multi-user transaction management',
      'Spending pattern analysis',
      'Natural-language financial insights (OpenAI)',
    ],
    tech: ['Python', 'React', 'Node.js', 'Firebase', 'REST APIs', 'Graph Algorithms', 'OpenAI API'],
    github: null,
    demo: null,
    featured: false,
    color: '#34d399',
  },
  {
    id: '05',
    name: 'Cloud-Based Scalable Architecture',
    category: 'Cloud / DevOps / Distributed Systems',
    description: 'Multi-cloud engineering project designing and deploying a containerised, microservices-ready application across AWS EC2 and Microsoft Azure.',
    problem: 'Building cloud-agnostic, containerised deployments that can run reliably across multiple cloud environments with proper security configuration.',
    approach: 'Designed and deployed a containerised system using Docker Compose, deployed to both AWS EC2 and Azure VM, with proper network security group configuration and SSH-secured access.',
    stack: [
      { layer: 'Frontend', tech: 'React' },
      { layer: 'Backend', tech: 'Node.js / Express' },
      { layer: 'Database', tech: 'MongoDB' },
      { layer: 'Containers', tech: 'Docker / Docker Compose' },
      { layer: 'Cloud A', tech: 'AWS EC2 + Security Groups' },
      { layer: 'Cloud B', tech: 'Azure VM + NSG' },
      { layer: 'Access', tech: 'SSH + CI/CD' },
    ],
    highlights: [
      'Multi-cloud deployment (AWS + Azure)',
      'Docker Compose orchestration',
      'Network security group configuration',
      'SSH-secured access and deployment',
      'Microservices-aligned architecture',
      'CI/CD pipeline integration',
    ],
    tech: ['AWS EC2', 'Microsoft Azure', 'Docker', 'Docker Compose', 'Linux', 'Microservices', 'CI/CD'],
    github: null,
    demo: null,
    featured: false,
    color: '#f472b6',
  },
];

export const skills = {
  Languages: ['Python', 'Java', 'C++', 'C', 'JavaScript', 'TypeScript', 'SQL', 'PHP'],
  'Computer Science': [
    'Data Structures & Algorithms', 'Graph Algorithms', 'Object-Oriented Programming',
    'Design Patterns', 'Concurrency', 'Multithreading', 'System Design',
  ],
  'Software Engineering': [
    'Software Architecture', 'REST APIs', 'Microservices', 'Backend Development',
    'SDLC', 'Agile / Scrum', 'CI/CD', 'Software Testing', 'Git / GitHub',
  ],
  'Cloud & DevOps': [
    'Microsoft Azure', 'Azure VMs', 'Azure IaaS', 'Azure NSG',
    'AWS EC2', 'Docker', 'Docker Compose', 'Linux', 'SSH', 'Cloud Infrastructure',
  ],
  'Generative AI & ML': [
    'Generative AI', 'Large Language Models', 'RAG', 'Vector Embeddings',
    'Semantic Search', 'Prompt Engineering', 'OpenAI API', 'SAP Generative AI Hub SDK',
    'scikit-learn', 'XGBoost', 'LSTM', 'Random Forest',
  ],
  'Web & Data': [
    'React', 'Next.js', 'Node.js', 'Express.js', 'Firebase', 'MongoDB',
    'Tailwind CSS', 'Pandas', 'NumPy', 'Matplotlib',
  ],
  'Enterprise Technologies': [
    'SAP BTP', 'SAP ABAP Cloud', 'Jupyter', 'Enterprise AI Workflows', 'Backend Integration',
  ],
};

export const leadership = [
  {
    org: 'VIT Health Club',
    role: 'Vice Chairperson & Core Member',
    period: '2025 – Present',
    achievements: [
      'Directed execution of the Hack the Hospital hackathon with 200+ participants.',
      'Coordinated cross-functional teams, technical workshops, timelines, and deliverables.',
    ],
  },
  {
    org: 'Riviera & Gravitas Tech Festivals',
    role: 'Sponsorship Lead',
    period: '2025 – 2026',
    achievements: [
      'Managed external stakeholder communication and negotiations.',
      'Secured INR 60+ lakhs in non-monetary sponsorships.',
      'Coordinated deliverables across two 1,000+ attendee festivals.',
    ],
  },
];

export const engineeringPrinciples = [
  {
    number: '01',
    title: 'Understand the Problem',
    description: 'Before writing a single line of code, I define the problem clearly, identify constraints, and understand what success actually looks like for the end user.',
  },
  {
    number: '02',
    title: 'Design the System',
    description: 'I sketch the architecture before coding — identifying components, interfaces, data flows, and potential failure points. Good systems are designed, not discovered.',
  },
  {
    number: '03',
    title: 'Build the Core',
    description: 'I focus on the critical path first: the essential logic that makes the product work. Clean code, clear separation of concerns, and minimal surface area.',
  },
  {
    number: '04',
    title: 'Test & Optimise',
    description: 'I evaluate against real metrics — latency, accuracy, correctness — and iterate until the system performs reliably under expected conditions.',
  },
  {
    number: '05',
    title: 'Ship & Iterate',
    description: 'I ship working software and improve iteratively. A useful system delivered is more valuable than a perfect system that never ships.',
  },
];
