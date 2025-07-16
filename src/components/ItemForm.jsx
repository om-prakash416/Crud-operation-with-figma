import React, { useState } from "react";
import { useAddProductMutation } from "../features/api/crudApi";
import { useNavigate } from "react-router-dom";
import "../../src/App.css";

const ItemForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

  const [addProduct] = useAddProductMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, gender } = formData;

    if (name && email && phone && gender) {
      try {
        await addProduct(formData);
        setFormData({ name: "", email: "", phone: "", gender: "" });
        navigate("/");
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    } else {
      alert("Please fill all fields.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="form-wrapper">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
          className="form-input"
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          type="email"
          className="form-input"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone"
          type="tel"
          className="form-input"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <div className="form-button-wrapper">
          <button type="submit" className="form-button">
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
