export type ProjectCategory = 'ai' | 'saas' | 'web' | 'blockchain';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  challenges: string;
  technologies: string[];
  category: ProjectCategory;
  image: string;
  githubUrl: string | null;
  liveUrl: string | null;
  featured?: boolean;
  /** Short tag list shown on featured cards. */
  highlights?: string[];
  /** One real, verifiable proof point shown on featured cards. */
  proof?: string;
  /** Brand hue of the product, used to tint its card. */
  tint?: string;
  /** Address shown in the card's browser-frame bar. */
  frameUrl?: string;
  /** How results were measured, shown as its own section on the case study. */
  evaluation?: {
    method: string;
    baseline: string;
    baselineError: number;
    results: { label: string; error: number }[];
  };
}

export const categoryLabels: Record<ProjectCategory, string> = {
  ai: 'AI & LLM',
  saas: 'SaaS Platforms',
  web: 'Web Development',
  blockchain: 'Blockchain',
};

export const projects: Project[] = [
  {
    id: 'the-pour-is-right',
    featured: true,
    proof: '$7.96 avg. price error, 63% below baseline',
    tint: '#7a1f3d',
    frameUrl: 'the-pour-is-right · gradio',
    highlights: ['PyTorch', 'Hugging Face', 'LangGraph', 'Qdrant'],
    title: 'The Pour Is Right',
    description: 'LLM wine pricer and deal-hunting agents: QLoRA fine-tuning, RAG with Qdrant, an ensemble, and LangGraph agents that send Telegram alerts.',
    longDescription: `
      My capstone for Ed Donner's AI Engineer Core Track, applied to wine instead of the course's Amazon products.
      Models predict the price of a bottle from its review, and an agent system finds live wine deals and messages me about the best one.

      What it does:
      - Curated 280,000 wine reviews into a 22,000-item dataset, and rewrote every review into a standard summary with an LLM through the Groq Batch API, for about $1
      - Benchmarked traditional ML, neural networks and frontier models (Claude, GPT, Qwen) on the same 200 test wines
      - Fine-tuned Qwen 3 4B with QLoRA on a free Colab T4, cutting its error from $23.15 to $10.10, level with Claude Sonnet 5
      - Served the fine-tuned model as a GPU service on Modal
      - Added RAG with a Qdrant vector store, and combined Claude, the fine-tuned model and a PyTorch network into an ensemble: average error $7.96, 63% below the baseline
      - Built agents that read live deals from WTSO, Last Bottle and HotUKDeals, price them with the ensemble, and send the best to Telegram
      - Wrote the planner as a LangGraph graph with parallel fan-out, conditional routing and human-in-the-loop approval, and wrapped it all in a Gradio app
    `,
    challenges: `
      Engineering challenges along the way:
      - Removing price hints from the review text, so the models judged the wine instead of reading the answer
      - Training on a free T4: bfloat16 ran at 0.08 steps per second, and switching to float16 with float32 adapters made it six times faster
      - Working around a gated base model (Llama) by moving to Qwen, whose tokenizer writes prices one digit at a time
      - Keeping the scanner's descriptions factual: the first version invented tasting notes and let UK deals crowd out the US ones
      - Pricing deals one at a time, because parallel calls made Modal start a new GPU container for each request
    `,
    technologies: ['Python', 'PyTorch', 'Hugging Face Transformers', 'PEFT / QLoRA', 'TRL', 'Qdrant', 'LangGraph', 'OpenAI', 'Claude', 'Groq', 'Modal', 'Gradio', 'scikit-learn', 'XGBoost'],
    category: 'ai',
    image: '/images/projects/wine-pricer.jpg',
    githubUrl: null,
    liveUrl: null,
    evaluation: {
      method: 'Every model prices the same 200 held-out test wines (median price $33). The score is the mean absolute error: the average gap, in dollars, between the predicted and the real price. Lower is better.',
      baseline: 'The baseline is the simplest possible model: always predict the average price of the training wines ($41.72). It is off by $21.71 on average, and every percentage on this page is measured against it.',
      baselineError: 21.71,
      results: [
        { label: 'Qwen 3 4B before fine-tuning', error: 23.15 },
        { label: 'Qwen 3 4B fine-tuned with QLoRA', error: 10.1 },
        { label: 'Claude Sonnet 5, no examples', error: 9.06 },
        { label: 'Claude Sonnet 5 with RAG', error: 8.25 },
        { label: 'Ensemble', error: 7.96 },
      ],
    },
  },
  {
    id: 'logiflow',
    featured: true,
    proof: 'Multi-tenant SaaS · Stripe, M-Pesa & crypto billing',
    tint: '#c2410c',
    frameUrl: 'logi-flow-three.vercel.app',
    highlights: ['Django', 'Next.js', 'PostgreSQL', 'Docker'],
    title: 'LogiFlow',
    description: 'Multi-tenant logistics SaaS platform with inventory, warehousing, production, distribution, billing, and platform admin modules.',
    longDescription: `
      LogiFlow is a production-grade multi-tenant logistics SaaS platform built to serve companies of varying scales.
      Each tenant gets isolated data, custom branding, and role-based access for their teams.

      Key features include:
      - Multi-tenant architecture with full data isolation per company
      - Inventory management with stock tracking, reorder points, and transaction history
      - Warehousing module with stock transfers and approval workflows
      - Production module with orders, steps, and materials tracking
      - Distribution module with real-time route tracking via Leaflet.js and geocoding
      - Billing system with automated trial expiration and recurring billing via Celery
      - Platform Admin module for managing tenants, subscriptions, and system health
      - Prometheus and Grafana monitoring stack

      The backend is built with Django REST Framework and the frontend with Next.js and TypeScript,
      using a services + hooks state management pattern without Redux or Zustand.
    `,
    challenges: `
      Building LogiFlow presented several interesting engineering challenges:
      - Designing a clean multi-tenant architecture that scales without data leakage between tenants
      - Implementing a centralized auth guard architecture using layout.tsx to avoid repetition across pages
      - Fixing a critical auth bug where verifyAuth() hardcoded all role fields to false on token refresh
      - Replacing mock SVG maps with real Leaflet.js maps using dynamic imports to avoid SSR issues
      - Handling HTTP 204 empty responses that caused JSON parse errors in the API layer
      - Building automated billing workflows with Celery including trial expiration and payment reminders
      - Integrating Stripe, M-Pesa, and NOWPayments crypto into a unified billing experience
    `,
    technologies: ['Django', 'Django REST Framework', 'Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Celery', 'Docker', 'Stripe', 'M-Pesa', 'NOWPayments', 'Leaflet.js', 'Prometheus', 'Grafana'],
    category: 'saas',
    image: '/images/projects/logiflow-app.png',
    githubUrl: 'https://github.com/wachira7/LogiFlow',
    liveUrl: 'https://logi-flow-three.vercel.app/',
  },
  {
    id: 'flixvideo',
    featured: true,
    proof: 'Watch parties, AI recommendations, 3 payment gateways',
    tint: '#9333ea',
    frameUrl: 'flix-video-ten.vercel.app',
    highlights: ['Node.js', 'Next.js', 'Redis', 'BullMQ'],
    title: 'FlixVideo',
    description: 'AI-powered movie and TV discovery platform with subscriptions, watch parties, real-time search, and multi-gateway payments.',
    longDescription: `
      FlixVideo is a full-featured AI-powered streaming and movie discovery platform. It combines
      real-time content data from TMDB with AI recommendations and a rich social experience.

      Key features include:
      - AI-powered movie and TV recommendations using Claude AI/OpenAI
      - Real-time search with autocomplete and Redis caching
      - Watch party system with WebSocket-based synchronized playback and live chat
      - Subscription tiers (Free, Basic, Premium) with usage-based feature gating
      - Multi-gateway payment support: Stripe (card), M-Pesa (mobile money), and NOWPayments (crypto)
      - Social features: following, lists, ratings, and reviews with nested comments
      - Admin dashboard with moderation tools, analytics, and user management
      - Background job processing with BullMQ and Redis for async tasks
      - Avatar storage on AWS S3 with presigned URLs
      - Prometheus and Grafana monitoring deployed on Oracle Cloud Free Tier

      The backend is Node.js/Express with a PostgreSQL + MongoDB hybrid database architecture.
      The frontend is Next.js with TypeScript deployed on Vercel, backend on Render.
    `,
    challenges: `
      FlixVideo was built iteratively over several months with many interesting challenges:
      - Migrating from Upstash Redis to Redis Cloud after hitting command limits in production
      - Fixing ERR max number of clients reached by refactoring BullMQ to use two shared IORedis connections
      - Resolving avatar hydration errors using a custom AvatarEventEmitter pattern
      - Fixing PostgreSQL date timezone shifts using ::text and ::date casts
      - Building a complete subscription system with real-time usage tracking across three payment providers
      - Implementing watch party synchronization so all participants stay in sync during playback
      - Setting up Prometheus metrics collection and Grafana dashboards on Oracle Cloud Free Tier VM
    `,
    technologies: ['Node.js', 'Express', 'Next.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Redis', 'BullMQ', 'Stripe', 'M-Pesa', 'NOWPayments', 'AWS S3', 'Socket.io', 'Prometheus', 'Grafana', 'Docker'],
    category: 'saas',
    image: '/images/projects/flix-video.png',
    githubUrl: 'https://github.com/wachira7/Flix-video',
    liveUrl: 'https://flix-video-ten.vercel.app/',
  },
  {
    id: 'logistics-app',
    title: 'Logistics Application',
    description: 'A comprehensive logistics management system with authentication and role-based access control.',
    longDescription: `
      This logistics management system provides core tools for managing shipments, routes, and users.
      It features role-based access control to ensure the right people have the right permissions.

      Key features include:
      - User authentication with JWT
      - Role-based access control (RBAC)
      - Shipment tracking and management
      - Route planning and optimization
      - PostgreSQL database with efficient query design
    `,
    challenges: `
      Key challenges in this project included:
      - Designing a flexible RBAC system that can accommodate different organizational structures
      - Building efficient database queries for logistics data at scale
      - Implementing secure JWT authentication with proper token management
    `,
    technologies: ['Python', 'SQLite', 'PostgreSQL', 'JWT', 'RBAC Security'],
    category: 'web',
    image: '/images/projects/logistics-app.jpg',
    githubUrl: 'https://github.com/Fuata-tech/logistic_management_system',
    liveUrl: 'https://fuata-tech-client.onrender.com/',
  },
  {
    id: 'vehicle-shield-insurance',
    title: 'Vehicle Shield Insurance',
    description: 'Blockchain-based vehicle insurance platform with smart contracts and secure user authentication.',
    longDescription: `
      Vehicle Shield Insurance leverages blockchain technology to create a transparent and secure
      vehicle insurance platform. Smart contracts automate policy management and claims processing.

      Key features include:
      - Smart contract-based policy management on Ethereum
      - Web3 wallet integration for secure transactions
      - Automated claims processing via smart contracts
      - Firebase authentication for user management
      - Next.js frontend with real-time blockchain event listening
    `,
    challenges: `
      Key challenges in this project included:
      - Writing secure Solidity smart contracts to handle financial transactions
      - Integrating Web3.js with a Next.js frontend for wallet connectivity
      - Testing smart contracts thoroughly using Hardhat before deployment
      - Managing blockchain transaction states and handling failures gracefully
    `,
    technologies: ['Solidity', 'Web3.js', 'Next.js', 'Hardhat', 'Firebase Auth'],
    category: 'blockchain',
    image: '/images/projects/vehicle-shield.jpg',
    githubUrl: 'https://github.com/wachira7/vehicle-shield-insurance',
    liveUrl: 'https://vsi-app.vercel.app/',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(id: string) {
  return projects.find((p) => p.id === id);
}
