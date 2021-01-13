import React, { useState, useEffect } from 'react';
import DisplayNote from '../displayNotes/displayNotes';
import Service from '../../Services/noteService';

const services = new Service()

export default function ArchiveNotes() {
    const [archiveNote, setArchiveNote] = useState([]);
    
    const getArchiveNote = () => {
        services.getArchiveNoteList(localStorage.getItem("userToken"))
            .then((result) => {
                setArchiveNote(result.data.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    React.useEffect(() => {
        getArchiveNote();
    },[]);

    return (
        <div>
            <DisplayNote NoteList={archiveNote} GetNote={getArchiveNote} />
        </div>
    )
}