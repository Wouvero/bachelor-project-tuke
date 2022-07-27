const express = require("express");
const router = express.Router();
const registerController = require("../../controllers/registerController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.route("/").post(
    /* verifyRoles(ROLES_LIST.USER, ROLES_LIST.EDITOR, ROLES_LIST.ADMIN), */
    registerController.register
);

module.exports = router;
