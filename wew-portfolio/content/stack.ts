import type { IconType } from 'react-icons';
import { FaAws, FaCloud, FaDatabase, FaDocker, FaGit, FaNodeJs, FaReact } from 'react-icons/fa';
import {
  SiCelery,
  SiCloudinary,
  SiDjango,
  SiExpress,
  SiFramer,
  SiGithubactions,
  SiGrafana,
  SiHuggingface,
  SiKubernetes,
  SiLangchain,
  SiModal,
  SiMongodb,
  SiOpenai,
  SiPostgresql,
  SiPrometheus,
  SiPython,
  SiPytorch,
  SiRedis,
  SiScikitlearn,
  SiSentry,
  SiSolidity,
  SiSqlite,
  SiStripe,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
  SiYarn,
  SiLeetcode,
} from 'react-icons/si';

export type StackCategory = 'ai' | 'frontend' | 'backend' | 'database' | 'devops' | 'storage' | 'payments' | 'tools';

export interface Technology {
  name: string;
  /** Honest, real-world description: where it was actually used. */
  description: string;
  category: StackCategory;
  /** 0–5, in halves. */
  proficiency: number;
  yearsOfExperience: number;
  icon: IconType;
}

export const stackCategories: { id: 'all' | StackCategory; name: string }[] = [
  { id: 'all', name: 'All Technologies' },
  { id: 'ai', name: 'AI & LLM' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'database', name: 'Databases' },
  { id: 'devops', name: 'DevOps' },
  { id: 'storage', name: 'Storage' },
  { id: 'payments', name: 'Payments' },
  { id: 'tools', name: 'Tools' },
];

export const technologies: Technology[] = [
  // ── AI & LLM ───────────────────────────────────────────
  {
    name: 'LLM APIs',
    description: 'OpenAI, Anthropic Claude, Groq and Hugging Face: prompting, structured outputs, tool calling and batch jobs. Used in The Pour Is Right and FlixVideo.',
    category: 'ai',
    proficiency: 3,
    yearsOfExperience: 0.5,
    icon: SiOpenai,
  },
  {
    name: 'RAG & Vector Databases',
    description: 'Retrieval-augmented generation with Qdrant and Chroma and sentence-transformer embeddings, including filtered search.',
    category: 'ai',
    proficiency: 3,
    yearsOfExperience: 0.5,
    icon: FaDatabase,
  },
  {
    name: 'LangChain / LangGraph',
    description: 'Agent workflows with typed state, conditional routing, parallel fan-out and human-in-the-loop approval.',
    category: 'ai',
    proficiency: 2.5,
    yearsOfExperience: 0.5,
    icon: SiLangchain,
  },
  {
    name: 'Fine-tuning (QLoRA)',
    description: 'Fine-tuned Qwen 3 4B with Hugging Face Transformers, PEFT, TRL and bitsandbytes on a free Colab T4.',
    category: 'ai',
    proficiency: 2.5,
    yearsOfExperience: 0.5,
    icon: SiHuggingface,
  },
  {
    name: 'PyTorch',
    description: 'Trained neural networks for price prediction, including a residual network with a log-price target.',
    category: 'ai',
    proficiency: 2.5,
    yearsOfExperience: 0.5,
    icon: SiPytorch,
  },
  {
    name: 'scikit-learn / XGBoost',
    description: 'Baselines and traditional ML: linear regression, bag-of-words models, random forests and gradient boosting.',
    category: 'ai',
    proficiency: 3,
    yearsOfExperience: 0.5,
    icon: SiScikitlearn,
  },
  {
    name: 'Modal',
    description: 'Serverless GPU deployment of a fine-tuned model, with cached weights and scale-to-zero.',
    category: 'ai',
    proficiency: 2.5,
    yearsOfExperience: 0.5,
    icon: SiModal,
  },

  // ── Frontend ───────────────────────────────────────────
  {
    name: 'React / Next.js',
    description: 'Primary frontend framework — used in production across LogiFlow, FlixVideo, and portfolio.',
    category: 'frontend',
    proficiency: 4,
    yearsOfExperience: 2,
    icon: FaReact,
  },
  {
    name: 'TypeScript',
    description: 'Used throughout all frontend projects for type safety and maintainability.',
    category: 'frontend',
    proficiency: 4,
    yearsOfExperience: 2,
    icon: SiTypescript,
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework used in every project for rapid, consistent UI development.',
    category: 'frontend',
    proficiency: 4.5,
    yearsOfExperience: 2,
    icon: SiTailwindcss,
  },
  {
    name: 'Framer Motion',
    description: 'Used for page transitions and animations in portfolio and frontend projects.',
    category: 'frontend',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: SiFramer,
  },

  // ── Backend ────────────────────────────────────────────
  {
    name: 'Django REST Framework',
    description: 'Primary Python backend framework — built LogiFlow\'s full multi-tenant API with DRF.',
    category: 'backend',
    proficiency: 4,
    yearsOfExperience: 1,
    icon: SiDjango,
  },
  {
    name: 'Python',
    description: 'Core backend language used in Django projects and scripting.',
    category: 'backend',
    proficiency: 3.5,
    yearsOfExperience: 2,
    icon: SiPython,
  },
  {
    name: 'Node.js / Express',
    description: 'Used to build FlixVideo\'s full backend with 100+ REST API endpoints.',
    category: 'backend',
    proficiency: 3.5,
    yearsOfExperience: 1.5,
    icon: FaNodeJs,
  },
  {
    name: 'Celery',
    description: 'Used in LogiFlow for billing (trials, renewals, reminders), late-delivery checks and cleaning up demo sandboxes.',
    category: 'backend',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: SiCelery,
  },
  {
    name: 'BullMQ',
    description: 'Used in FlixVideo for background job processing. Fixed production Redis connection limit issues.',
    category: 'backend',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: SiRedis,
  },
  {
    name: 'Solidity',
    description: 'Used to build Vehicle Shield Insurance smart contracts on Ethereum.',
    category: 'backend',
    proficiency: 2.5,
    yearsOfExperience: 1,
    icon: SiSolidity,
  },

  // ── Databases ──────────────────────────────────────────
  {
    name: 'PostgreSQL',
    description: 'Primary relational database for both LogiFlow and FlixVideo in production.',
    category: 'database',
    proficiency: 3.5,
    yearsOfExperience: 2,
    icon: SiPostgresql,
  },
  {
    name: 'MongoDB',
    description: 'Used in FlixVideo alongside PostgreSQL for flexible document storage.',
    category: 'database',
    proficiency: 3,
    yearsOfExperience: 1.5,
    icon: SiMongodb,
  },
  {
    name: 'Redis',
    description: 'Used for caching, session management, and BullMQ job queues. Migrated to Redis Cloud in production.',
    category: 'database',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: SiRedis,
  },
  {
    name: 'SQLite',
    description: 'Used in early logistics project and local development environments.',
    category: 'database',
    proficiency: 3,
    yearsOfExperience: 2,
    icon: SiSqlite,
  },

  // ── DevOps ─────────────────────────────────────────────
  {
    name: 'Docker',
    description: 'Used to containerize both LogiFlow and FlixVideo with multi-service Docker Compose setups.',
    category: 'devops',
    proficiency: 3.5,
    yearsOfExperience: 1,
    icon: FaDocker,
  },
  {
    name: 'GitHub Actions',
    description: 'Primary CI/CD tool — built production pipelines for LogiFlow (Northflank) and FlixVideo (Render).',
    category: 'devops',
    proficiency: 3.5,
    yearsOfExperience: 1.5,
    icon: SiGithubactions,
  },
  {
    name: 'AWS',
    description: 'AWS Certified (Cloud Architecting + Cloud Foundations). Used S3 for file storage in production.',
    category: 'devops',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: FaAws,
  },
  {
    name: 'Prometheus',
    description: 'Deployed on Oracle Cloud Free Tier for metrics collection across FlixVideo and LogiFlow.',
    category: 'devops',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: SiPrometheus,
  },
  {
    name: 'Grafana',
    description: 'Used alongside Prometheus for visualizing production metrics and dashboards.',
    category: 'devops',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: SiGrafana,
  },
  {
    name: 'Kubernetes',
    description: 'Actively learning with Andela program. Practiced K3s deployments with Prometheus/Grafana stacks.',
    category: 'devops',
    proficiency: 2.5,
    yearsOfExperience: 1,
    icon: SiKubernetes,
  },
  {
    name: 'Terraform',
    description: 'Used for infrastructure as code in DevOps learning track.',
    category: 'devops',
    proficiency: 2.5,
    yearsOfExperience: 1,
    icon: SiTerraform,
  },

  {
    name: 'Oracle Cloud',
    description: 'Deployed Prometheus + Grafana monitoring stack for FlixVideo on Oracle Cloud Free Tier VM (Ubuntu 22.04) via Docker Compose.',
    category: 'devops',
    proficiency: 2.5,
    yearsOfExperience: 1,
    icon: FaCloud,
  },

  // ── Payments & Storage ─────────────────────────────────
  {
    name: 'Stripe',
    description: 'Integrated in both LogiFlow and FlixVideo for card payments and subscription billing.',
    category: 'payments',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: SiStripe,
  },
  {
    name: 'M-Pesa (Daraja API)',
    description: 'Integrated Safaricom M-Pesa STK Push for mobile payments in both platforms.',
    category: 'payments',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: FaNodeJs,
  },
  {
    name: 'Cloudinary',
    description: 'Used in LogiFlow for profile picture and company logo uploads.',
    category: 'storage',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: SiCloudinary,
  },
  {
    name: 'AWS S3',
    description: 'Used in FlixVideo for avatar and media file storage with presigned URLs.',
    category: 'storage',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: FaAws,
  },
  {
    name: 'Sentry',
    description: 'Error tracking and monitoring for production applications.',
    category: 'storage',
    proficiency: 2.5,
    yearsOfExperience: 1,
    icon: SiSentry,
  },

  // ── Tools ──────────────────────────────────────────────
  {
    name: 'Git / GitHub',
    description: 'Daily driver for version control across all projects.',
    category: 'tools',
    proficiency: 4,
    yearsOfExperience: 2,
    icon: FaGit,
  },
  {
    name: 'Yarn',
    description: 'Preferred package manager for all JavaScript/TypeScript projects.',
    category: 'tools',
    proficiency: 3.5,
    yearsOfExperience: 2,
    icon: SiYarn,
  },
  {
    name: 'Express',
    description: 'Used as the web framework for the FlixVideo Node.js backend.',
    category: 'tools',
    proficiency: 3.5,
    yearsOfExperience: 1.5,
    icon: SiExpress,
  },
];

export const learning: { name: string; description: string; icon: IconType }[] = [
  {
    name: 'Kubernetes (Advanced)',
    description: 'Deepening K8s knowledge through Andela\'s program — multi-cluster deployments, RBAC, Helm charts, and production-grade orchestration.',
    icon: SiKubernetes,
  },
  {
    name: 'React Native',
    description: 'Building the FlixVideo mobile app with React Native — currently in planning phase after the web platform is complete.',
    icon: FaReact,
  },
  {
    name: 'LeetCode / DSA',
    description: 'Practicing data structures and algorithms in preparation for software engineering job applications.',
    icon: SiLeetcode,
  },
];
