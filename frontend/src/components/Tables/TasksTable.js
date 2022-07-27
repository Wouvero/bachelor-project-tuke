import React from "react";
import { IoTrashOutline, IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import TaskStatus from "../TaskStatus";

const TasksTable = ({ tasks, deleteTask }) => {
    const navigate = useNavigate();

    if (tasks) {
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
                                    Názov zadania
                                </th>
                                <th className="w-48 p-3 text-sm font-semibold tracking-wide text-left">
                                    Stav
                                </th>
                                <th className="w-48 p-3 text-sm font-semibold tracking-wide text-left">
                                    Max. počet bodov
                                </th>
                                <th className="w-14 p-3 text-sm font-semibold tracking-wide text-left">
                                    Nástroje
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {tasks.map((task) => {
                                return (
                                    <tr className="bg-white" key={task.task_id}>
                                        <td className="p-3 text-sm text-gray-700">
                                            {task.task_id}
                                        </td>
                                        <td className="p-3 text-sm text-gray-700">
                                            <span
                                                className="text-blue-700 underline hover:text-blue-500"
                                                onClick={() =>
                                                    navigate(
                                                        `/taskPage/${task.task_id}`
                                                    )
                                                }
                                            >
                                                {task.task_title}
                                            </span>
                                        </td>
                                        <td className="flex p-3 text-sm text-gray-700">
                                            <TaskStatus active={task.active} />
                                        </td>
                                        <td className="p-3 text-sm text-gray-700">
                                            {task.rating_number}
                                        </td>

                                        <td className="h-full">
                                            <div className="flex space-x-4">
                                                <span
                                                    onClick={() => {
                                                        navigate(
                                                            `/updateTask/${task.task_id}`
                                                        );
                                                    }}
                                                >
                                                    <IoSettingsOutline
                                                        size="20"
                                                        className="text-gray-700"
                                                    />
                                                </span>
                                                <span
                                                    onClick={() =>
                                                        deleteTask(task.task_id)
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

export default TasksTable;
