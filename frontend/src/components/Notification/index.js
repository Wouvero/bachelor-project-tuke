import React, { useEffect, useState } from "react";

const Notification = ({ dispatch, id, message, type }) => {
    const [exit, setExit] = useState(false);
    const [width, setWidth] = useState(100);
    const [intervalID, setIntervalID] = useState(null);

    const handleStartTimer = () => {
        const id = setInterval(() => {
            setWidth((prev) => {
                if (prev !== 0) {
                    return prev - 0.5;
                }
                return prev;
            });
        }, 20);

        setIntervalID(id);
    };

    const handlePauseTimer = () => {
        clearInterval(intervalID);
    };

    useEffect(() => {
        handleStartTimer();
    }, []);

    const handleCloseNotification = () => {
        handlePauseTimer();
        setExit(true);
        setTimeout(() => {
            dispatch({
                type: "REMOVE_NOTIFICATION",
                id: id,
            });
        }, 400);
    };

    useEffect(() => {
        if (width === 0) {
            handleCloseNotification();
        }
    }, [width]);

    return (
        <div
            onMouseEnter={() => handlePauseTimer()}
            onMouseLeave={() => handleStartTimer()}
            className={`w-full animate-show-notification border bg-white rounded-lg p-4 mb-5 ${
                exit ? "animate-hide-notification" : ""
            }`}
        >
            <button onClick={() => setExit(true)}>Exit</button>
            <p className="pb-2">{message}</p>
            <div
                className="h-2 bg-green-400"
                style={{ width: `${width}%` }}
            ></div>
        </div>
    );
};

export default Notification;
