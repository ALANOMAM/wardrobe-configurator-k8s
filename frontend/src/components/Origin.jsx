import React from "react";
import { useRef } from "react";
import { useEffect } from "react";

const cylinderLength = 1;
const cylinderTopRadius = 0.1;
const cylinderBottomRadius = 0.1;

function SphereElement() {
  return (
    <>
      <mesh>
        <sphereGeometry args={[0.2, 30, 30]} />
        <meshBasicMaterial color="black" />
      </mesh>
    </>
  );
}

function Xaxis() {
  const cylinderRefX = React.useRef();

  React.useEffect(() => {
    if (cylinderRefX.current) {
      cylinderRefX.current.translate(0, cylinderLength / 2, 0); // move geometry up so the origin is at the base
    }
  }, []);

  return (
    <>
      <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry
          args={[cylinderTopRadius, cylinderBottomRadius, cylinderLength, 30]}
          ref={cylinderRefX}
        />
        <meshBasicMaterial color="green" />
      </mesh>
    </>
  );
}

function Yaxis() {
  const cylinderRefY = React.useRef();

  React.useEffect(() => {
    if (cylinderRefY.current) {
      cylinderRefY.current.translate(0, cylinderLength / 2, 0); // move geometry up so the origin is at the base
    }
  }, []);

  return (
    <>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry
          args={[cylinderTopRadius, cylinderBottomRadius, cylinderLength, 30]}
          ref={cylinderRefY}
        />
        <meshBasicMaterial color="blue" />
      </mesh>
    </>
  );
}

function Zaxis() {
  const cylinderRefZ = React.useRef();

  React.useEffect(() => {
    if (cylinderRefZ.current) {
      cylinderRefZ.current.translate(0, cylinderLength / 2, 0); // move geometry up so the origin is at the base
    }
  }, []);

  return (
    <>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry
          args={[cylinderTopRadius, cylinderBottomRadius, cylinderLength, 30]}
          ref={cylinderRefZ}
        />
        <meshBasicMaterial color="red" />
      </mesh>
    </>
  );
}

function Origin() {
  return (
    <>
      <SphereElement />
      <Xaxis />
      <Yaxis />
      <Zaxis />
    </>
  );
}

export default Origin;
