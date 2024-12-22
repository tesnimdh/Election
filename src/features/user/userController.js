const {
  registerUser,
  loginUser,
  editUser,
  addFavorite,
  getFavorites,
  removeFavorite,
  logoutUser,
  getUserById,
} = require("./userService");

// Register user
const register = async (req, res) => {
  try {
    const { username, cin, email, password, age } = req.body;
    const token = await registerUser(username, cin, email, password, age);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });
    res.redirect("/api/candidates");
  } catch (error) {
    res.render("login", { error: error.message });
  }
};

const renderLoginView = (req, res) => {
  try {
    res.render("login", { title: "Login", error: null });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { cin, password } = req.body;

    const token = await loginUser(cin, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });
    res.redirect("/api/candidates");
  } catch (error) {
    res.render("login", { error: error.message });
  }
};

const edit = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);

    const updates = req.body;

    const updatedUser = await editUser(userId, updates);

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const addToFavorites = async (req, res) => {
  try {
    const userId = req.userId;
    const { candidateId } = req.params;

    const user = await addFavorite(userId, candidateId);
    res.redirect("/api/candidates");
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getUserFavorites = async (req, res) => {
  try {
    const userId = req.userId;

    const favorites = await getFavorites(userId);
    res.render("favorites", { title: "Favorites", favorites });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const removeFromFavorites = async (req, res) => {
  try {
    const userId = req.userId;
    const { candidateId } = req.params;

    const user = await removeFavorite(userId, candidateId);
    const favorites = await getFavorites(userId);
    res.render("favorites", { title: "Favorites", favorites });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const response = logoutUser(res);
    res.redirect("/api/auth/login");
  } catch (error) {
    res.status(500).json({
      message: "An error occurred during logout",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await getUserById(userId);
    res.render("myProfile", { title: "Profile", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  renderLoginView,
  edit,
  addToFavorites,
  getUserFavorites,
  removeFromFavorites,
  logout,
  getUser,
};
