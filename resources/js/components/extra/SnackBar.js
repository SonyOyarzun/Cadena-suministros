import React ,{useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { truncate } from 'lodash';

function Alert(props) {
  return <MuiAlert elevation={9} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    position: "fixed",
    top: 0,
    zIndex: 9999999
  },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [event, setEvent] = React.useState(null);

  console.log('snack :', props)

  useEffect( ()=>{


   setOpen(props.show)
  
    
 },[props]);


  const handleClose = (event, reason) => {

    console.log('event' ,event,'reason', reason)
  
    if (reason === 'clickaway') {
      setOpen(true)  
      return
    }
    setOpen(false)  
    
  };

  console.log('show :', open)

  return (
    <div className={classes.root}>
      <Snackbar  open={open} autoHideDuration={5000} >
        <Alert onClose={handleClose} severity={props.type}>
          {props.alert}
        </Alert>
      </Snackbar>
    </div>
  );
}


