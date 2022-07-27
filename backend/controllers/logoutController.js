const prisma = require("../config/db");
const { defaultCookiesOptions } = require("../config/tokenSetting");
const { verifyRefreshToken } = require("../services/tokenServices");

const logout = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies.refresh_token)
        return res.status(204).json({ message: "No content" });

    const refreshToken = cookies.refresh_token;

    const payload = await verifyRefreshToken(refreshToken).catch((err) => {
        return res.status(403).json({ message: "Forbidden!" });
    });

    const user = await prisma.users.update({
        where: { user_id: payload.userID },
        data: { user_refresh_token: null, user_access_token: null },
    });

    //clear cookies
    res.clearCookie("refresh_token", defaultCookiesOptions);
    res.clearCookie("access_token", defaultCookiesOptions);
    res.status(200).json("Log out");
};

module.exports = { logout };
