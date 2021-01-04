// import React from "react";
// import SnackBar from '@material-ui/core/Snackbar'
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     '& > * + *': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

// export default function snackbar(){
//   const classes = useStyles();
//   const [snackOpen, setOpen] = React.useState(true);
  
//   const  snackbarClose = () => {
//     setOpen(false);
//   };
// return(
//     <div className={classes.root}>
//     <SnackBar 
//         anchorOrigin={{vertical:'center ',horizontal:'center'}}
//         open = {snackOpen}
//         autoHideDuration={3000}
//         onClose={snackbarClose}
//         message={snackbarMsg}
//         action={[
//         <IconButton 
//             key='close'
//             arial-label='close'
//             color='inherit'
//             onClick={snackbarClose}>
//                 x
//         </IconButton>
//         ]}
//     />
//       </div>
//     )
//   }
