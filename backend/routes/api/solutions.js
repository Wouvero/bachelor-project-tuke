const express = require("express");
const router = express.Router();
const solutionsControllers = require("../../controllers/solutionsControllers");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

//BETA
router.route("/checkSolution").post(solutionsControllers.checkSolution);

router
    .route("/:solutionID")
    .get(
        verifyRoles(ROLES_LIST.USER, ROLES_LIST.EDITOR, ROLES_LIST.ADMIN),
        solutionsControllers.getSolution
    )
    .put(
        verifyRoles(ROLES_LIST.USER, ROLES_LIST.EDITOR, ROLES_LIST.ADMIN),
        solutionsControllers.updateSolution
    )
    .delete(
        verifyRoles(ROLES_LIST.USER, ROLES_LIST.EDITOR, ROLES_LIST.ADMIN),
        solutionsControllers.deleteSolution
    );

module.exports = router;
