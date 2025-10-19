const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors);
const LibSchema = new mongoose.Schema({
  BookName: {
    type: String,
    required: true,
  },
  Book_id: {
    type: Number,
    unique: true,
    required: true,
  },
  Publisher_Number: {
    type: Number,
    required: true,
  },
  Date_of_Publication: {
    type: Date,
  },
  No_of_Pages: {
    type: Number,
    required: true,
  },
  Cost: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Library", LibSchema);
