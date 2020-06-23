import React, { Component } from "react";
import "../styles/Note.css";

class Note extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.title || "",
			text: this.props.text || "",
			id: this.props.id || "",
			backgroundColor: this.props.backgroundColor || "mintcream",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.saveNote(this.state);
	}

	renderEdit() {
		const { title, text, id, backgroundColor } = this.state;
		return (
			<div className="modal">
				<div
					className="modal-content"
					style={{ backgroundColor: backgroundColor }}
				>
					<span
						className="modal-header remove"
						onClick={this.handleSubmit}
					>
						×
					</span>
					<div className="modal-body">
						<form onSubmit={this.handleSubmit}>
							<input
								type="text"
								placeholder="title"
								onChange={(e) =>
									this.setState({ title: e.target.value })
								}
								value={title}
							/>
							<textarea
								placeholder="enter a note and save"
								onChange={(e) =>
									this.setState({ text: e.target.value })
								}
								value={text}
							/>
						</form>
					</div>
					<div className="modal-footer">
						<p onClick={this.handleSubmit} className="save">
							save
						</p>
						<p
							className="delete"
							onClick={() => {
								this.props.deleteNote(id);
							}}
						>
							del
						</p>
					</div>
				</div>
			</div>
		);
	}

	renderRead() {
		return (
			<div
				className="note"
				onClick={() => this.props.updateNote(this.state.id)}
				style={{ backgroundColor: this.state.backgroundColor }}
			>
				<div className="note-title">{this.state.title}</div>
				<div className="note-text">{this.state.text}</div>
			</div>
		);
	}

	render() {
		return this.props.create || this.props.updateID === this.state.id
			? this.renderEdit()
			: this.renderRead();
	}
}

export default Note;
