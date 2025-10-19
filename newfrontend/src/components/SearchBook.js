import React, { useState } from "react";
import axios from "axios";
 import "./SearchBook.css"; // optional for styling

function SearchBook() {
  const [bookId, setBookId] = useState("");
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setBookId(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setBook(null);
    setError("");

    if (!bookId) {
      setError("Please enter a Book ID");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3000/search/${bookId}`);
      setBook(res.data);
    } catch (err) {
      console.error(err);
      setError("Book not available");
    }
  };

  return (
    <div className="search-book">
      <h2>Search Book by ID</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={bookId}
          onChange={handleChange}
          placeholder="Enter Book ID"
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      {book && (
        <div className="book-details">
          <h3>Book Details</h3>
          <p>
            <strong>Book Name:</strong> {book.BookName}
          </p>
          <p>
            <strong>Book ID:</strong> {book.Book_id}
          </p>
          <p>
            <strong>Publisher Number:</strong> {book.Publisher_Number}
          </p>
          <p>
            <strong>Date of Publication:</strong>{" "}
            {new Date(book.Date_of_Publication).toLocaleDateString()}
          </p>
          <p>
            <strong>No. of Pages:</strong> {book.No_of_Pages}
          </p>
          <p>
            <strong>Cost:</strong> {book.Cost}
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchBook;
