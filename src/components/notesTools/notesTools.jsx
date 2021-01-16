import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import UnArchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './notesTools.css';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Service from '../../Services/noteService'
import RestoreFromTrashOutlinedIcon from '@material-ui/icons/RestoreFromTrashOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

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
    // const [color, setColor] = React.useState(false)
    const [pallete, showPallete] = React.useState(false);
    const[open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    // const handleColor = () => {
    //     setColor(true)
    // }
    // const handleColorOut = () => {
    //     setColor(false)
    // }
    const handleMouse = (event) => {
        // handleColor();
        setAnchorEl(event.currentTarget);
        showPallete(!pallete)
    }
    const handleClose = () => {
        // handleColor();
        // setAnchorEl(event.currentTarget);
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
    const handleUnDeleteNotes = () => {
        let data = {
            noteIdList: [props.id],
            isDeleted: false
        }
        services.delete(data, localStorage.getItem("userToken")).then(result => {
            console.log(result)
            props.GetNote();
        }).catch(error => {
            console.log(error);
        })
    }
    const handleDeleteForever = () => {
        let data = {
            noteIdList: [props.id]
        }
        services.deleteForever(data, localStorage.getItem("userToken")).then(result => {
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
    const handleUnArchiveNotes = () => {
        let data = {
            noteIdList: [props.id],
            isArchived: false
        }
        services.archiveNotes(data, localStorage.getItem("userToken")).then(result => {
            console.log(result)
            props.GetNote();
        }).catch(error => {
            console.log(error);
        })
    }
    const updateColor = (value) => {
        if (props.id !== '') {
            props.setBgColor(value);
            let data = {
                noteIdList: [props.id],
                color: value
            }
            services.updateColor(data, localStorage.getItem("userToken")).then(result => {
                console.log(result)
                props.GetNote();
            }).catch(error => {
                console.log(error);
            })
        }
        else {
            props.setBgColor(value);
        }
    }
    return(<div>
        {props.istrash ?
        <div>
            <IconButton onClick={handleDeleteForever}>
                <DeleteForeverOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton  onClick={handleUnDeleteNotes}>
                <RestoreFromTrashOutlinedIcon fontSize="small" />
            </IconButton>
        </div>
        :
        <div className ='toolarButton'>
            <IconButton>
                <AddAlertOutlinedIcon fontSize='small' />
            </IconButton>    
            <IconButton>
                <PersonAddOutlinedIcon fontSize='small'/>
            </IconButton>
            <div className ='color-option'>
            <IconButton className ='color-option' onMouseOver={handleMouse} >
                <ColorLensOutlinedIcon fontSize="small" />
            </IconButton>
            <Popover
                // id={id}
                open={pallete}
                onMouseOut={handleClose}
                className ='color-pallete'
                anchorEl={anchorEl}
                // onClose={handleColorOut}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
            >
                <Typography className='typography'>
                    {data.map((item) => (
                        <button  onClick={() => updateColor(item.id) } className="palleteColor" style={{ backgroundColor: item.id }}>
                        </button>
                    ))}
                </Typography>
            </Popover>
            </div>
            <IconButton>
                <ImageOutlinedIcon fontSize='small'/>
            </IconButton>
            {props.isArchive ?
                <IconButton>
                    <UnArchiveOutlinedIcon fontSize="small" onClick={handleUnArchiveNotes}/>
                </IconButton>
                :
                <IconButton onClick={handleArchiveNotes}>
                    <ArchiveOutlinedIcon fontSize='small'/>
                </IconButton>
            }
            <div className='moreOptions'>
            <IconButton onClick={handleClick} className='moreOptions'>
                <MoreVertOutlinedIcon fontSize='small' />
            </IconButton>
                <Menu
                    className='more-Options'
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted 
                    open={open}
                    onClose={handleClick}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'top',
                        }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                        }}
                    >
                    <MenuItem onClick={handleDeleteNotes}>Delete Note</MenuItem>
                </Menu>
            </div>
        </div>
    }
    </div>
    );
}