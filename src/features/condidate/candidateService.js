const Candidate = require("./candidateModel");

// Get all candidates
const getAllCandidates = async () => {
  try {
    return await Candidate.find();
  } catch (error) {
    throw new Error("Error fetching all candidates");
  }
};

// get byname
const getCandidateByName = async (name) => {
  try {
    return await Candidate.findOne({ name });
  } catch (error) {
    throw new Error("Error fetching candidate by name");
  }
};

// Get candidate by ID
const getCandidateById = async (id) => {
  try {
    return await Candidate.findById(id);
  } catch (error) {
    throw new Error("Error fetching candidate by ID");
  }
};

// Get candidates by party
const getCandidatesByParty = async (party) => {
  try {
    return await Candidate.find({ party });
  } catch (error) {
    throw new Error("Error fetching candidates by party");
  }
};

// new candidate
const createCandidate = async (
  name,
  party,
  biography,
  program,
  picture = ""
) => {
  try {
    const candidate = new Candidate({
      name,
      party,
      biography,
      program,
      picture,
    });

    await candidate.save();
    return candidate;
  } catch (error) {
    throw new Error("Error creating candidate");
  }
};
const getAllParties = async () => {
  const parties = await Candidate.distinct("party");
  return parties;
};

module.exports = {
  createCandidate,
  getAllCandidates,
  getCandidateByName,
  getCandidateById,
  getCandidatesByParty,
  getAllParties,
};
