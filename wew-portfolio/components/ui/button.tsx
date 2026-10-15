// components/ui/button.tsx
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'white';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  /** Icon shown after the label, e.g. an arrow that nudges on hover. */
  trailingIcon?: React.ReactNode;
  href?: string;
  external?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-fg hover:brightness-110',
  secondary: 'bg-surface-2 text-fg hover:bg-surface-2/70',
  outline: 'border border-line/15 bg-transparent text-fg hover:border-line/30 hover:bg-line/[0.03]',
  ghost: 'bg-transparent text-muted hover:bg-line/[0.04] hover:text-fg',
  link: 'bg-transparent p-0 text-accent hover:underline underline-offset-4',
  white: 'bg-fg text-bg hover:bg-fg/90',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'gap-1.5 px-3 py-1.5 text-xs',
  md: 'gap-2 px-4 py-2.5 text-sm',
  lg: 'gap-2.5 px-6 py-3.5 text-sm',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  trailingIcon,
  href,
  external = false,
  className = '',
  ...props
}: ButtonProps) {
  const classes = cn(
    'group inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 ease-out active:scale-[0.98]',
    variantStyles[variant],
    variant !== 'link' && sizeStyles[size],
    fullWidth && 'w-full',
    className
  );

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {trailingIcon && (
        <span className="shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          {trailingIcon}
        </span>
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
