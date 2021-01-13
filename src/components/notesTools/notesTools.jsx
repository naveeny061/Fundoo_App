import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './notesTools.css';
import Service from '../../Services/noteService'

const services = new Service()

export default function NotesTools(props){
    const data = [
        {key:'1' ,id: "#fff" },
        {key:'2' ,id: "#f28b82" },
        {key:'3' , id: "#fbbc04" },
        {key:'4' , id: "#fff475" },
        {key:'5' , id: "#ccff90" },
        {key:'6' , id: "#a7ffeb" },
        {key:'7' , id: "#cbf0f8" },
        {key:'8' , id: "#aecbfa" },
        {key:'9' , id: "#d7aefb" },
        {key:'10' , id: "#fdcfe8" },
        {key:'11' , id: "#e6c9a8" },
        {key:'12' , id: "#e8eaed" },
    ];
    const [color, setColor] = React.useState(false)
    const [pallete, showPallete] = React.useState(false);
    const[open, setOpen] = React.useState(false);

    const selectColor = (value) => {
        props.setBgColor(value);
    };

    const handleColor = () => {
        setColor(true)
    }

    const handleColorOut = () => {
        setColor(false)
    }
    const handleMouse = () => {
        handleColor();
        showPallete(!pallete)
    }
    const handleClick = () => {
      setOpen(!open);
  } 
  const handleDeleteNotes = () => {
    let data = {
        noteIdList: [props.id],
         isDeleted: true
    }
    services.delete(data, localStorage.getItem("userToken")).then(result => {
        console.log(result)
        props.GetNote();
    }).catch(error => {
        console.log(error);
    })
}
    const handleArchiveNotes = () => {
        let data = {
            noteIdList: [props.id],
            isArchived: true
        }
        services.archiveNotes(data, localStorage.getItem("userToken")).then(result => {
            console.log(result)
            props.GetNote();
        }).catch(error => {
            console.log(error);
        })
    }

    return(
        <div>
            <IconButton>
            </IconButton>
                <AddAlertOutlinedIcon fontSize='small' />
            <IconButton>
                <PersonAddOutlinedIcon fontSize='small'/>
            </IconButton>
            <IconButton onMouseOver={handleMouse} >
                <ColorLensOutlinedIcon fontSize="small" />
            </IconButton>
            {pallete ? (
                <div className={color ? "colorChange" : "noChange "} 
                    onMouseOver={handleColor} onMouseOut={handleColorOut} style={{ width: 150 }}>
                    {data.map((item) => (
                        <button onMouseOver={handleColor} onClick={() => selectColor(item.id)} className="palleteColor" style={{ backgroundColor: item.id }}>
                        </button>
                    ))}
                </div>
            ) : null}
            <IconButton>
                <ImageOutlinedIcon fontSize='small'/>
            </IconButton>
            <IconButton onClick={handleArchiveNotes}>
                <ArchiveOutlinedIcon fontSize='small'/>
            </IconButton>
            <>
            <IconButton onClick={handleClick}>
                <MoreVertOutlinedIcon fontSize='small'/>
            </IconButton>
                <Menu
                    className='moreOptions'
                    id="simple-menu"
                    // anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClick}>
                    <MenuItem onClick={handleDeleteNotes}>Delete Note</MenuItem>
                </Menu>
            </>
        </div>
    );
}