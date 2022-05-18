const express = require('express');
const router = express.Router();
const fs = require('fs');
var uniqid = require('uniqid'); 



router.use((req, res, next) => {
    console.log('Notes Router Incoming Request');
    next();
  });

  const readBook = () => {
      const booksContent = fs.readFileSync("./data/books.json");
      return JSON.parse(booksContent)
  }

  const writeBook = (data) => {
    const stringifiedData = JSON.stringify(data);
    fs.writeFileSync("./data/books.json", stringifiedData)
  }

  router.get("/usedbook", (req,res)=> {
      const booksContent = readBook();
      res.status(200).json(booksContent)
  })

  router.post("/usedbook", (req,res)=> {
      const booksContent = readBook();

      const newBook = {
        id:uniqid(),
        name: req.body.name,
        price: req.body.price
      }

      booksContent.push(newBook);

      writeBook(booksContent);

      res.status(201).json(newBook);
  })





  module.exports = router;