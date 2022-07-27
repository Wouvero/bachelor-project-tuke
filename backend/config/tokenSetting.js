const defaultCookiesOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    path: "/",
};

const ACCESS_TOKEN_EXPIRATION = 60 * 60 * 24;
const REFRESH_TOKEN_EXPIRATION = 60 * 60 * 24;

const accessTokenCookieOptions = {
    ...defaultCookiesOptions,
    maxAge: ACCESS_TOKEN_EXPIRATION * 1000,
};

const refreshTokenCookieOptions = {
    ...defaultCookiesOptions,
    maxAge: REFRESH_TOKEN_EXPIRATION * 1000,
};

module.exports = {
    defaultCookiesOptions,
    accessTokenCookieOptions,
    refreshTokenCookieOptions,
};
