import React from "react";
import "../styles/SearchNote.css"

function SearchNote(props) {
	return (
		<input
			type="text"
			value={props.query}
			onChange={(e) => {props.searchNote(e.target.value)}}
			placeholder="🔍 search for a note..."
			className="search-note"
		/>
	);
}

export default SearchNote;
