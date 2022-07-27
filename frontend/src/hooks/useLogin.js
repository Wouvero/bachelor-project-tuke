import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import loginValidation from "./validations/loginValidation";

const defaultInputs = {
    email: "charles.xavier@tuke.sk",
    password: "123456",
};

export const useLogin = () => {
    const { auth, setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();

    const [inputs, setInputs] = useState(defaultInputs);
    const [errors, setErrors] = useState({});
    const { email, password } = inputs;
    const [type, setType] = useState("password");

    const [options, setOptions] = useState("profesor");

    const handleToggle = () => {
        if (type === "password") setType("text");
        else setType("password");
    };

    const handleOptions = (e) => {
        const value = e.target.value;
        setOptions(value);

        if (value === "student") {
            setInputs({ ...inputs, ["email"]: "james.howlet@student.tuke.sk" });
        } else {
            setInputs({ ...inputs, ["email"]: "charles.xavier@tuke.sk" });
        }
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted && auth.userLogin) {
            navigate("/dashboard");
        }
        return () => (isMounted = false);
    }, [auth]);

    useEffect(() => {
        setErrors({});
    }, [email, password]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const tooglePersist = () => {
        setPersist((prev) => !prev);
    };

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist]);

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginErrors = loginValidation(inputs);
        setErrors(loginErrors);

        if (Object.keys(loginErrors).length === 0) {
            await axios
                .post("/login", JSON.stringify(inputs), {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                })
                .then((result) => {
                    const data = result?.data;

                    const userID = data?.userID;
                    const firstName = data?.firstName;
                    const lastName = data?.lastName;
                    const userStatus = data?.userStatus;
                    const userRoles = data?.userRoles;
                    const userEmail = data?.email;
                    const accessToken = data?.accessToken;

                    setAuth({
                        userID,
                        firstName,
                        lastName,
                        userEmail,
                        userStatus,
                        userRoles,
                        accessToken,
                    });
                    console.log(data);
                    setInputs({ email: "", password: "" });

                    switch (userStatus) {
                        case "STUDENT":
                            navigate("/dashboard");
                            return;
                        case "PROFESOR":
                            navigate("/profesorPage");
                            return;
                        default:
                            return;
                    }
                })
                .catch((error) => {
                    if (!error?.response) {
                        setErrors({ global: "No server response" });
                    } else if (error.response?.status === 400) {
                        setErrors({ global: "Missing username or password" });
                    } else if (error.response?.status === 401) {
                        setErrors({ global: "Unauthorized" });
                    } else {
                        setErrors({ global: "Login failed" });
                    }
                });
        }
    };

    return {
        options,
        setOptions,
        handleOptions,
        inputs,
        errors,
        type,
        handleToggle,
        handleChange,
        handleLogin,
        persist,
        tooglePersist,
    };
};
