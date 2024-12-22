const express = require("express");
const {
  register,
  login,
  renderLoginView,
  edit,
  addToFavorites,
  getUserFavorites,
  removeFromFavorites,
  logout,
  getUser,
} = require("./userController");
const router = express.Router();
const verifyToken = require("../../middlewares/auth");

// signup
router.post("/register", register);

//login
router.post("/login", login);

// page login
router.get("/login", renderLoginView);

//update profile
router.put("/edit", verifyToken, edit);

//aad to favorites
router.post("/favorites/add/:candidateId", verifyToken, addToFavorites);

// get favorites
router.get("/favorites", verifyToken, getUserFavorites);

// remove favorites
router.post("/favorites/remove/:candidateId", verifyToken, removeFromFavorites);

//logout
router.get("/logout", logout);

//get user data
router.get("/profile", verifyToken, getUser);

module.exports = router;
