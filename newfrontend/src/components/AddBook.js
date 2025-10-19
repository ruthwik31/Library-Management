import React, { useState } from "react";
import axios from "axios";
import "./AddBook.css";
function AddBook() {
  const initialState = {
    BookName: "",
    Book_id: "",
    Cost: "",
    No_of_Pages: "",
    Date_of_Publication: "",
    Publisher_Number: "",
  };
  const [bookData, setBookData] = useState(initialState);
  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    try {
      const payload = {
        ...bookData,
        Book_id: Number(bookData.Book_id),
        Cost: Number(bookData.Cost),
        No_of_Pages: Number(bookData.No_of_Pages),
        Publisher_Number: Number(bookData.Publisher_Number),
        Date_of_Publication: new Date(bookData.Date_of_Publication),
      };
      const res = await axios.post("http://localhost:3000/add", payload);
      console.log(res.data);
      alert("Book added successfully!");
      setBookData(initialState);
    } catch (err) {
      console.error(err);
      alert("Failed to add book.");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="BookName"
        value={bookData.BookName}
        onChange={handleChange}
        placeholder="Book Name"
      />
      <input
        name="Book_id"
        value={bookData.Book_id}
        onChange={handleChange}
        placeholder="Book ID"
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
      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBook;