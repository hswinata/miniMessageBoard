const Pool = require("pg").Pool;
const config = require("../models/config");
const pool = new Pool(config);

const Queries = require("../models/queries");

/// ROUTES ///

//GET details of messages:
exports.index = (req, res) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.render("messages");
  });
};

//Display list of all messages:
exports.list = (req, res, next) => {
  const allMessages = "haha";
  res.render("messages-list", {
    title: "Messages list",
    messages_list: allMessages,
  });
};

// Display create message form:
exports.form = (req, res, next) => {
  res.render("messages_form", {
    title: "Add new message to board!",
  });
};

// Handle book create on POST:
exports.create_message = (req, res, next) => {
  const { username, text } = req.body;
  let date = new Date();

  pool.query(
    "INSERT INTO users (username, text, date) VALUES ($1, $2, $3) RETURNING * ",
    [username, text, date],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).redirect("/messages");
    }
  );
};
