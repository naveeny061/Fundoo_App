import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import './notesTools.css';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    },
  }));

export default function NotesTools({setBgColor}){
    const classes = useStyles();
    const open = Boolean(anchorEl);
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
    const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  }
    const selectColor = (value) => {
        setBgColor(value);
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
    
    return(
        <div>
            <IconButton>
                <AddAlertOutlinedIcon fontSize='small' />
            </IconButton>
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
            <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>I use Popover.</Typography>
      </Popover>        
            <IconButton>
                <ArchiveOutlinedIcon fontSize='small'/>
            </IconButton>
            <IconButton>
                <MoreVertOutlinedIcon fontSize='small'/>
            </IconButton>
        </div>
    );
}