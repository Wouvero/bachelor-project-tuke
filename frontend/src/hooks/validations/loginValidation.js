export default function loginValidation(values) {
    let errors = {};

    const { email, password } = values;

    if (!email) {
        errors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email address is invalid";
    }
    if (!password) {
        errors.password = "Password required";
    }

    return errors;
}
