import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";

function Layout() {
  return (
    <div>
      <header className="header">
        <h1>Library Management System</h1>
        <nav>
          <NavLink
            to="/add"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Add Book
          </NavLink>
          {" | "}
          <NavLink
            to="/display"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            View Books
          </NavLink>
          {" | "}
          <NavLink
            to="/update/1"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Update Book
          </NavLink>
          {" | "}
          <NavLink
            to="/search/1"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Search Book
          </NavLink>
        </nav>
      </header>

      <main>
        <Outlet /> {/* Page content renders here */}
      </main>
    </div>
  );
}

export default Layout;
