import React from "react";
import styles from "../styles/WardrobesPage.module.css";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";

function WardrobesPage() {
  const navigate = useNavigate();

  //
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // fetch("http://backend:4000/wardrobes")
    fetch(`${process.env.REACT_APP_BACKEND_URL}/wardrobes`)
      .then((res) => res.json())
      .then((data) => {
        console.log("wardrobes", data);
        setProducts(data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);
  //

  //
  const [manufacturers, setManufacturers] = useState([]);
  useEffect(() => {
    // fetch(`http://backend:4000/manufacturers`)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/manufacturers`)
      .then((res) => res.json())
      .then((data) => setManufacturers(data));
  }, []);

  //

  const handleGoTo3d = (rowData) => {
    console.log("Navigating to 3D view for:", rowData);
    // Navigate to /3d, optionally pass wardrobe ID
    navigate(`/wardrobes/${rowData.id}/3d`);
  };

  const handleEdit = (rowData) => {
    navigate(`/wardrobes/${rowData.id}/edit`);
  };

  const handleDelete = async (rowData) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete wardrobe "${rowData.production_code}"?`
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        // `http://backend:4000/wardrobes/${rowData.id}`,
        `${process.env.REACT_APP_BACKEND_URL}/wardrobes/${rowData.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete wardrobe.");
      }

      // Remove deleted wardrobe from UI
      setProducts((prev) => prev.filter((item) => item.id !== rowData.id));

      alert("Wardrobe deleted successfully.");
    } catch (error) {
      console.error("Deletion error:", error);
      alert("Failed to delete wardrobe.");
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <button
          className="p-button p-button-sm p-button-success"
          onClick={() => handleGoTo3d(rowData)}
        >
          Go to 3D
        </button>
        <button
          className="p-button p-button-sm p-button-info"
          onClick={() => handleEdit(rowData)}
        >
          Edit
        </button>
        <button
          className="p-button p-button-sm p-button-danger"
          onClick={() => handleDelete(rowData)}
        >
          Delete
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="card">
        <h3 className={styles.heading}>Wardrobes</h3>
        <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
          <Column field="id" header="ID" hidden />
          <Column field="production_code" header="Production Code" />
          <Column field="technician_name" header="Technician" />
          <Column field="client_name" header="Client Name" />
          <Column field="client_email" header="Client Email" />
          <Column field="client_phone" header="Client Phone" />
          <Column field="client_address" header="Client Address" />
          <Column
            header="Manufacturer"
            body={(rowData) => {
              const manufacturer = manufacturers.find(
                (m) => m.id === rowData.manufacturer_id
              );
              return manufacturer ? manufacturer.name : "Unknown";
            }}
          />
          <Column
            header="Actions"
            body={actionBodyTemplate}
            style={{ minWidth: "10rem" }}
          />
        </DataTable>
      </div>
    </>
  );
}

export default WardrobesPage;
