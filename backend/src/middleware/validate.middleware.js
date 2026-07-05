const Ajv = require("ajv");
const schema = require("../utils/schema");

const ajv = new Ajv();
const validate = ajv.compile(schema);

module.exports = (req, res, next) => {
  const valid = validate(req.body);

  if (!valid) {
    return res.status(400).json({ errors: validate.errors });
  }

  next();
};