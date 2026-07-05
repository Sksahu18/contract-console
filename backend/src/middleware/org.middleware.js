module.exports = (req, res, next) => {
  const orgId = req.headers["x-org-id"];

  if (!orgId) {
    return res.status(400).json({ error: "x-org-id required" });
  }

  req.orgId = orgId;
  next();
};