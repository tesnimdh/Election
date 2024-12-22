const {
  getAllCandidates,
  getCandidateByName,
  getCandidateById,
  getCandidatesByParty,
  getAllParties,
} = require("./candidateService");

const { getCommentsByCandidate } = require("../comment/commentService");

//getting all candidates
const getAll = async (req, res) => {
  try {
    const candidates = await getAllCandidates();
    const parties = await getAllParties();
    res.render("candidates", { title: "Candidates", candidates, parties });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//get by name
const getByName = async (req, res) => {
  const { name } = req.params;
  try {
    if (!name) {
      return res.status(400).json({ msg: "Name is required" });
    }
    const candidate = await getCandidateByName(name);
    const parties = await getAllParties();
    if (!candidate) {
      return res.status(404).render("candidates", {
        candidates: [],
        parties,
        error: "Candidate not found",
      });
    }

    res.render("candidates", {
      candidates: [candidate],
      parties,
      error: null,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// getting candidate by ID
const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await getCandidateById(id);
    const comments = await getCommentsByCandidate(id);
    if (!candidate) {
      return res.status(404).json({ msg: "Candidate not found" });
    }

    res.render("detailCandidate", {
      candidate,
      comments,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// getting candidates by party
const getByParty = async (req, res) => {
  const { party } = req.params;
  try {
    if (!party) {
      return res.status(400).json({ msg: "Party is required" });
    }
    const candidates = await getCandidatesByParty(party);

    if (candidates.length === 0) {
      return res.status(404).render("candidates", {
        candidates: [],
        parties: [],
        error: "No candidates found for this party",
      });
    }
    const parties = await getAllParties();
    res.render("candidates", { candidates, parties, error: null });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getAll,
  getByName,
  getById,
  getByParty,
};
