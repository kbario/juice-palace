/** @jsxImportSource react */

import { ContactShadows, PresentationControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Caneca } from "./caneca";
// import { ErrorBoundary } from "@react-three/fiber/dist/declarations/src/core/utils";

export default function () {
  const isMobile = true;
  return (
    // <ErrorBoundary >
    <Suspense fallback={<span>load</span>}>
      <Canvas
        camera={{ position: [0, 0, 25], fov: 45 }}
        style={{ touchAction: "none" }}>
        <ambientLight intensity={3} />
        <spotLight
          position={[10, 10, 10]}
          intensity={0.3}
          angle={0.45}
          penumbra={1}
        />
        {/* <Environment files="/assets/hdr/potsdamer_platz_1k.hdr" /> */}
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0.2, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
          <Caneca position={isMobile ? [0, -1.5, 0] : [0, 1.2, 0]} />
        </PresentationControls>
        <ContactShadows
          position={isMobile ? [0, -8.7, 0] : [0, -7.5, 0]}
          opacity={0.55}
          width={10}
          height={100}
          blur={2.5}
          far={20}
        />
      </Canvas>
    </Suspense>
    // </ErrorBoundary>
  );
}
