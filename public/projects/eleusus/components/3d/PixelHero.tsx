import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Use casted constants to avoid JSX.IntrinsicElements errors in strict environments
const InstancedMesh = 'instancedMesh' as any;
const BoxGeometry = 'boxGeometry' as any;
const MeshPhysicalMaterial = 'meshPhysicalMaterial' as any;

const PixelHero: React.FC = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = new THREE.Object3D();
  const count = 20; // grid size
  const sep = 1.2;

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const t = state.clock.getElapsedTime();
    let i = 0;
    
    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        // Calculate wave position
        const y = Math.sin(x / 2 + t) * Math.cos(z / 2 + t) * 2;
        
        dummy.position.set(
          (x - count / 2) * sep, 
          y, 
          (z - count / 2) * sep
        );
        
        const scale = (Math.sin(x/2 + t*2) + 2) * 0.5;
        dummy.scale.set(1, scale, 1);
        
        // Color variation logic could be added here by setting instanceColor
        
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i++, dummy.matrix);
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.x = Math.PI / 6;
  });

  return (
    <InstancedMesh ref={meshRef} args={[undefined, undefined, count * count]}>
      <BoxGeometry args={[1, 1, 1]} />
      <MeshPhysicalMaterial 
        color="#2a0a4a" 
        emissive="#39ff14"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.1}
        wireframe={true}
      />
    </InstancedMesh>
  );
};

export default PixelHero;