import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = () => {
    const [content, setContent] = useState("");

    const handleChange = (value) => {
        setContent(value); // Save editor content
    };

    return (
        <div className="text-white" >
            <h2>Create Your Blog Post</h2>
            <ReactQuill value={content} onChange={handleChange} theme="snow" />
            <button onClick={() => console.log(content)}>Save</button>
        </div>
    );
};

export default TextEditor;
