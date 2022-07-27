import useTaskForm from "../../hooks/api/tasks/useTaskForm";
import { IoAddSharp } from "react-icons/io5";
import Button from "../Button";

const TaskForm = () => {
    const { taskID, inputs, handleChange, handleSubmit, switchButton } =
        useTaskForm();

    const {
        taskTitle,
        description,
        ratingNumber,
        publishSolutions,
        active,
        start,
        due,
    } = inputs;

    return (
        <section className="min-h-screen flex justify-center items-center ">
            <form
                className="bg-white shadow-md px-8 pt-6 pb-8 w-full max-w-lg"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div>
                    <div>
                        <label
                            htmlFor="taskTitle"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                            Názov zadania
                        </label>
                        <input
                            type="text"
                            id="taskTitle"
                            name="taskTitle"
                            value={taskTitle}
                            onChange={(e) => handleChange(e)}
                            placeholder="Task [number]"
                            autoComplete="off"
                            required
                            className="block w-full p-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300  
                            focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="description"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                            Popis zadania
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => handleChange(e)}
                            rows="4"
                            cols="50"
                            required
                            className="block w-full p-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300  
                            focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="ratingNumber"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                            Max. počet bodov
                        </label>
                        <input
                            type="number"
                            id="ratingNumber"
                            name="ratingNumber"
                            value={ratingNumber}
                            onChange={(e) => handleChange(e)}
                            placeholder="2"
                            autoComplete="off"
                            min="0"
                            required
                            className="block w-full p-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300  
                            focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2"
                        />
                    </div>
                    <div>
                        <a name="active" onClick={(e) => switchButton(e)}>
                            {active === true ? "Active" : "Not Active"}
                        </a>
                    </div>

                    {/*      <div>
                        <a
                            name="publishSolutions"
                            onClick={(e) => switchButton(e)}
                        >
                            {publishSolutions === true
                                ? "Published"
                                : "Not Published"}
                        </a>
                    </div> */}

                    {active === true ? (
                        <>
                            <div>
                                <label
                                    htmlFor="start-time"
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                >
                                    Začiatok
                                </label>
                                <input
                                    type="datetime-local"
                                    id="start-time"
                                    name="start"
                                    required
                                    defaultValue={start}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="due-time"
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                >
                                    Koniec
                                </label>
                                <input
                                    type="datetime-local"
                                    id="due-time"
                                    name="due"
                                    required
                                    defaultValue={due}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </>
                    ) : null}
                </div>

                <Button
                    type="submit"
                    btnType="outline"
                    color="blue"
                    scale="medium"
                >
                    <IoAddSharp size={20} className="mr-1" />
                    {taskID ? "Aktualizovať" : "Vytvoriť"}
                </Button>
            </form>
        </section>
    );
};

export default TaskForm;
