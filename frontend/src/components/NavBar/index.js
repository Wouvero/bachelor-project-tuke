import React, { useEffect, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import { useAuth } from "../../context/AuthProvider";
import OutsideClickHandler from "react-outside-click-handler";
import UserAvatar from "./UserAvatar";

const NavBar = () => {
    const [isActive, setIsActive] = useState(false);
    const [homeLink, setHomeLink] = useState("");
    const { auth } = useAuth();

    useEffect(() => {
        console.log(auth.userStatus);
        switch (auth.userStatus) {
            case "STUDENT":
                setHomeLink(`/dashboard`);
                return;
            case "PROFESOR":
                setHomeLink(`/profesorPage`);
                return;
            case "ADMIN":
                setHomeLink(`/adminPage`);
                return;
            default:
                return;
        }
    }, []);

    const renderUserStatus = (STATUS) => {
        switch (STATUS) {
            case "STUDENT":
                return "Študent";
            case "PROFESOR":
                return "Profesor";
            case "ADMIN":
                return "Admin";
            default:
                return;
        }
    };

    return (
        <nav className="w-full h-20 bg-white shadow-md">
            <div className="max-w-7xl px-12 h-full mx-auto flex justify-between items-center">
                <a href={homeLink} className="text-2xl text-blue-600 font-bold">
                    [BETA]
                </a>

                <div className="flex items-center">
                    <div className="relative">
                        <OutsideClickHandler
                            onOutsideClick={() => setIsActive(false)}
                        >
                            <div onClick={() => setIsActive(!isActive)}>
                                <UserAvatar />
                            </div>

                            {isActive && <DropdownMenu />}
                        </OutsideClickHandler>
                    </div>
                    <div className="ml-4">
                        <h2 className="text-base font-medium ">
                            {auth && `${auth.firstName} ${auth.lastName}`}
                        </h2>
                        <span className="text-sm font-medium text-blue-500">
                            {auth && renderUserStatus(auth.userStatus)}
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
