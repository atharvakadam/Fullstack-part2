import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './CSS/App.css';
import axios from 'axios';
import Note from './Components/Note';


function App() {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    console.log('effect');
    axios.get('http://localhost:3001/notes').then(response => {
    // const notes = response.data
    console.log('promise fulfilled');
    setNotes(response.data);
    // console.log(notes);
    })
  };

  useEffect(hook, []);
  console.log('render',notes.length,'notes');
  
  const addNote = (event) => {
    console.log(event);
    event.preventDefault();
    console.log('button clicked', event.target);
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    setNotes(notes.concat(noteObject));
    setNewNote('');
  }

  const handleNoteChange = (event) => {
    // console.log(document.getElementById("FDD").value);
    console.log(event.target.value);
    setNewNote(event.target.value);
    console.log(newNote);
  }
  
  // console.log(notes)
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)


  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note}/>)}
      </ul>
      <button onClick={() => setShowAll(!showAll)}>
        show{showAll ? 'important':'all'}
      </button>
      <form onSubmit={addNote}>
        <input id="FDD" value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
    </div>
  );
}

export default App;
