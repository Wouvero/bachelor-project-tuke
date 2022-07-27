import React, { useEffect, useState } from "react";
import { IoLogOutOutline, IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import useLogout from "../../hooks/useLogout";

const DropdownMenu = () => {
    const logout = useLogout();
    const navigate = useNavigate();
    const [detailLink, setDetailLink] = useState("");

    const { auth } = useAuth();

    const singOut = async () => {
        await logout();
        navigate("/");
    };

    useEffect(() => {
        switch (auth.userStatus) {
            case "STUDENT":
                setDetailLink(`/studentDetail`);
                return;
            case "PROFESOR":
                setDetailLink(`/profesorDetail`);
                return;
            case "ADMIN":
                setDetailLink(`/adminDetail`);
                return;
            default:
                return;
        }
    }, []);

    return (
        <ul className="absolute left-0 bg-white rounded-md shadow-lg w-48 border transition ease-in-out">
            <li className="px-4 py-2 text-small text-gray-700 hover:bg-neutral-100 hover:text-gray-800 cursor-pointer">
                <a
                    href={`${detailLink}/${auth.userID}`}
                    className="flex items-center"
                >
                    <IoPersonOutline size={20} className="mr-4" />
                    Môj profil
                </a>
            </li>
            <li className="px-4 py-2 text-small text-gray-700 hover:bg-neutral-100 hover:text-red-400 cursor-pointer">
                <span className="flex items-center" onClick={singOut}>
                    <IoLogOutOutline size={20} className="mr-4" />
                    Odhlásiť
                </span>
            </li>
        </ul>
    );
};

export default DropdownMenu;
