const mongoose = require("mongoose");
const express = require("express");
const app = express();
const Library = require("./models/Library");
const cors = require("cors");
mongoose
  .connect(
    "mongodb+srv://ruthwik31:62GFShy6TpcUEdWd@ruthwik31.thoyq80.mongodb.net/library"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(cors());
app.use(express.json());
const PORT = 3000;
app.get("/search/:id", async (req, res) => {
  const book = await Library.findOne({ Book_id: req.params.id });
  if (book) {
    res.status(201).json(book);
  } else {
    res.status(404).send({ message: "Book not found" });
  }
});

app.post("/add", async (req, res) => {
  try {
    console.log("Request body:", req.body);
    // const book = new Library({
    //   BookName: req.body.BookName,
    //   Book_id: req.body.Book_id,
    //   Cost: req.body.Cost,
    //   No_of_Pages: req.body.No_of_Pages,
    //   Date_of_Publication: req.body.Date_of_Publication,
    //   Publisher_Number: req.body.Publisher_Number,
    // });
    const book = new Library({
      BookName: req.body.BookName,
      Book_id: req.body.Book_id,
      Cost: Number(req.body.Cost),
      No_of_Pages: Number(req.body.No_of_Pages),
      Date_of_Publication: new Date(req.body.Date_of_Publication),
      Publisher_Number: req.body.Publisher_Number,
    });
    // After successful save
    const savedBook = await book.save();
    res.status(201).send({ message: "Book created", book: savedBook });
  } catch (err) {
    console.error("Error saving book:", err);
    res.status(400).send({ message: "Failed to create book" });
  }
});
app.post("/display", async (req, res) => {
  try {
    const books = await Library.find();
    res.status(201).json(books);
  } catch (err) {
    res.status(400).send({ message: "Failed to retrieve books" });
  }
});
app.put("/update/:id", async (req, res) => {
  try {
    const ToBeUpdated = await Library.findOne({ Book_id: req.params.id });
    if (!ToBeUpdated) {
      return res.status(404).send({ message: "Book not found" });
    }
    const updateData = {
      BookName: req.body.BookName || ToBeUpdated.BookName,
      Cost: req.body.Cost || ToBeUpdated.Cost,
      No_of_Pages: req.body.No_of_Pages || ToBeUpdated.No_of_Pages,
      Date_of_Publication:
        req.body.Date_of_Publication || ToBeUpdated.Date_of_Publication,
      Publisher_Number:
        req.body.Publisher_Number || ToBeUpdated.Publisher_Number,
    };
    const updatedBook = await Library.findOneAndUpdate(
      { Book_id: req.params.id },
      updateData,
      { new: true }
    );

    if (updatedBook) {
      res.status(200).json(updatedBook);
    } else {
      res.status(404).send({ message: "Book not found" });
    }
  } catch (err) {
    console.error("Update error:", err);
    res.status(400).send({ message: "Failed to update book" });
  }
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
