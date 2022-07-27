import React from "react";

const Button = ({ children, type, onClick, color, btnType, scale }) => {
    let buttonStyles =
        "flex items-center rounded-lg transition ease-in-out delay-75";

    switch (btnType) {
        case "solid":
            buttonStyles += ` text-white bg-${color}-600 hover:bg-${color}-700`;
            break;
        case "outline":
            buttonStyles += ` text-${color}-500 border border-${color}-500 hover:bg-${color}-500 hover:text-white hover:border-${color}-500`;
            break;
        default:
            break;
    }

    switch (scale) {
        case "small":
            buttonStyles += ` px-3 py-2.5 text-sm font-medium`;
            break;
        case "medium":
            buttonStyles += ` px-5 py-2.5 text-sm font-medium`;
            break;
        case "large":
            buttonStyles += ` px-10 py-5 text-base font-medium`;
            break;
        default:
            break;
    }

    return (
        <button type={type} onClick={onClick} className={buttonStyles}>
            {children}
        </button>
    );
};

export default Button;
