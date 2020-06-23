import React from "react";
import Note from "./Note";
import "../styles/NoteList.css";

function NoteList(props) {
	return (
		<div className="note-list">
			{props.notes.map((note) => {
				return (
					<Note
						key={note.id}
						id={note.id}
						title={note.title}
						text={note.text}
						backgroundColor={note.backgroundColor}
						updateID={props.updateID}
						saveNote={props.saveNote}
						deleteNote={props.deleteNote}
						createNote={props.createNote}
						updateNote={props.updateNote}
					/>
				);
			})}
		</div>
	);
}

export default NoteList;
