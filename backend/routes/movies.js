const express = require("express");
//const { users } = require("../config/db");
const router = express.Router();
const prisma = require("../config/db");
const { sendEmail } = require("../services/nodemailer");

const movies = [
    { name: "Inception" },
    { name: "Harry Potter" },
    { name: "6 sense" },
    { name: "Tenet" },
    { name: "Interstellar" },
    { name: "Dark Knight" },
    { name: "Witcher" },
    { name: "Avengers" },
    { name: "Thor" },
    { name: "Iron Man" },
    { name: "Pianist" },
    { name: "Green Mile" },
    { name: "Forest Gump" },
    { name: "Game Of thrones" },
    { name: "Westworld" },
    { name: "Tomorrowland" },
    { name: "Wild wild west" },
    { name: "Metrix" },
    { name: "Lord of the rings" },
    { name: "I robot" },
    { name: "I legent" },
    { name: "Fuck you gothe" },
];

router.route("/").get(async (req, res) => {
    res.json("Hello");
    res.sendStatus(200);
    /* const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let results = {};
    const userLength = await prisma.users.count();

    if (endIndex < userLength) {
        results.next = {
            page: page + 1,
            limit: limit,
        };
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit,
        };
    }

    const users = await prisma.users.findMany({
        take: limit,
        skip: (page - 1) * limit,
    });

    results.users = users;

    res.json(results); */
});

module.exports = router;
