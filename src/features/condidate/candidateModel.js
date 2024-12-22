const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  party: { type: String, required: true },
  biography: { type: String, required: true },
  program: { type: String, required: true },
  picture: { type: String, required: true },
});

module.exports = mongoose.model("Candidate", candidateSchema);
