var express = require("express");
var router = express.Router();
const db = require("../models/queries");

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello world!",
    user: "Charles",
    added: new Date(),
  },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

/* GET /new page. */
router.get("/new", (req, res, next) => {
  res.render("form");
});

/*GET users*/
router.get("/users", db.getUsers);

/*GET users by ID*/
router.get("/users/:id", db.getUserById);

/* handle POST /new page. */
router.post("/new", db.createUser);

/* DELETE users*/
router.delete("/users/:id", db.deleteUser);

module.exports = router;
