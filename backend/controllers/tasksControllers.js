const prisma = require("../config/db");

const createTask = async (req, res) => {
    const semesterID = req.params["semesterID"];
    const {
        taskTitle,
        description,
        ratingNumber,
        publishSolutions,
        active,
        start,
        due,
    } = req.body;

    //console.log(start);
    if (
        !taskTitle ||
        !description ||
        !ratingNumber ||
        publishSolutions === undefined ||
        active === undefined ||
        !start === undefined ||
        !due === undefined
    ) {
        return res.status(400).json({
            instancePath: "Required atributes",
            message:
                "TaskTitle, description, ratingNumber, publishSolutions, active, start, due are required!",
        });
    }

    const taskData = {
        task_title: taskTitle,
        semester_id_fk: parseInt(semesterID),
        description: description,
        rating_number: parseInt(ratingNumber),
        active: active,
        publish_solutions: publishSolutions,
        start: active ? start : null,
        due: active ? due : null,
    };

    let createdTask;

    try {
        createdTask = await prisma.tasks.create({
            data: taskData,
        });

        return res.sendStatus(201);
    } catch {
        if (!createdTask) {
            return res.status(400).send({
                instancePath: "Create task",
                message: "Create task failed!",
            });
        }
    }

    return res.sendStatus(201);
};

const getAllTasks = async (req, res) => {
    const semesterID = req.params["semesterID"];
    let tasks;

    try {
        const semesters = await prisma.semesters.findUnique({
            where: {
                semester_id: parseInt(semesterID),
            },
            include: {
                tasks: {
                    orderBy: [
                        {
                            task_id: "asc",
                        },
                    ],
                },
            },
        });

        tasks = semesters.tasks;

        return res.status(200).json({
            tasks,
        });
    } catch {
        if (!tasks) {
            return res.status(400).send({
                instancePath: "TASKS",
                message: "Get all tasks failed!",
            });
        }
    }
};

const getTask = async (req, res) => {
    const taskID = req.params["taskID"];

    let task;
    try {
        task = await prisma.tasks.findUnique({
            where: { task_id: parseInt(taskID) },
        });

        return res.status(200).json({
            task,
        });
    } catch {
        if (!task) {
            return res.status(400).send({
                instancePath: "TASKS",
                message: "Get task by ID failed!",
            });
        }
    }
};

const updateTask = async (req, res) => {
    const taskID = req.params["taskID"];
    const {
        taskTitle,
        description,
        ratingNumber,
        publishSolutions,
        active,
        start,
        due,
    } = req.body;

    const taskData = {
        task_title: taskTitle,
        description: description,
        rating_number: parseInt(ratingNumber),
        active: active,
        publish_solutions: publishSolutions,
        start: active ? start : null,
        due: active ? due : null,
    };

    let updatedTask;

    try {
        updatedTask = await prisma.tasks.update({
            where: { task_id: parseInt(taskID) },
            data: taskData,
        });
        res.sendStatus(200);
    } catch {
        if (!updatedTask) {
            return res.status(400).send({
                instancePath: "TASKS",
                message: "Update task by ID failed!",
            });
        }
    }
};

const deleteTask = async (req, res) => {
    const taskID = req.params["taskID"];

    let deletedTask;
    try {
        deletedTask = await prisma.tasks.delete({
            where: { task_id: parseInt(taskID) },
        });

        return res.sendStatus(200);
    } catch {
        if (!deletedTask) {
            return res.status(400).send({
                instancePath: "TASKS",
                message: "Delete task failed!",
            });
        }
    }
};

module.exports = { createTask, getAllTasks, getTask, updateTask, deleteTask };
