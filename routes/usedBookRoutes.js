const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile.js").development)
const usedBookController = require('../controllers/usedBookController');

router.route('/').get(usedBookController.index);

const fs = require("fs");
// var uniqid = require("uniqid");

router.use((req, res, next) => {
  console.log("Notes Router Incoming Request");
  next();
});

// const readBook = () => {
//   const booksContent = fs.readFileSync("./data/books.json");
//   return JSON.parse(booksContent);
// };

// const writeBook = (data) => {
//   const stringifiedData = JSON.stringify(data);
//   fs.writeFileSync("./data/books.json", stringifiedData);
// };

// router.get("/", (req, res) => {
//   const booksContent = readBook();
//   res.status(200).json(booksContent);
// });

router.post("/", (req, res) => {
  // const booksContent = readBook();

  const newBook = {
    // id: uniqid(),
    name: req.body.name,
    price: req.body.price,
    author:"default",
    image: `http://localhost:5050/${req.body.filepathUrl}`
  };

  knex("usedbook").insert(newBook).then(()=> {
    res.status(201).json(newBook)
  }).catch((err)=> {
    res.status(400).json(err)
  })

  // booksContent.unshift(newBook);

  // writeBook(booksContent);

});

router.post("/image", (req, res) => {
  console.log(req.files);
  res.status(201).send("test done")
});

module.exports = router;
