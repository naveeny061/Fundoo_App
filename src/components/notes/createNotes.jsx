import React from 'react';
import './createNotes.css';
import IconButton from '@material-ui/core/IconButton';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import BrushIcon from '@material-ui/icons/Brush';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
// import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
    notes1:{
        width:'50vw',
        border: '1px solid lightGrey',
        borderRadius:'0.5em',
        // height:'100px'
    }
}));

export default function CreateNotes() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open)
    }

    return(
        <div >{ open ?
            <div className='notes' onClick={handleClick} >
                <span className='text'>Take a note...</span>
                <IconButton className='icon'><CheckBoxOutlinedIcon /></IconButton>
                <IconButton className='icon'> <BrushIcon /></IconButton>
                <IconButton className='icon'> <ImageOutlinedIcon /></IconButton>
            </div>
            :
            <div>    
            <div className={classes.notes1}>
                <span>Title</span>
                <InputBase placeholder='Take a note' fullWidth />
                {/* <TextField
                    id="outlined-multiline-static"
                    multiline
                    defaultValue="Title"
                    rows={2}
                    placeholder="Take a note..."
                    variant="outlined"
                    className={classes.notes1}
                /> */}
            </div>
        </div>
        }
    </div>
    );
}