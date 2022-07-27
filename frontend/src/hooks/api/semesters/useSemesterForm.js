import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSemesterRequest from "../../requests/useSemesterRequest";

const defaultInputs = {
    semesterYear: "",
};

const useSemesterForm = () => {
    const navigate = useNavigate();
    const { semesterID } = useParams();
    const { createSemesterRequest, getSemesterRequest, updateSemesterRequest } =
        useSemesterRequest();

    const [inputs, setInputs] = useState(defaultInputs);

    useEffect(() => {
        if (semesterID) {
            getSemesterRequest(semesterID).then((fetchedResponse) =>
                setInputs({
                    semesterYear: fetchedResponse.semester.semester_year,
                })
            );
        }
    }, [semesterID]);

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!semesterID) {
            createSemesterRequest(inputs).then(() => {
                navigate("/semestersPage");
            });
        } else {
            updateSemesterRequest(semesterID, inputs).then(() => {
                navigate("/semestersPage");
            });
        }
    };

    return { semesterID, inputs, handleChange, handleSubmit };
};

export default useSemesterForm;
