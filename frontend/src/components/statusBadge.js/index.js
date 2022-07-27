import React, { useEffect, useState } from "react";

const StatusBadge = ({ status }) => {
    const [style, setStyle] = useState("");

    useEffect(() => {
        let badgeColor = "";

        if (status === "STUDENT") badgeColor = "blue";
        if (status === "PROFESOR") badgeColor = "green";
        if (status === "ADMIN") badgeColor = "red";

        setStyle(
            `p-1.5 text-xs font-medium uppercase tracking-wider text-${badgeColor}-700 bg-${badgeColor}-200  rounded-lg bg-opacity-50`
        );
    }, [status]);

    return <span className={style}>{status}</span>;
};

export default StatusBadge;
