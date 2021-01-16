import React from 'react';
import './createNotes.css';
import IconButton from '@material-ui/core/IconButton';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import BrushIcon from '@material-ui/icons/Brush';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import NotesTool from "../notesTools/notesTools";
import Service from '../../Services/noteService';

const services = new Service()

const useStyles = makeStyles((theme) => ({
    notes1:{
        width:'50vw',
        border: '1px solid lightGrey',
        borderRadius:'0.5em',
        padding:'10px 15px',
        [theme.breakpoints.down('xs')]: {
            width: 'fit-content',
          },
    }
}));

export default function CreateNotes(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [bgColor, setBgColor] = React.useState('#fff')
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleClick = () => {
        setOpen(!open);
        saveNote();
    }
    const saveNote = () => {
        if(title !== ''){
            let noteData = {
                'title': title,
                'description': description,
                'color': bgColor
            }
            services.saveNotes(noteData,localStorage.getItem("userToken")).then(result => {
                console.log(result);
                props.GetNote()
            }).catch((error) => {
                    console.log(error);
                });
            reset();
        };    
    }
    const reset = () =>{
        setBgColor('#fff');
        setTitle('');
        setDescription('');
    }
        return(
        <div >
            { open ?
            <div className='notes' onClick={handleClick} >
                <span className='text'>Take a note...</span>
                <IconButton className='icon'><CheckBoxOutlinedIcon /></IconButton>
                <IconButton className='icon'> <BrushIcon /></IconButton>
                <IconButton className='icon'> <ImageOutlinedIcon /></IconButton>
            </div>
            :
            <div>    
            <div className={classes.notes1} style={{ backgroundColor: bgColor }} >
                <div className='title'>
                <InputBase placeholder='Title' fullWidth value={title} onChange={(e) => setTitle(e.target.value)}/>
                <button className='pinbutton'>
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICA8cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+CiAgPHBhdGggZmlsbD0iIzAwMCIgZD0iTTE3IDR2N2wyIDN2MmgtNnY1bC0xIDEtMS0xdi01SDV2LTJsMi0zVjRjMC0xLjEuOS0yIDItMmg2YzEuMTEgMCAyIC44OSAyIDJ6TTkgNHY3Ljc1TDcuNSAxNGg5TDE1IDExLjc1VjRIOXoiLz4KPC9zdmc+Cg==" alt=""/>
                </button>
                </div>
                <InputBase placeholder='Take a note' fullWidth value={description} multiline onChange={(e) => setDescription(e.target.value)}/>
                <div className='tools-close'>
                <NotesTool  setBgColor={setBgColor}  />
                <button className='closeButton' onClick={handleClick}>Close</button>
                </div>
            </div>
        </div>
        }
    </div>
    );
}