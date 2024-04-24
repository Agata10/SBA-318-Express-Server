const express = require("express");
const router = express.Router();

const users = require("../data/users");
const posts = require("../data/posts");
const { render } = require("ejs");

router.route("/").get((req, res) => {
  res.render("users", { title: "users", users });
});

//Retrieves all posts by a user with the specified id
//it might have query to sort by id either desc or asc
router.route("/:id/posts/").get((req, res, next) => {
  const userPosts = posts.filter((p) => p.userId == req.params.id);
  const userName = users.find((u) => u.id == req.params.id).name;
  if (req.query.sortBy === "id:desc") {
    userPosts.sort((a, b) => {
      return b.id - a.id;
    });
  } else if (req.query.sortBy === "id:asc") {
    userPosts.sort((a, b) => {
      return a.id - b.id;
    });
  }
  if (userPosts) {
    return res.render("users", { title: "posts", users, userPosts, userName });
  } else {
    next();
  }
});

router.route("/:id/posts/create").get((req, res, next) => {
  console.log(req.body);
  res.render("createPost", { userId: req.params.id, title: "create post" });
});

module.exports = router;
