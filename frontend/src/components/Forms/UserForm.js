import { useAuth } from "../../context/AuthProvider";
import useUserForm from "../../hooks/api/users/useUserForm";
import { IoPersonAddOutline } from "react-icons/io5";

import Button from "../Button";

const UserForm = () => {
    const { auth } = useAuth();

    const { userID, inputs, statusOptions, handleChange, handleSubmit } =
        useUserForm();

    const {
        firstName,
        lastName,
        email,
        studyYear,
        studyCode,
        studyProgram,
        status,
    } = inputs;

    return (
        <section className="min-h-screen flex justify-center items-center ">
            <form
                className="bg-white shadow-md px-8 pt-6 pb-8 w-full max-w-lg"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div>
                    <label htmlFor="firstName">Meno</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        defaultValue={firstName}
                        placeholder="Patrik"
                        onChange={(e) => handleChange(e)}
                        className="block w-full p-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-8"
                        required={true}
                        autoComplete="off"
                    />
                </div>

                <div>
                    <label htmlFor="lastName">Priezvisko</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        defaultValue={lastName}
                        placeholder="Vymysleny"
                        onChange={(e) => handleChange(e)}
                        className="block w-full p-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-8"
                        required={true}
                        autoComplete="off"
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={email}
                        placeholder="patrik.vymysleny@student.tuke.sk"
                        onChange={(e) => handleChange(e)}
                        className="block w-full p-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-8"
                        required={true}
                        autoComplete="off"
                    />
                </div>

                <div>
                    <label htmlFor="studyCode">Kód štúdia</label>
                    <input
                        type="text"
                        id="studyCode"
                        name="studyCode"
                        defaultValue={studyCode}
                        placeholder="IntS_Bc_D_sk"
                        onChange={(e) => handleChange(e)}
                        className="block w-full p-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-8"
                        required={true}
                        autoComplete="off"
                    />
                </div>

                <div>
                    <label htmlFor="studyPrograme">Študijný program</label>
                    <input
                        type="text"
                        id="studyProgram"
                        name="studyProgram"
                        defaultValue={studyProgram}
                        placeholder="Hospodárska Informatika"
                        onChange={(e) => handleChange(e)}
                        className="block w-full p-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-8"
                        required={true}
                        autoComplete="off"
                    />
                </div>

                <div>
                    <label htmlFor="studyYear">Rok štúdia</label>
                    <input
                        type="number"
                        id="studyYear"
                        name="studyYear"
                        defaultValue={studyYear}
                        placeholder="1"
                        min={1}
                        max={7}
                        onChange={(e) => handleChange(e)}
                        className="block w-full p-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-8"
                        required={true}
                        autoComplete="off"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="status">Status</label>
                    <select
                        name="status"
                        id="status"
                        value={status}
                        onChange={(e) => handleChange(e)}
                        className="block w-full p-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300  
                            focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        {statusOptions.map((option, index) => {
                            const isInclude = option.allowedStatus.includes(
                                auth.userStatus
                            );
                            return isInclude ? (
                                <option value={option.value} key={index}>
                                    {option.value}
                                </option>
                            ) : undefined;
                        })}
                    </select>
                </div>

                <Button
                    type="submit"
                    btnType="outline"
                    color="blue"
                    scale="medium"
                >
                    <IoPersonAddOutline size={20} className="mr-1" />
                    {userID ? "Aktualizovať" : "Vytvoriť"}
                </Button>
            </form>
        </section>
    );
};

export default UserForm;
