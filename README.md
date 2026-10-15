# wew-portfolio

Personal portfolio of Emmanuel W. Wachira, Full-Stack & AI Engineer: [wew-portfolio.vercel.app](https://wew-portfolio.vercel.app/)

Built with Next.js (App Router), TypeScript, Tailwind CSS and Framer Motion, with a Three.js scene on the homepage. Deployed on Vercel from `main`.

## Pages

- **Home**: introduction and featured projects
- **Projects**: all projects, with a detail page for each
- **Tech Stack**: technologies by category, with honest experience ratings
- **About**: background, experience and certifications
- **Contact**: contact form (EmailJS)

## Running locally

```bash
cd wew-portfolio
yarn install
yarn dev
```

The contact form sends through EmailJS; its service, template and public key are set in `wew-portfolio/components/contact-form.tsx`.
