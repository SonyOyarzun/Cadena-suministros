import React, { useEffect , useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PowerSettingsNewTwoToneIcon from '@material-ui/icons/PowerSettingsNewTwoTone';

import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { MDBIcon, MDBBtn } from "mdbreact";

import { NavLink, Link, withRouter } from 'react-router-dom';
import zIndex from '@material-ui/core/styles/zIndex';

import { getChain } from '../components/tables/TableFunctions';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
        position: "fixed",
        right: 30,
        top: 10,
        zIndex: 999
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 0,
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        maxWidth: 50,
    },
    collapsedTitle: {

    },
    collapsedButton: {
        position: "absolute",
        right: 20,
        width: 20,
        height: 20,
    },
    button: {
        marginTop: 10,
        marginLeft: 10,
    },
}));

function Profile(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [notification, setNotification] = useState([]);

    const handleClick = () => {
        location.href = "/logout";
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const listen = () => {

        getChain().then(response => {
            setNotification(response)
        })

        //console.log('canal :',this.channel)
        Echo.private('notification')
            .listen('NotificationEvent', (response) => {
                //  console.log('echo :',response.data[0] )
                setNotification(response.data)
            });

    }



    useEffect(() => {
        listen()   
      }, [])


    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <img className={classes.avatar} src={'/storage/images/' + props.config.logotype}></img>
                }

                title={props.user.name}
                subheader={props.user.email}
                action={
                    <IconButton className={classes.button}>
                        <PowerSettingsNewTwoToneIcon onClick={handleClick} />
                    </IconButton>
                }
            />

            <CardActions>
                <CardContent>
                    <p width='100%'>
                       Notificaciones Nuevas:
                    </p>
                </CardContent>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    },classes.collapsedButton)}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <p >Method:</p>
                    <p >
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                        minutes.
                    </p>
                </CardContent>
            </Collapse>

        </Card>
    );
}

export default withRouter(Profile)
