const Vote = require("./voteModel");

const addVote = async (userId, candidateId) => {
  const existingVote = await Vote.findOne({ user_id: userId });
  if (existingVote) {
    throw new Error("You have already voted!");
  }

  const vote = new Vote({
    user_id: userId,
    candidate_id: candidateId,
  });

  await vote.save();
  return vote;
};

const getVoteCountByCandidate = async (candidateId) => {
  const count = await Vote.countDocuments({ candidate_id: candidateId });
  return count;
};

const getAllVotes = async () => {
  const votes = await Vote.find().populate("user_id").populate("candidate_id");
  return votes;
};

const getUserVote = async (userId) => {
  const vote = await Vote.findOne({ user_id: userId }).populate("candidate_id");
  return vote;
};

module.exports = {
  addVote,
  getVoteCountByCandidate,
  getAllVotes,
  getUserVote,
};
