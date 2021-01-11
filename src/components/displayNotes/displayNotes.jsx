import React from "react";
import NotesTools from "../../components/notesTools/notesTools";
import './displayote.css'

    export default function DisplayNotes(props) {
    return (
        <div className='displayNotes'>
            {props.NoteList.filter(item => item.isDeleted === false).map((item) =>(
            <div className='notes1' style={{  backgroundColor: item.color }}>
                <div>
                    {item.title}
                </div>
                <div>
                    {item.description}
                </div>
                <div>
                    <NotesTools  id={item.id}/>
                </div>
            </div> 
        ))}
        </div>
    )
}