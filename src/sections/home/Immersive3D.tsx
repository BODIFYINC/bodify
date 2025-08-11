import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function FloatingBlob() {
  const meshRef = useRef<THREE.Mesh>(null!);
  return (
    <mesh ref={meshRef} rotation={[0.2, 0.3, 0]}>
      <icosahedronGeometry args={[1.2, 2]} />
      <meshStandardMaterial color={new THREE.Color('#7c3aed')} metalness={0.2} roughness={0.4} wireframe={false} />
    </mesh>
  );
}

export default function Immersive3D() {
  return (
    <section aria-label="Immersive 3D Hero" className="relative py-24 bg-gradient-to-b from-bodify-darker via-bodify-dark to-bodify-darker">
      <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Immersive 3D Experience</h2>
          <p className="text-white/80 text-lg mb-6">
            Smooth, energy-efficient visuals that respect dark mode and accessibility. Drag to explore the shape.
          </p>
          <ul className="space-y-2 text-white/80">
            <li className="flex items-center"><span className="h-5 w-5 rounded-full bg-bodify-gradient mr-3" />Sustainable rendering and performance-first</li>
            <li className="flex items-center"><span className="h-5 w-5 rounded-full bg-bodify-gradient mr-3" />Micro-interactions and depth</li>
            <li className="flex items-center"><span className="h-5 w-5 rounded-full bg-bodify-gradient mr-3" />Fully responsive and keyboard friendly</li>
          </ul>
        </div>
        <div className="rounded-2xl overflow-hidden glassmorphism border-0">
          <Canvas style={{ height: 360 }} camera={{ position: [0, 0, 4], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 3, 3]} intensity={0.8} />
            <Suspense fallback={null}>
              <FloatingBlob />
            </Suspense>
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
