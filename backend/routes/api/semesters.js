const express = require("express");
const router = express.Router();
const semesterControllers = require("../../controllers/semesterControllers");
const tasksControllers = require("../../controllers/tasksControllers");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
    .route("/")
    .post(
        verifyRoles(ROLES_LIST.EDITOR, ROLES_LIST.ADMIN),
        semesterControllers.createSemester
    )
    .get(
        verifyRoles(ROLES_LIST.USER, ROLES_LIST.EDITOR, ROLES_LIST.ADMIN),
        semesterControllers.getAllSemesters
    );

router
    .route("/:semesterID")
    .get(
        verifyRoles(ROLES_LIST.USER, ROLES_LIST.EDITOR, ROLES_LIST.ADMIN),
        semesterControllers.getSemester
    )
    .put(
        verifyRoles(ROLES_LIST.EDITOR, ROLES_LIST.ADMIN),
        semesterControllers.updateSemester
    )
    .delete(
        verifyRoles(ROLES_LIST.EDITOR, ROLES_LIST.ADMIN),
        semesterControllers.deleteSemester
    );

router
    .route("/:semesterID/tasks")
    .get(
        verifyRoles(ROLES_LIST.USER, ROLES_LIST.EDITOR, ROLES_LIST.ADMIN),
        tasksControllers.getAllTasks
    )
    .post(
        verifyRoles(ROLES_LIST.EDITOR, ROLES_LIST.ADMIN),
        tasksControllers.createTask
    );

module.exports = router;
