import React from "react";
import "../styles/CreateNote.css"

function CreateNote(props) {
    return (
        <div 
        className="create-note" 
        onClick={() => props.createNote()}>
            take a note <span role="img" aria-label="pencil">✏️</span>
        </div>
    );
}

export default CreateNote;
