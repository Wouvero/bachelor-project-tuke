import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SolutionsTable = ({ solutions, deleteSolution }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="overflow-auto rounded-lg shadow">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="w-16 p-3 text-sm font-semibold tracking-wide text-left">
                                ID
                            </th>
                            <th className="w-48 p-3 text-sm font-semibold tracking-wide text-left">
                                Autor riešenia
                            </th>
                            <th className="w-14 p-3 text-sm font-semibold tracking-wide text-left">
                                Hodnotenie
                            </th>
                            <th className="w-8 p-3 text-sm font-semibold tracking-wide text-left">
                                Nástroje
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {solutions &&
                            solutions.map((solution) => {
                                console.log(solution);
                                return (
                                    <tr
                                        className="bg-white"
                                        key={solution.task_solution_id}
                                    >
                                        <td className="p-3 text-sm text-gray-700">
                                            {solution.task_solution_id}
                                        </td>
                                        <td
                                            className="p-3 text-sm text-blue-700 underline"
                                            onClick={() =>
                                                navigate(
                                                    `/tasks/${solution.task_id_fk}/solutionPage/${solution.task_solution_id}`
                                                )
                                            }
                                        >
                                            {solution.user === null
                                                ? "Anonym"
                                                : `${solution.user.user_detail.first_name} ${solution.user.user_detail.last_name}`}
                                        </td>
                                        <td className="p-3 text-sm text-gray-700">
                                            {solution.rating === null
                                                ? "nehodnotené"
                                                : solution.rating}
                                        </td>

                                        <td className="h-full">
                                            <div className="flex space-x-4">
                                                <span
                                                    onClick={() =>
                                                        deleteSolution(
                                                            solution.task_solution_id
                                                        )
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
};

export default SolutionsTable;
