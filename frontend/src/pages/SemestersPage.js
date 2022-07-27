import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import SemestersTable from "../components/Tables/SemestersTable";
import useSemstersTable from "../hooks/api/semesters/useSemstersTable";
import { IoAddSharp } from "react-icons/io5";

const SemestersPage = () => {
    const navigate = useNavigate();
    const { semesters, handleDeleteSemester } = useSemstersTable();

    return (
        <main className="w-full">
            <section className="max-w-7xl h-full mx-auto py-20 px-12">
                <SemestersTable
                    semesters={semesters}
                    deleteSemester={handleDeleteSemester}
                />

                <div className="mt-8">
                    <Button
                        type="button"
                        btnType="outline"
                        color="green"
                        scale="medium"
                        onClick={() => {
                            navigate(`/createSemester`);
                        }}
                    >
                        <IoAddSharp size={20} className="mr-1" />
                        Vytvoriť semester
                    </Button>
                </div>
            </section>
        </main>
    );
};

export default SemestersPage;
