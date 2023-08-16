const express = require("express");
const router = express.Router();
const message_controller = require("../controllers/messageController");

// GET messages:
router.get("/", message_controller.list);

//GET /new page:
router.get("/new", message_controller.form);

//POST /new message:
router.post("/new", message_controller.create_message);

//POST request to delete a message:
router.post("/:id/delete", message_controller.delete_message);

// GET a single message:
router.get("/:id", message_controller.message_get);

module.exports = router;
