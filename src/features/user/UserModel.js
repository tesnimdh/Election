const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minLength: 3 },
  cin: {
    type: String,
    required: true,
    unique: true,
    maxLength: 8,
    minLength: 8,
  },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true, minLength: 6 },
  age: { type: Number, required: true, min: 18, max: 120 },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Candidate" }],
});

module.exports = mongoose.model("User", userSchema);
