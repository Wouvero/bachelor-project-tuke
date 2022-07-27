import React, { useState, useEffect, useCallback } from "react";
import Carousel, { consts } from "react-elastic-carousel";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";
import { useSelectedSemester } from "../../context/SemesterProvider";
import useTaskRequest from "../../hooks/requests/useTaskRequest";
import CarouselCard from "./CarouselCard";

const CarouselBlock = () => {
    const { selected } = useSelectedSemester();
    const [tasks, setTasks] = useState(null);

    const { getAllTasksRequest } = useTaskRequest();

    useEffect(() => {
        const semesterID = selected?.semester_id;

        semesterID &&
            getAllTasksRequest(semesterID).then((fetchedResponse) =>
                setTasks(fetchedResponse.tasks)
            );
    }, [selected]);

    const colors = [
        "bg-blue-500",
        "bg-orange-200",
        "bg-amber-400",
        "bg-lime-500",
        "bg-green-500",
        "bg-emerald-500",
        "bg-teal-600",
        "bg-cyan-500",
        "bg-sky-500",
        "bg-blue-500",
    ];

    const breakPonts = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 850, itemsToShow: 3 },
        { width: 1068, itemsToShow: 4, itemsToScroll: 2 },
    ];

    const myArrow = ({ type, onClick, isEdge }) => {
        const pointer =
            type === consts.PREV ? (
                <IoChevronBackOutline size={25} />
            ) : (
                <IoChevronForward size={25} />
            );
        return (
            <button
                onClick={onClick}
                disabled={isEdge}
                style={{ visibility: isEdge ? "hidden" : "visible" }}
            >
                {pointer}
            </button>
        );
    };
    if (tasks) {
        return (
            <Carousel
                breakPoints={breakPonts}
                pagination={false}
                outerSpacing={0}
                renderArrow={myArrow}
            >
                {tasks &&
                    tasks.map((task, index) => {
                        return (
                            <CarouselCard
                                taskData={task}
                                number={index}
                                key={task.task_id}
                                color={colors[index]}
                            />
                        );
                    })}
            </Carousel>
        );
    }
    return <></>;
};

export default CarouselBlock;
