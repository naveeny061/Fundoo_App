import React, { useState, useEffect } from 'react';
import DisplayNote from '../displayNotes/displayNotes';
import Service from '../../Services/noteService';

const services = new Service()

export default function ArchiveNotes() {
    const [archiveNote, setArchiveNote] = useState([]);
    var archive = true
    
    const getArchiveNote = () => {
        services.getArchiveNoteList(localStorage.getItem("userToken"))
            .then((result) => {
                setArchiveNote(result.data.data.data.reverse())
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getArchiveNote();
    },[]);

    return (
        <div>
            <DisplayNote NoteList={archiveNote} GetNote={getArchiveNote} isArchive={archive}/>
        </div>
    )
}