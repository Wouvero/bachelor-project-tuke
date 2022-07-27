import React from "react";
import { IoTrashOutline, IoSettingsOutline } from "react-icons/io5";
import StatusBadge from "../statusBadge.js/index.js";

const UsersTable = ({ users, deleteUser }) => {
    if (users) {
        return (
            <>
                <div className="overflow-auto rounded-lg shadow hidden md:block">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b-2 border-gray-200">
                            <tr>
                                <th className="w-16 p-3 text-sm font-semibold tracking-wide text-left">
                                    ID
                                </th>
                                <th className="w-48 p-3 text-sm font-semibold tracking-wide text-left">
                                    Meno
                                </th>
                                <th className="w-48 p-3 text-sm font-semibold tracking-wide text-left">
                                    Email
                                </th>
                                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                                    Status
                                </th>
                                <th className="w-14 p-3 text-sm font-semibold tracking-wide text-left">
                                    Nástroje
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user, index) => {
                                return (
                                    <tr className="bg-white" key={user.user_id}>
                                        <td className="p-3 text-sm text-gray-700">
                                            {user.user_id}
                                        </td>
                                        <td className="p-3 text-sm text-gray-700">
                                            <a
                                                href={`/profesorDetail/${user.user_id}`}
                                                className="underline text-blue-700"
                                            >
                                                {`${user.user_detail.first_name} ${user.user_detail.last_name}`}
                                            </a>
                                        </td>
                                        <td className="p-3 text-sm text-gray-700">
                                            {user.user_detail.email}
                                        </td>
                                        <td className="p-3 text-sm text-gray-700">
                                            <StatusBadge
                                                status={user.user_status}
                                            />
                                        </td>

                                        <td className="h-full">
                                            <div className="flex space-x-4">
                                                <a
                                                    href={`/updateUser/${user.user_id}`}
                                                >
                                                    <IoSettingsOutline
                                                        size="20"
                                                        className="text-gray-700"
                                                    />
                                                </a>
                                                <span
                                                    onClick={() =>
                                                        deleteUser(user.user_id)
                                                    }
                                                >
                                                    <IoTrashOutline
                                                        size="20"
                                                        className="text-red-500"
                                                    />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
    return <></>;
};

export default UsersTable;
