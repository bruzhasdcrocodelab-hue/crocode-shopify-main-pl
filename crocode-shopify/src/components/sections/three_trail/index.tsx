"use client";

import { motion, useInView } from "motion/react";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls, SVGLoader } from "three/examples/jsm/Addons.js";

interface Vector3Config {
  x: number;
  y: number;
  z: number;
}

interface Config {
  sampleResolution: number;
  blendSteps: number;
  pos1: Vector3Config;
  rot1: Vector3Config;
  scale1: number;
  opacity1: number;
  pos2: Vector3Config;
  rot2: Vector3Config;
  scale2: number;
  opacity2: number;
  color1: string;
  color2: string;
  animSpeed: number;
  waveStrength: number;
  waveFreqShape: number;
  waveFreqTrail: number;
  twist: number;
  noiseStrength: number;
  randomMotion: number;
}

interface ThreeTrailProps {
  opacityValue?: number;
}

const CONFIG: Config = {
  sampleResolution: 1000,
  blendSteps: 28,
  pos1: { x: -24, y: 20, z: -150 },
  rot1: { x: 0, y: -0.25, z: -0.408 },
  scale1: 1,
  opacity1: 0.3,
  pos2: { x: 53.4, y: -27.6, z: 50 },
  rot2: { x: -0.13194, y: -0.6408, z: 500 },
  scale2: 0.855,
  opacity2: 0.484,
  color1: "#ffffff",
  color2: "#ffffff",
  animSpeed: 0.2,
  waveStrength: 15.3,
  waveFreqShape: 0.0,
  waveFreqTrail: 1.8,
  twist: -0.212,
  noiseStrength: 0.0,
  randomMotion: 1.0,
};

function parseSVGToPoints(svgText: string): ShapeData | null {
  const loader = new SVGLoader();
  const data = loader.parse(svgText);

  const allPoints: THREE.Vector3[] = [];
  const cuts = new Set<number>();

  data.paths.forEach((path) => {
    path.subPaths.forEach((subPath) => {
      if (subPath.getLength() > 0.1) {
        const points = subPath.getPoints(Math.floor(subPath.getLength() * 2));
        points.forEach((p) => {
          allPoints.push(new THREE.Vector3(p.x, -p.y, 0));
        });
        cuts.add(allPoints.length - 1);
      }
    });
  });

  if (allPoints.length === 0) return null;

  const box = new THREE.Box3().setFromPoints(allPoints);
  const center = new THREE.Vector3();
  box.getCenter(center);
  allPoints.forEach((p) => p.sub(center));

  if (allPoints.length > CONFIG.sampleResolution) {
    const step = Math.ceil(allPoints.length / CONFIG.sampleResolution);
    const optimizedPoints: THREE.Vector3[] = [];
    const optimizedCuts = new Set<number>();
    for (let i = 0; i < allPoints.length; i += step) {
      optimizedPoints.push(allPoints[i]);
      for (let k = 0; k < step; k++) {
        if (cuts.has(i + k)) {
          optimizedCuts.add(optimizedPoints.length - 1);
          break;
        }
      }
    }
    return { points: optimizedPoints, cuts: optimizedCuts };
  }

  return { points: allPoints, cuts };
}

interface ShapeData {
  points: THREE.Vector3[];
  cuts: Set<number>;
}

const ThreeTrail: React.FC<ThreeTrailProps> = ({ opacityValue }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const blendGroupRef = useRef<THREE.Group>(new THREE.Group());
  const shapeDataRef = useRef<ShapeData>({ points: [], cuts: new Set() });
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());
  const animFrameRef = useRef<number>(null);
  const isInView = useInView(containerRef, { once: true });

  const rebuildBlend = () => {
    const group = blendGroupRef.current;
    const shapeData = shapeDataRef.current;
    const config = CONFIG;

    while (group.children.length) {
      const obj = group.children[0];
      if (obj instanceof THREE.LineSegments) {
        obj.geometry.dispose();
        (obj.material as THREE.Material).dispose();
      }
      group.remove(obj);
    }

    if (shapeData.points.length === 0) return;

    const totalPoints = shapeData.points.length;
    const indices: number[] = [];
    for (let i = 0; i < totalPoints - 1; i++) {
      if (!shapeData.cuts.has(i)) {
        indices.push(i, i + 1);
      }
    }

    for (let i = 0; i < config.blendSteps; i++) {
      const t = i / (config.blendSteps - 1);

      const geometry = new THREE.BufferGeometry();
      const vertices = new Float32Array(totalPoints * 3);
      geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
      geometry.setIndex(indices);

      const color = new THREE.Color().lerpColors(
        new THREE.Color(config.color1),
        new THREE.Color(config.color2),
        t,
      );

      const opacity =
        opacityValue !== undefined
          ? opacityValue
          : THREE.MathUtils.lerp(config.opacity1, config.opacity2, t);

      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
        linewidth: 3,
        depthWrite: false,
      });

      const segments = new THREE.LineSegments(geometry, material);
      segments.userData = { stepIndex: i, t };
      group.add(segments);
    }
  };

  const loadDefaultShape = () => {
    const starSVG = `<svg width="1240" height="678" viewBox="0 0 1240 678" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M240.122 -156.354C-190.12 21.3045 58.5374 380.835 236.646 538.394C772.535 905.625 937.427 457.296 706.345 163.137C475.263 -131.023 1276.17 1.88284 1236.77 -431.999C1191.08 -935.103 777.925 -378.428 240.122 -156.354Z" stroke="white" stroke-opacity="0.16" stroke-width="3"/>
</svg>`;
    const data = parseSVGToPoints(starSVG);
    if (data) {
      shapeDataRef.current = data;
      rebuildBlend();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 1;
    const height = container.clientHeight || 1;

    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(30, width / height, 1, 10000);
    camera.position.set(
      165.04370117304333,
      -193.2358225410431,
      224.54508142016735,
    );
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false;
    controls.target.set(0, 0, 0);
    controls.update();
    controlsRef.current = controls;

    scene.add(blendGroupRef.current);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    loadDefaultShape();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      if (containerRef.current && rendererRef.current && cameraRef.current) {
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        if (w > 0 && h > 0) {
          if (
            w !== rendererRef.current.domElement.width ||
            h !== rendererRef.current.domElement.height
          ) {
            cameraRef.current.aspect = w / h;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(w, h);
          }
        }
      }

      // Обновляем контроллер каждый кадр
      // controlsRef.current?.update();

      const time = clockRef.current.getElapsedTime();

      const group = blendGroupRef.current;
      const shapeData = shapeDataRef.current;
      const config = CONFIG;

      if (group.children.length > 0 && shapeData.points.length > 0) {
        const euler1 = new THREE.Euler(
          config.rot1.x,
          config.rot1.y,
          config.rot1.z,
        );
        const euler2 = new THREE.Euler(
          config.rot2.x,
          config.rot2.y,
          config.rot2.z,
        );

        group.children.forEach((segments) => {
          if (!(segments instanceof THREE.LineSegments)) return;
          const t = segments.userData.t as number;
          const positions = (
            segments.geometry.attributes.position as THREE.BufferAttribute
          ).array;

          let rX1 = 0,
            rY1 = 0,
            rX2 = 0,
            rY2 = 0;
          if (config.randomMotion > 0) {
            rX1 =
              (Math.sin(time * 0.7) + Math.cos(time * 1.9)) *
              config.randomMotion;
            rY1 =
              (Math.cos(time * 0.8) + Math.sin(time * 2.1)) *
              config.randomMotion;
            rX2 =
              (Math.sin(time * 0.9 + 42) + Math.cos(time * 2.3)) *
              config.randomMotion;
            rY2 =
              (Math.cos(time * 1.1 + 13) + Math.sin(time * 2.5)) *
              config.randomMotion;
          }

          const startPos = new THREE.Vector3(
            config.pos1.x + rX1,
            config.pos1.y + rY1,
            config.pos1.z,
          );
          const endPos = new THREE.Vector3(
            config.pos2.x + rX2,
            config.pos2.y + rY2,
            config.pos2.z,
          );

          segments.position.lerpVectors(startPos, endPos, t);

          for (let j = 0; j < shapeData.points.length; j++) {
            const rawP = shapeData.points[j];

            const v1 = rawP
              .clone()
              .multiplyScalar(config.scale1)
              .applyEuler(euler1);
            const v2 = rawP
              .clone()
              .multiplyScalar(config.scale2)
              .applyEuler(euler2);

            let x = THREE.MathUtils.lerp(v1.x, v2.x, t);
            let y = THREE.MathUtils.lerp(v1.y, v2.y, t);
            let z = THREE.MathUtils.lerp(v1.z, v2.z, t);

            if (config.twist !== 0) {
              const angle = t * config.twist * Math.PI * 2;
              const cosA = Math.cos(angle);
              const sinA = Math.sin(angle);
              const tx = x * cosA - y * sinA;
              const ty = x * sinA + y * cosA;
              x = tx;
              y = ty;
            }

            if (config.waveStrength > 0) {
              const phase =
                time * config.animSpeed +
                j * 0.01 * config.waveFreqShape +
                t * Math.PI * config.waveFreqTrail;
              const wave = Math.sin(phase) * config.waveStrength;
              z += wave;
            }

            if (config.noiseStrength > 0) {
              x += (Math.random() - 0.5) * config.noiseStrength;
              y += (Math.random() - 0.5) * config.noiseStrength;
              z += (Math.random() - 0.5) * config.noiseStrength;
            }

            positions[j * 3] = x;
            positions[j * 3 + 1] = y;
            positions[j * 3 + 2] = z;
          }

          segments.geometry.attributes.position.needsUpdate = true;
        });
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // const handleKeyDown = (event: KeyboardEvent) => {
    //   if (event.code === "KeyP") {
    //     if (cameraRef.current) {
    //       const pos = cameraRef.current.position;
    //       const rot = cameraRef.current.rotation;
    //       console.log("Camera position:", { x: pos.x, y: pos.y, z: pos.z });
    //       console.log("Camera rotation:", { x: rot.x, y: rot.y, z: rot.z });
    //     }
    //   }
    // };

    // window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (controlsRef.current) controlsRef.current.dispose();
      blendGroupRef.current.children.forEach((child) => {
        if (child instanceof THREE.LineSegments) {
          child.geometry.dispose();
          (child.material as THREE.Material).dispose();
        }
      });
      rendererRef.current?.dispose();
      if (container && rendererRef.current) {
        container.removeChild(rendererRef.current.domElement);
      }
    };
  }, [opacityValue]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay: 1 }}
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 2,
        pointerEvents: "none",
      }}
    />
  );
};

export default ThreeTrail;
