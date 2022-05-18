const express = require('express');
const router = express.Router();
const fs = require('fs');

router.use((req, res, next) => {
    console.log('Notes Router Incoming Request');
    next();
  });

  const readBook = () => {
      const booksContent = fs.readFileSync("./data/books.json");
      return JSON.parse(booksContent)
  }

  router.get("/usedbook", (req,res)=> {
      const booksContent = readBook();
      res.status(200).json(booksContent)
  })

  module.exports = router;