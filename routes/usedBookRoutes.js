const express = require("express");
const router = express.Router();
const fs = require("fs");
var uniqid = require("uniqid");

router.use((req, res, next) => {
  console.log("Notes Router Incoming Request");
  next();
});

const readBook = () => {
  const booksContent = fs.readFileSync("./data/books.json");
  return JSON.parse(booksContent);
};

const writeBook = (data) => {
  const stringifiedData = JSON.stringify(data);
  fs.writeFileSync("./data/books.json", stringifiedData);
};

router.get("/", (req, res) => {
  const booksContent = readBook();
  res.status(200).json(booksContent);
});

router.post("/", (req, res) => {
  const booksContent = readBook();

  const newBook = {
    id: uniqid(),
    name: req.body.name,
    price: req.body.price,
    filepathUrl: `http://localhost:5050/${req.body.filepathUrl}`
  };

  booksContent.unshift(newBook);

  writeBook(booksContent);

  res.status(201).json(newBook);
});

router.post("/image", (req, res) => {
  console.log(req.files);
  res.status(201).send("test done")
});

module.exports = router;
