const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-control-Allow-Credentials", true);
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
    }
    next();
};

module.exports = credentials;
