const express = require("express");
const router = express.Router();
const refreshController = require("../../controllers/refreshTokenController");

router.get("/", refreshController.refreshToken);

module.exports = router;
