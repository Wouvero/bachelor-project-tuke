const prisma = require("../config/db");

const createSolution = async (req, res) => {
    const taskID = req.params["taskID"];
    const { solution, user_id } = req.body;

    if (!solution)
        return res.status(400).json({
            instancePath: "Required atributes",
            message: "Solution is required!",
        });

    const solutionData = {
        task_id_fk: parseInt(taskID),
        solution: solution,
        user_id_fk: user_id ? user_id : null,
    };

    let createdSolution;

    try {
        createdSolution = await prisma.task_solutions.create({
            data: solutionData,
        });
        return res.sendStatus(201);
    } catch {
        if (!createdSolution) {
            return res.status(400).send({
                instancePath: "SOLUTIONS",
                message: "Create solution failed!",
            });
        }
    }
};

const getAllSolutions = async (req, res) => {
    const taskID = req.params["taskID"];

    let taskSolutions;

    try {
        const task = await prisma.tasks.findUnique({
            where: {
                task_id: parseInt(taskID),
            },
            include: {
                task_solutions: {
                    orderBy: [
                        {
                            task_solution_id: "asc",
                        },
                    ],
                    select: {
                        task_solution_id: true,
                        task_id_fk: true,
                        createdAt: true,
                        solution: true,
                        rating: true,
                        task: {
                            select: {
                                rating_number: true,
                            },
                        },
                        user: {
                            select: {
                                user_detail: {
                                    select: {
                                        first_name: true,
                                        last_name: true,
                                        email: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        taskSolutions = task.task_solutions;

        console.log(taskSolutions);

        return res.status(200).json({
            taskSolutions,
        });
    } catch {
        if (!taskSolutions) {
            return res.status(400).send({
                instancePath: "SOLUTIONS",
                message: "Get all solutions failed!",
            });
        }
    }
};

const getSolution = async (req, res) => {
    const solutionID = req.params["solutionID"];

    let allSolutions;

    try {
        allSolutions = await prisma.task_solutions.findUnique({
            where: { task_solution_id: parseInt(solutionID) },
            select: {
                task_solution_id: true,
                task_id_fk: true,
                createdAt: true,
                solution: true,
                rating: true,
                task: {
                    select: {
                        rating_number: true,
                    },
                },
                user: {
                    select: {
                        user_detail: {
                            select: {
                                first_name: true,
                                last_name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });

        return res.status(200).json({
            solution: allSolutions,
        });
    } catch {
        if (!allSolutions) {
            return res.status(400).send({
                instancePath: "SOLUTIONS",
                message: "Get solution by ID failed!",
            });
        }
    }
};

const checkSolution = async (req, res) => {
    const { task_id, user_id } = req.body;

    let solution;

    try {
        solution = await prisma.tasks.findUnique({
            where: { task_id: parseInt(task_id) },
            include: {
                task_solutions: {
                    where: { user_id_fk: user_id },
                },
            },
        });
        return res.status(200).json({
            solution,
        });
    } catch {
        if (!solution) {
            return res.status(400).send({
                instancePath: "SOLUTIONS",
                message: "Check solution by taskID and userID failed!",
            });
        }
    }
};

const updateSolution = async (req, res) => {
    const solutionID = req.params["solutionID"];

    const { solution, rating } = req.body;

    let updatedSolution;

    try {
        updatedSolution = await prisma.task_solutions.update({
            where: { task_solution_id: parseInt(solutionID) },
            data: {
                solution: solution,
                rating: rating ? parseInt(rating) : null,
            },
            select: {
                task_solution_id: true,
                task_id_fk: true,
                createdAt: true,
                solution: true,
                rating: true,
                task: {
                    select: {
                        rating_number: true,
                    },
                },
                user: {
                    select: {
                        user_detail: {
                            select: {
                                first_name: true,
                                last_name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });

        return res.status(200).json({
            updatedSolution,
        });
    } catch {
        if (!updatedSolution) {
            return res.status(400).send({
                instancePath: "SOLUTIONS",
                message: "Update solution by ID failed!",
            });
        }
    }
};

const deleteSolution = async (req, res) => {
    const solutionID = req.params["solutionID"];

    let deletedSolution;

    try {
        deletedSolution = await prisma.task_solutions.delete({
            where: { task_solution_id: parseInt(solutionID) },
        });
        return res.sendStatus(200);
    } catch {
        if (!deletedSolution) {
            return res.status(400).send({
                instancePath: "SOLUTIONS",
                message: "Update solution by ID failed!",
            });
        }
    }
};

module.exports = {
    createSolution,
    getAllSolutions,
    getSolution,
    checkSolution,
    updateSolution,
    deleteSolution,
};
