import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const TableTest = () => {
    const [type, setType] = useState("password");

    const handleToggle = () => {
        if (type === "password") setType("text");
        else setType("password");
    };

    return (
        <section className="w-full">
            <div className="max-w-7xl h-full mx-auto py-20 px-12 ">
                <form onSubmit={(e) => {}} className="w-96">
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            defaultValue=""
                            placeholder="Patrik"
                            onChange={{}}
                            className="block w-full p-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-8"
                            required={false}
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            defaultValue=""
                            placeholder="Vymysleny"
                            onChange={{}}
                            className="block w-full p-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-8"
                            required={false}
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            defaultValue=""
                            placeholder="patrik.vymysleny@student.tuke.sk"
                            onChange={{}}
                            className="block w-full p-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-8"
                            required={false}
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <label htmlFor="code">Kod studia</label>
                        <input
                            type="text"
                            id="code"
                            name="code"
                            defaultValue=""
                            placeholder="IntS_Bc_D_sk"
                            onChange={{}}
                            className="block w-full p-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-8"
                            required={false}
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <label htmlFor="year">Rok studia</label>
                        <input
                            type="number"
                            id="year"
                            name="year"
                            defaultValue=""
                            placeholder="1"
                            min={1}
                            max={7}
                            onChange={{}}
                            className="block w-full p-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-8"
                            required={false}
                            autoComplete="off"
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>{" "}
                        <div className="relative w-full">
                            <span
                                onClick={handleToggle}
                                className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer text-gray-900"
                            >
                                {type === "password" ? (
                                    <IoEyeOffOutline size={24} />
                                ) : (
                                    <IoEyeOutline size={24} />
                                )}
                            </span>
                            <input
                                type={type}
                                id="password"
                                name="password"
                                autoComplete="off"
                                required
                                className="block w-full py-3 pl-3 pr-12 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-8"
                            />
                        </div>
                    </div>
                </form>

                {/* <div className="overflow-auto rounded-lg shadow hidden md:block">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b-2 border-gray-200">
                            <tr>
                                <th className="w-16 p-3 text-sm font-semibold tracking-wide text-left">
                                    No
                                </th>
                                <th className="w-48 p-3 text-sm font-semibold tracking-wide text-left">
                                    Full Name
                                </th>
                                <th className="w-48 p-3 text-sm font-semibold tracking-wide text-left">
                                    Email
                                </th>
                                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                                    Status
                                </th>
                                <th className="w-14 p-3 text-sm font-semibold tracking-wide text-left">
                                    Tools
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr className="bg-white">
                                <td className="p-3 text-sm text-gray-700">1</td>
                                <td className="p-3 text-sm text-gray-700">
                                    Patrik Drab
                                </td>
                                <td className="p-3 text-sm text-gray-700">
                                    patrikdrab75@gmail.com
                                </td>
                                <td className="p-3 text-sm text-gray-700">
                                    <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-700 bg-green-200  rounded-lg bg-opacity-50">
                                        Profesor
                                    </span>
                                </td>
                                <td className="h-full">
                                    <div className="flex space-x-4">
                                        <a>
                                            <IoIosRefresh
                                                size="20"
                                                className="text-gray-700"
                                            />
                                        </a>
                                        <a>
                                            <IoTrashOutline
                                                size="20"
                                                className="text-red-500"
                                            />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="p-3 text-sm text-gray-700">2</td>
                                <td className="p-3 text-sm text-gray-700">
                                    Tomas Drab
                                </td>
                                <td className="p-3 text-sm text-gray-700">
                                    thomasdrab75@gmail.com
                                </td>
                                <td className="p-3 text-sm text-gray-700">
                                    <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-blue-700 bg-blue-200  rounded-lg bg-opacity-50">
                                        Študent
                                    </span>
                                </td>
                                <td className="h-full">
                                    <div className="flex  space-x-4">
                                        <a>
                                            <IoIosRefresh
                                                size="20"
                                                className="text-gray-700"
                                            />
                                        </a>
                                        <a>
                                            <IoTrashOutline
                                                size="20"
                                                className="text-red-500"
                                            />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                            <tr className="bg-white">
                                <td className="p-3 text-sm text-gray-700">3</td>
                                <td className="p-3 text-sm text-gray-700">
                                    Tom Hanks
                                </td>
                                <td className="p-3 text-sm text-gray-700">
                                    tomhanks33@gmail.com
                                </td>
                                <td className="p-3 text-sm text-gray-700">
                                    <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-red-700 bg-red-200  rounded-lg bg-opacity-50">
                                        Admin
                                    </span>
                                </td>
                                <td className="h-full">
                                    <div className="flex  space-x-4">
                                        <a>
                                            <IoIosRefresh
                                                size="20"
                                                className="text-gray-700"
                                            />
                                        </a>
                                        <a>
                                            <IoTrashOutline
                                                size="20"
                                                className="text-red-500"
                                            />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2 text-sm">
                                <div className="text-blue-500 font-bold">1</div>
                                <div className="text-gray-500">Patrik Drab</div>
                                <div>
                                    <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-700 bg-green-200  rounded-lg bg-opacity-50">
                                        Profesor
                                    </span>
                                </div>
                            </div>
                            <div className="text-sm text-gray-700">
                                patrikdrab75@gmail.com
                            </div>
                        </div>
                        <div>
                            <div className="flex space-x-2">
                                <a>
                                    <IoIosRefresh
                                        size="20"
                                        className="text-gray-700"
                                    />
                                </a>
                                <a>
                                    <IoTrashOutline
                                        size="20"
                                        className="text-red-500"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2 text-sm">
                                <div className="text-blue-500 font-bold">2</div>
                                <div className="text-gray-500">Tomas Drab</div>
                                <div>
                                    <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-blue-700 bg-blue-200  rounded-lg bg-opacity-50">
                                        Študent
                                    </span>
                                </div>
                            </div>
                            <div className="text-sm text-gray-700">
                                thomasdrab@gmail.com
                            </div>
                        </div>
                        <div>
                            <div className="flex space-x-2">
                                <a>
                                    <IoIosRefresh
                                        size="20"
                                        className="text-gray-700"
                                    />
                                </a>
                                <a>
                                    <IoTrashOutline
                                        size="20"
                                        className="text-red-500"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2 text-sm">
                                <div className="text-blue-500 font-bold">3</div>
                                <div className="text-gray-500">Thom Hanks</div>
                                <div>
                                    <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-red-700 bg-red-200  rounded-lg bg-opacity-50">
                                        Admin
                                    </span>
                                </div>
                            </div>
                            <div className="text-sm text-gray-700">
                                tomhanks@gmail.com
                            </div>
                        </div>
                        <div>
                            <div className="flex space-x-2">
                                <a>
                                    <IoIosRefresh
                                        size="20"
                                        className="text-gray-700"
                                    />
                                </a>
                                <a>
                                    <IoTrashOutline
                                        size="20"
                                        className="text-red-500"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white space-y-3 shadow rounded-lg px-4 py-8">
                    <div className="flex space-x-4 items-center">
                        <h1 className="font-bold text-2xl text-gray-700">
                            Patrik Drab
                        </h1>

                        <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-700 bg-green-200  rounded-lg bg-opacity-50">
                            Profesor
                        </span>
                    </div>
                    <div className="text-xs text-blue-700  tracking-wider">
                        ID#
                        <span className="underline">
                            cl1cj0ihc0181wf7ckzkrc813
                        </span>
                    </div>

                    <div className="text-base text-gray-700 tracking-wider">
                        patrikdrab75@gmail.com
                    </div>
                </div> */}
            </div>
        </section>
    );
};

export default TableTest;
