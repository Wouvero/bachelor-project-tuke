const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "node.mailer.tuke@gmail.com",
        pass: "N0d3#TUK3",
    },
});

const handleBarOptions = {
    viewEngine: {
        extName: ".html",
        partialsDir: path.resolve("./views"),
        defaultLayout: false,
    },
    viewPath: path.resolve("./views"),
    extName: ".handlebars",
};

transporter.use("compile", hbs(handleBarOptions));

const sendEmail = (reciever, password) => {
    console.log(reciever, password);
    const options = {
        from: "node.mailer.tuke@gmail.com",
        to: "patrikdrab75@gmail.com",
        subject: "Access to BETA",
        template: "email",
        context: { email: reciever, password: password },
    };

    transporter.sendMail(options, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Sent ", result.response);
    });
};

module.exports = {
    sendEmail,
};
