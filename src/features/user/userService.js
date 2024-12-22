const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./UserModel");

// Register new user
const registerUser = async (username, cin, email, password, age) => {
  let user = await User.findOne({ cin });
  if (user) throw new Error("User with this CIN already exists");

  user = new User({
    username,
    cin,
    email,
    password: await bcrypt.hash(password, 10),
    age,
  });

  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

// Login user
const loginUser = async (cin, password) => {
  const user = await User.findOne({ cin });
  if (!user) throw new Error("Invalid CIN or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid CIN or password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

const editUser = async (userId, updates) => {
  const { username, age, email, password } = updates;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (username) user.username = username;
  if (age) user.age = age;
  if (email) {
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.id !== userId) {
      throw new Error("Email is already in use");
    }
    user.email = email;
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }

  await user.save();
  return user;
};

const addFavorite = async (userId, candidateId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("Utilisateur introuvable");

  if (user.favorites.includes(candidateId)) {
    throw new Error("Ce candidat est déjà dans vos favoris");
  }

  user.favorites.push(candidateId);
  await user.save();
  return user;
};

const getFavorites = async (userId) => {
  const user = await User.findById(userId).populate("favorites");
  if (!user) throw new Error("Utilisateur introuvable");

  return user.favorites;
};

const removeFavorite = async (userId, candidateId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("Utilisateur introuvable");

  user.favorites = user.favorites.filter(
    (fav) => fav.toString() !== candidateId
  );
  await user.save();
  return user;
};

const logoutUser = (res) => {
  res.clearCookie("token", {
    httpOnly: true,
  });

  return {
    message: "Logout successful",
  };
};
const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  editUser,
  addFavorite,
  getFavorites,
  removeFavorite,
  logoutUser,
  getUserById,
};
