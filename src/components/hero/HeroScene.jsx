import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";

const BLUE = "#4F8DFF";
const SKY = "#38BDF8";

/**
 * The abstract "core" object: a faceted metal crystal with glowing edges,
 * wrapped in a shell of data points and two orbit rings with a travelling node.
 */
function Core({ animate, detail }) {
  const group = useRef();
  const crystal = useRef();
  const shell = useRef();
  const orbit = useRef();
  const node = useRef();

  // Geometries are built once (useMemo) instead of on every render.
  const crystalGeometry = useMemo(() => new THREE.IcosahedronGeometry(1.15, 1), []);
  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(crystalGeometry), [crystalGeometry]);
  const shellGeometry = useMemo(() => new THREE.IcosahedronGeometry(1.95, detail), [detail]);

  // useFrame runs ~60 times per second. `delta` = seconds since the last frame,
  // so the speed stays the same on 60 Hz and 120 Hz screens.
  useFrame((state, delta) => {
    if (!animate) return;
    const t = state.clock.elapsedTime;

    crystal.current.rotation.x += delta * 0.12;
    crystal.current.rotation.y += delta * 0.18;
    shell.current.rotation.y -= delta * 0.05;
    shell.current.rotation.x += delta * 0.02;
    orbit.current.rotation.z += delta * 0.06;

    // The bright node travels around the main ring.
    const angle = t * 0.5;
    node.current.position.set(Math.cos(angle) * 2.55, Math.sin(angle) * 2.55, 0);

    // Tilt the whole object towards the pointer (damp = smooth easing).
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, x * 0.4, 2.5, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -y * 0.3, 2.5, delta);
    group.current.position.y = Math.sin(t * 0.6) * 0.08; // gentle float
  });

  return (
    <group ref={group}>
      {/* Crystal + glowing edges */}
      <mesh ref={crystal} geometry={crystalGeometry}>
        <meshStandardMaterial color="#111a2e" metalness={0.45} roughness={0.35} flatShading />
        <lineSegments geometry={edgesGeometry}>
          <lineBasicMaterial color={BLUE} transparent opacity={0.55} />
        </lineSegments>
      </mesh>

      {/* Shell of points */}
      <points ref={shell} geometry={shellGeometry}>
        <pointsMaterial color={BLUE} size={0.035} sizeAttenuation transparent opacity={0.7} depthWrite={false} />
      </points>

      {/* Orbit rings + travelling node */}
      <group ref={orbit} rotation={[1.15, 0.25, 0]}>
        <mesh>
          <torusGeometry args={[2.55, 0.006, 8, 160]} />
          <meshBasicMaterial color={BLUE} transparent opacity={0.45} />
        </mesh>
        <mesh ref={node} position={[2.55, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color={BLUE} />
        </mesh>
      </group>
      <mesh rotation={[-0.6, 0.9, 0.3]}>
        <torusGeometry args={[2.9, 0.004, 8, 160]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

/** true while the element is on screen. Starts as true because the hero is visible on load. */
function useOnScreen(ref) {
  const [onScreen, setOnScreen] = useState(true);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return onScreen;
}

export default function HeroScene() {
  const wrapper = useRef();
  const inView = useOnScreen(wrapper); // pause rendering when the hero is scrolled away
  const reducedMotion = useReducedMotion();
  const [isSmallScreen] = useState(() => window.matchMedia("(max-width: 768px)").matches);

  const animate = !reducedMotion;
  const frameloop = !inView ? "never" : animate ? "always" : "demand";

  return (
    <div ref={wrapper} className="hero__canvas">
      <Canvas
        frameloop={frameloop}
        dpr={[1, isSmallScreen ? 1.5 : 2]}
        camera={{ position: [0, 0, 7], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        eventSource={document.getElementById("root")}
        eventPrefix="client"
      >
        <ambientLight intensity={0.25} />
        <pointLight position={[3, 2.5, 4]} color={BLUE} intensity={40} />
        <pointLight position={[-4, -2, 2]} color={SKY} intensity={14} />
        <directionalLight position={[0, 5, 2]} intensity={0.6} />
        <Core animate={animate} detail={isSmallScreen ? 2 : 3} />
      </Canvas>
    </div>
  );
}
