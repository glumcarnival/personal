import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";


import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={2} groundColor="black" />
      <pointLight intensity={1} />
    
      <primitive
        object={computer.scene}
        scale={isMobile ? .7 : 0.75}
        position={isMobile ?  [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');

    // Set the isMobile variable to match the device
    setIsMobile(mediaQuery.matches);

    // Callback function if there are changes made (say screen size)
    const handleMediaQueryChange = (event) =>{
      setIsMobile(event.matches);
    }

    // Add the callback fn and listen for changes in the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Remove the listener when the componenent isnt mounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  },[])

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile}/>
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;