const Pool = require("pg").Pool;
const config = require("../models/config");
const pool = new Pool(config);

/// ROUTES ///

//GET all messages:
exports.list = (req, res, next) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    } else {
      let allMessages = results.rows;
      res.render("messages", {
        title: "List of all messages",
        messages_list: allMessages,
      });
    }
  });
};

//GET a single message:
exports.message_get = (req, res, next) => {
  const userId = req.params.id;
  pool.query(
    "SELECT * FROM users WHERE id = $1",
    [userId],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        let message = results.rows[0];
        res.render("message_single", {
          title: "This is a single message",
          message: message,
        });
      }
    }
  );
};

// Display create message form:
exports.form = (req, res, next) => {
  res.render("messages_form", {
    title: "Add a new message!",
  });
};

// PUT a new message:
exports.create_message = (req, res) => {
  const { username, text } = req.body;
  let newDate = new Date();
  let date = newDate.toLocaleString();

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

/*DELETE a message*/
exports.delete_message = (req, res) => {
  const messageId = req.params.id;
  pool.query(
    "DELETE FROM users WHERE id = $1",
    [messageId],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).redirect("/messages");
    }
  );
};
