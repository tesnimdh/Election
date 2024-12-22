const express = require("express");
require("dotenv").config();
const connectDB = require("./src/config/db");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  next();
});

const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("assets"));
app.use(express.static(path.join(__dirname, "css")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layout");

// Connect to database
connectDB();

//routes
const authRoutes = require("./src/features/user/userRoutes");
const candidateRoutes = require("./src/features/condidate/candidateRoutes");
const commentRoutes = require("./src/features/comment/commentRoutes");
const voteRoutes = require("./src/features/vote/voteRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/votes", voteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
