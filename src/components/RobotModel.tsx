
import { useState, useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// This is a placeholder for the robot head and jaw
// In a real application, you would use actual GLB models
const RobotModel = ({ 
  isSpeaking, 
  jawOpenAmount = 0 
}: { 
  isSpeaking: boolean;
  jawOpenAmount: number;
}) => {
  // References for animation
  const headRef = useRef<THREE.Mesh>(null);
  const jawRef = useRef<THREE.Mesh>(null);
  
  // Create a subtle head movement animation
  useFrame((state) => {
    if (headRef.current) {
      // Subtle idle animation
      headRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
      headRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.02;
    }
    
    if (jawRef.current) {
      // Set jaw position based on speaking state
      jawRef.current.rotation.x = jawOpenAmount * Math.PI / 8;
    }
  });

  return (
    <group>
      {/* Robot Head */}
      <mesh 
        ref={headRef}
        position={[0, 0, 0]}
      >
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial 
          color="#4285F4" 
          metalness={0.6}
          roughness={0.2}
        />
        
        {/* Eyes */}
        <group position={[0, 0.2, 0.8]}>
          <mesh position={[-0.3, 0, 0]}>
            <sphereGeometry args={[0.12, 32, 32]} />
            <meshStandardMaterial color="#FFFFFF" emissive="#66BBFF" emissiveIntensity={isSpeaking ? 0.8 : 0.2} />
          </mesh>
          <mesh position={[0.3, 0, 0]}>
            <sphereGeometry args={[0.12, 32, 32]} />
            <meshStandardMaterial color="#FFFFFF" emissive="#66BBFF" emissiveIntensity={isSpeaking ? 0.8 : 0.2} />
          </mesh>
        </group>

        {/* Antennas */}
        <group position={[0, 0.9, 0]}>
          <mesh position={[-0.4, 0.2, 0]} rotation={[0, 0, Math.PI/12]}>
            <cylinderGeometry args={[0.02, 0.02, 0.5]} />
            <meshStandardMaterial color="#333333" />
            <mesh position={[0, 0.3, 0]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial 
                color="#FF4444"
                emissive="#FF4444"
                emissiveIntensity={isSpeaking ? 0.8 : 0} 
              />
            </mesh>
          </mesh>
          <mesh position={[0.4, 0.2, 0]} rotation={[0, 0, -Math.PI/12]}>
            <cylinderGeometry args={[0.02, 0.02, 0.5]} />
            <meshStandardMaterial color="#333333" />
            <mesh position={[0, 0.3, 0]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial 
                color="#FF4444"
                emissive="#FF4444" 
                emissiveIntensity={isSpeaking ? 0.8 : 0} 
              />
            </mesh>
          </mesh>
        </group>
      </mesh>

      {/* Robot Jaw - separate object that will animate */}
      <mesh 
        ref={jawRef}
        position={[0, -0.45, 0.35]}
        rotation={[0, 0, 0]}
      >
        <boxGeometry args={[0.8, 0.25, 0.7]} />
        <meshStandardMaterial 
          color="#3367D6" 
          metalness={0.7}
          roughness={0.2}
        />
        
        {/* Teeth elements */}
        <mesh position={[0, 0.05, 0.2]}>
          <boxGeometry args={[0.7, 0.05, 0.1]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      </mesh>
    </group>
  );
};

export default RobotModel;
