import React from "react";
import { useNavigate } from "react-router-dom";
import TasksTable from "../components/Tables/TasksTable";
import useTasksTable from "../hooks/api/tasks/useTasksTable";
import { IoAddSharp } from "react-icons/io5";
import Button from "../components/Button";

const SemesterPage = () => {
    const navigate = useNavigate();
    const { semesterID, tasks, handleDeleteTask } = useTasksTable();

    return (
        <main className="w-full">
            <section className="max-w-7xl h-full mx-auto py-20 px-12">
                <TasksTable tasks={tasks} deleteTask={handleDeleteTask} />

                <div className="mt-8">
                    <Button
                        type="button"
                        btnType="outline"
                        color="green"
                        scale="medium"
                        onClick={() => {
                            navigate(`/createTask/${semesterID}`);
                        }}
                    >
                        <IoAddSharp size={20} className="mr-1" />
                        Vytvoriť zadanie
                    </Button>
                </div>
            </section>
        </main>
    );
};

export default SemesterPage;
