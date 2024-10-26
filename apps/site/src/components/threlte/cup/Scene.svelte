/** @jsxImportSource react */

import { ContactShadows, PresentationControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Caneca } from "./caneca";
// import { useControls } from "leva";

export default function () {
  // const { pos } = useControls({ pos: [0, 0, 0] });
  return (
    <Suspense>
      <Canvas
        camera={{ position: [0, 0, 25], fov: 45 }}
        style={{
          touchAction: "none",
          transform: "",
        }}>
        <ambientLight intensity={3} />
        <directionalLight intensity={3} />
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0.2, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
          <Caneca position={[-1, 0, 0]} />
        </PresentationControls>
        {/* <ContactShadows
          position={[0, -7.5, 0]}
          opacity={0.55}
          width={10}
          height={100}
          blur={2.5}
          far={20}
        /> */}
      </Canvas>
    </Suspense>
  );
}
