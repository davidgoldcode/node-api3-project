const express = require("express");
const User = require("./userDb.js");
const Post = require("../posts/postDb");
const { getById } = require("./userDb.js");
const router = express.Router();

// not fully working
router.post("/", (req, res) => {
  // do your magic!
  const name = req.body.name;
  User.insert(name)
    .then((message) => {
      res.status(210).json(message);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "You have an error" });
    });
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
  const msgInfo = { ...req.body, user_id: req.params.id };
  Post.insert(msgInfo)
    .then((post) => {
      res.status(210).json({ post });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "500 error on request" });
    });
});

router.get("/", (req, res) => {
  // do your magic!
  User.get()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error!" });
    });
});

router.get("/:id", (req, res) => {
  // do your magic!
  const id = req.params.id;
  User.getById(id)
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "There was an error" });
    });
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

// function validateUserId(id) {
//   return function (req, res, next) {
//     if req.headers.id === id {
//       // to continue
//     }
//     next()
//   }
// }

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
