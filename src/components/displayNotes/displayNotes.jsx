import React from "react";
import NotesTools from "../../components/notesTools/notesTools";
import './displayote.css'

    export default function DisplayNotes(props) {
    // const [bgColor, setBgColor] = React.useState('#fff')
    return (
        <div className='displayNotes'>
            {props.NoteList.map((item) =>(
            <div className='notes1' style={{  backgroundColor: item.color }}>
                <div>
                    {item.title}
                </div>
                <div>
                    {item.description}
                </div>
                <div>
                    <NotesTools />
                </div>
            </div> 
        ))}
        </div>
    )
}