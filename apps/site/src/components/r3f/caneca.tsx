/** @jsxImportSource react */
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, useGLTF, useHelper, useTexture } from "@react-three/drei";
import { useControls } from "leva";
import { DirectionalLightHelper, SpotLightHelper } from "three";

function Caneca(props) {
  const ref = useRef();

  const { nodes, materials } = useGLTF("/model/caneca.glb");

  const roughnessTexture = useTexture(`/textures/roughness.png`, (texture) => {
    texture.flipY = false;
  });

  const texture = useTexture(`/textures/${"Cup.jpg"}`, (texture) => {
    texture.flipY = false;
  });

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.cos(time / 2) / 6;
    ref.current.rotation.y = Math.sin(time / 2) / 6;
    ref.current.position.y = Math.sin(time / 1.5) / 10;
    ref.current.rotation.z = -0.1 - Math.sin(time / 1.5) / 20;
  });

  return (
    <>
      <group {...props} dispose={null}>
        <mesh
          geometry={nodes["Mug"].geometry}
          material={materials["Material"]}
          material-map={texture}
          material-roughness={5}
          material-roughnessMap={roughnessTexture}
          ref={ref}></mesh>
      </group>
    </>
  );
}

export { Caneca };
