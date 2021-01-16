import React from "react";
import NotesTools from "../../components/notesTools/notesTools";
import './displayote.css'
import UpdateNote from '../updateNote/updateNote'

    export default function DisplayNotes(props) {
        const [note, setNote] = React.useState([])
        const [update, setUpdate] = React.useState(false)
        const handleUpdate = (value) => {
            setUpdate(true)
            setNote(value)
        }
        const handleClose = () => {
            setUpdate(false)
        }
    return (
        <div className='displayNotes'>
            {props.NoteList.map((item) =>(
            <div className='notes1' style={{  backgroundColor: item.color }}>
                <div className='title' onClick={() => handleUpdate(item)}>
                    {item.title}
                </div>
                <div className='description' onClick={() => handleUpdate(item)}>
                    {item.description}
                </div>
                <div className='toolbar'>
                    <NotesTools  id={item.id}  GetNote={props.GetNote} isArchive={props.isArchive} istrash={props.istrash}/>
                </div>
            </div> 
        ))}
        <UpdateNote item={note} open={update} close={handleClose} GetNote={props.GetNote} />
        </div>
    )
}