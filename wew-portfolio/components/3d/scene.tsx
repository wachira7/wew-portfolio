"use client";

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import { Group ,MathUtils } from 'three';

// Simplified laptop model
const Laptop = ({ isHovered, setIsHovered }: { isHovered: boolean, setIsHovered: (hovered: boolean) => void }) => {
  const groupRef = useRef<Group>(null);
  
  // Animation for laptop
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Make laptop float slightly
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
    
    // Rotate more when hovered
    const targetRotationY = isHovered ? Math.PI * 0.15 : 0;
    groupRef.current.rotation.y = MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY,
      0.05
    );
    
    const targetRotationX = isHovered ? -Math.PI * 0.05 : 0;
    groupRef.current.rotation.x = MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationX,
      0.05
    );
  });
  
  return (
    <group
      ref={groupRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      position={[0, 0, 0]}
      scale={1.5}
    >
      {/* Laptop base */}
      <mesh position={[0, -0.1, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.1, 1]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Laptop screen */}
      <mesh position={[0, 0.5, -0.5]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[1.4, 0.8, 0.05]} />
        <meshStandardMaterial color="#222" metalness={0.5} roughness={0.2} />
      </mesh>
      
      {/* Screen display */}
      <mesh position={[0, 0.5, -0.47]} rotation={[Math.PI / 6, 0, 0]}>
        <planeGeometry args={[1.3, 0.7]} />
        <meshStandardMaterial color="#1e40af" emissive="#3b82f6" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Keyboard area */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1.4, 0.9]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  );
};

const Scene = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="h-64 w-full md:h-80">
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={40} />
          <ambientLight intensity={0.5} />
          <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <spotLight position={[-5, 5, 5]} angle={0.15} penumbra={1} intensity={0.5} castShadow />
          <Laptop isHovered={isHovered} setIsHovered={setIsHovered} />
          <ContactShadows opacity={0.5} scale={10} blur={1} far={10} resolution={256} color="#000000" />
          <Environment preset="city" />
          <OrbitControls 
            enablePan={false} 
            enableZoom={false} 
            minPolarAngle={Math.PI / 3} 
            maxPolarAngle={Math.PI / 3}
            rotateSpeed={0.3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;