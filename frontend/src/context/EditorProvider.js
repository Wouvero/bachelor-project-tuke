import React, { createContext, useContext, useState } from "react";

export const EditorContext = createContext({});

const defaultState = {
    code: "#your code goes here",
};

export const EditorProvider = ({ children }) => {
    const [code, setCode] = useState(defaultState.code);

    return (
        <EditorContext.Provider value={{ code, setCode }}>
            {children}
        </EditorContext.Provider>
    );
};

export const useEditorContext = () => useContext(EditorContext);
