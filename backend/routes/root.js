const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
    res.send("Welcome to backend server");
});

module.exports = router;
