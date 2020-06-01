import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './CSS/App.css';
import axios from 'axios';
import Note from './Components/Note';
import noteService from './services/notes'



function App() {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    // console.log('effect');
    // axios.get('http://localhost:3001/notes').then(response => {
    // // const notes = response.data
    // console.log('promise fulfilled');
    // setNotes(response.data);
    // // console.log(notes);
    // })
    noteService.getAll().then(Initialnotes => {
      console.log("initial notes", Initialnotes);
      setNotes(Initialnotes);
    }).catch(error => {
      console.log('fail')
    })
  };

  useEffect(hook, []);
  console.log('render',notes.length,'notes');
  console.log(notes);
  
  const addNote = (event) => {
    // console.log(event);
    event.preventDefault();
    console.log('button clicked', event.target);
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    // axios.post('http://localhost:3001/notes',noteObject).then(response => {
    //   console.log(response)
    //   setNotes(notes.concat(response.data));
    //   setNewNote('');
    // });
    noteService.create(noteObject).then(changedNote => {
      setNotes(notes.concat(changedNote));
      setNewNote('');
    }).catch(error => {
      console.log('fail')
    })
  }


  const handleNoteChange = (event) => {
    // console.log(document.getElementById("FDD").value);
    console.log(event.target.value);
    setNewNote(event.target.value);
    console.log(newNote);
  }
  
  // console.log(notes)
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const toggleImportanceOf = (id) => {
        console.log('Importance of ', id, ' needs to be toggled.');
        // const url = `http://localhost:3001/notes/${id}`
        const note = notes.find(n => n.id === id);
        console.log(note.important)
        const changedNote = {...note, important:!note.important}
        console.log(changedNote.important)
        // axios.put(url,changedNote).then(response => {
        //   setNotes(notes.map(note => note.id !== id ? note : response.data));
        // })
        noteService.update(id,changedNote).then(returnedNotedata => {
          notes.map(note => note.id !== id ? note : returnedNotedata)
          // A function call to getAll added here to get the updated data from the json server
          noteService.getAll().then(Initialnotes => {
            console.log("initial notes", Initialnotes);
            setNotes(Initialnotes);
          }).catch(error => {
            console.log('fail')
          })
          // setNotes(notes);
          // setNotes(notes);

        }).catch(error => {
          alert(
            `the note '${note.content}' was already deleted from server`
          )
          setNotes(notes.filter(n => n.id !== id));
        }
        );
    }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>)}
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
