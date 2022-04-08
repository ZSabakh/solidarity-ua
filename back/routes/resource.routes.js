const express = require("express");
const router = express.Router();
const ResourceController = require("../controllers/resource.controller");

router.get("/resources", ResourceController.fetchResources);

module.exports = router;
