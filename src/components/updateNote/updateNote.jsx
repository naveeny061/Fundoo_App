import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import InputBase from '@material-ui/core/InputBase';
import NotesTool from '../notesTools/notesTools';
import Service from '../../Services/noteService'

const services = new Service()

const useStyles = makeStyles((theme) => ({
    notes1:{
        width:'500px',
        border: '1px solid lightGrey',
        borderRadius:'0.5em',
        padding:'10px 15px',
    }
}));

export default function UpdateNote(props) {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [Bgcolor, setColor] = useState();
    const [id, setId] = useState();

    const handleUpdate = () => {
        let formData = new FormData();
        formData.set("noteId", id)
        formData.set("title", title);
        formData.set("description", description);
        services.updateNotes(formData, localStorage.getItem("userToken")).then(result => {
            console.log(result)
            props.GetNote()
            props.close()
        }).catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        setTitle(props.item.title);
        setColor(props.item.color);
        setDescription(props.item.description);
        setId(props.item.id);
    }, [props])
    return(  
        <Dialog onClose={props.close}  open={props.open}>
            <div className={classes.notes1}  style={{ backgroundColor: Bgcolor }} >
                <div className='title'>
                <InputBase placeholder='Title' fullWidth value={title} onChange={(e) => setTitle(e.target.value)}/>
                <button className='pinbutton'>
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICA8cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+CiAgPHBhdGggZmlsbD0iIzAwMCIgZD0iTTE3IDR2N2wyIDN2MmgtNnY1bC0xIDEtMS0xdi01SDV2LTJsMi0zVjRjMC0xLjEuOS0yIDItMmg2YzEuMTEgMCAyIC44OSAyIDJ6TTkgNHY3Ljc1TDcuNSAxNGg5TDE1IDExLjc1VjRIOXoiLz4KPC9zdmc+Cg==" alt=""/>
                </button>
                </div>
                <InputBase placeholder='Take a note' fullWidth value={description} onChange={(e) => setDescription(e.target.value)}/>
                <div className='tools-close'>
                <NotesTool id={props.item.id} setBgColor={setColor} />
                <button className='closeButton' onClick={handleUpdate}>Close</button>
                </div>
            </div>
        </Dialog>
    )
}