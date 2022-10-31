import React, { useState, useEffect } from "react";
import axios from "axios";
import './NotesStyle.css'
import NotesItem from './NotesItem';

export default function NotesList() {
    const [notes, setNotes] = useState([]);

    // When the call is made, update newsArticles
    useEffect(() => {
      async function apiCall() {
        let note = await axios.get("http://localhost:5000/notes/user/1");
        setNotes(note.data.notes);
      }
  
      apiCall();
    }, []);

    if (notes.length === 0) {
        return (
          <div className="center">
            <h2>No notes found.</h2>
          </div>
        );
      }

    //   id: 'n1',
    //   notes: 'Helloooo',
    //   creator: '1',
    //   section: 'News'
      return (
        <ul className="notes-list">
          {notes.map(note => (
            <NotesItem
              key={note.id}
              id={note.id}
              title={note.title}
              notes={note.notes}
              creator={note.creator}
              section={note.section}
            />
          ))}
        </ul>
      );
}