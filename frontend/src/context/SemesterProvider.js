import React, { createContext, useContext, useState } from "react";

const SemesterContext = createContext({});

export const SemesterProvider = ({ children }) => {
    const [selected, setSelected] = useState(null);

    return (
        <SemesterContext.Provider value={{ selected, setSelected }}>
            {children}
        </SemesterContext.Provider>
    );
};

export const useSelectedSemester = () => useContext(SemesterContext);
