import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../features/api/crudApi";
import "../../src/App.css";

const ItemEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: products, isLoading } = useGetProductsQuery();
  const [updateProduct] = useUpdateProductMutation();

  const item = products?.find((item) => item._id === id);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        email: item.email || "",
        phone: item.phone || "",
        gender: item.gender || "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({ id, ...formData }).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (isLoading || !item) return <p className="text-center">Loading...</p>;

  return (
    <div className="form-container">
      <h2 className="form-title">Edit Employee</h2>
      <form onSubmit={handleUpdate} className="form-wrapper">
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
        <div className="form-button-group">
          <button type="submit" className="btn-update">
            Update
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn-cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemEdit;
