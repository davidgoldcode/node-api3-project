const express = require("express");
const { getById } = require("./postDb");
const Post = require("./postDb");
const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  Post.get()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "there was an error" });
    });
});

router.get("/:id", (req, res) => {
  // do your magic!
  const id = req.params.id;
  Post.getById(id)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "There was an error" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Post.remove(id)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(500).json({ message: err.error });
    });
});

router.put("/:id", (req, res) => {
  // do your magic!
  const id = req.params.id;
  console.log(req.body);
  Post.update(id, req.body)
    .then((result) => {
      if (result) {
        res.status(200).json({ result });
      } else {
        res.status(404).json({ message: "Post could not be found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server could not update at this time" });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
