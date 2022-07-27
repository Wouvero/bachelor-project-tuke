import React from "react";

const TaskStatus = ({ active }) => {
    if (active) {
        return (
            <div className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-700 bg-green-200  rounded-lg bg-opacity-50">
                active
            </div>
        );
    }
    return (
        <div className="p-1.5 text-xs font-medium uppercase tracking-wider text-red-700 bg-red-200  rounded-lg bg-opacity-50">
            not active
        </div>
    );
};

export default TaskStatus;
