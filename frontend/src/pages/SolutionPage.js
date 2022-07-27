import React from "react";

import EditorProfesorSection from "../components/Editor/EditorProfesorSection";
import { EditorProvider } from "../context/EditorProvider";

const SolutionPage = () => {
    return (
        <EditorProvider>
            <main>
                <EditorProfesorSection />
            </main>
        </EditorProvider>
    );
};

export default SolutionPage;
