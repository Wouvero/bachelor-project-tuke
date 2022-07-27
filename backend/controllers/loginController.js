const prisma = require("../config/db");
const bcrypt = require("bcrypt");
//const cookie = require("cookie");
require("dotenv").config();
const {
    signAccessToken,
    signRefreshToken,
} = require("../services/tokenServices");
const {
    refreshTokenCookieOptions,
    accessTokenCookieOptions,
} = require("../config/tokenSetting");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({
                message: "EMAIL and PASSWORD are required!",
            });

        let user_details = await prisma.user_details.findUnique({
            where: {
                email: email,
            },
        });

        if (user_details === null)
            return res.status(401).json({ message: "Unauthorized!" });

        let user = await prisma.users.findUnique({
            where: {
                user_detail_fk: user_details.user_detail_id,
            },
            include: {
                user_role: true,
                user_detail: true,
            },
        });

        // check password
        const validPassword = await bcrypt.compare(
            password,
            user.user_password
        );

        if (!validPassword)
            return res.status(401).json({ message: "Wrong password!" });

        const user_roles = JSON.parse(user.user_role.roles);

        //console.log(user);

        const payload = {
            userID: user.user_id,
            firstName: user.user_detail.first_name,
            lastName: user.user_detail.last_name,
            email: user.user_detail.email,

            userStatus: user.user_status,
            userRoles: user_roles,
        };

        const accessToken = await signAccessToken(payload);
        const refreshToken = await signRefreshToken(payload);

        const { userID, firstName, lastName, userStatus, userRoles } = payload;

        res.cookie("refresh_token", refreshToken, refreshTokenCookieOptions);
        res.cookie("access_token", accessToken, accessTokenCookieOptions);

        res.status(200).json({
            userID,
            firstName,
            lastName,
            email,
            userStatus,
            userRoles,
        });
    } catch (error) {
        console.log(error);
        return res.status(error.status).json({ message: error.message });
    }
};

module.exports = { login };
