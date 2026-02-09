import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Use casted constants to avoid JSX.IntrinsicElements errors in strict environments
const Points = 'points' as any;
const BufferGeometry = 'bufferGeometry' as any;
const BufferAttribute = 'bufferAttribute' as any;
const PointsMaterial = 'pointsMaterial' as any;

interface StarFieldProps {
  speed?: number;
}

const StarField: React.FC<StarFieldProps> = ({ speed = 1 }) => {
  const count = 3000;
  const mesh = useRef<THREE.Points>(null!);
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 2000; // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2000; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2000; // z
  }

  useFrame((state) => {
    if (!mesh.current) return;
    
    // Move stars towards camera (z-axis)
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      let z = positions[i * 3 + 2];
      z += 10 * speed; // Speed of travel
      if (z > 1000) {
        z = -1000;
      }
      positions[i * 3 + 2] = z;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate slightly based on time for dynamic feel
    mesh.current.rotation.z += 0.001 * speed;
  });

  return (
    <Points ref={mesh}>
      <BufferGeometry>
        <BufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </BufferGeometry>
      <PointsMaterial
        size={2}
        color="#ffffff"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </Points>
  );
};

export default StarField;