import { useEffect, useState } from "react";
import useUserRequest from "../../requests/useUserRequest";
import * as XLSX from "xlsx";
import { useAuth } from "../../../context/AuthProvider";

const useUsersTable = () => {
    const [users, setUsers] = useState(null);
    const [fileData, setFileData] = useState(null);
    const { auth } = useAuth();

    const { createMultipleUserRequest, getAllUserRequest, deleteUserRequest } =
        useUserRequest();

    useEffect(() => {
        getAllUserRequest().then((fetchedResponse) =>
            setUsers(fetchedResponse.users)
        );
    }, []);

    const createMultipleUser = () => {
        if (fileData) {
            createMultipleUserRequest(fileData);
        } else {
            alert("No data");
        }
    };

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: "buffer" });

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((data) => {
            console.log(data);
            setFileData(data);
        });
    };

    const handleDeleteUser = (userID) => {
        if (userID !== auth.userID) {
            const newUsers = users.filter((user) => user.user_id !== userID);
            deleteUserRequest(userID);
            setUsers(newUsers);
        } else {
            alert("You canot delete yourself");
        }
    };

    return { users, createMultipleUser, readExcel, handleDeleteUser };
};

export default useUsersTable;
