import React from "react";

const CarouselCard = ({ taskData, number, color }) => {
    const { task_id, rating_number } = taskData;

    return (
        <a
            href={"/task/" + task_id}
            className={`cursor-pointer w-full h-full px-5 py-5 mx-3 rounded-md ${color}`}
        >
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-medium ">{`Task ${
                    number + 1
                }.`}</h2>
                <div className="w-10 h-10 flex justify-center justify-items-center items-center  rounded-md bg-gray-900 text-white font-bold">
                    {rating_number}
                </div>
            </div>
        </a>
    );
};

export default CarouselCard;
