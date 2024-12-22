const { addComment, getCommentsByCandidate } = require("./commentService");
const verifyToken = require("../../middlewares/auth");

// add a comment
const add = async (req, res) => {
  const { content } = req.body;
  const { candidate_id } = req.params;

  console.log("hedha el body mte3i", req.body);

  const user_id = req.userId;

  try {
    const comment = await addComment(user_id, candidate_id, content);
    res.redirect(`http://localhost:3000/api/candidates/${candidate_id}`);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// get comments by candidate
const getByCandidate = async (req, res) => {
  const { candidate_id } = req.params;

  try {
    const comments = await getCommentsByCandidate(candidate_id);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  add,
  getByCandidate,
};
