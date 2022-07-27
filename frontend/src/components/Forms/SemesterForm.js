import useSemesterForm from "../../hooks/api/semesters/useSemesterForm";
import { IoAddSharp } from "react-icons/io5";
import Button from "../Button";

const SemesterForm = () => {
    const { semesterID, inputs, handleChange, handleSubmit } =
        useSemesterForm();

    const { semesterYear } = inputs;

    return (
        <section className="min-h-screen flex justify-center items-center ">
            <form
                className="bg-white shadow-md px-8 pt-6 pb-8 w-full max-w-lg"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div>
                    <div>
                        <label
                            htmlFor="semesterYear"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                            Semester
                        </label>
                        <input
                            type="text"
                            id="semesterYear"
                            name="semesterYear"
                            defaultValue={semesterYear}
                            onChange={(e) => handleChange(e)}
                            placeholder="2022"
                            autoComplete="off"
                            required
                            className="block w-full p-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300  
                            focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-8"
                        />
                    </div>
                </div>

                <Button btnType="outline" color="blue" scale="medium">
                    <IoAddSharp size={20} className="mr-1" />
                    {semesterID ? "Aktualizovať" : "Vytvoriť"}
                </Button>
            </form>
        </section>
    );
};

export default SemesterForm;
