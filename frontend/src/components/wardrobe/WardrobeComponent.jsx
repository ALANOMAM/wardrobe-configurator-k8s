import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import "primeflex/primeflex.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { FloatLabel } from "primereact/floatlabel";
import { ColorPicker } from "primereact/colorpicker";

import BackPanel from "./partials/BackPanel";
import Base from "./partials/Base";
import LeftSidePanel from "./partials/LeftSidePanel";
import RightSidePanel from "./partials/RightSidePanel";
import TopPanel from "./partials/TopPanel";
import Glass from "./partials/Glass";

import Ground from "../Ground";
import Origin from "../Origin";

import { useFrame } from "@react-three/fiber";

function WardrobeComponent({ wardrobeIdProp }) {
  console.log("wardrobeIdProp", wardrobeIdProp);
  const [visible, setVisible] = useState(false);
  const [panelTypeId, setPanelTypeId] = useState();
  const [widthValue, setWidthValue] = useState();
  const [heightValue, setHeightValue] = useState();
  const [depthValue, setDepthValue] = useState();
  const [colorRGB, setColorRGB] = useState(null);

  const [selectedPanel, setSelectedPanel] = useState(null);

  //Manages the visual dimensions of my elements
  const [topPanelScale, setTopPanelScale] = useState();
  const [leftPanelScale, setLeftPanelScale] = useState();
  const [rightPanelScale, setRightPanelScale] = useState();
  const [backPanelScale, setBackPanelScale] = useState();
  const [glassScale, setGlassScale] = useState();
  const [baseScale, setBaseScale] = useState();

  //creates an array of panels fetched fron backend,
  const [wardrobePanels, setWardrobePanels] = useState([]);

  useEffect(() => {
    if (wardrobeIdProp) {
      // fetch(`http://backend:4000/wardrobes/${wardrobeIdProp}/panels`)
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/wardrobes/${wardrobeIdProp}/panels`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched wardrobe panels", data);
          setWardrobePanels(data);

          //MAP EACH PANEL TO ITS COMPONENT BASED ON PANEL TYPE ID  START
          //select from the panels array belonging to a specific wardrobe and assign the
          // measures to each panel based on the panel type, this helps for visual representation
          // map panel_type_id => scale
          data.forEach((panel) => {
            const scale = [
              (panel.width ?? 1000) / 1000,
              (panel.height ?? 1000) / 1000,
              (panel.depth ?? 1000) / 1000,
            ];

            switch (panel.panel_type_id) {
              case 1:
                setTopPanelScale(scale);
                break;
              case 2:
                setBaseScale(scale);
                break;
              case 3:
                setLeftPanelScale(scale);
                break;
              case 4:
                setRightPanelScale(scale);
                break;
              case 5:
                setBackPanelScale(scale);
                break;
              case 6:
                setGlassScale(scale);
                break;
              default:
                break;
            }
          });

          //MAP EACH PANEL TO ITS COMPONENT BASED ON PANEL TYPE ID  END
        })
        .catch((err) => console.error("Error fetching panels:", err));
    }
  }, [wardrobeIdProp]);
  //

  // //
  // useEffect(() => {
  //   fetch("http://backend:4000/panel-types")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("panel types ", data);
  //       // setPanelTypes(data);
  //     })
  //     .catch((err) => console.error("Error:", err));
  // }, []);
  // //

  // //
  // useEffect(() => {
  //   fetch("http://backend:4000/colors")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("colors ", data);
  //       // setPanelTypes(data);
  //     })
  //     .catch((err) => console.error("Error:", err));
  // }, []);
  // //

  // //
  // useEffect(() => {
  //   fetch("http://backend:4000/manufacturers")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("manufacturers ", data);
  //       // setPanelTypes(data);
  //     })
  //     .catch((err) => console.error("Error:", err));
  // }, []);
  // //

  useEffect(() => {
    if (selectedPanel) {
      setWidthValue(selectedPanel.width);
      setHeightValue(selectedPanel.height);
      setDepthValue(selectedPanel.depth);
      setColorRGB(selectedPanel.color);
      setPanelTypeId(selectedPanel.id);
    }
  }, [selectedPanel]);

  const handleSave = () => {
    {
      const newScale = [
        (widthValue ?? 1000) / 1000,
        (heightValue ?? 1000) / 1000,
        (depthValue ?? 1000) / 1000,
      ];

      // Save the panel scale to the appropriate state
      switch (selectedPanel?.panelKey) {
        case 1:
          setTopPanelScale(newScale);
          break;
        case 2:
          setBaseScale(newScale);
          break;
        case 3:
          setLeftPanelScale(newScale);
          break;
        case 4:
          setRightPanelScale(newScale);
          break;
        case 5:
          setBackPanelScale(newScale);
          break;
        case 6:
          setGlassScale(newScale);
          break;
        default:
          break;
      }

      // Detect if this panel already exists
      const existingPanel = wardrobePanels.find(
        (p) => p.panel_type_id === panelTypeId
      );
      // If it exist the modal is in update mode, otherwise in create mode
      const method = existingPanel ? "PUT" : "POST";
      const url = existingPanel
        ? // ? `http://backend:4000/wardrobes/${wardrobeIdProp}/panels/${existingPanel.id}`
          // : `http://backend:4000/wardrobes/${wardrobeIdProp}/panels`;
          `${process.env.REACT_APP_BACKEND_URL}/wardrobes/${wardrobeIdProp}/panels/${existingPanel.id}`
        : `${process.env.REACT_APP_BACKEND_URL}/wardrobes/${wardrobeIdProp}/panels`;

      // Construct the data object to send to the backend
      const data = {
        width: widthValue,
        height: heightValue,
        depth: depthValue,
        color: colorRGB,
        wardrobe_id: wardrobeIdProp,
        panel_type_id: panelTypeId,
      };

      // Make the API request to save the data for panels
      fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then(() => {
          console.log(
            `Successfully ${method === "POST" ? "created" : "updated"} panel`
          );
          setVisible(false); // Close the modal after saving
          setSelectedPanel(null);
          setWidthValue(null);
          setHeightValue(null);
          setDepthValue(null);
          setColorRGB(null);

          // Refresh the wardrobePanels to get updated panel data
          return fetch(
            // `http://backend:4000/wardrobes/${wardrobeIdProp}/panels`
            `${process.env.REACT_APP_BACKEND_URL}/wardrobes/${wardrobeIdProp}/panels`
          );
        })
        .then((res) => res.json())
        .then((data) => {
          setWardrobePanels(data);

          data.forEach((panel) => {
            const scale = [
              (panel.width ?? 1000) / 1000,
              (panel.height ?? 1000) / 1000,
              (panel.depth ?? 1000) / 1000,
            ];

            switch (panel.panel_type_id) {
              case 1:
                setTopPanelScale(scale);
                break;
              case 2:
                setBaseScale(scale);
                break;
              case 3:
                setLeftPanelScale(scale);
                break;
              case 4:
                setRightPanelScale(scale);
                break;
              case 5:
                setBackPanelScale(scale);
                break;
              case 6:
                setGlassScale(scale);
                break;
              default:
                break;
            }
          });
        })
        .catch((error) => {
          console.error("Error saving data:", error);
          // Optionally show an error message to the user
        });
    }
  };

  const footerContent = (
    <div>
      <Button
        label="Close"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        onClick={() => handleSave()}
        autoFocus
      />
    </div>
  );

  return (
    <>
      <div className="card">
        <Dialog
          header={selectedPanel?.name || "Panel Info"}
          visible={visible}
          style={{ width: "20vw", height: "50vh" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
          footer={footerContent}
        >
          <FloatLabel className="mt-4">
            <InputNumber
              id="width-input"
              value={widthValue}
              onValueChange={(e) => setWidthValue(e.value)}
            />
            <label htmlFor="width-input">Width (mm)</label>
          </FloatLabel>
          <FloatLabel className="mt-4">
            <InputNumber
              id="height-input"
              value={heightValue}
              onValueChange={(e) => setHeightValue(e.value)}
            />
            <label htmlFor="height-input">Height (mm)</label>
          </FloatLabel>
          <FloatLabel className="mt-4">
            <InputNumber
              id="depth-input"
              value={depthValue}
              onValueChange={(e) => setDepthValue(e.value)}
            />
            <label htmlFor="depth-input">Depth (mm)</label>
          </FloatLabel>
          {/* 
          <div className="mt-3 flex align-items-center gap-2">
            <label htmlFor="">Panel color</label>
            <ColorPicker
              format="rgb"
              value={colorRGB}
              onChange={(e) => setColorRGB(e.value)}
            />
          </div> */}
        </Dialog>
      </div>

      <Canvas shadows camera={{ position: [5, 7, 10], fov: 60 }}>
        {/* illuminate my elemnet from an angle */}
        <pointLight position={[4, 2, 4]} intensity={10} color="white" />;
        {/* illuminate my element from the top, responsible for shadows */}
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <Origin />
        {/* "panelData" is the "panelInfo" taken from each element once clicked.It is an object */}
        <TopPanel
          onClick={(panelData) => {
            setSelectedPanel({ ...panelData, panelKey: 1 });
            setVisible(true);
          }}
          positionProp={[3, 4, 0]}
          dimensionsPropInMeters={topPanelScale}
        />
        <Base
          onClick={(panelData) => {
            setSelectedPanel({ ...panelData, panelKey: 2 });
            setVisible(true);
          }}
          positionProp={[3, 0, 0]}
          dimensionsPropInMeters={baseScale}
        />
        <LeftSidePanel
          onClick={(panelData) => {
            setSelectedPanel({ ...panelData, panelKey: 3 });
            setVisible(true);
          }}
          positionProp={[2, 0, 0]}
          dimensionsPropInMeters={leftPanelScale}
        />
        <RightSidePanel
          onClick={(panelData) => {
            setSelectedPanel({ ...panelData, panelKey: 4 });
            setVisible(true);
          }}
          positionProp={[4, 0, 0]}
          dimensionsPropInMeters={rightPanelScale}
        />
        <BackPanel
          onClick={(panelData) => {
            setSelectedPanel({ ...panelData, panelKey: 5 });
            setVisible(true);
          }}
          positionProp={[3, 0, -1]}
          dimensionsPropInMeters={backPanelScale}
        />
        <Glass
          onClick={(panelData) => {
            setSelectedPanel({ ...panelData, panelKey: 6 });
            setVisible(true);
          }}
          positionProp={[2.5, 0, 2]}
          dimensionsPropInMeters={glassScale}
        />
        <Ground />
        <OrbitControls target={[4, 0, 0]} />
      </Canvas>
    </>
  );
}

export default WardrobeComponent;
