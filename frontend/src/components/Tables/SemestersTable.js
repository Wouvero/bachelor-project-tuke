import React from "react";
import { IoTrashOutline, IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SemestersTable = ({ semesters, deleteSemester }) => {
    const navigate = useNavigate();

    if (semesters) {
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
                                    Rok semestra
                                </th>
                                <th className="w-14 p-3 text-sm font-semibold tracking-wide text-left">
                                    Nástroje
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {semesters.map((semester) => {
                                return (
                                    <tr
                                        className="bg-white"
                                        key={semester.semester_id}
                                    >
                                        <td className="p-3 text-sm text-gray-700">
                                            {semester.semester_id}
                                        </td>
                                        <td className="p-3 text-sm ">
                                            <span
                                                className="text-blue-700 underline hover:text-blue-500"
                                                onClick={() =>
                                                    navigate(
                                                        `/semesterPage/${semester.semester_id}`
                                                    )
                                                }
                                            >
                                                {semester.semester_year}
                                            </span>
                                        </td>

                                        <td className="h-full">
                                            <div className="flex space-x-4">
                                                <span
                                                    onClick={() =>
                                                        navigate(
                                                            `/updateSemester/${semester.semester_id}`
                                                        )
                                                    }
                                                >
                                                    <IoSettingsOutline
                                                        size="20"
                                                        className="text-gray-500 hover:text-gray-700"
                                                    />
                                                </span>
                                                <span
                                                    onClick={() =>
                                                        deleteSemester(
                                                            semester.semester_id
                                                        )
                                                    }
                                                >
                                                    <IoTrashOutline
                                                        size="20"
                                                        className="text-red-500 hover:text-red-700"
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

export default SemestersTable;
