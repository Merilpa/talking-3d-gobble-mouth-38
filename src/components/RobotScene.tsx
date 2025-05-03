
import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, useHelper } from '@react-three/drei';
import * as THREE from 'three';
import RobotModel from './RobotModel';

interface RobotSceneProps {
  isSpeaking: boolean;
  jawOpenAmount: number;
}

const RobotScene = ({ isSpeaking, jawOpenAmount }: RobotSceneProps) => {
  return (
    <div className="h-full w-full robot-canvas">
      <Canvas shadows>
        <color attach="background" args={['#0a0a16']} />
        <fog attach="fog" args={['#0a0a16', 5, 30]} />
        
        <PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={50} />
        
        <Suspense fallback={null}>
          <RobotModel isSpeaking={isSpeaking} jawOpenAmount={jawOpenAmount} />
          <Environment preset="city" />
        </Suspense>
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, 5, -2]} intensity={0.5} color="#ff0000" />
        <pointLight position={[5, 5, -2]} intensity={0.5} color="#0066ff" />
        
        {/* Controls */}
        <OrbitControls 
          enablePan={false}
          minPolarAngle={Math.PI/4}
          maxPolarAngle={Math.PI/1.5}
          minDistance={2}
          maxDistance={6}
        />
      </Canvas>
    </div>
  );
};

export default RobotScene;
