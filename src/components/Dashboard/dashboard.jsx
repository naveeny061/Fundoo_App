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
import Avatar from '@material-ui/core/Avatar';
import TrashNotes from '../../components/trashNote/trashNotes'
import Notes from '../../components/Note/Note'
import ArchiveNote from '../../components/archive/archive'
import {Switch, Route ,Link ,Redirect} from 'react-router-dom'
import Button from '@material-ui/core/Button'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: 20,
    marginLeft: 20
  },
  drawer: {
    width: drawerWidth,
    whiteSpace: 'nowrap',
    paddingLeft: '15px',
  },
  drawerOpen: {
    border:"none",
    position:'relative',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
  },
  search: {
    display:'flex',
    flex:'row',
    position: 'relative',
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
    background:'#f1f3f4',
    borderRadius:'0.5em',
    width:'100%',
    [theme.breakpoints.down('xs')]: {
      width: '0',
    },
    [theme.breakpoints.up('xs')]: {
      width: '400px',
    }
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.down('md')]: {
      width: '40ch',
    },

  },
  
  profile:{
    display: 'flex',
    flexDirection:'column',
    alignItems:'center',
    marginTop:'20px',
    marginLeft:'50px',
    marginRight:'50px'
  },
  image:{
    display:'permanent'
  }
}));

export default function Dashboard() {
  
  const classes = useStyles();
  const menuId = 'primary-search-account-menu';
  const [open, setOpen] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const [openTrash, setTrash] = React.useState(false);
  const [openArchive, setArchive] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
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
  const handleLogout = () => {
    localStorage.clear();
    setRedirect(true);
  };
  if(redirect){
   return <Redirect to='/signIn' />
 } 
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
          <div className={classes.image}>
            <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" alt=""/>
          </div>
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
            <div className={classes.profile}>
              <div className='profile-row'>
                <Avatar alt="H" src="/static/images/avatar/2.jpg" sizes='large' />
              </div>
              <div className='profile-row'>
                {localStorage.getItem("firstName")}{" "}{localStorage.getItem("lastName")}
              </div>
              <div className='profile-row'>
                <span>{localStorage.getItem("email")}</span>
              </div>
              <div className='profile-logout'> 
                <Button onClick={handleLogout}>Logout</Button>
              </div>
            </div>
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
            <ListItem  button component={Link} to="/dashBoard/notes">
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
            <ListItem button component={Link} to="/dashBoard/archive">
              <ListItemIcon>
                <ArchiveOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Archive"  onClick={handleArchive}/>
            </ListItem>
            <ListItem button component={Link} to="/dashBoard/trash">
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Trash"  onClick={handleTrash} />
            </ListItem>  
          </List>
        </Drawer>
      <div className={classes.mainContainer}>
      <Switch>
          <Route exact path="/dashBoard/notes" component={Notes} />
          <Route exact path="/dashBoard/trash" component={TrashNotes} />
          <Route exact path="/dashBoard/archive" component={ArchiveNote} />
        </Switch>
      </div>
      </div>
    </div>
  );
}