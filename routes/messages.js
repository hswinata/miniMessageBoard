const express = require("express");
const router = express.Router();
const message_controller = require("../controllers/messageController");

// GET catalog of messages:
router.get("/", message_controller.list);

//GET /new page:
router.get("/new", message_controller.form);

//POST /new message:
router.post("/new", message_controller.create_message);

//DELETE a message:
router.delete("", message_controller.delete_message);

module.exports = router;
