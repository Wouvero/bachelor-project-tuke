import React from "react";
import { useNavigate } from "react-router-dom";
import SolutionsTable from "../components/Tables/SolutionsTable";
import useSolutionsTable from "../hooks/api/solutions/useSolutionsTable";
import { IoAddSharp } from "react-icons/io5";
import Button from "../components/Button";

const TaskPage = () => {
    const navigate = useNavigate();

    const { taskID, solutions, handleDeleteSolution } = useSolutionsTable();

    return (
        <main className="w-full">
            <section className="max-w-7xl h-full mx-auto py-20 px-12">
                <SolutionsTable
                    solutions={solutions}
                    deleteSolution={handleDeleteSolution}
                />
                <div className="mt-8">
                    <Button
                        type="button"
                        btnType="outline"
                        color="green"
                        scale="medium"
                        onClick={() => {
                            navigate(`/createSolution/${taskID}`);
                        }}
                    >
                        <IoAddSharp size={20} className="mr-1" />
                        Vytvoriť nové riešenie
                    </Button>
                </div>
            </section>
        </main>
    );
};

export default TaskPage;
