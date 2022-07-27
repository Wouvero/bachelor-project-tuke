const express = require("express");
const router = express.Router();
const tasksControllers = require("../../controllers/tasksControllers");
const solutionsControllers = require("../../controllers/solutionsControllers");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
    .route("/:taskID")
    .get(
        verifyRoles(ROLES_LIST.USER, ROLES_LIST.EDITOR, ROLES_LIST.ADMIN),
        tasksControllers.getTask
    )
    .put(
        verifyRoles(ROLES_LIST.USER, ROLES_LIST.EDITOR, ROLES_LIST.ADMIN),
        tasksControllers.updateTask
    )
    .delete(
        verifyRoles(ROLES_LIST.EDITOR, ROLES_LIST.ADMIN),
        tasksControllers.deleteTask
    );

router
    .route("/:taskID/solutions")
    .get(
        verifyRoles(ROLES_LIST.USER, ROLES_LIST.EDITOR, ROLES_LIST.ADMIN),
        solutionsControllers.getAllSolutions
    )
    .post(
        verifyRoles(ROLES_LIST.USER, ROLES_LIST.EDITOR, ROLES_LIST.ADMIN),
        solutionsControllers.createSolution
    );

module.exports = router;
