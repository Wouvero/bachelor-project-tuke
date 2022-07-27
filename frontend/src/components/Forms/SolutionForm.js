import React from "react";
import { EditorProvider } from "../../context/EditorProvider";
import SolutionEditor from "../Editor/SolutionEditor";

const SolutionForm = () => {
    return (
        <EditorProvider>
            <main>
                <SolutionEditor />
            </main>
        </EditorProvider>
    );
};

export default SolutionForm;
