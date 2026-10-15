// components/effects/background.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';

interface AnimatedBackgroundProps {
  variant?: 'gradient' | 'particles' | 'waves';
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
  color?: string;
  secondaryColor?: string;
}

export default function AnimatedBackground({
  variant = 'gradient',
  className = '',
  intensity = 'medium',
  color = 'blue',
  secondaryColor,
}: AnimatedBackgroundProps) {
  // For particles animation
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    speed: number;
  }>>([]);
  
  // For background dimension tracking
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get the intensity multiplier
  const getIntensity = useCallback(() => {
  switch (intensity) {
    case 'light': return 0.5;
    case 'strong': return 1.5;
    default: return 1;
  }
 }, [intensity]);

  // Get the primary color class
  const getColorClass = () => {
    switch (color) {
      case 'blue':
        return 'from-blue-500/10 via-blue-300/5 to-blue-700/10';
      case 'purple':
        return 'from-purple-500/10 via-purple-300/5 to-purple-700/10';
      case 'green':
        return 'from-green-500/10 via-green-300/5 to-green-700/10';
      case 'pink':
        return 'from-pink-500/10 via-pink-300/5 to-pink-700/10';
      default:
        return 'from-blue-500/10 via-blue-300/5 to-blue-700/10';
    }
  };
  
  // Generate secondary color class
  const getSecondaryColorClass = () => {
    if (!secondaryColor) return '';
    
    switch (secondaryColor) {
      case 'purple':
        return 'to-purple-500/10';
      case 'blue':
        return 'to-blue-500/10';
      case 'green':
        return 'to-green-500/10';
      case 'pink':
        return 'to-pink-500/10';
      default:
        return '';
    }
  };
  
  // Generate particles for the particle animation
  useEffect(() => {
    if (variant !== 'particles' || !containerRef.current) return;
    
    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;
    const particleCount = Math.floor(width * height / 15000 * getIntensity());
    
    const generateParticles = () => {
      const newParticles = [];
      
      for (let i = 0; i < particleCount; i++) {
        const primaryColor = color === 'blue' ? 'rgba(59, 130, 246, 0.3)' : 
                             color === 'purple' ? 'rgba(147, 51, 234, 0.3)' :
                             color === 'green' ? 'rgba(16, 185, 129, 0.3)' :
                             color === 'pink' ? 'rgba(236, 72, 153, 0.3)' : 'rgba(59, 130, 246, 0.3)';
        
        newParticles.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 4 + 1,
          color: primaryColor,
          speed: Math.random() * 0.5 + 0.1,
        });
      }
      
      setParticles(newParticles);
    };
    
    generateParticles();
    
    const handleResize = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.offsetWidth;
        const newHeight = containerRef.current.offsetHeight;
        const newParticleCount = Math.floor(newWidth * newHeight / 15000 * getIntensity());
        
        if (newParticleCount !== particleCount) {
          generateParticles();
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [variant, color, intensity, getIntensity]);
  
  
  // Render different background variants
  const renderBackground = () => {
    switch (variant) {
      case 'gradient':
        return (
          <motion.div 
            className={`absolute inset-0 bg-gradient-to-br ${getColorClass()} ${getSecondaryColorClass()}`}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20 / getIntensity(),
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
            style={{ backgroundSize: '200% 200%' }}
          />
        );
        
      case 'particles':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full"
                initial={{ 
                  x: particle.x, 
                  y: particle.y,
                  opacity: Math.random() * 0.5 + 0.3,
                }}
                animate={{ 
                  y: [particle.y, particle.y + 100, particle.y],
                  opacity: [
                    Math.random() * 0.5 + 0.3,
                    Math.random() * 0.7 + 0.2,
                    Math.random() * 0.5 + 0.3,
                  ],
                }}
                transition={{
                  duration: 10 / particle.speed / getIntensity(),
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  backgroundColor: particle.color,
                }}
              />
            ))}
          </div>
        );
        
      case 'waves':
        return (
          <div className="absolute inset-0 overflow-hidden">
            <svg 
              className="absolute bottom-0 left-0 w-full"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 1440 320"
            >
              <motion.path 
                initial={{ d: "M0,320L48,288C96,256,192,192,288,181.3C384,171,480,213,576,218.7C672,224,768,192,864,181.3C960,171,1056,181,1152,186.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }}
                animate={{ 
                  d: [
                    "M0,320L48,288C96,256,192,192,288,181.3C384,171,480,213,576,218.7C672,224,768,192,864,181.3C960,171,1056,181,1152,186.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                    "M0,320L48,304C96,288,192,256,288,229.3C384,203,480,181,576,181.3C672,181,768,203,864,208C960,213,1056,203,1152,197.3C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                    "M0,320L48,288C96,256,192,192,288,181.3C384,171,480,213,576,218.7C672,224,768,192,864,181.3C960,171,1056,181,1152,186.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  ]
                }}
                transition={{
                  duration: 20 / getIntensity(),
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                fill={`rgba(${color === 'blue' ? '59, 130, 246' : 
                       color === 'purple' ? '147, 51, 234' :
                       color === 'green' ? '16, 185, 129' :
                       color === 'pink' ? '236, 72, 153' : 
                       '59, 130, 246'}, 0.1)`}
              />
              
              <motion.path 
                initial={{ d: "M0,320L40,282.7C80,245,160,171,240,160C320,149,400,203,480,218.7C560,235,640,213,720,186.7C800,160,880,128,960,133.3C1040,139,1120,181,1200,170.7C1280,160,1360,96,1400,64L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z" }}
                animate={{ 
                  d: [
                    "M0,320L40,282.7C80,245,160,171,240,160C320,149,400,203,480,218.7C560,235,640,213,720,186.7C800,160,880,128,960,133.3C1040,139,1120,181,1200,170.7C1280,160,1360,96,1400,64L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z",
                    "M0,320L40,304C80,288,160,256,240,245.3C320,235,400,245,480,250.7C560,256,640,256,720,240C800,224,880,192,960,192C1040,192,1120,224,1200,208C1280,192,1360,128,1400,96L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z",
                    "M0,320L40,282.7C80,245,160,171,240,160C320,149,400,203,480,218.7C560,235,640,213,720,186.7C800,160,880,128,960,133.3C1040,139,1120,181,1200,170.7C1280,160,1360,96,1400,64L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z",
                  ]
                }}
                transition={{
                  duration: 15 / getIntensity(),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                fill={`rgba(${color === 'blue' ? '96, 165, 250' : 
                       color === 'purple' ? '167, 139, 250' :
                       color === 'green' ? '52, 211, 153' :
                       color === 'pink' ? '244, 114, 182' : 
                       '96, 165, 250'}, 0.1)`}
              />
            </svg>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
    >
      {renderBackground()}
    </div>
  );
}