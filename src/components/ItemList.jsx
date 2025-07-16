import React from "react";
import noImg from "../assets/image/no-database1.png";
import { Link } from "react-router-dom";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../features/api/crudApi";
import "../../src/App.css";

const ItemList = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteProduct(id).unwrap();
      } catch (error) {
        console.error("Failed to delete the product:", error);
      }
    }
  };

  if (isLoading)
    return <p className="text-center text-gray-600">Loading...</p>;

  if (isError)
    return <p className="text-center text-red-600">Failed to load products.</p>;

  if (!products?.length)
    return (
      <div className="empty-records">
        <img src={noImg} alt="No products" className="empty-image" />
        <p className="empty-text">No Employee Records Found</p>
      </div>
    );

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead className="table-header">
          <tr>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item._id} className="table-row">
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.gender}</td>
              <td>
                <Link to={`/edit/${item._id}`}>
                  <button className="btn edit-btn">Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
