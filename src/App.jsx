import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";
import ItemEdit from "./components/ItemEdit";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Navbar */}
        <header className="navbar">
          <div className="navbar-content">
            <h1 className="logo">Employee Management</h1>
            <nav className="nav-links">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/add" className="nav-link highlight">
                Add Employee
              </Link>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/add" element={<ItemForm />} />
            <Route path="/edit/:id" element={<ItemEdit />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
