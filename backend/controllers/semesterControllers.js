const prisma = require("../config/db");

const createSemester = async (req, res) => {
    const { semesterYear } = req.body;

    if (!semesterYear)
        return res.status(400).json({
            instancePath: "Required atribute",
            message: "SemesterYear is required!",
        });

    let createdSemester;
    try {
        createdSemester = await prisma.semesters.create({
            data: {
                semester_year: semesterYear,
            },
        });
        return res.sendStatus(201);
    } catch {
        if (!createdSemester) {
            return res.status(400).send({
                instancePath: "SEMESTERS",
                message: "Create semester failed!",
            });
        }
    }
};

const getAllSemesters = async (req, res) => {
    let allSemesters;

    try {
        allSemesters = await prisma.semesters.findMany({
            orderBy: [
                {
                    semester_year: "asc",
                },
            ],
        });
        return res.status(200).json({
            semesters: allSemesters,
        });
    } catch {
        if (!allSemesters) {
            return res.status(400).send({
                instancePath: "SEMESTERS",
                message: "Get all semesters failed!",
            });
        }
    }
};

const getSemester = async (req, res) => {
    const semesterID = req.params["semesterID"];

    let semester;

    try {
        semester = await prisma.semesters.findUnique({
            where: { semester_id: parseInt(semesterID) },
        });

        return res.status(200).json({
            semester,
        });
    } catch {
        if (!semester) {
            return res.status(400).send({
                instancePath: "SEMESTERS",
                message: "Get semester by ID failed!",
            });
        }
    }
};

const updateSemester = async (req, res) => {
    const semesterID = req.params["semesterID"];
    const { semesterYear } = req.body;

    if (!semesterYear)
        return res.status(400).json({
            instancePath: "Required atribute",
            message: "SemesterYear is required!",
        });

    let updatedSemester;
    try {
        updatedSemester = await prisma.semesters.update({
            where: { semester_id: parseInt(semesterID) },
            data: {
                semester_year: semesterYear,
            },
        });

        return res.status(200).json({
            semester: updatedSemester,
        });
    } catch {
        if (!updatedSemester) {
            return res.status(400).send({
                instancePath: "SEMESTERS",
                message: "Update semester failed!",
            });
        }
    }
};

const deleteSemester = async (req, res) => {
    const semesterID = req.params["semesterID"];

    let deletedSemester;
    try {
        deletedSemester = await prisma.semesters.delete({
            where: { semester_id: parseInt(semesterID) },
        });
        return res.sendStatus(200);
    } catch {
        if (!deletedSemester) {
            return res.status(400).send({
                instancePath: "SEMESTERS",
                message: "Delete semester failed!",
            });
        }
    }
};

module.exports = {
    createSemester,
    getAllSemesters,
    getSemester,
    updateSemester,
    deleteSemester,
};
