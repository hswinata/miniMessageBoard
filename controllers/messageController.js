const Pool = require("pg").Pool;
const config = require("../models/config");
const pool = new Pool(config);

/// ROUTES ///

//GET all messages:
exports.list = async (req, res, next) => {
  try {
    const results = await pool.query("SELECT * FROM users ORDER BY id ASC");
    const allMessages = results.rows;
    res.render("messages", {
      title: "List of all messages",
      messages_list: allMessages,
    });
  } catch (error) {
    throw error;
  }
};

//GET a single message:
exports.message_get = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const results = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    const message = results.rows[0];
    if (!message) {
      res.status(404).render("message_error", {
        message: "The message you're looking for doesn't exist!",
      });
    } else {
      res.render("message_single", {
        title: "This is a single message",
        message: message,
      });
    }
  } catch (error) {
    throw error;
  }
};

// Display form to create message:
exports.form = (req, res, next) => {
  res.render("messages_form", {
    title: "Add a new message!",
  });
};

// PUT a new message:
exports.create_message = async (req, res, next) => {
  const { username, text } = req.body;
  const newDate = new Date();
  const date = newDate.toLocaleString();

  try {
    pool.query(
      "INSERT INTO users (username, text, date) VALUES ($1, $2, $3) RETURNING *",
      [username, text, date]
    );
    res.status(201).redirect("/messages");
  } catch (error) {
    throw error;
  }
};

/*DELETE a message*/
exports.delete_message = async (req, res, next) => {
  const messageId = req.params.id;
  try {
    pool.query("DELETE FROM users WHERE id = $1", [messageId]);
    res.status(202).redirect("/messages");
  } catch (error) {
    throw error;
  }
};
