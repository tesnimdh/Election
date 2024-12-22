const Comment = require("./commentModel");

// Add a comment
const addComment = async (user_id, candidate_id, content) => {
  try {
    console.log("hedha el body mte3i", user_id, candidate_id, content);
    const newComment = new Comment({
      user_id,
      candidate_id,
      content,
    });

    console.log("el comment", newComment);

    const savedComment = await newComment.save();
    console.log("Saved Comment:", savedComment);
    return savedComment;
  } catch (error) {
    console.log(error);
    throw new Error("Error adding comment", error);
  }
};

// Get comments by candidate
const getCommentsByCandidate = async (candidate_id) => {
  try {
    const comments = await Comment.find({ candidate_id })
      .populate("user_id", "username")
      .populate("candidate_id", "name");
    return comments;
  } catch (error) {
    throw new Error("Error fetching comments by candidate");
  }
};

module.exports = {
  addComment,
  getCommentsByCandidate,
};
