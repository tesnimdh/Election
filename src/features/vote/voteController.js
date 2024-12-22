const voteService = require("./voteService");
const { getAllCandidates } = require("../condidate/candidateService");
const addVote = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const userId = req.userId;

    const vote = await voteService.addVote(userId, candidateId);
    res
      .status(201)
      .redirect(`http://localhost:3000/api/candidates/${candidateId}`);
  } catch (error) {
    const { candidateId } = req.params;
    return res.redirect(
      `/api/candidates/${candidateId}?msg=${encodeURIComponent(error.message)}`
    );
  }
};

const getVoteCountByCandidate = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const voteCount = await voteService.getVoteCountByCandidate(candidateId);
    res.status(200).json({ voteCount });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllVotes = async (req, res) => {
  try {
    const candidates = await getAllCandidates();
    const votes = await voteService.getAllVotes();

    const results = await Promise.all(
      candidates.map(async (candidate) => {
        const voteCount = await voteService.getVoteCountByCandidate(
          candidate.id
        );
        return {
          candidate,
          voteCount,
        };
      })
    );

    results.sort((a, b) => b.voteCount - a.voteCount);
    res.render("results", { title: "Results", results, votes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserVote = async (req, res) => {
  try {
    const userId = req.user._id;
    const vote = await voteService.getUserVote(userId);
    if (!vote) {
      return res.status(404).json({ message: "No vote found for the user." });
    }
    res.status(200).json(vote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addVote,
  getVoteCountByCandidate,
  getAllVotes,
  getUserVote,
};
