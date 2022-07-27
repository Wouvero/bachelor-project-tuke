const {
    accessTokenCookieOptions,
    refreshTokenCookieOptions,
} = require("../config/tokenSetting");
const {
    verifyRefreshToken,
    signAccessToken,
    signRefreshToken,
} = require("../services/tokenServices");

const refreshToken = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies.refresh_token) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
    const refreshToken = cookies.refresh_token;

    console.log(refreshToken);

    try {
        const payload = await verifyRefreshToken(refreshToken);

        const newAccessToken = await signAccessToken(payload);
        const newRefreshToken = await signRefreshToken(payload);

        const { userID, firstName, lastName, email, userStatus, userRoles } =
            payload;

        res.cookie("access_token", newAccessToken, accessTokenCookieOptions);
        res.cookie("refresh_token", newRefreshToken, refreshTokenCookieOptions);
        res.status(200).json({
            userID,
            firstName,
            lastName,
            email,
            userStatus,
            userRoles,
            accessToken: newAccessToken,
        });
    } catch (error) {
        return res.status(error.status).json({ message: error.message });
    }
};

module.exports = { refreshToken };
