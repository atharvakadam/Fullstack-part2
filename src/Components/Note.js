import React from 'react'

export default function Note({ note }) {
    return (
        <div>
            <li>{note.content}</li>
        </div>
    )
}
