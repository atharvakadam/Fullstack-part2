/* eslint-disable no-unused-vars */
import React, {useState} from 'react'

const NoteForm = (props) => {
    const [newNote, setNewNote] = useState('')
    
    const handleChange = (event) => {
        setNewNote(event.target.value)
    }

    const addNote = (event) => {
        event.preventDefault()

        props.createNote({
            content: newNote,
            important: false,
            date: Date()
        })

        setNewNote('')
    }


    return (
        <div className="formDiv">
            <h2>Create a new Note</h2>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleChange}/>
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default NoteForm