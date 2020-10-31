import React, { Component } from "react";
import "../styles/App.css";
import colors from "../utils/colors";
// components
import Note from "./Note";
import NoteList from "./NoteList";
import SearchNote from "./SearchNote";
import CreateNote from "./CreateNote";
import Header from "./Header";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      query: "",
      create: false,
      updateID: null,
      colors: colors,
    };
    // event handlers
    this.createNote = this.createNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.searchNote = this.searchNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  componentDidMount() {
    const emptyNote = [
      {
        title: "click me",
        text:
          "hello user! your note text goes here...enter a note and save it or delete it, it's your choice :)",
        id: new Date().getTime(),
        backgroundColor: "lightgoldenrodyellow",
      },
    ];
    this.setState({
      notes: JSON.parse(localStorage.getItem("notes")) || emptyNote,
    });
  }

  createNote() {
    this.setState({ create: true });
  }
  updateNote(id) {
    this.setState({ updateID: id });
  }
  searchNote(query) {
    this.setState({ query });
  }

  saveNote(newNote) {
    const { title, text, id } = newNote;
    const notes = [...this.state.notes];
    const index = notes.findIndex((note) => note.id === id);
    const isEmpty = /^\s*$/.test(title + text);
    /**
     * empty old -> remove
     * empty new -> don't save
     * not empty old -> update
     * not empty new -> create new
     */
    if (isEmpty) {
      if (index !== -1) notes.splice(index, 1);
    } else {
      if (index !== -1) notes[index] = { ...notes[index], ...newNote };
      else
        notes.push({
          text: text,
          title: title,
          id: new Date().getTime(),
          backgroundColor: this.state.colors[
            Math.floor(Math.random() * this.state.colors.length)
          ],
        });
    }
    this.setState(() => {
      localStorage.setItem("notes", JSON.stringify(notes));
      return { notes, updateID: null, create: false };
    });
  }

  deleteNote(id) {
    const notes = [...this.state.notes].filter((note) => note.id !== id);
    this.setState(() => {
      localStorage.setItem("notes", JSON.stringify(notes));
      return { notes, updateID: null, create: false };
    });
  }

  render() {
    const filteredNotes = this.state.notes.filter(
      (note) =>
        note.title.toLowerCase().indexOf(this.state.query.toLowerCase()) !==
          -1 ||
        note.text.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1
    );
    const commonProps = {
      saveNote: this.saveNote,
      deleteNote: this.deleteNote,
      create: this.state.create,
      createNote: this.createNote,
      updateID: this.state.updateID,
      updateNote: this.updateNote,
    };

    return (
      <div className="app">
        <Header />
        <SearchNote searchNote={this.searchNote} query={this.state.query} />
        <CreateNote createNote={this.createNote} />
        {this.state.create && <Note {...commonProps} />}
        {filteredNotes.length > 0 ? (
          <NoteList {...commonProps} notes={filteredNotes} create={false} />
        ) : (
          <p className="empty">no notes to see 🗒</p>
        )}
      </div>
    );
  }
}

export default App;
