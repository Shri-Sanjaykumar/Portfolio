// Spidey Engineering Game: Worlds, Levels, DSA Challenges & Boss Battles

export const gameWorlds = [
  {
    id: 'world-1',
    name: 'WORLD 1: AI & RAG SECTOR',
    district: 'CampusLLM Research Hub',
    color: '#00e5ff',
    bgGradient: 'from-[#071926] to-[#040e17]',
    icon: '🤖',
    desc: 'Master Dense Vector Embeddings, Semantic Search, and Context Attribution to build sub-3s AI systems.',
    bossName: 'The Latency Overlord',
    levels: [
      {
        id: 'lvl-1-1',
        title: 'Level 1-1: Semantic Chunking Strategy',
        type: 'concept',
        xpReward: 100,
        coinReward: 25,
        question: 'When chunking university policy documents with structured tables for dense vector embeddings, what is the best strategy?',
        options: [
          'Split purely on 500 characters without overlap',
          'Use sliding window semantic paragraph chunking (400-500 tokens) with 15% overlap and markdown table preservation',
          'Embed the entire 100-page PDF as a single vector',
          'Delete all headers and numbers to reduce vector dimension'
        ],
        correctIndex: 1,
        explanation: 'Sliding window chunking with ~15% overlap ensures boundary context is preserved across splits, while markdown table preservation maintains tabular integrity for cosine similarity retrieval.',
        hint: 'Think about what happens when a sentence spans across two chunk boundaries.'
      },
      {
        id: 'lvl-1-2',
        title: 'Level 1-2: Cosine Similarity Metric',
        type: 'dsa',
        xpReward: 150,
        coinReward: 35,
        question: 'Given query vector Q = [1, 0] and document vector D = [0.8, 0.6], what is their Cosine Similarity score?',
        options: [
          '0.50',
          '0.80',
          '1.40',
          '0.00'
        ],
        correctIndex: 1,
        explanation: 'Cosine Similarity = (Q · D) / (||Q|| * ||D||). Dot product = (1*0.8 + 0*0.6) = 0.8. ||Q|| = 1, ||D|| = sqrt(0.64 + 0.36) = 1. Result = 0.8 / 1 = 0.80.',
        hint: 'Dot product divided by the product of both vector Euclidean norms.'
      },
      {
        id: 'lvl-1-3',
        title: 'Level 1-3: Prompt Shielding & Citation Verification',
        type: 'code',
        xpReward: 200,
        coinReward: 50,
        question: 'Which prompting pattern best prevents LLM hallucination and enforces strict source verification?',
        options: [
          '"Answer creatively using whatever knowledge you find anywhere on the internet."',
          '"Answer strictly based on the provided retrieved context. For every factual claim, cite [Doc ID: Page]. If context lacks the answer, respond with [INFORMATION_NOT_AVAILABLE]."',
          '"Ignore context and predict the next most likely token directly."',
          '"Translate the question to 5 languages before generating output."'
        ],
        correctIndex: 1,
        explanation: 'Strict context bounding with explicit citation syntax and a well-defined fallback refusal token eliminates hallucination in RAG pipelines.',
        hint: 'Look for strict context grounding and required citation tags.'
      },
      {
        id: 'lvl-1-4',
        title: 'BOSS LEVEL: The Latency Overlord (<3.0s RAG Pipeline)',
        type: 'boss',
        xpReward: 350,
        coinReward: 100,
        question: 'The CampusLLM pipeline latency spiked to 6.2s. How do we bring end-to-end response time down to ~3.0s without degrading precision?',
        options: [
          'Switch to CPU-only single thread sequential searching',
          'Implement asynchronous query classification, vector embedding quantization, Top-K cosine caching, and streamed LLM token generation',
          'Remove vector embeddings and use string matching (Ctrl+F)',
          'Increase maximum tokens to 16,000 per request'
        ],
        correctIndex: 1,
        explanation: 'Asynchronous intent routing, embedding quantization, LRU vector cache for frequent campus FAQs, and SSE token streaming reduces perceived user latency to sub-3 seconds.',
        hint: 'Stream tokens and cache repetitive similarity queries!'
      }
    ]
  },
  {
    id: 'world-2',
    name: 'WORLD 2: ENTERPRISE CLOUD & SAP',
    district: 'TForce Enterprise Grid',
    color: '#34c759',
    bgGradient: 'from-[#071f11] to-[#030e07]',
    icon: '⚡',
    desc: 'Architect secure Generative AI Hub workflows, SAP BTP integrations, and high-security enterprise boundaries.',
    bossName: 'The Enterprise Sentinel',
    levels: [
      {
        id: 'lvl-2-1',
        title: 'Level 2-1: Decoupled Enterprise AI Architecture',
        type: 'concept',
        xpReward: 120,
        coinReward: 30,
        question: 'Why should enterprise core ERP logic (e.g. SAP ABAP Cloud) communicate with Generative AI models via decoupled API SDKs rather than direct hardcoded endpoints?',
        options: [
          'It makes the code look longer and harder to understand',
          'It enforces data governance boundaries, allows model hot-swapping without schema refactoring, and ensures audit logging',
          'It bypasses all cloud security firewalls automatically',
          'It forces every query to execute 10 times'
        ],
        correctIndex: 1,
        explanation: 'Decoupling AI models through the SAP Gen AI Hub SDK provides auditability, token rate-limiting, and prevents proprietary ERP schema exposure.',
        hint: 'Consider model changes, security boundaries, and enterprise governance.'
      },
      {
        id: 'lvl-2-2',
        title: 'Level 2-2: Enterprise Vector Cache Eviction',
        type: 'dsa',
        xpReward: 160,
        coinReward: 40,
        question: 'Which data structure achieves O(1) time complexity for both get() and put() operations in an Enterprise Vector Cache?',
        options: [
          'Singly Linked List',
          'Hash Map combined with Doubly Linked List (LRU Cache)',
          'Binary Search Tree',
          'Sorted Array'
        ],
        correctIndex: 1,
        explanation: 'A Hash Map provides O(1) key lookup, while a Doubly Linked List provides O(1) node removal and insertion to maintain access recency order.',
        hint: 'Think about LeetCode 146 (LRU Cache).'
      },
      {
        id: 'lvl-2-3',
        title: 'BOSS LEVEL: The Enterprise Sentinel',
        type: 'boss',
        xpReward: 400,
        coinReward: 120,
        question: 'An enterprise microservice receives 5,000 req/sec. How do you protect downstream SAP BTP AI endpoints from crashing during peak traffic?',
        options: [
          'Disable error handling completely',
          'Implement Redis Token Bucket rate limiting, circuit breaker pattern (Netflix Hystrix/Resilience4j), and asynchronous request queues',
          'Reboot the server every 60 seconds',
          'Store all requests in global memory variables'
        ],
        correctIndex: 1,
        explanation: 'Token Bucket rate limiting throttles excessive bursts, while Circuit Breakers stop cascading failures when external AI model endpoints experience high load.',
        hint: 'Rate limiting + circuit breakers.'
      }
    ]
  },
  {
    id: 'world-3',
    name: 'WORLD 3: ML & TIME-SERIES',
    district: 'Solar Predictive Observatory',
    color: '#ff9500',
    bgGradient: 'from-[#241505] to-[#100802]',
    icon: '☀️',
    desc: 'Harness NASA POWER satellite telemetry, temporal feature engineering, and LSTM recurrent networks.',
    bossName: 'The Solar Flare Titan',
    levels: [
      {
        id: 'lvl-3-1',
        title: 'Level 3-1: Cyclic Time Feature Engineering',
        type: 'code',
        xpReward: 140,
        coinReward: 35,
        question: 'How do you mathematically encode hour-of-day (0-23) so that hour 23 and hour 0 are recognized as adjacent in machine learning models?',
        options: [
          'Normalize as integer between 0 and 23',
          'Transform into sine and cosine coordinates: sin(2π * hour / 24) and cos(2π * hour / 24)',
          'One-hot encode into 24 distinct binary columns',
          'Multiply hour by 100'
        ],
        correctIndex: 1,
        explanation: 'Sine and cosine transformations map cyclic time into a continuous 2D circle where 23:00 and 00:00 have minimal Euclidean distance.',
        hint: 'Trigonometric projection preserves circular continuity.'
      },
      {
        id: 'lvl-3-2',
        title: 'Level 3-2: MAE vs RMSE Error Dynamics',
        type: 'concept',
        xpReward: 180,
        coinReward: 45,
        question: 'When evaluating Solar Energy generation forecasts, why is RMSE more sensitive to extreme prediction errors (e.g. unexpected cloud cover drops) than MAE?',
        options: [
          'RMSE divides by zero',
          'RMSE squares the residuals before averaging, penalizing large outliers disproportionately',
          'MAE only works on negative numbers',
          'RMSE does not use mathematical calculations'
        ],
        correctIndex: 1,
        explanation: 'Because RMSE squares each error (y - y_hat)^2, large errors contribute exponentially more to the loss than smaller ones, making it ideal for detecting catastrophic power grid forecast misses.',
        hint: 'Notice the "S" for Square in Root Mean Squared Error.'
      },
      {
        id: 'lvl-3-3',
        title: 'BOSS LEVEL: The Solar Flare Titan (7-Day LSTM)',
        type: 'boss',
        xpReward: 420,
        coinReward: 130,
        question: 'How do you prevent recurrent LSTM models from overfitting when training on 10 years of atmospheric NASA POWER solar radiation data?',
        options: [
          'Train with learning rate = 100 on 1 epoch',
          'Apply temporal train/val/test splitting (no shuffle), Dropout layers (0.2), Early Stopping on validation loss, and L2 Weight Regularization',
          'Shuffle all timestamps randomly to mix past and future data',
          'Remove all validation data completely'
        ],
        correctIndex: 1,
        explanation: 'Time-series data requires sequential non-shuffled splits to prevent data leakage from the future, combined with Dropout and Early Stopping to generalize reliably.',
        hint: 'Never shuffle time-series data; use temporal splits and dropout.'
      }
    ]
  },
  {
    id: 'world-4',
    name: 'WORLD 4: ALGORITHMS & GRAPHS',
    district: 'FinTrack Settlement Core',
    color: '#ff2d55',
    bgGradient: 'from-[#24060d] to-[#100205]',
    icon: '🕸️',
    desc: 'Minimize cyclic multi-party transactions, optimize graph flows, and conquer classic DSA challenges.',
    bossName: 'The Cycle Specter',
    levels: [
      {
        id: 'lvl-4-1',
        title: 'Level 4-1: Multi-Party Debt Simplification',
        type: 'dsa',
        xpReward: 160,
        coinReward: 40,
        question: 'Alice owes Bob $50, Bob owes Charlie $50, and Charlie owes Alice $50. How many transactions are needed to settle all debts?',
        options: [
          '3 transactions ($50 each)',
          '0 transactions (The net debt of all 3 parties is $0)',
          '6 transactions',
          '1 transaction of $150'
        ],
        correctIndex: 1,
        explanation: 'Net debt = Inflow - Outflow. Alice: -50 + 50 = 0. Bob: -50 + 50 = 0. Charlie: -50 + 50 = 0. All net balances are zero, so 0 transactions are needed!',
        hint: 'Calculate the net balance of each individual person.'
      },
      {
        id: 'lvl-4-2',
        title: 'Level 4-2: Greedy Two-Pointer Settlement Flow',
        type: 'code',
        xpReward: 220,
        coinReward: 60,
        question: 'Given N people with non-zero net balances (Sum = 0), what is the maximum number of transactions required to settle all debts in the worst case?',
        options: [
          'N * (N - 1)',
          'N - 1 transactions',
          '2^N transactions',
          '1 transaction'
        ],
        correctIndex: 1,
        explanation: 'By repeatedly matching the maximum debtor with the maximum creditor, at least one person is fully settled per transaction, guaranteeing total transactions <= N - 1.',
        hint: 'Each transaction eliminates at least one person from the balance sheet.'
      },
      {
        id: 'lvl-4-3',
        title: 'BOSS LEVEL: The Cycle Specter (Graph Optimization)',
        type: 'boss',
        xpReward: 450,
        coinReward: 150,
        question: 'What is the time complexity of finding all cycles in a directed expense graph with V vertices and E edges using Tarjan\'s Strongly Connected Components algorithm?',
        options: [
          'O(V^3)',
          'O(V + E)',
          'O(2^V)',
          'O(E log V)'
        ],
        correctIndex: 1,
        explanation: 'Tarjan\'s algorithm uses depth-first search with low-link values to discover all strongly connected components in linear O(V + E) time.',
        hint: 'Linear DFS traversal.'
      }
    ]
  },
  {
    id: 'world-5',
    name: 'WORLD 5: DEVSECOPS & MULTI-CLOUD',
    district: 'LEGITIFY Security Hub',
    color: '#af52de',
    bgGradient: 'from-[#1b0826] to-[#0d0312]',
    icon: '🛡️',
    desc: 'Enforce repository compliance baselines, orchestrate Docker containers, and harden AWS & Azure clouds.',
    bossName: 'The Cloud Cyber-Fiend',
    levels: [
      {
        id: 'lvl-5-1',
        title: 'Level 5-1: Docker Bridge Network Isolation',
        type: 'concept',
        xpReward: 180,
        coinReward: 45,
        question: 'In a Docker Compose multi-tier app (Frontend, Backend, MongoDB), why should MongoDB NOT expose port 27017 to the host 0.0.0.0?',
        options: [
          'Docker crashes if port numbers are above 1000',
          'Exposing the DB port to 0.0.0.0 makes it accessible to the public internet, whereas an isolated Docker bridge network allows the backend to communicate internally via service name "mongodb" without external port exposure',
          'MongoDB only speaks HTTP',
          'It makes the containers load 5 times slower'
        ],
        correctIndex: 1,
        explanation: 'Principle of Least Privilege: Internal database ports should remain isolated on the user-defined Docker bridge network without binding to host interfaces.',
        hint: 'Internal container DNS vs public internet port binding.'
      },
      {
        id: 'lvl-5-2',
        title: 'Level 5-2: Automated DevSecOps Compliance Gate',
        type: 'code',
        xpReward: 240,
        coinReward: 65,
        question: 'How does LEGITIFY prevent security drift in Git repositories across automated CI/CD pipelines?',
        options: [
          'It sends an email and allows everything to merge',
          'It evaluates repository state (branch protection, secret leaks, admin permissions) against policy-as-code rules, failing the CI pipeline if high-severity violations exist',
          'It deletes the repository automatically',
          'It only runs on weekends'
        ],
        correctIndex: 1,
        explanation: 'Policy-as-code evaluation integrated with CI status checks blocks pull requests that introduce insecure repository configurations or exposed secrets.',
        hint: 'Automated policy evaluation blocking unsafe merges.'
      },
      {
        id: 'lvl-5-3',
        title: 'BOSS LEVEL: The Cloud Cyber-Fiend (Multi-Cloud Deploy)',
        type: 'boss',
        xpReward: 500,
        coinReward: 200,
        question: 'How do you execute a zero-downtime rolling update across dual-cloud microservices on AWS EC2 and Azure VMs?',
        options: [
          'Stop all servers simultaneously and start the new version',
          'Use Nginx / Cloud Load Balancer with health checks, updating instance batches incrementally and switching traffic only after health probe passes (Blue-Green / Canary)',
          'Delete the cloud virtual machines and recreate them manually',
          'Disable DNS resolution worldwide'
        ],
        correctIndex: 1,
        explanation: 'Canary and Blue-Green rolling updates route traffic only to healthy instances passing status probes, ensuring zero dropped user requests.',
        hint: 'Health checks with progressive batch updates.'
      }
    ]
  }
];

export const achievementsList = [
  {
    id: 'ach-first-web',
    title: 'FIRST THWIP!',
    desc: 'Shot your first web in the Sanjaykumar Tracker.',
    icon: '🕸️',
    xpReward: 50
  },
  {
    id: 'ach-rag-master',
    title: 'RAG ARCHITECT',
    desc: 'Defeated The Latency Overlord in World 1.',
    icon: '🤖',
    xpReward: 200
  },
  {
    id: 'ach-cloud-sentinel',
    title: 'ENTERPRISE GUARDIAN',
    desc: 'Conquered TForce Enterprise Grid in World 2.',
    icon: '⚡',
    xpReward: 250
  },
  {
    id: 'ach-solar-prophet',
    title: 'SOLAR PROPHET',
    desc: 'Trained the 7-day predictive LSTM in World 3.',
    icon: '☀️',
    xpReward: 300
  },
  {
    id: 'ach-graph-hero',
    title: 'GRAPH OPTIMIZER',
    desc: 'Broke all cyclic debts in FinTrack World 4.',
    icon: '📊',
    xpReward: 350
  },
  {
    id: 'ach-devsecops-titan',
    title: 'DEVSECOPS TITAN',
    desc: 'Hardened Multi-Cloud clusters in World 5.',
    icon: '🛡️',
    xpReward: 500
  },
  {
    id: 'ach-streak-3',
    title: 'ON FIRE 🔥',
    desc: 'Maintained a 3-challenge correct answer streak.',
    icon: '🔥',
    xpReward: 150
  },
  {
    id: 'ach-all-worlds',
    title: 'GRAND MASTER SPIDEY',
    desc: 'Completed all 5 Engineering Worlds and Bosses.',
    icon: '👑',
    xpReward: 1000
  }
];
