import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./UpdateBook.css"; // optional

function UpdateBook() {
  const { id } = useParams(); // Book ID from URL
  const [bookData, setBookData] = useState({
    BookName: "",
    Cost: "",
    No_of_Pages: "",
    Date_of_Publication: "",
    Publisher_Number: "",
  });
  const [message, setMessage] = useState("");

  // Fetch current book data
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/search/${id}`);
        const book = res.data;
        setBookData({
          BookName: book.BookName,
          Cost: book.Cost,
          No_of_Pages: book.No_of_Pages,
          Date_of_Publication: book.Date_of_Publication
            ? new Date(book.Date_of_Publication).toISOString().substr(0, 10)
            : "",
          Publisher_Number: book.Publisher_Number,
        });
      } catch (err) {
        console.error(err);
        setMessage("Book not found");
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/update/${id}`,
        bookData
      );
      console.log(res.data);
      setMessage("Book updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update book.");
    }
  };

  return (
    <div className="update-book">
      <h2>Update Book</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="BookName"
          value={bookData.BookName}
          onChange={handleChange}
          placeholder="Book Name"
        />
        <input
          name="Cost"
          value={bookData.Cost}
          onChange={handleChange}
          placeholder="Cost"
        />
        <input
          name="No_of_Pages"
          value={bookData.No_of_Pages}
          onChange={handleChange}
          placeholder="Number of Pages"
        />
        <input
          type="date"
          name="Date_of_Publication"
          value={bookData.Date_of_Publication}
          onChange={handleChange}
          placeholder="Date of Publication"
        />
        <input
          name="Publisher_Number"
          value={bookData.Publisher_Number}
          onChange={handleChange}
          placeholder="Publisher Number"
        />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
}

export default UpdateBook;
