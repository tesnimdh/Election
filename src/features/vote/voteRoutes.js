const express = require("express");
const router = express.Router();
const voteController = require("./voteController");
const verifyToken = require("../../middlewares/auth");

// vote
router.post("/:candidateId", verifyToken, voteController.addVote);

// vote count by candidate
// router.get(
//   "/count/:candidateId",
//   verifyToken,
//   voteController.getVoteCountByCandidate
// );

// all votes
router.get("/", verifyToken, voteController.getAllVotes);

//get user vote
router.get("/user", verifyToken, voteController.getUserVote);

module.exports = router;
