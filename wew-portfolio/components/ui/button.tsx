// components/ui/button.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Add 'link' to the ButtonVariant type
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'white';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  href?: string;
  external?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  href,
  external = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
    outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800',
    link: 'bg-transparent text-blue-600 hover:text-blue-800 hover:underline p-0 h-auto focus:ring-blue-500 dark:text-blue-400 dark:hover:text-blue-300',
    white: 'bg-white text-gray-900 hover:bg-gray-50 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const buttonContent = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );

  // Special case for link variant - remove padding if it's a link style
  const finalSizeStyle = variant === 'link' ? '' : sizeStyles[size];
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${finalSizeStyle} ${widthStyles} ${className}`;

  // If href is provided, render as a link
  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonStyles}
          whileHover={{ scale: variant === 'link' ? 1 : 1.02 }}
          whileTap={{ scale: variant === 'link' ? 1 : 0.98 }}
        >
          {buttonContent}
        </motion.a>
      );
    }
    
    return (
      <Link href={href} passHref>
        <motion.span
          className={buttonStyles}
          whileHover={{ scale: variant === 'link' ? 1 : 1.02 }}
          whileTap={{ scale: variant === 'link' ? 1 : 0.98 }}
        >
          {buttonContent}
        </motion.span>
      </Link>
    );
  }

  // Otherwise render as a button
  return (
    <motion.button
      className={buttonStyles}
      whileHover={{ scale: variant === 'link' ? 1 : 1.02 }}
      whileTap={{ scale: variant === 'link' ? 1 : 0.98 }}
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
    >
      {buttonContent}
    </motion.button>
  );
}