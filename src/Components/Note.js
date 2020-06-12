/* eslint-disable no-unused-vars */
import React from 'react'

export default function Note({ note, toggleImportance }) {

    const label = note.important ? 'make not important' : 'make important'

    return (
        <div>
            <li className='note'>
                {note.content}
                <button onClick={toggleImportance}>{label}</button>
            </li>
        </div>
    )
}
