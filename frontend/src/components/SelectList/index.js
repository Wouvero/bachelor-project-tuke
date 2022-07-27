import React, { useEffect, useState } from "react";
import { IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5";
import { useSelectedSemester } from "../../context/SemesterProvider";

import OutsideClickHandler from "react-outside-click-handler";
import useSemesterRequest from "../../hooks/requests/useSemesterRequest";

const SelectList = () => {
    const [active, setActive] = useState(false);

    const { selected, setSelected } = useSelectedSemester();

    const { getAllSemestersRequest } = useSemesterRequest();

    const [semesters, setSemesters] = useState(null);

    useEffect(() => {
        getAllSemestersRequest().then((fetchedResponse) => {
            let semesters = fetchedResponse.semesters.reverse();

            setSemesters(semesters);
            setSelected(semesters[0]);
        });
    }, []);

    return (
        <div className="relative inline-block text-left w-32">
            <OutsideClickHandler onOutsideClick={() => setActive(false)}>
                <div>
                    <button
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-600"
                        onClick={() => setActive(!active)}
                    >
                        {selected && selected.semester_year}
                        {active ? (
                            <IoChevronDownOutline size={20} className="ml-2" />
                        ) : (
                            <IoChevronForwardOutline
                                size={20}
                                className="ml-2"
                            />
                        )}
                    </button>
                </div>

                {active && (
                    <div className="origin-top-right absolute z-10 left-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {semesters &&
                                semesters.map((semester) => {
                                    return (
                                        <div
                                            key={semester.semester_id}
                                            className="text-gray-700 block px-1 py-2 text-sm hover:bg-neutral-100 hover:text-gray-800"
                                            onClick={() => {
                                                setSelected(semester);
                                                setActive(false);
                                            }}
                                        >
                                            {semester.semester_year}
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                )}
            </OutsideClickHandler>
        </div>
    );
};

export default SelectList;
