const Note = require("../model/note_model");

exports.createNote = async (req, res) => {
  try {
    let { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    title = title.trim();
    content = content.trim();

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content cannot be empty" });
    }

    const note = await Note.create({ title, content });

    res.status(201).json({
      message: "Note created successfully",
      data: note,
    });

  } catch (error) {
    console.error("Create Note Error:", error);
    res.status(500).json({ message: "Failed to Create Note" });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ updated_at: -1 });

    res.json({
      message: "Notes fetched successfully",
      data: notes,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    let { title, content } = req.body;

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    let isUpdated = false;

    if (title !== undefined) {
      title = title.trim();
      if (!title) {
        return res.status(400).json({ message: "Title cannot be empty" });
      }
      if (title !== note.title) {
        note.title = title;
        isUpdated = true;
      }
    }

    if (content !== undefined) {
      content = content.trim();
      if (!content) {
        return res.status(400).json({ message: "Content cannot be empty" });
      }
      if (content !== note.content) {
        note.content = content;
        isUpdated = true;
      }
    }

    if (!isUpdated) {
      return res.status(200).json({
        message: "No changes detected, note not updated",
      });
    }

    await note.save();

    res.json({
      message: "Note updated successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.searchNotes = async (req, res) => {
  try {
    let { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({ message: "Search query cannot be empty" });
    }

    q = q.trim();

    const notes = await Note.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
      ],
    }).sort({ updated_at: -1 });

    res.json({
      message: "Search results",
      data: notes,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};