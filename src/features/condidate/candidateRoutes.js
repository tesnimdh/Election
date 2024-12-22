const express = require("express");
const {
  getAll,
  getByName,
  getById,
  getByParty,
  getParties,
} = require("./candidateController");
const router = express.Router();
const verifyToken = require("../../middlewares/auth");

// get all candidates
router.get("/", verifyToken, getAll);

// get a candidate by name
router.get("/name/:name", verifyToken, getByName);

// get a candidate by ID
router.get("/:id", verifyToken, getById);

// get candidates by party
router.get("/party/:party", verifyToken, getByParty);

// Temporary add a new candidate
const { createCandidate } = require("./candidateService");
router.post("/", async (req, res) => {
  const { name, party, biography, program, picture } = req.body;
  try {
    const newCandidate = await createCandidate(
      name,
      party,
      biography,
      program,
      picture
    );
    res.status(201).json(newCandidate);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
