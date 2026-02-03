const express = require("express");
const router = express.Router();
const noteController = require("../controllers/note_controller");
const createNoteLimiter = require("../middleware/rate_limit_middleware")

router.post("/create", createNoteLimiter, noteController.createNote);

router.get("/get", noteController.getAllNotes);

router.put("/:id", noteController.updateNote);

router.get("/search", noteController.searchNotes);

module.exports = router;
