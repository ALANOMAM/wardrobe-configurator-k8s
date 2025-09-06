import * as THREE from "three";

function Ground() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial attach="material" opacity={0.5} />
      </mesh>
    </>
  );
}

export default Ground;
