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
  /** One-click, no-sign-up demo of the product, if it has one. */
  demoUrl?: string;
  /** Short "what to try" steps shown next to the demo button. */
  demoGuide?: string[];
  /** One line above the demo guide; defaults to a generic sample-account line. */
  demoIntro?: string;
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
      method: 'Every model prices the same 200 held-out test wines (median price $28). The score is the mean absolute error: the average gap, in dollars, between the predicted and the real price. Lower is better.',
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
    proof: 'Multi-tenant SaaS · live ops board, realtime driver tracking, one-click demo',
    tint: '#0e7c86',
    frameUrl: 'logi-flow-three.vercel.app',
    highlights: ['Django', 'Next.js', 'PostgreSQL', 'WebSockets'],
    title: 'LogiFlow',
    description: 'Multi-tenant logistics SaaS: inventory, warehousing, production, distribution and billing, with a live operations board, realtime driver tracking and a driver app. Try it in one click, no sign-up.',
    longDescription: `
      LogiFlow is a multi-tenant logistics platform for companies that buy, store, make and deliver goods.
      Every company's data is isolated, and all modules share one stock ledger, so a shipment leaving a
      warehouse, a production run using materials or a transfer between depots each moves stock exactly once.

      Key features include:
      - Operations board: every shipment in flight by stage, today's numbers, running routes and an activity feed, updating live over WebSockets
      - Exceptions: late deliveries and failed stops raise exceptions automatically, and each one gets an owner until it's resolved
      - Driver app for phones: start a route, share GPS, navigate and call, capture a signature and photo as proof of delivery, report failed drops
      - Customer tracking page: live ETA and approximate position, without exposing the driver or the full address
      - Fleet: vehicles on a live OpenStreetMap map, with each route's GPS trail
      - Inventory, warehousing and production on one ledger: receiving, stock counts, transfers and material use, with a stock report and reorder list
      - Billing with Stripe, M-Pesa and NOWPayments crypto, with verified callbacks and idempotent payment records
      - Command palette (Ctrl+K) to jump to any record or start a task, and a live overview of the whole business
      - One-click live demo: each visitor gets a private, pre-filled company that's deleted after a day

      The backend is Django REST Framework with Django Channels (daphne) and Celery on Redis; the frontend is
      Next.js and TypeScript. GitHub Actions runs the tests on PostgreSQL before every merge and deploys to
      Northflank and Vercel.
    `,
    challenges: `
      The interesting problems were mostly about correctness under real use:
      - Making stock move exactly once: every movement goes through one service layer with row locks and an append-only ledger, so double clicks, retries and concurrent users can't double-count
      - Catching database-specific bugs before production: a SELECT … FOR UPDATE across an optional join passed every SQLite test but fails on PostgreSQL, so tests now run on PostgreSQL locally and in CI
      - Live updates that survive real networks: WebSockets authenticate with their first message (tokens never sit in URLs), check the frontend's origin, reconnect with backoff, and fall back to polling
      - Driver GPS on flaky mobile data: positions are buffered on the phone and sent in batches, and only fresh positions ever appear on the public tracking page
      - Payments that can't be faked or repeated: M-Pesa and crypto callbacks are verified and payments are recorded idempotently, so a replayed callback can't grant a free upgrade
      - A safe public demo: per-visitor sandboxes seeded through the real services, sandbox rules enforced in the auth layer, and hourly cleanup that respects protected stock history
      - Shipping a 12-PR overhaul safely: stacked pull requests merged one at a time behind CI gates, with each production deploy and migration watched
    `,
    technologies: ['Django', 'Django REST Framework', 'Django Channels', 'Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Celery', 'WebSockets', 'Docker', 'GitHub Actions', 'Stripe', 'M-Pesa', 'NOWPayments', 'Leaflet.js', 'OpenStreetMap', 'Framer Motion', 'Playwright'],
    category: 'saas',
    image: '/images/projects/logiflow-app.png',
    githubUrl: 'https://github.com/wachira7/LogiFlow',
    liveUrl: 'https://logi-flow-three.vercel.app/',
    demoUrl: 'https://logi-flow-three.vercel.app/demo',
    demoIntro: 'No sign-up: the demo gives you a private company full of sample data, just for you, and deletes it after a day.',
    demoGuide: [
      'Open the Ops board to see every shipment by stage; it updates live',
      'Visit Fleet: the demo van moves along its route every minute',
      'Pick up the late delivery under Exceptions and resolve it',
      'Switch to the driver view and deliver a stop with a signature',
      'Open a shipment and its customer tracking link',
      'Press Ctrl+K to search for anything',
    ],
  },
  {
    id: 'flixvideo',
    featured: true,
    proof: 'One-click demo · per-plan AI allowances · payments that grant a plan exactly once',
    tint: '#e8a33d',
    frameUrl: 'flix-video-ten.vercel.app',
    highlights: ['Node.js', 'Next.js', 'PostgreSQL', 'Redis'],
    title: 'FlixVideo',
    description: 'Film and TV discovery that explains itself: AI picks with reasons, where to watch in your country, trailer watch parties and paid plans. Try it in one click, no sign-up.',
    longDescription: `
      FlixVideo helps people decide what to watch tonight. Every recommendation says why it fits, and every
      title shows where it's streaming, for rent or to buy in your country. It doesn't host films: trailers play
      in the app, and it sends you to the service that has the title.

      Key features include:
      - FlixVideo AI: ask for a mood, a runtime or an actor in plain words, and get picks with reasons that link to each title
      - Daily AI allowances by plan (Free 3, Basic 15, Premium 40), resetting at midnight Nairobi time
      - Where to watch: streaming, rental and purchase options by country, from TMDB, with a region setting
      - Watch parties: trailers in sync over Socket.io with live chat and private invite codes
      - Library: watchlist, favourites, ranked lists, ratings and continue watching
      - Plans paid by crypto through NOWPayments, with Stripe and M-Pesa built in and switched on by configuration once they go live
      - Account controls: signed-in devices with per-device sign-out, data export, account deletion, and Privacy and Terms pages
      - Admin dashboard for moderation, users and revenue
      - A cinematic Next.js 16 frontend: Bodoni display type, amber on near-black and scroll-driven motion
      - One-click live demo: each visitor gets a private, pre-filled account that's deleted after a day

      The API is Node.js and Express on Render, with PostgreSQL for accounts, payments and social data,
      MongoDB for AI chats and watch history, and Redis with BullMQ for caching and background jobs. GitHub
      Actions runs the database migrations and then deploys. The frontend is Next.js and TypeScript on Vercel.
    `,
    challenges: `
      The hardest problems were about money, limits and correctness in production:
      - Payments that granted nothing: no success path created a subscription, and the plan lookup read a column that didn't exist, so every user counted as Free. Plans are now granted once per payment, in a transaction with the payment row locked and a unique link, so a repeated callback can't grant twice
      - Test payments that could unlock real plans: M-Pesa sandbox and Stripe test payments "succeed" without money moving. Each method is now checked for live keys, test-mode payments never grant, and checkout shows them as coming soon. Going live is a configuration change
      - An M-Pesa callback that answered "Failed" to every successful payment, because of an undefined variable, and sent a "payment failed" email after successes too
      - Errors after success: adding to the watchlist saved, then a Prometheus label mismatch threw and the user saw an error. Watch parties had the same bug
      - Redis Cloud at 90% of its connection limit: six BullMQ workers each held a blocking connection. Moving every job onto one queue and one worker cut each instance from 9 connections to 3
      - Keeping AI costs predictable: daily allowances sized from the per-message cost, counted only after the AI replies, plus a per-user burst limit
      - A safe public demo: real seeded accounts with sandbox rules enforced in the auth layer, demo emails on the reserved .invalid domain so nothing is ever sent, rate limits and a capacity cap, and hourly cleanup that clears MongoDB before PostgreSQL so no orphaned data is left behind
      - Watch parties that couldn't be created on a fresh database: the status default broke the table's own CHECK constraint
      - Shipping safely: 15 pull requests merged into one release branch, integration-tested against throwaway PostgreSQL, Redis and MongoDB, then deployed once with migrations watched
    `,
    technologies: ['Node.js', 'Express', 'Next.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Redis', 'BullMQ', 'Socket.io', 'Claude API', 'OpenAI', 'TMDB API', 'NOWPayments', 'Stripe', 'M-Pesa', 'AWS S3', 'Tailwind CSS', 'Framer Motion', 'Prometheus', 'Grafana', 'Docker', 'GitHub Actions'],
    category: 'saas',
    image: '/images/projects/flix-video.png',
    githubUrl: 'https://github.com/wachira7/Flix-video',
    liveUrl: 'https://flix-video-ten.vercel.app/',
    demoUrl: 'https://flix-video-ten.vercel.app/demo',
    demoIntro: 'No sign-up: the demo gives you a private account with a watchlist, lists, an AI chat and a watch party ready, and deletes it after a day.',
    demoGuide: [
      'Ask FlixVideo AI for a mood, like "something hopeful under two hours" (3 messages)',
      'Open Library: a watchlist, favourites and two lists are ready',
      'Pick up Dune: Part Two from Continue watching on Home',
      'Open any title to see where it\'s streaming in Kenya',
      'Find the waiting watch party under Watch parties',
      'Watch a trailer from the home screen\'s hero',
    ],
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
