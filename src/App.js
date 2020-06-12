/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import './CSS/App.css'
import axios from 'axios'
import Note from './Components/Note'
import noteService from './services/notes'
import loginService from './services/login'
import Error from './Components/Error'
import Togglable from './Components/Togglable'
import LoginForm from './Components/LoginForm'
import NoteForm from './Components/NoteForm'

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }

    return (
        <div style={footerStyle}>
            <br />
            <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
        </div> 
    )
}


function App() {

    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)


    const hook = () => {
        noteService.getAll().then(Initialnotes => {
            console.log('initial notes', Initialnotes)
            setNotes(Initialnotes)
        }).catch(error => {
            console.log('fail')
        })
    }

    useEffect(hook, [])

    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJson) {
            const user = JSON.parse(loggedUserJson)
            setUser(user)
            noteService.setToken(user.token)
        }
    },[])
    console.log('render',notes.length,'notes')
    console.log(notes)
  
    const addNote = (noteObject) => {
        noteFromRef.current.toggleVisibility()
        noteService.create(noteObject).then(changedNote => {
            setNotes(notes.concat(changedNote))
        })
    }

  
    // console.log(notes)
    const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

    const toggleImportanceOf = (id) => {
        console.log('Importance of ', id, ' needs to be toggled.')
        // const url = `http://localhost:3001/notes/${id}`
        const note = notes.find(n => n.id === id)
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
                console.log('initial notes', Initialnotes)
                setNotes(Initialnotes)
            }).catch(error => {
                console.log('fail')
            })
            // setNotes(notes);
            // setNotes(notes);

        }).catch(error => {
            setErrorMessage(
                `Note '${note.content}' was already removed from server`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            setNotes(notes.filter(n => n.id !== id))
        }
        )
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)
        try{
            const user = await loginService.login({username, password})
            window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
            noteService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        }
        catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
        
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        console.log(user.username, 'logged out.')
        window.localStorage.removeItem('loggedNoteAppUser')
        noteService.setToken(null)
        setUser(null)

    }

    const loginForm = () => { 
        return (
            <div>
                <Togglable buttonLabel="log in">
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={({ target }) => setUsername(target.value)}
                        handlePasswordChange={({ target }) => setPassword(target.value)}
                        handleSubmit={handleLogin}
                    />
                </Togglable>  
            </div>
        )
    }
  
    const noteFromRef = React.createRef()

    const noteForm = () => (
        <Togglable buttonLabel="new note" ref={noteFromRef}>
            <NoteForm createNote={addNote}/>
        </Togglable> 
    )
  
    
    return (
        <div>
            <h1>Notes</h1>
            <Error message={errorMessage}/>
      
            {user === null ? loginForm() : <div><p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>  {noteForm()}</div>}

            <div>
                <button onClick={() => setShowAll(!showAll)}>
                  show{showAll ? 'important':'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>)}
            </ul>
            <Footer />
        </div>
    )
}

export default App
