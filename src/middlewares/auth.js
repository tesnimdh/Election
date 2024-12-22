const jwt = require("jsonwebtoken");
require("dotenv").config();

async function verifyToken(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    if (req.accepts("html")) {
      return res.redirect("/api/auth/login");
    } else {
      return res.status(401).json({ message: "Unauthorized - Token missing" });
    }
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    next();
  } catch (err) {
    if (req.accepts("html")) {
      return res.redirect("/api/auth/login");
    } else {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
  }
}

module.exports = verifyToken;
