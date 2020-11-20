import React ,{useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { truncate } from 'lodash';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  useEffect( ()=>{
    setOpen(true)  
 },[props.alert]);


  const handleClose = (event, reason) => {

    console.log('event' ,event,'reason', reason)

    if (reason === 'clickaway') {
      setOpen(false)  
    }
  };

  console.log('show :', open)

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={10000}  onClose={handleClose} >
        <Alert onClose={handleClose} severity={props.type}>
          {props.alert}
        </Alert>
      </Snackbar>
    </div>
  );
}


