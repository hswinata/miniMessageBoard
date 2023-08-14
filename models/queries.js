const Pool = require("pg").Pool;
const config = require("./config");
const pool = new Pool(config);

/*GET all users*/
const getUsers = (req, res) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

/*GET a single user*/
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

/*POST a new user*/
const createUser = (req, res) => {
  const { username, text } = req.body;
  let date = new Date();

  pool.query(
    "INSERT INTO users (username, text, date) VALUES ($1, $2, $3) RETURNING * ",
    [username, text, date],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

/*DELETE a user*/
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = { getUsers, getUserById, createUser, deleteUser };