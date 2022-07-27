const generatePassword = (length) => {
    let password = "";

    const CHARS =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!?@#$&*+-";

    for (var j = 0; j < length; j++) {
        const randomNumber = Math.floor(Math.random() * CHARS.length);
        password += CHARS[randomNumber];
    }

    return password;
};

module.exports = { generatePassword };
