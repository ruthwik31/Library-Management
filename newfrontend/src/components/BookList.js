import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookList.css"; // optional, for styling the table

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.post("http://localhost:3000/display");
        setBooks(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch books");
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="book-list">
      <h2>All Books</h2>
      <table>
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Book ID</th>
            <th>Publisher Number</th>
            <th>Date of Publication</th>
            <th>No. of Pages</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.BookName}</td>
              <td>{book.Book_id}</td>
              <td>{book.Publisher_Number}</td>
              <td>{new Date(book.Date_of_Publication).toLocaleDateString()}</td>
              <td>{book.No_of_Pages}</td>
              <td>{book.Cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
