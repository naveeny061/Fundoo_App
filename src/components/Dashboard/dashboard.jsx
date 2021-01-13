import React from 'react';
import clsx from 'clsx';
import { makeStyles , fade } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import './dashboard.css'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import NotificatiosNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import EditOutlinedIcon  from '@material-ui/icons/EditOutlined';
import ArchiveOutlinedIcon  from '@material-ui/icons/ArchiveOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Notes from '../notes/createNotes'
import Avatar from '@material-ui/core/Avatar';
import DisplayNotes from "../displayNotes/displayNotes";
import Service from '../../Services/noteService'
import TrashNotes from '../../components/trashNote/trashNotes'
import ArchiveNote from '../../components/archive/archive'

const services = new Service()

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: 'flex',
  // },
  menuButton: {
    marginRight: 20,
    marginLeft: 20
  },
  // hide: {
  //   display: 'none',
  // },
  drawer: {
    width: drawerWidth,
    whiteSpace: 'nowrap',
    paddingLeft: '15px',
  },
  drawerOpen: {
    border:"none",
    position:'relative',
    width: drawerWidth,
    // transition: theme.transitions.create('width', {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
  },
  drawerClose: {
    position:'relative',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  mainContainer:{
    width:'100vw',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    paddingTop:'32px'
  },
  // toolbar: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   // justifyContent: 'flex-end',
  //   borderBottom: '1px solid lightGrey',
  //   borderRadius:0,
  //   // padding: theme.spacing(0, 1),
  //   // padding: '8px',
  //   // necessary for content to be below app bar
  //   ...theme.mixins.toolbar,
  // },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    color:'black',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  appBar:{
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    flexDirection:'row',
    boxShadow :'unset',
    borderBottom: '1px solid lightGrey',
    borderRadius:0,
    // padding: theme.spacing(0, 1),
    // padding: '8px',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  search: {
    display:'flex',
    flex:'row',
    position: 'relative',
    // borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'relative',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:'black'
  },
  inputRoot: {
    // color: 'inherit',
    background:'#f1f3f4',
    borderRadius:'0.5em',
    width:'100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

export default function Dashboard() {
  
  const classes = useStyles();
  const menuId = 'primary-search-account-menu';
  const [open, setOpen] = React.useState(false);
  const [openTrash, setTrash] = React.useState(false);
  const [openArchive, setArchive] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [noteList, setNoteList] = React.useState([]);
  const isMenuOpen = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleTrash = () => {
    setTrash(!openTrash);
  };
  const handleArchive = () => {
    setArchive(!openArchive);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  }
  const getNote = () => {
    services.getNoteList(localStorage.getItem("userToken")).then((result) => {
        console.log(result)
        setNoteList(result.data.data.data.filter(item => item.isDeleted === false && item.isArchived === false));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  React.useEffect(() => {
    getNote()
  }, []);
  return (
    <div className='main-dashboard'>
      <div> 
        <AppBar position="static" className={classes.appBar}>
          <IconButton
            onClick={ open ? handleDrawerClose : handleDrawerOpen }
            className={classes.menuButton}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" alt=""/>
          <Typography className={classes.title} variant="h6" noWrap>
            Fundoo 
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <Avatar alt="H" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </div>
          <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
          </Menu>
        </AppBar>
      </div>
      <div className='content'>
        <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        >
          <List>
            <ListItem button>
              <ListItemIcon>
                <EmojiObjectsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Notes" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <NotificatiosNoneOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Reminder" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <EditOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Edit Labels" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ArchiveOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Archive" onClick={handleArchive}/>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Trash" onClick={handleTrash} />
            </ListItem>  
          </List>
        </Drawer>
      <div className={classes.mainContainer}><>
        if (openTrash) {
          <TrashNotes/>
        }
        if(openArchive){
          <ArchiveNote/>
        }  
        if (!openTrash && ! openArchive) {<>
          <Notes GetNote={getNote} NoteList={noteList}/>  
          <DisplayNotes  NoteList={noteList} GetNote={getNote} />
          </>  
        }
      </>
      </div>
      </div>
    </div>
  );
}