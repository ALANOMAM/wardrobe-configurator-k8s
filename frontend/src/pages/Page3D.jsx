import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "primeicons/primeicons.css";

import styles from "../styles/Page3D.module.css";
import { Badge } from "primereact/badge";
import WardrobeComponent from "../components/wardrobe/WardrobeComponent";

function Page3D() {
  //i fetch the id of the wardrobe i need from the url "/warrobes/:id/3d"
  // this line only fetches the dinamic part of the url
  const { id } = useParams();

  const navigate = useNavigate();

  const [wardrobe, setWardrobe] = useState();
  const [manufacturers, setManufacturers] = useState([]);
  console.log("MANUFACTURERS", manufacturers);

  useEffect(() => {
    // fetch(`http://backend:4000/wardrobes/${id}`)
    // fetch(`http://localhost:4000/wardrobes/${id}`)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/wardrobes/${id}`)
      .then((res) => res.json())
      .then((data) => setWardrobe(data));
  }, [id]);

  useEffect(() => {
    // fetch(`http://backend:4000/manufacturers`)
    // fetch(`http://localhost:4000/manufacturers`)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/manufacturers`)
      .then((res) => res.json())
      .then((data) => setManufacturers(data));
  }, []);

  const handlePdf = (id) => {
    console.log("Navigating to PDF view for:", id);
    // Navigate to /3d, optionally pass wardrobe ID
    navigate(`/wardrobes/${id}/pdf`);
  };

  return (
    <>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>
          <h2>3D Page for Wardrobe ID: {id}</h2>

          {!wardrobe ? (
            <p>Loading wardrobe details...</p> // Show loading state
          ) : (
            <>
              <span>
                <strong>Production code: </strong>
                {wardrobe.production_code}
              </span>
              <span>
                <strong>Client name: </strong>
                {wardrobe.client_name}
              </span>
              <span>
                <strong>Manufacturer: </strong>
                {manufacturers.find((m) => m.id === wardrobe.manufacturer_id)
                  ?.name || "Unknown"}
              </span>
              <button
                className="p-button p-component p-button-success"
                onClick={() => handlePdf(id)}
              >
                Go to PDF
                <i className="pi pi-file-pdf"></i>
              </button>
            </>
          )}
        </div>
      </div>

      <div className={styles.axes}>
        <p>AXES</p>
        <div>
          <Badge value="x" severity="success"></Badge>
          <Badge value="y" severity="info"></Badge>
          <Badge value="z" severity="danger"></Badge>
        </div>
      </div>
      <WardrobeComponent wardrobeIdProp={id} />
    </>
  );
}

export default Page3D;
