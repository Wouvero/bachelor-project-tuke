import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUserRequest from "../../requests/useUserRequest";

/* firstName: "Patrik",
    lastName: "Drab",
    email: "patrik.drab@student.tuke.sk",
    password: "123456",
    studyYear: "3",
    studyCode: "IntS_Bc_D_sk",
    studyPrograme: "Hospodarska Informatika",
    status: "Študent",
    status: "Študent",
    roles: `["USER"]`, */

const defaultInputs = {
    firstName: "",
    lastName: "",
    email: "",
    studyYear: "",
    studyCode: "",
    studyProgram: "",
    status: "STUDENT",
    roles: `["USER"]`,
};

const rolesList = [
    `["USER"]`,
    `["USER", "EDITOR"]`,
    `["USER", "EDITOR", "ADMIN"]`,
];

const useUserForm = () => {
    const { userID } = useParams();
    const navigate = useNavigate();

    const { getUserRequest, createUserRequest, updateUserRequest } =
        useUserRequest();

    const [inputs, setInputs] = useState(defaultInputs);

    const { roles, status } = inputs.roles;

    const statusOptions = [
        {
            value: "STUDENT",
            allowedStatus: ["PROFESOR", "ADMIN"],
        },
        {
            value: "PROFESOR",
            allowedStatus: ["ADMIN"],
        },
        { value: "ADMIN", allowedStatus: ["ADMIN"] },
    ];

    useEffect(() => {
        if (userID) {
            getUserRequest(userID).then((fetchedResponse) => {
                const user = fetchedResponse.user;

                setInputs({
                    firstName: user.user_detail.first_name,
                    lastName: user.user_detail.last_name,
                    email: user.user_detail.email,
                    studyYear: user.user_detail.study_year,
                    studyCode: user.user_detail.study_code,
                    studyProgram: user.user_detail.study_program,
                    status: user.user_status,
                    roles: user.user_role.roles,
                });
            });
        }
    }, [userID]);

    useEffect(() => {
        switch (status) {
            case "STUDENT":
                setInputs({ ...inputs, [roles]: rolesList[0] });
                return;
            case "PROFESOR":
                setInputs({ ...inputs, [roles]: rolesList[1] });
                return;
            case "ADMIN":
                setInputs({ ...inputs, [roles]: rolesList[2] });
                return;
            default:
                return;
        }
    }, [status]);

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!userID) {
            createUserRequest(inputs).then(() => {
                navigate("/usersPage");
            });
        } else {
            updateUserRequest(userID, inputs).then(() => {
                navigate("/usersPage");
            });
        }
    };

    return { userID, statusOptions, inputs, handleChange, handleSubmit };
};

export default useUserForm;
