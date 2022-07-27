const express = require("express");
const router = express.Router();
const usersControllers = require("../../controllers/usersControllers");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
    .route("/")
    .get(
        verifyRoles(ROLES_LIST.EDITOR, ROLES_LIST.ADMIN),
        usersControllers.getAllUsers
    );

router.route("/create").post(usersControllers.createUser);
router.route("/createMany").post(usersControllers.createMultipleUsers);

router
    .route("/:userID")
    .get(
        verifyRoles(ROLES_LIST.USER, ROLES_LIST.EDITOR, ROLES_LIST.ADMIN),
        usersControllers.getUser
    )
    .put(
        verifyRoles(ROLES_LIST.EDITOR, ROLES_LIST.ADMIN),
        usersControllers.updateUser
    )
    .delete(
        verifyRoles(ROLES_LIST.EDITOR, ROLES_LIST.ADMIN),
        usersControllers.deleteUser
    );

//BETA
router.route("/students").get(usersControllers.getAllStudents);
router.route("/profesors").get(usersControllers.getAllProfesors);
router.route("/admins").get(usersControllers.getAllAdmins);

module.exports = router;
