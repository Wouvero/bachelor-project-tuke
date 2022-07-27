import React from "react";
import { useLogin } from "../hooks/useLogin";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const LoginPage = () => {
    const {
        options,

        handleOptions,
        inputs: { email, password },
        errors,
        type,
        handleToggle,
        handleChange,
        handleLogin,
        persist,
        tooglePersist,
    } = useLogin();

    return (
        <section className="min-h-screen flex justify-center items-center bg-blue-600">
            <div className="w-80 px-6 py-6 bg-white rounded-md shadow-md">
                {errors.global && (
                    <p className="text-red-500 text-sm">{errors.global}</p>
                )}
                <form
                    className="w-full"
                    onSubmit={(e) => handleLogin(e)}
                    noValidate
                >
                    <div className="flex flex-col">
                        <select
                            value={options}
                            onChange={(e) => handleOptions(e)}
                        >
                            <option value="profesor">
                                charles.xavier@tuke.sk
                            </option>
                            <option value="student">
                                james.howlet@student.tuke.sk
                            </option>
                        </select>
                        {/*  <input
                            type="email"
                            id="email"
                            name="email"
                            defaultValue={email}
                            onChange={(e) => handleChange(e)}
                            autoComplete="off"
                            placeholder="Email"
                            className={
                                errors.email
                                    ? "border h-5 w-full rounded-md px-3 py-5 mt-2 hover:outline-none focus:outline-none ring-1 ring-red-600"
                                    : "border h-5 w-full rounded-md px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600"
                            }
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email}
                            </p>
                        )} */}
                        <div className="relative w-full mt-3">
                            <span
                                onClick={handleToggle}
                                className="absolute right-0 flex items-center px-3 cursor-pointer h-full text-gray-600"
                            >
                                {type === "password" ? (
                                    <IoEyeOffOutline size={20} />
                                ) : (
                                    <IoEyeOutline size={20} />
                                )}
                            </span>
                            <input
                                id="password"
                                type={type}
                                name="password"
                                placeholder="Heslo"
                                autoComplete="off"
                                defaultValue={password}
                                onChange={(e) => handleChange(e)}
                                className={
                                    errors.password
                                        ? "border h-5 w-full rounded-md px-3 py-5 pr-10 hover:outline-none focus:outline-none ring-1 ring-red-600"
                                        : "border h-5 w-full rounded-md px-3 py-5 pr-10 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600"
                                }
                            />
                        </div>

                        {errors.password && (
                            <p className="text-red-500 text-sm">
                                {errors.password}
                            </p>
                        )}
                        <div className="flex items-center my-4">
                            <input
                                type="checkbox"
                                id="persist"
                                onChange={tooglePersist}
                                checked={persist}
                            />
                            <label htmlFor="persist" className="pl-1">
                                Dôverovať tomuto zariadeniu
                            </label>
                        </div>

                        <button className="bg-blue-500 hover:bg-blue-600 text-white mt-4 px-6 py-2 rounded-md">
                            Prihlásiť
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default LoginPage;
