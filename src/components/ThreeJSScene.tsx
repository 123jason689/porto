import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface ThreeJSSceneProps {
  containerId: string;
  geometryType?: 'torus' | 'octahedron' | 'icosahedron';
  modelUrl?: string; 
  color?: number;
  className?: string;
  autoRotateSpeed?: number;
  fitToView?: boolean;
  targetSize?: number;
  modelScale?: number;
  showAxes?: boolean;
  lightingPreset?: 'soft' | 'studio' | 'dramatic';
  exposure?: number;
  envMap?: boolean;
}

const ThreeJSScene: React.FC<ThreeJSSceneProps> = ({ 
  containerId, 
  geometryType = 'icosahedron',
  modelUrl,
  color = 0x00f5d4,
  className = "threejs-container",
  autoRotateSpeed = 0.02,
  fitToView = true,
  targetSize = 2.5,
  modelScale = 1,
  showAxes = false,
  lightingPreset = 'studio',
  exposure = 1.2,
  envMap = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<boolean>(false);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    mesh: THREE.Object3D;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = exposure;
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    let pmremGenerator: THREE.PMREMGenerator | null = null;
    if (envMap) {
      try {
        pmremGenerator = new THREE.PMREMGenerator(renderer);
        const envTex = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
        scene.environment = envTex;
      } catch (e) {
        console.warn('[ThreeJSScene] Failed to create environment map', e);
      }
    }

    let mesh: THREE.Object3D | null = null;

    const createFallbackMesh = () => {
      let geometry: THREE.BufferGeometry;
      switch (geometryType) {
        case 'torus':
          geometry = new THREE.TorusGeometry(1, 0.4, 16, 32);
          break;
        case 'octahedron':
          geometry = new THREE.OctahedronGeometry(1.2, 0);
          break;
        case 'icosahedron':
        default:
          geometry = new THREE.IcosahedronGeometry(1.2, 1);
          break;
      }
      const material = new THREE.MeshStandardMaterial({ 
        color: color,
        metalness: 0.7,
        roughness: 0.2,
        wireframe: false
      });
      const fallbackMesh = new THREE.Mesh(geometry, material);
      scene.add(fallbackMesh);
      mesh = fallbackMesh;
    };

    const frameObject = (object: THREE.Object3D) => {
      if (!fitToView) return;
      const box = new THREE.Box3().setFromObject(object);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
      cameraZ *= 1.6;
      camera.position.set(center.x, center.y, cameraZ);
      camera.lookAt(center);
    };

    if (showAxes) {
      const axes = new THREE.AxesHelper(4);
      scene.add(axes);
    }

    if (modelUrl) {
      loadingRef.current = true;
      let resolvedUrl = modelUrl;
      if (!/^([a-z]+:)?\/\//i.test(modelUrl) && !modelUrl.startsWith('/')) {
        try {
          resolvedUrl = new URL(`../assets/3d-models/${modelUrl}`, import.meta.url).href;
        } catch (e) {
          console.warn('Failed to resolve model relative URL, falling back to provided string', e);
        }
      }

      const isGLTF = /\.(glb|gltf)$/i.test(modelUrl);
      console.info('[ThreeJSScene] Loading model:', { original: modelUrl, resolved: resolvedUrl, type: isGLTF ? 'gltf' : 'fbx' });

      const onObjectLoaded = (object: THREE.Object3D) => {
        const box = new THREE.Box3().setFromObject(object);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const normScale = maxDim > 0 ? (targetSize / maxDim) : 1;
        object.scale.multiplyScalar(normScale * modelScale);
        box.setFromObject(object);
        const center = new THREE.Vector3();
        box.getCenter(center);
        object.position.sub(center);
        console.info('[ThreeJSScene] Model normalized', { maxDim, appliedScale: normScale * modelScale });

        scene.add(object);
        mesh = object;
        frameObject(object);
      };

      if (isGLTF) {
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(
          resolvedUrl,
            (gltf) => {
              loadingRef.current = false;
              const root = gltf.scene || gltf.scenes?.[0];
              if (!root) {
                console.warn('GLTF loaded but no scene/root found. Falling back.');
                createFallbackMesh();
                return;
              }
              onObjectLoaded(root);
            },
            undefined,
            (error) => {
              console.warn('GLTF load failed, trying FBX fallback if extension mismatch.', error);
              createFallbackMesh();
              loadingRef.current = false;
            }
        );
      } else {
        const fbxLoader = new FBXLoader();
        fbxLoader.load(
          resolvedUrl,
          (object) => {
            loadingRef.current = false;
            onObjectLoaded(object);
          },
          undefined,
          (error) => {
            console.warn('FBX load failed, using fallback geometry. URL:', modelUrl, error);
            createFallbackMesh();
            loadingRef.current = false;
          }
        );
      }
    } else {
      createFallbackMesh();
    }

    const lightConfigs = {
      soft: () => {
        scene.add(new THREE.AmbientLight(0xffffff, 1.1));
        const key = new THREE.DirectionalLight(0xffffff, 0.9); key.position.set(4, 6, 6); scene.add(key);
        const fill = new THREE.DirectionalLight(0x88bbff, 0.5); fill.position.set(-5, -1, -4); scene.add(fill);
        const rim = new THREE.PointLight(0x00f5d4, 0.9, 25); rim.position.set(0, 3, -4); scene.add(rim);
        scene.add(new THREE.HemisphereLight(0xddddff, 0x181820, 0.35));
      },
      studio: () => {
        scene.add(new THREE.AmbientLight(0xffffff, 1.25));
        const key = new THREE.DirectionalLight(0xffffff, 1.4); key.position.set(3, 5, 4); key.castShadow = false; scene.add(key);
        const fill = new THREE.DirectionalLight(0x88bbff, 0.75); fill.position.set(-4, -2, -3); scene.add(fill);
        const rim = new THREE.PointLight(0x00f5d4, 1.6, 35); rim.position.set(0, 2.2, -3.5); scene.add(rim);
        scene.add(new THREE.HemisphereLight(0xeeeeff, 0x202028, 0.5));
      },
      dramatic: () => {
        scene.add(new THREE.AmbientLight(0xffffff, 0.55));
        const key = new THREE.SpotLight(0xffffff, 2.0, 50, Math.PI / 6, 0.25, 1.2); key.position.set(6, 10, 8); scene.add(key);
        const lowFill = new THREE.DirectionalLight(0x2244aa, 0.5); lowFill.position.set(-6, -3, -5); scene.add(lowFill);
        const rim = new THREE.PointLight(0x00f5d4, 2.2, 40); rim.position.set(-1, 3, -4); scene.add(rim);
        const glow = new THREE.PointLight(0xe0aaff, 1.2, 25); glow.position.set(2, -1, 3); scene.add(glow);
      }
    } as const;
    (lightConfigs[lightingPreset] || lightConfigs['studio'])();

    if (!modelUrl) {
      camera.position.z = 3;
    }

  const rotationSpeed = autoRotateSpeed;

    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      
      if (mesh) {
        mesh.rotation.x += rotationSpeed;
        mesh.rotation.y += rotationSpeed * 0.7;
      }
      
      renderer.render(scene, camera);
      
      if (sceneRef.current) {
        sceneRef.current.animationId = animationId;
      }
    };

    animate();

    sceneRef.current = {
      scene,
      camera,
      renderer,
      mesh: mesh || new THREE.Object3D(),
      animationId: 0
    };

    const handleResize = () => {
      if (!containerRef.current || !sceneRef.current) return;
      
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      
      sceneRef.current.camera.aspect = newWidth / newHeight;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        
        if (mesh && (mesh as THREE.Mesh).isMesh) {
          const m = mesh as THREE.Mesh;
          m.geometry?.dispose();
          if (Array.isArray(m.material)) {
            m.material.forEach(mat => mat.dispose && mat.dispose());
          } else {
            const mat = m.material as THREE.Material;
            if (mat && 'dispose' in mat && typeof (mat as { dispose: () => void }).dispose === 'function') {
              (mat as { dispose: () => void }).dispose();
            }
          }
        } else if (mesh) {
          mesh.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const c = child as THREE.Mesh;
              c.geometry?.dispose();
              if (Array.isArray(c.material)) {
                c.material.forEach(mat => mat.dispose && mat.dispose());
              } else {
                const mat2 = c.material as THREE.Material;
                if (mat2 && 'dispose' in mat2 && typeof (mat2 as { dispose: () => void }).dispose === 'function') {
                  (mat2 as { dispose: () => void }).dispose();
                }
              }
            }
          });
        }
        
        if (container.contains(sceneRef.current.renderer.domElement)) {
          container.removeChild(sceneRef.current.renderer.domElement);
        }
        
        if (pmremGenerator) {
          try { pmremGenerator.dispose(); } catch { /* ignore */ }
        }
        sceneRef.current.renderer.dispose();
      }
    };
  }, [containerId, geometryType, color, modelUrl, autoRotateSpeed, fitToView, targetSize, modelScale, showAxes, lightingPreset, exposure, envMap]);

  return (
    <div 
      ref={containerRef} 
      className={className}
      id={containerId}
    />
  );
};

export default ThreeJSScene;