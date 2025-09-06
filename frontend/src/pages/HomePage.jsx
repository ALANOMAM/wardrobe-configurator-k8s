import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";
import { InputMask } from "primereact/inputmask";

import { useNavigate } from "react-router-dom"; //Import useNavigate
import { useParams } from "react-router-dom";

import styles from "../styles/HomePage.module.css";

function HomePage() {
  const [formData, setFormData] = useState({
    production_code: "",
    technician_name: "",
    manufacturer_id: "",
    client_name: "",
    client_address: "",
    client_phone: "",
    client_email: "",
  });

  const [manufacturers, setManufacturers] = useState([]);

  const { id } = useParams(); // <-- Get wardrobe ID from route if exists
  const isEditMode = Boolean(id); // If the ID exists it means i am in edit mode, so the form and data submission will adjust
  const navigate = useNavigate(); // Initialize navigate

  //
  useEffect(() => {
    if (isEditMode) {
      // fetch(`http://backend:4000/wardrobes/${id}`)
      // fetch(`http://localhost:4000/wardrobes/${id}`)
      fetch(`${process.env.REACT_APP_BACKEND_URL}/wardrobes/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData(data);
        })
        .catch((err) => console.error("Error:", err));
    }
  }, [id]);

  //

  //
  useEffect(() => {
    // fetch("http://backend:4000/manufacturers")
    // fetch("http://localhost:4000/manufacturers")
    fetch(`${process.env.REACT_APP_BACKEND_URL}/manufacturers`)
      .then((res) => res.json())
      .then((data) => {
        console.log("manufacturers", data);
        setManufacturers(data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);
  //

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEditMode
      ? `${process.env.REACT_APP_BACKEND_URL}/wardrobes/${id}`
      : `${process.env.REACT_APP_BACKEND_URL}/wardrobes`;

    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save wardrobe.");
      }

      alert(`Wardrobe ${isEditMode ? "updated" : "created"} successfully!`);
      setFormData({
        production_code: "",
        technician_name: "",
        manufacturer_id: "",
        client_name: "",
        client_address: "",
        client_phone: "",
        client_email: "",
      });
      //Redirect to /wardrobes
      navigate("/wardrobes");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to save wardrobe.");
    }
  };

  return (
    <div className="flex flex-column justify-content-center align-items-center">
      <h3 className={styles.heading}>Create a wardrobe</h3>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <FloatLabel className="mt-4">
          <InputText
            id="production_code"
            name="production_code"
            value={formData.production_code}
            onChange={handleChange}
          />
          <label htmlFor="production_code">Production code</label>
        </FloatLabel>

        <FloatLabel className="mt-4">
          <InputText
            id="technician_name"
            name="technician_name"
            value={formData.technician_name}
            onChange={handleChange}
          />
          <label htmlFor="technician_name">Technician name</label>
        </FloatLabel>

        <div>
          {/* <label htmlFor="manufacturer_id">Manufacturer</label> */}
          <select
            id="manufacturer_id"
            name="manufacturer_id"
            value={formData.manufacturer_id}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Select manufacturer</option>
            {manufacturers.map((manu) => (
              <option key={manu.id} value={manu.id}>
                {manu.name}
              </option>
            ))}
          </select>
        </div>

        <FloatLabel className="mt-4">
          <InputText
            id="client_name"
            name="client_name"
            value={formData.client_name}
            onChange={handleChange}
          />
          <label htmlFor="client_name">Client name</label>
        </FloatLabel>

        <FloatLabel className="mt-4">
          <InputTextarea
            id="client_address"
            name="client_address"
            value={formData.client_address}
            onChange={handleChange}
            rows={3}
          />
          <label htmlFor="client_address">Client address</label>
        </FloatLabel>

        <InputMask
          id="client_phone"
          name="client_phone"
          mask="(999) 999-9999"
          value={formData.client_phone}
          onChange={handleChange}
          placeholder="Client phone number"
          className="mt-4"
        />

        <FloatLabel className="mt-4">
          <InputText
            id="client_email"
            name="client_email"
            value={formData.client_email}
            onChange={handleChange}
          />
          <label htmlFor="client_email">Client email</label>
        </FloatLabel>

        <button type="submit" className="p-button p-component mt-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default HomePage;
