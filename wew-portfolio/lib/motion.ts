// Shared motion tokens so every animation on the site moves the same way.

export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const duration = {
  fast: 0.25,
  base: 0.6,
  slow: 0.9,
};

/** Fade + rise, used for content entering the viewport. */
export const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.out, delay },
  }),
};
