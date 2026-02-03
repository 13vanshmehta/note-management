const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [1, "Title cannot be empty"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      minlength: [1, "Content cannot be empty"],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

noteSchema.pre("save", function () {
  if (!this.title.trim() || !this.content.trim()) {
    throw new Error("Title and content cannot be empty");
  }
});

noteSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("Note", noteSchema);
