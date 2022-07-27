const prisma = require("../config/db");
const bcrypt = require("bcrypt");

const SALT_ROUND = 10;

const register = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
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
                            study_year: studyYear ? studyYear.toString() : null,
                            study_code: studyCode ? studyCode : null,
                            study_program: studyProgram ? studyProgram : null,
                        },
                    },
                    user_role: {
                        create: {
                            roles: ROLES,
                        },
                    },
                },
            });

            res.status(200).json(user);
        } catch (err) {
            console.log(err);
            res.status(400).send({
                instancePath: "Create user",
                message: "Create user failed!",
            });
        }
    }
};

module.exports = { register };
