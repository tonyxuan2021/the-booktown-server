const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile.js").development);
const usedBookController = require("../controllers/usedBookController");

router.route("/").get(usedBookController.index);

const fs = require("fs");
// var uniqid = require("uniqid");

router.use((req, res, next) => {
  console.log("Notes Router Incoming Request");
  next();
});

router.post("/", (req, res) => {
  // const booksContent = readBook();

  const newBook = {
    // id: uniqid(),
    name: req.body.name,
    price: req.body.price,
    author: "",
    image: `http://localhost:5050/${req.body.filepathUrl}`,
  };

  knex("usedbook")
    .insert(newBook)
    .then(() => {
      res.status(201).json(newBook);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/:bookId", (req, res) => {
  knex("usedbook")
    .where({
      id: req.params.bookId,
    })
    .del()
    .then(() => {
      res.status(204).send(`book with id: ${req.params.id} has been deleted`);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/image", (req, res) => {
  console.log(req.files);
  res.status(201).send("test done");
});

module.exports = router;
