export type ExperienceType = 'work' | 'education' | 'certification';

export interface Experience {
  year: string;
  month: string;
  title: string;
  subtitle: string;
  type: ExperienceType;
  description: string;
  technologies: string[];
}

export const experience: Experience[] = [
  {
    year: "2026",
    month: "Sep",
    title: "AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents",
    subtitle: "Udemy — Ed Donner",
    type: "certification",
    description: "Completed an 8-week AI engineering course covering LLM APIs, RAG, fine-tuning and agents. Built The Pour Is Right as my capstone: a QLoRA fine-tuned Qwen model served on Modal, RAG with Qdrant, an ensemble, and LangGraph agents that send Telegram alerts.",
    technologies: ["Python", "PyTorch", "Hugging Face", "QLoRA", "RAG", "Qdrant", "LangChain", "LangGraph", "Modal"]
  },
  {
    year: "2025 - Present",
    month: "",
    title: "Full-Stack Developer",
    subtitle: "WaruTech",
    type: "work",
    description: "Building production-grade SaaS platforms and DevOps portfolio projects. Developed LogiFlow (multi-tenant logistics SaaS) and FlixVideo (AI-powered streaming platform), both deployed to production with CI/CD pipelines, monitoring, and multi-gateway payment integrations.",
    technologies: ["Django", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Redis", "Docker", "Celery", "BullMQ", "Stripe", "M-Pesa", "Prometheus", "Grafana"]
  },
  {
    year: "2025",
    month: "Nov",
    title: "DevOps Certification",
    subtitle: "Nairobi DevOps Community",
    type: "certification",
    description: "Completed DevOps certification covering containerization, CI/CD pipelines, cloud infrastructure, and monitoring. Applied skills immediately in production deployments of LogiFlow and FlixVideo.",
    technologies: ["Docker", "CI/CD", "GitHub Actions", "Prometheus", "Grafana", "Linux"]
  },
  {
    year: "2025",
    month: "Jul",
    title: "AWS Academy Graduate — Cloud Architecting",
    subtitle: "Amazon Web Services (AWS)",
    type: "certification",
    description: "Completed AWS Academy Cloud Architecting program, covering advanced cloud architecture patterns, high availability, fault tolerance, and cost optimization across AWS services.",
    technologies: ["AWS", "EC2", "S3", "RDS", "VPC", "IAM", "CloudFormation", "Lambda"]
  },
  {
    year: "2025",
    month: "Jun",
    title: "AWS Academy Graduate — Cloud Foundations",
    subtitle: "Amazon Web Services (AWS)",
    type: "certification",
    description: "Completed AWS Academy Cloud Foundations program, gaining solid understanding of AWS core services, global infrastructure, security, and the Well-Architected Framework.",
    technologies: ["AWS", "Cloud Computing", "Security", "Well-Architected Framework"]
  },
  {
    year: "2025",
    month: "Mar",
    title: "Blockchain & Smart Contract Development",
    subtitle: "3-Month Intensive Program",
    type: "certification",
    description: "Completed comprehensive blockchain development program covering smart contract development, decentralized applications, and Web3 technologies. Built Vehicle Shield Insurance DApp as capstone project.",
    technologies: ["Solidity", "Next.js", "Ether.js", "Web3.js", "Hardhat", "Smart Contracts"]
  },
  {
    year: "2024",
    month: "Nov",
    title: "Software Engineering Certification",
    subtitle: "Moringa School",
    type: "education",
    description: "Completed intensive software engineering bootcamp focused on full-stack web development, covering modern technologies and best practices in software development.",
    technologies: ["Full-Stack Development", "React", "Python", "PostgreSQL", "REST APIs"]
  },
  {
    year: "2020 - 2026",
    month: "",
    title: "Service Engineer",
    subtitle: "KOKO Networks",
    type: "work",
    description: "Managed deployment and maintenance of smart energy infrastructure across Nairobi. Coordinated field operations, troubleshot hardware/software issues, and ensured reliable service delivery for thousands of customers.",
    technologies: ["Field Operations", "IoT Devices", "Infrastructure Management", "Customer Support"]
  },
  {
    year: "2022",
    month: "Aug",
    title: "Google Project Management Certificate",
    subtitle: "Coursera / Google",
    type: "certification",
    description: "Completed Google's Project Management Certificate program covering project planning, risk management, stakeholder communication, agile methodologies, and Scrum frameworks.",
    technologies: ["Project Management", "Agile", "Scrum", "Risk Management", "Stakeholder Communication"]
  },
];

export const certifications = experience.filter((e) => e.type === 'certification');
