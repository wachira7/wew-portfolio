"use client";

//import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, FaNodeJs, FaDocker, FaJenkins, FaAws, FaPython, 
  FaFlask, FaGit, FaGithub, FaSlack
} from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiExpress, SiKubernetes, 
  SiMongodb, SiSqlite, SiPostgresql, SiSolidity, SiFigma, SiNotion, SiDjango, 
  SiGrafana, SiPrometheus, SiTerraform, SiSupabase} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';

interface TechItem {
  name: string;
  icon?: React.ReactNode;
  color?: string;
}

interface FloatingTechStackProps {
  items: TechItem[];
  className?: string;
}

// Map of tech names to their icons and colors
const techIconsMap: Record<string, { icon: React.ReactNode, color: string }> = {
  'React': { icon: <FaReact size={28} />, color: '#61DAFB' },
  'TypeScript': { icon: <SiTypescript size={24} />, color: '#3178C6' },
  'Next.js': { icon: <SiNextdotjs size={24} />, color: '#000000' },
  'Tailwind': { icon: <SiTailwindcss size={24} />, color: '#38B2AC' },
  'Node.js': { icon: <FaNodeJs size={24} />, color: '#339933' },
  'Express': { icon: <SiExpress size={24} />, color: '#000000' },
  'Docker': { icon: <FaDocker size={24} />, color: '#2496ED' },
  'Jenkins': { icon: <FaJenkins size={24} />, color: '#D33833' },
  'Kubernetes': { icon: <SiKubernetes size={24} />, color: '#326CE5' },
  'MongoDB': { icon: <SiMongodb size={24} />, color: '#47A248' },
  'AWS': { icon: <FaAws size={24} />, color: '#FF9900' },
  'Python': { icon: <FaPython size={24} />, color: '#3776AB' },
  'SQLite': { icon: <SiSqlite size={24} />, color: '#003B57' },
  'Flask': { icon: <FaFlask size={24} />, color: '#000000' },
  'PostgreSQL': { icon: <SiPostgresql size={24} />, color: '#336791' },
  'React Native': { icon: <TbBrandReactNative size={24} />, color: '#61DAFB' },
  'Solidity': { icon: <SiSolidity size={24} />, color: '#363636' },
  'Git': { icon: <FaGit size={24} />, color: '#F05032' },
  'GitHub': { icon: <FaGithub size={24} />, color: '#181717' },
  'Slack': { icon: <FaSlack size={24} />, color: '#4A154B' },
  'Notion': { icon: <SiNotion size={24} />, color: '#000000' },
  'Figma': { icon: <SiFigma size={24} />, color: '#F24E1E' },
  'Django': { icon: <SiDjango size={24} />, color: '#092E20' },
  'Grafana': { icon: <SiGrafana size={24} />, color: '#F46800' },
  'Terraform': { icon: <SiTerraform size={24} />, color: '#000000' },
  'Prometheus': { icon: <SiPrometheus size={24} />, color: '#E6522C' },
  'Supabase': { icon: <SiSupabase size={24} />, color: '#000000' },
};

const FloatingTechStack: React.FC<FloatingTechStackProps> = ({ 
  items, 
  className = '' 
}) => {
  // Create a simpler fixed grid layout
  const gridItems = items.map((item, index) => {
    const iconData = techIconsMap[item.name] || { icon: null, color: '#666666' };
    
    // Calculate fixed positions in a grid
    const totalRows = Math.ceil(Math.sqrt(items.length));
    const totalCols = Math.ceil(items.length / totalRows);
    
    const row = Math.floor(index / totalCols);
    const col = index % totalCols;
    
    // Calculate percentages with spacing between items
    const xPercent = (col / (totalCols - 1 || 1)) * 80 + 10; // 10% to 90% width
    const yPercent = (row / (totalRows - 1 || 1)) * 80 + 10; // 10% to 90% height
    
    // Add slight randomness for natural feel
    const randomX = xPercent + (Math.random() * 4 - 2); // ±2% randomness
    const randomY = yPercent + (Math.random() * 4 - 2); // ±2% randomness
    
    return {
      name: item.name,
      icon: item.icon || iconData.icon,
      color: item.color || iconData.color,
      x: randomX,
      y: randomY,
      delay: Math.random() * 4, // Random delay for animation start
      duration: 20 + Math.random() * 10 // Random duration (20-30s)
    };
  });

  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        height: '500px', 
        minHeight: '300px',
        width: '100%',
        overflow: 'hidden'
      }}
    >
      {gridItems.map((item, index) => (
        <motion.div
          key={`${item.name}-${index}`}
          className="absolute flex flex-col items-center w-24"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            transform: 'translate(-50%, -50%)', // Center the element at its position
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1,
            scale: 1,
            y: [0, -10, 10, 0],
          }}
          transition={{
            duration: item.duration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            delay: item.delay,
            y: {
              duration: item.duration / 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
        >
          <motion.div 
            className="flex items-center justify-center rounded-full shadow-lg mb-2"
            style={{ 
              backgroundColor: item.color, 
              color: getContrastColor(item.color),
              width: '60px',
              height: '60px'
            }}
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {item.icon}
          </motion.div>
          <span className="text-center text-sm font-medium dark:text-gray-300 whitespace-nowrap">
            {item.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

// Helper function to determine if text should be white or black based on background color
function getContrastColor(hexColor: string): string {
  // Remove the # if it exists
  hexColor = hexColor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hexColor.substring(0, 2), 16) || 0;
  const g = parseInt(hexColor.substring(2, 4), 16) || 0;
  const b = parseInt(hexColor.substring(4, 6), 16) || 0;
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black for bright colors and white for dark colors
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

export default FloatingTechStack;