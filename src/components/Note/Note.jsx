import React, { useState, useEffect } from 'react';
import Notes from '../notes/createNotes'
import DisplayNotes from "../displayNotes/displayNotes";
import Service from '../../Services/noteService';

const services = new Service()

export default function Note(props) {
    const [noteList, setNoteList] = useState([]);

    const getNote = () => {
        services.getNoteList(localStorage.getItem("userToken")).then((result) => {
            console.log(result)
            setNoteList(result.data.data.data.reverse().filter(item => item.isDeleted === false && item.isArchived === false));
          })
          .catch((error) => {
            console.log(error);
          });
      }

    useEffect(() => {
        getNote();
    }, []);

    return (
        <>
            <Notes GetNote={getNote} NoteList={noteList} />
            <DisplayNotes NoteList={noteList} GetNote={getNote} />
        </>
    )
}