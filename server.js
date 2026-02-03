require("dotenv").config();
const express = require("express");

const connectDB = require("./utils/db_connection");
connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes
app.get("/", (req, res) => {
  res.send("Server is up and running!!");
});

const noteRoutes = require("./routers/note_router");
app.use("/api/notes", noteRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
