const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/contracts.controller");
const org = require("../middleware/org.middleware");
const validate = require("../middleware/validate.middleware");

router.post("/", org, validate, ctrl.create);
router.get("/", org, ctrl.getAll);
router.get("/:id", org, ctrl.getOne);
router.put("/:id", org, validate, ctrl.update);
router.delete("/:id", org, ctrl.delete);
router.post("/:id/status", org, ctrl.updateStatus);
router.get("/:id/events", org, ctrl.getEvents);

module.exports = router;