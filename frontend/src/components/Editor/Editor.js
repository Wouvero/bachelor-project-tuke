import React from "react";
import "codemirror/keymap/sublime";
import "codemirror/theme/ayu-mirage.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/python/python";
import CodeMirror from "@uiw/react-codemirror";
import { useEditorContext } from "../../context/EditorProvider";
import "./editor.css";

const Editor = ({ solution }) => {
    const { code, setCode } = useEditorContext();

    return (
        <div className="h-[500px]">
            <CodeMirror
                value={solution ? solution : code}
                className="text-base py-4"
                options={{
                    lineNumbers: true,
                    tabSize: 4,
                    mode: "python",
                    theme: "dracula",
                    keymap: "sublime",
                }}
                onChange={(editor) => {
                    const value = editor.getValue();
                    if (solution === undefined) {
                        setCode(value);
                    }
                }}
            />
        </div>
    );
};

export default Editor;
