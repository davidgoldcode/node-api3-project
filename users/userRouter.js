const express = require("express");
const User = require("./userDb.js");
const Post = require("../posts/postDb");
const { json, response } = require("express");
const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // do your magic!
  User.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "You have an error" });
    });
});

router.post("/:id/posts", validateUserId, (req, res) => {
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

router.get("/:id", validateUserId, (req, res) => {
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

router.get("/:id/posts", validateUserId, (req, res) => {
  const user_id = req.params.id;
  console.log(user_id);
  User.getUserPosts(user_id)
    .then((posts) => {
      if (user_id) {
        res.status(200).json({ posts });
      } else {
        json.status(404).json({ message: "Error!" });
      }
    })
    .catch((err) => {
      console.log(err);
      json.status(500).json({ message: "Could not process!" });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  User.remove(id)
    .then((user) => {
      if (id) {
        res.status(200).json({ user });
      } else {
        res.status(404).json({ message: "Unable to delete this user " });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Unable to perform this action at this time" });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  const changes = req.body;
  User.update(id, changes)
    .then((response) => {
      res.status(201).json({ response });
    })
    .catch((err) => {
      res.status(404).json({ message: "error", error: err });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id;
  User.getById(id)
    .then((user) => {
      console.log(user, "<=== user console");
      if (user) {
        console.log(user);
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "User not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).message({ message: "Invalid user ID" });
    });
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    return res.status(400).json({ message: "Missing user data" });
  } else if (!req.body.name) {
    return res.status(400).json({ message: "Missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    return res.status(400).json({ message: "Missing required text field" });
  } else if (!req.body.text) {
    return res.status(400).json({ message: "missing post data" });
  } else {
    next();
  }
}

module.exports = router;
