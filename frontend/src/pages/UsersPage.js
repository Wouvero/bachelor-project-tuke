import React from "react";
import { useNavigate } from "react-router-dom";
import {
    IoCloudUploadOutline,
    IoPersonAddOutline,
    IoPeopleOutline,
} from "react-icons/io5";

import UsersTable from "../components/Tables/UsersTable";

import useUsersTable from "../hooks/api/users/useUsersTable";
import Button from "../components/Button";

const UsersPage = () => {
    const navigate = useNavigate();

    const { users, createMultipleUser, readExcel, handleDeleteUser } =
        useUsersTable();

    return (
        <main className="w-full">
            <section className="max-w-7xl h-full mx-auto py-20 px-12">
                <UsersTable users={users} deleteUser={handleDeleteUser} />

                <div className="py-4">
                    <Button
                        type="button"
                        btnType="outline"
                        color="green"
                        scale="medium"
                        onClick={() => {
                            navigate(`/createUser`);
                        }}
                    >
                        <IoPersonAddOutline size={20} className="mr-1" />
                        Vytvoriť uživateľa
                    </Button>
                </div>

                <div className="flex">
                    <div className="mr-4">
                        <label
                            htmlFor="file_upload"
                            className="transition ease-in-out delay-75 flex items-center px-5 py-2.5 text-sm font-medium rounded-lg text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                        >
                            <IoCloudUploadOutline size={20} className="mr-2 " />
                            Vložiť súbor
                        </label>
                        <input
                            type="file"
                            name="file"
                            id="file_upload"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                readExcel(file);
                            }}
                        />
                    </div>
                    {/* 
                    <button className=" items-center px-5 py-2.5 text-sm font-medium rounded-lg text-gray-800 bg-transparent  border border-gray-200 hover:bg-gray-50 hover:text-blue-700 hover:border-gray-300">
                        Create multiple user
                    </button> */}

                    <button
                        onClick={() => createMultipleUser()}
                        className="flex items-center px-5 py-2.5 text-sm font-medium rounded-lg text-white bg-blue-700 hover:bg-blue-800  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <IoPeopleOutline size={20} className="mr-1" />
                        Vytvoriť viacero uživateľov
                    </button>
                </div>
            </section>
        </main>
    );
};

export default UsersPage;
