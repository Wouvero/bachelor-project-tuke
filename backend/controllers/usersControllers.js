const prisma = require("../config/db");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../services/nodemailer");
const { generatePassword } = require("../services/passwordGenerator");

const SALT_ROUND = 10;

const getAllUsers = async (req, res) => {
    let allUsers;

    try {
        allUsers = await prisma.users.findMany({
            select: {
                user_id: true,
                user_status: true,
                user_role: {
                    select: {
                        roles: true,
                    },
                },
                user_detail: {
                    select: {
                        first_name: true,
                        last_name: true,
                        email: true,
                    },
                },
            },
        });
        return res.status(200).json({
            users: allUsers,
        });
    } catch {
        if (!allUsers) {
            return res.status(400).send({
                instancePath: "USERS",
                message: "Get all users failed!",
            });
        }
    }
};

const getUser = async (req, res) => {
    const userID = req.params["userID"];

    let user;

    try {
        user = await prisma.users.findUnique({
            where: {
                user_id: userID,
            },
            select: {
                user_id: true,
                user_status: true,
                user_role: {
                    select: {
                        roles: true,
                    },
                },
                user_detail: {
                    select: {
                        first_name: true,
                        last_name: true,
                        email: true,
                        study_year: true,
                        study_code: true,
                        study_program: true,
                    },
                },
            },
        });

        return res.status(200).json({
            user,
        });
    } catch {
        if (!allUsers) {
            return res.status(400).send({
                instancePath: "USERS",
                message: "Get user by ID failed!",
            });
        }
    }
};

const getAllStudents = async (req, res) => {
    const findStudents = await prisma.users.findMany({
        where: {
            user_status: "Študent",
        },
        select: {
            user_id: true,
            user_status: true,

            user_role: {
                select: {
                    roles: true,
                },
            },
            user_detail: {
                select: {
                    first_name: true,
                    last_name: true,
                    email: true,
                },
            },
        },
    });

    return res.status(200).json({
        findStudents,
    });
};

const getAllProfesors = async (req, res) => {
    const findProfesors = await prisma.users.findMany({
        where: {
            user_status: "Profesor",
        },
        select: {
            user_id: true,
            user_status: true,

            user_role: {
                select: {
                    roles: true,
                },
            },
            user_detail: {
                select: {
                    first_name: true,
                    last_name: true,
                    email: true,
                },
            },
        },
    });

    return res.status(200).json({
        findProfesors,
    });
};

const getAllAdmins = async (req, res) => {
    const findAdmins = await prisma.users.findMany({
        where: {
            user_status: "Admin",
        },
        select: {
            user_id: true,
            user_status: true,

            user_role: {
                select: {
                    roles: true,
                },
            },
            user_detail: {
                select: {
                    first_name: true,
                    last_name: true,
                    email: true,
                },
            },
        },
    });

    return res.status(200).json({
        findAdmins,
    });
};

const deleteUser = async (req, res) => {
    const userID = req.params["userID"];

    let deletedUser;

    try {
        const { user_detail_fk, user_role_fk } = await prisma.users.findUnique({
            where: { user_id: userID },
        });

        await prisma.users.delete({ where: { user_id: userID } });
        await prisma.user_details.delete({
            where: { user_detail_id: user_detail_fk },
        });
        deletedUser = await prisma.user_roles.delete({
            where: { user_role_id: user_role_fk },
        });

        return res.sendStatus(200);
    } catch {
        if (!deletedUser) {
            return res.status(400).send({
                instancePath: "USERS",
                message: "Delete user by ID failed!",
            });
        }
    }
};

const updateUser = async (req, res) => {
    const userID = req.params["userID"];
    console.log(userID);
    const {
        firstName,
        lastName,
        email,
        status: STATUS,
        studyYear,
        studyCode,
        studyProgram,
    } = req.body;

    let updateUser;

    try {
        let ROLES;

        switch (STATUS) {
            case "STUDENT":
                ROLES = '["USER"]';
                break;
            case "PROFESOR":
                ROLES = '["USER", "EDITOR"]';
                break;
            case "ADMIN":
                ROLES = '["USER", "EDITOR", "ADMIN"]';
                break;
        }

        const { user_detail_fk, user_role_fk } = await prisma.users.update({
            where: { user_id: userID },
            data: {
                user_status: STATUS,
            },
        });

        const userDetail = await prisma.user_details.update({
            where: { user_detail_id: user_detail_fk },
            data: {
                email: email,
                first_name: firstName,
                last_name: lastName,
            },
        });

        const userRole = await prisma.user_roles.update({
            where: { user_role_id: user_role_fk },
            data: {
                roles: ROLES,
            },
        });

        return res.sendStatus(201);
    } catch {
        if (!updateUser) {
            return res.status(400).send({
                instancePath: "USERS",
                message: "Update user by ID failed!",
            });
        }
    }
};

const createUser = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        status,
        studyYear,
        studyCode,
        studyProgram,
    } = req.body;

    let emailCheck;

    try {
        emailCheck = await prisma.user_details.findUnique({
            where: { email: email },
        });
    } catch (err) {
        res.status(400).send({
            instancePath: "Email Availability",
            message: "Error",
        });
    }

    if (emailCheck)
        res.status(400).send({
            instancePath: "Email",
            message: "This Email is already taken!",
        });
    else {
        let STATUS = status || "STUDENT";
        let ROLES;

        switch (STATUS) {
            case "STUDENT":
                ROLES = '["USER"]';
                break;
            case "PROFESOR":
                ROLES = '["USER", "EDITOR"]';
                break;
            case "ADMIN":
                ROLES = '["USER", "EDITOR", "ADMIN"]';
                break;
        }
        const password = "123456";

        const SALT = await bcrypt.genSalt(SALT_ROUND);
        const hashedPassword = await bcrypt.hash(password, SALT);

        try {
            const user = await prisma.users.create({
                data: {
                    user_status: STATUS,
                    user_password: hashedPassword,
                    user_detail: {
                        create: {
                            email: email,
                            first_name: firstName,
                            last_name: lastName,
                            study_year: studyYear.toString(),
                            study_code: studyCode,
                            study_program: studyProgram,
                        },
                    },
                    user_role: {
                        create: {
                            roles: ROLES,
                        },
                    },
                },
            });

            // sendEmail(email, password);

            res.status(200).json(user);
        } catch (err) {
            res.status(400).send({
                instancePath: "Create user",
                message: "Create user failed!",
            });
        }
    }
};

const createMultipleUsers = async (req, res) => {
    const { fileData } = req.body;

    const STATUS = "STUDENT";
    const ROLES = '["USER"]';

    let DATA = fileData;
    console.log(DATA);
    const passwordLength = 10;
    let password = "";

    const CHARS =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!?@#$&*+-";

    for (var i = 0; i < DATA.length; i++) {
        for (var j = 0; j < passwordLength; j++) {
            const randomNumber = Math.floor(Math.random() * CHARS.length);
            password += CHARS[randomNumber];
        }

        //encript password
        const SALT = await bcrypt.genSalt(SALT_ROUND);
        const hashedPassword = await bcrypt.hash(password, SALT);
        console.log(password);
        // const USER_LOGIN = DATA[i]["email"].split("@")[0];

        try {
            const user = await prisma.users.create({
                data: {
                    user_status: STATUS,
                    user_password: hashedPassword,
                    user_detail: {
                        create: {
                            email: DATA[i]["email"],
                            first_name: DATA[i]["first_name"],
                            last_name: DATA[i]["last_name"],
                            study_year: DATA[i]["study_year"].toString(),
                            study_code: DATA[i]["study_code"],
                            study_program: DATA[i]["study_program"],
                        },
                    },
                    user_role: {
                        create: {
                            roles: ROLES,
                        },
                    },
                },
            });

            console.log(user);
        } catch (error) {
            console.log(error);
        }

        //send email

        password = "";
    }

    return res.status(201).json({ DATA });
};

module.exports = {
    getAllUsers,
    getUser,
    getAllProfesors,
    getAllStudents,
    getAllAdmins,
    updateUser,
    deleteUser,
    createUser,
    createMultipleUsers,
};
