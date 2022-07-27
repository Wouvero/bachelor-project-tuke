import { useEffect, useState } from "react";
import useSemesterRequest from "../../requests/useSemesterRequest";

const useSemstersTable = () => {
    const { getAllSemestersRequest, deleteSemesterRequest } =
        useSemesterRequest();

    const [semesters, setSemesters] = useState(null);

    useEffect(() => {
        getAllSemestersRequest().then((fetchedResponse) =>
            setSemesters(fetchedResponse.semesters)
        );
    }, []);

    const handleDeleteSemester = (semesterID) => {
        const newSemesters = semesters.filter(
            (semester) => semester.semester_id !== semesterID
        );
        deleteSemesterRequest(semesterID);

        setSemesters(newSemesters);
    };

    return { semesters, handleDeleteSemester };
};

export default useSemstersTable;
