import React, { useState, useEffect } from 'react';
import DisplayNote from '../displayNotes/displayNotes';
import Service from '../../Services/noteService';

const services = new Service()

export default function TrashNotes() {
    const [trashNote, setTrashNote] = useState([]);
    
    const getTrashNote = () => {
        services.getTrashNoteList(localStorage.getItem("userToken"))
            .then((result) => {
                setTrashNote(result.data.data.data)
                console.log(trashNote)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    React.useEffect(() => {
        getTrashNote();
    },[]);

    return (
        <div>
            <DisplayNote NoteList={trashNote} GetNote={getTrashNote} />
        </div>
    )
}