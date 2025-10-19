import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AddBook from "./components/AddBook";
import BookList from "./components/BookList";
import UpdateBook from "./components/UpdateBook";
import SearchBook from "./components/SearchBook";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="add" element={<AddBook />} />
        <Route path="display" element={<BookList />} />
        <Route path="update/:id" element={<UpdateBook />} />
        <Route path="search/:id" element={<SearchBook />} />
      </Route>
    </Routes>
  );
}

function Home() {
  return <h2>Welcome to the Library Management System</h2>;
}

export default App;
