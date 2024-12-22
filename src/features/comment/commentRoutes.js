const express = require("express");
const { add, getByCandidate } = require("./commentController");
const router = express.Router();
const verifyToken = require("../../middlewares/auth");

// add a comment
router.post("/comment/:candidate_id", verifyToken, add);

// get comments by candidate
router.get("/:candidate_id", verifyToken, getByCandidate);

module.exports = router;
