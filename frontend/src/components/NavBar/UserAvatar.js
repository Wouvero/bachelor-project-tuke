import React from "react";
import styled from "styled-components";

const Avatar = styled.div`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    margin-top: 8px;
    margin-bottom: 8px;
    --tw-ring-offset-width: 2px;
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
        var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
        calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
        var(--tw-shadow, 0 0 #0000);

    background: linear-gradient(to right, #0061ff, #60efff);
    background-size: 200% 200%;
    animation: animate_background 10s infinite ease-in-out;

    @keyframes animate_background {
        0% {
            background-position: 0 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0 50%;
        }
    }
`;

const UserAvatar = () => {
    return <Avatar />;
};

export default UserAvatar;

/* (
    <div
        className="w-10 h-10 my-2 ring-2 ring-offset-2 rounded-full bg-gradient-to-r from-sky-400 to-emerald-500 relative cursor-pointer"
    ></div>
); */
