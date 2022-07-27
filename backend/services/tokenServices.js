const prisma = require("../config/db");
const JWT = require("jsonwebtoken");
const createError = require("http-errors");
require("dotenv").config();

const SECRET_ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET;
const SECRET_REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET;

const signAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
        JWT.sign(
            payload,
            SECRET_ACCESS_TOKEN,
            { expiresIn: "1h" },
            async (err, token) => {
                if (err) {
                    return reject(
                        new createError.InternalServerError(
                            "Access token was not created!"
                        )
                    );
                }

                await prisma.users.update({
                    where: { user_id: payload.userID },
                    data: { user_access_token: token },
                });

                resolve(token);
            }
        );
    });
};

const signRefreshToken = (payload) => {
    return new Promise((resolve, reject) => {
        JWT.sign(
            payload,
            SECRET_REFRESH_TOKEN,
            { expiresIn: "24h" },
            async (err, token) => {
                if (err) {
                    return reject(
                        new createError.InternalServerError(
                            "Refresh token was not created!"
                        )
                    );
                }
                await prisma.users.update({
                    where: { user_id: payload.userID },
                    data: { user_refresh_token: token },
                });
                resolve(token);
            }
        );
    });
};

const verifyAccessToken = (req, res, next) => {
    const cookies = req.cookies;

    if (!cookies.access_token) {
        console.log("access is not here");
        return res.status(401).json("Unauthorized");
    }

    const access_token = cookies.access_token;

    JWT.verify(access_token, SECRET_ACCESS_TOKEN, async (err, payload) => {
        if (err) return res.status(401).json("Unauthorized");
        const user = await prisma.users.findUnique({
            where: { user_id: payload.userID },
        });

        if (user.user_access_token !== access_token)
            return res.status(401).json("Unauthorized");

        req.roles = payload.userRoles;
        next();
    });
};

const verifyRefreshToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, SECRET_REFRESH_TOKEN, async (err, payload) => {
            if (err) return reject(new createError.Forbidden("Forbiden"));

            const {
                userID,
                firstName,
                lastName,
                email,
                userStatus,
                userRoles,
            } = payload;

            if (!email || !firstName || !lastName || !email)
                return reject(new createError.Forbidden("Forbiden"));

            const user = await prisma.users.findUnique({
                where: { user_id: payload.userID },
            });

            if (!user) {
                return reject(new createError.Forbidden("Forbiden"));
            }

            if (refreshToken !== user.user_refresh_token) {
                return reject(new createError.Forbidden("Forbiden"));
            }

            return resolve({
                userID,
                firstName,
                lastName,
                email,
                userStatus,
                userRoles,
            });
        });
    });
};

module.exports = {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken,
};
