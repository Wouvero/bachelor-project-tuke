const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const logger = require("./middleware/logEvents");
const { verifyAccessToken } = require("./services/tokenServices");

const PORT = process.env.PORT || 3500;

const app = express();

app.use(logger);

//buil-in middleware for json
app.use(express.json());

app.use(credentials);
//cross origin resource sharing
app.use(cors(corsOptions));

//middleware for cookies
app.use(cookieParser());
//build-in midleware to handle urlencode from data
app.use(express.urlencoded({ extended: false }));

/* {
    credentials: true,
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
    ],
    origin: ["https://project-phoenix-owcw7167z-wouvero.vercel.app/"],
    method: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
} */

//ROUTES
app.use("/", require("./routes/root"));

app.use("/register", require("./routes/auth/register"));
app.use("/login", require("./routes/auth/login"));
app.use("/refresh", require("./routes/auth/refresh"));
app.use("/logout", require("./routes/auth/logout"));

app.use("/movies", require("./routes/movies"));

app.use(verifyAccessToken);
app.use("/semesters", require("./routes/api/semesters"));
app.use("/tasks", require("./routes/api/tasks"));
app.use("/solutions", require("./routes/api/solutions"));
app.use("/users", require("./routes/api/users"));

app.listen(process.env.PORT || 3500, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
