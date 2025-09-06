import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Html } from "@react-three/drei";

function TopPanel({ onClick, positionProp, dimensionsPropInMeters }) {
  const gltf = useGLTF("/wardrobe-img/topPanel.gltf");
  const meshRef = useRef();

  const [panelInfo, setPanelInfo] = useState(null);
  // here i save the dimensions of my gltf image from blender
  const [initialDimensions, setInitialDimensions] = useState();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!gltf.scene) return;

    // So that even the gltf casts and potentialy receives a shadow
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });

    // To get the real dimensions of the imported gltf element START
    const clonedScene = gltf.scene.clone(true);
    clonedScene.scale.set(1, 1, 1); // Reset scale to original
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    box.getSize(size);

    const scaleX = size.x;
    const scaleY = size.y;
    const scaleZ = size.z;

    setInitialDimensions([scaleX, scaleY, scaleZ]);

    console.log(
      "Top panel dimensions in meters (W x H x D):",
      scaleX,
      scaleY,
      scaleZ
    );
    // To get the real dimensions of the imported gltf element END

    let widthMM, heightMM, depthMM;

    // If i give dimension values in the modal, consider those and put them
    // in the "setPanelInfo" object, otherwise use the gltf dimension values
    if (dimensionsPropInMeters) {
      widthMM = dimensionsPropInMeters[0] * 1000;
      heightMM = dimensionsPropInMeters[1] * 1000;
      depthMM = dimensionsPropInMeters[2] * 1000;
    } else {
      widthMM = scaleX * 1000;
      heightMM = scaleY * 1000;
      depthMM = scaleZ * 1000;
    }

    //contains important info about my element that will be passed to parent element and
    // hence to the modal
    setPanelInfo({
      id: 1,
      name: "Top Panel",
      position: positionProp,
      color: "blue",
      width: widthMM,
      height: heightMM,
      depth: depthMM,
    });
  }, [gltf.scene, dimensionsPropInMeters, positionProp]);

  // forces my element to wat for "panelInfo" to be available before rendring
  if (!panelInfo) return null;

  return (
    <group position={panelInfo.position}>
      <primitive
        ref={meshRef}
        object={gltf.scene}
        onClick={() => onClick(panelInfo)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        // the values in "[]" represent the dimensions of my gltf image from blender
        scale={
          dimensionsPropInMeters || [
            initialDimensions[0],
            initialDimensions[1],
            initialDimensions[2],
          ]
        }
        castShadow
      />
      {hovered && (
        <Html distanceFactor={15}>
          <div
            style={{
              background: "white",
              padding: "4px 8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "12px",
              whiteSpace: "nowrap",
            }}
          >
            <strong>{panelInfo.name}</strong>
            <p>Click to edit</p>
          </div>
        </Html>
      )}
    </group>
  );
}

export default TopPanel;
