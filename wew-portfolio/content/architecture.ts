// System diagrams for the case-study pages. Every node and edge is taken from the
// project write-ups in content/projects.ts — nothing here is aspirational.

export type NodeKind = 'client' | 'service' | 'ai' | 'data' | 'external' | 'ops';

export interface ArchNode {
  id: string;
  label: string;
  detail: string;
  kind: NodeKind;
  /** Grid position: column (left → right flow) and row. Halves are allowed. */
  col: number;
  row: number;
}

export interface Architecture {
  title: string;
  summary: string;
  columns: string[];
  nodes: ArchNode[];
  /** [from, to] node ids; requests flow from → to. */
  edges: [string, string][];
}

export const architectures: Record<string, Architecture> = {
  'the-pour-is-right': {
    title: 'Agent pipeline',
    summary:
      'A LangGraph planner fans out to a scanner and an ensemble of three pricers, decides whether a deal is worth it, and notifies me on Telegram.',
    columns: ['Sources', 'Agents', 'Pricing ensemble', 'Data & output'],
    nodes: [
      { id: 'feeds', label: 'Deal feeds', detail: 'WTSO, Last Bottle and HotUKDeals listings', kind: 'external', col: 0, row: 1 },
      { id: 'scanner', label: 'Scanner agent', detail: 'LLM turns raw listings into factual, structured deals', kind: 'ai', col: 1, row: 0.5 },
      { id: 'planner', label: 'LangGraph planner', detail: 'Parallel fan-out, conditional routing, human-in-the-loop approval', kind: 'service', col: 1, row: 1.5 },
      { id: 'qwen', label: 'Fine-tuned Qwen 3 4B', detail: 'QLoRA fine-tune served as a GPU service on Modal', kind: 'ai', col: 2, row: 0 },
      { id: 'rag', label: 'RAG pricer', detail: 'Claude with similar wines retrieved from Qdrant', kind: 'ai', col: 2, row: 1 },
      { id: 'nn', label: 'Neural network', detail: 'PyTorch network, the third voice in the ensemble', kind: 'ai', col: 2, row: 2 },
      { id: 'qdrant', label: 'Qdrant', detail: 'Vector store of wine review embeddings', kind: 'data', col: 3, row: 1 },
      { id: 'telegram', label: 'Telegram alert', detail: 'Best discount found, sent as a message', kind: 'external', col: 3, row: 2 },
      { id: 'gradio', label: 'Gradio app', detail: 'UI to run the agents and resend alerts', kind: 'client', col: 0, row: 2.2 },
    ],
    edges: [
      ['feeds', 'scanner'],
      ['gradio', 'planner'],
      ['scanner', 'planner'],
      ['planner', 'qwen'],
      ['planner', 'rag'],
      ['planner', 'nn'],
      ['rag', 'qdrant'],
      ['planner', 'telegram'],
    ],
  },

  logiflow: {
    title: 'Multi-tenant platform',
    summary:
      'A Next.js client talks to a Django REST API that isolates every tenant’s data, with Celery handling billing in the background and Prometheus watching it all.',
    columns: ['Client', 'API', 'Workers & data', 'Integrations'],
    nodes: [
      { id: 'web', label: 'Next.js app', detail: 'TypeScript, services + hooks state, Leaflet route maps', kind: 'client', col: 0, row: 1 },
      { id: 'api', label: 'Django REST API', detail: 'Multi-tenant, role-based access, central auth guard', kind: 'service', col: 1, row: 1 },
      { id: 'pg', label: 'PostgreSQL', detail: 'Per-tenant isolated data', kind: 'data', col: 2, row: 0 },
      { id: 'celery', label: 'Celery workers', detail: 'Recurring billing, trial expiry, payment reminders', kind: 'service', col: 2, row: 1 },
      { id: 'redis', label: 'Redis', detail: 'Broker for Celery tasks', kind: 'data', col: 2, row: 2 },
      { id: 'pay', label: 'Payments', detail: 'Stripe, M-Pesa and NOWPayments crypto', kind: 'external', col: 3, row: 0.5 },
      { id: 'mon', label: 'Prometheus + Grafana', detail: 'Metrics and dashboards', kind: 'ops', col: 3, row: 1.8 },
    ],
    edges: [
      ['web', 'api'],
      ['api', 'pg'],
      ['api', 'celery'],
      ['celery', 'redis'],
      ['api', 'pay'],
      ['celery', 'pay'],
      ['api', 'mon'],
    ],
  },

  flixvideo: {
    title: 'Streaming discovery platform',
    summary:
      'An Express API backed by PostgreSQL and MongoDB, with Redis caching, BullMQ jobs, WebSocket watch parties and AI recommendations.',
    columns: ['Client', 'API & realtime', 'Data & jobs', 'Services'],
    nodes: [
      { id: 'web', label: 'Next.js app', detail: 'TypeScript, deployed on Vercel', kind: 'client', col: 0, row: 1.5 },
      { id: 'api', label: 'Node / Express API', detail: 'Subscriptions, search, social features, admin; on Render', kind: 'service', col: 1, row: 1 },
      { id: 'ws', label: 'Socket.io', detail: 'Synchronised watch-party playback and live chat', kind: 'service', col: 1, row: 2.2 },
      { id: 'pg', label: 'PostgreSQL', detail: 'Users, subscriptions, usage tracking', kind: 'data', col: 2, row: 0 },
      { id: 'mongo', label: 'MongoDB', detail: 'Reviews, lists and nested comments', kind: 'data', col: 2, row: 1 },
      { id: 'redis', label: 'Redis + BullMQ', detail: 'Search cache and background jobs on shared connections', kind: 'data', col: 2, row: 2 },
      { id: 'ai', label: 'Claude / OpenAI', detail: 'Movie and TV recommendations', kind: 'ai', col: 3, row: 0 },
      { id: 'tmdb', label: 'TMDB', detail: 'Real-time movie and TV data', kind: 'external', col: 3, row: 0.95 },
      { id: 'pay', label: 'Payments', detail: 'Stripe, M-Pesa and NOWPayments crypto', kind: 'external', col: 3, row: 1.9 },
      { id: 's3', label: 'AWS S3', detail: 'Avatar storage with presigned URLs', kind: 'data', col: 3, row: 2.85 },
    ],
    edges: [
      ['web', 'api'],
      ['web', 'ws'],
      ['api', 'pg'],
      ['api', 'mongo'],
      ['api', 'redis'],
      ['api', 'ai'],
      ['api', 'tmdb'],
      ['api', 'pay'],
      ['api', 's3'],
    ],
  },

  'logistics-app': {
    title: 'Role-based logistics API',
    summary: 'A client app authenticates with JWT; every request is checked against role-based permissions before it touches shipment data.',
    columns: ['Client', 'Auth', 'API', 'Data'],
    nodes: [
      { id: 'client', label: 'Client app', detail: 'Shipments, routes and user management', kind: 'client', col: 0, row: 0.5 },
      { id: 'auth', label: 'JWT auth', detail: 'Token issue and validation', kind: 'service', col: 1, row: 0.5 },
      { id: 'api', label: 'Python API', detail: 'RBAC checks on every endpoint', kind: 'service', col: 2, row: 0.5 },
      { id: 'db', label: 'PostgreSQL', detail: 'Shipments, routes and users (SQLite in development)', kind: 'data', col: 3, row: 0.5 },
    ],
    edges: [
      ['client', 'auth'],
      ['auth', 'api'],
      ['api', 'db'],
    ],
  },

  'vehicle-shield-insurance': {
    title: 'On-chain insurance',
    summary: 'Policies and claims live in Solidity smart contracts; the Next.js app signs transactions through the user’s wallet and listens for contract events.',
    columns: ['Client', 'Identity', 'Chain'],
    nodes: [
      { id: 'web', label: 'Next.js app', detail: 'Listens for blockchain events in real time', kind: 'client', col: 0, row: 0.5 },
      { id: 'firebase', label: 'Firebase Auth', detail: 'User accounts', kind: 'external', col: 1, row: 0 },
      { id: 'wallet', label: 'Web3 wallet', detail: 'Web3.js signs policy and claim transactions', kind: 'service', col: 1, row: 1 },
      { id: 'contracts', label: 'Smart contracts', detail: 'Solidity policies and automated claims, tested with Hardhat', kind: 'data', col: 2, row: 1 },
    ],
    edges: [
      ['web', 'firebase'],
      ['web', 'wallet'],
      ['wallet', 'contracts'],
      ['contracts', 'web'],
    ],
  },
};
