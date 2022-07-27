import React from "react";
import { EditorProvider } from "../context/EditorProvider";
import EditorSection from "../components/Editor/EditorSection";

const TaskDetails = () => {
    return (
        <EditorProvider>
            <main className="w-full">
                <EditorSection />
            </main>
        </EditorProvider>
    );
};

export default TaskDetails;
