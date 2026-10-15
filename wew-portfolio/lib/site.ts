export const site = {
  name: 'Emmanuel W. Wachira',
  shortName: 'Emmanuel',
  role: 'Full-Stack & AI Engineer',
  /** Canonical URL for metadata and social previews; override with NEXT_PUBLIC_SITE_URL for a custom domain. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wew-portfolio.vercel.app',
  location: 'Nairobi, KE',
  timeZone: 'Africa/Nairobi',
  email: 'wewaruts@gmail.com',
  github: 'https://github.com/wachira7',
  linkedin: 'https://www.linkedin.com/in/emmanuelwaruts77/',
  resume: '/resume.pdf',
  /** Both numbers take calls, texts and WhatsApp. */
  phones: [
    { display: '+254 705 274 244', tel: '+254705274244', whatsapp: 'https://wa.me/254705274244' },
    { display: '+254 756 126 336', tel: '+254756126336', whatsapp: 'https://wa.me/254756126336' },
  ],
};

export const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Work', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Stack', path: '/tech-stack' },
];
