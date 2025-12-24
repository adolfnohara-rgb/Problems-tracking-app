const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// 9️⃣ Connect auth routes to server
// 🔁 Update server.js
// Add these lines above app.listen():
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// 1️⃣ Connect issue routes to server
// 🔁 Update server.js
// Add these lines above app.listen():
const issueRoutes = require("./routes/issueRoutes");
app.use("/api/issues", issueRoutes);



// 5️⃣ Connect admin routes to server
// 🔁 Update server.j
// Add these lines above app.listen():
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);




// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// mongo connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// START SERVER (THIS IS THE KEY PART)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
