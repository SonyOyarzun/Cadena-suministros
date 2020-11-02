import React, { useEffect, useState } from 'react';
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
import FindInPageIcon from '@material-ui/icons/FindInPage';

import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { MDBIcon, MDBBtn } from "mdbreact";

import { NavLink, Link, withRouter } from 'react-router-dom';
import zIndex from '@material-ui/core/styles/zIndex';

import { getChain, viewNotification } from '../components/tables/TableFunctions';


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
    const [count, setCount] = useState(0);

    let newNotification = []

    let newCount = 0
    let src = '/storage/images/' + props.config.logotype
    let title = ''

    const handleClick = () => {
        location.href = "/logout";
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
        console.log('expand')
    };

    const handleNotificationClick = (asset) => {
        location.href = "/Trace/" + asset;
    };

    const viewNotificationClick = () => {
        //     viewNotification().then(response => {
        //         console.log(response)
        //     })
    };

    const getNotification = () => {
        getChain().then(response => {
            console.log('get notification:', response)

            newNotification.push(response)
            //   newNotification = response.filter(e => e.to == props.user.id || e.from == props.user.id || e.viewTo == 0)
            sortNotification(newNotification)

            // console.log('filter:', newNotification)
        })
    };

    const sortNotification = (response) => {
        /*
                console.log('sort 1:', newNotification)
                newNotification.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                console.log('sort 2:', newNotification)
                newNotification = newNotification.filter(e => e.to == props.user.id || e.from == props.user.id)
                console.log('sort 3:', newNotification)
                */

        setCount(response[0].length)
        setNotification(response[0])
    };



    const listen = () => {

        Echo.private('notification')
            .listen('NotificationEvent', (response) => {

                newNotification[0].push(response.data[0][0])

                sortNotification(newNotification)

            });

    }



    useEffect(() => {

        getNotification()

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
                    <IconButton className={classes.button} >
                        <PowerSettingsNewTwoToneIcon onClick={handleClick} />
                    </IconButton>
                }
            />
            {count >= 0 ? (
                <>
                    <CardActions>
                        <CardContent>
                            <p width='100%'>
                                Notificaciones Nuevas: {count}
                            </p>
                        </CardContent>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            }, classes.collapsedButton)}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        {notification.map((data, index) => (

                            (() => {
                                switch (data.state) {
                                    case 'Recibido':
                                        src = '/img/acepted.png'
                                        title = 'Producto Recibido por ' + data.toName
                                        break
                                    case 'Enviado':
                                        src = '/img/send.png'
                                        title = 'Producto Enviado por ' + data.fromName
                                        break
                                    case 'Rechazado':
                                        src = '/img/cancel.png'
                                        title = 'Producto Rechazado por ' + data.toName
                                        break
                                }
                            }).call(this),

                            <CardHeader id={index}
                                avatar={
                                    <img className={classes.avatar} src={src}></img>
                                }

                                title={title}
                                subheader={data.commentary}
                                action={
                                    <IconButton className={classes.button} onClick={() => handleNotificationClick(data.asset)}>
                                        <FindInPageIcon />
                                    </IconButton>
                                }
                            />
                        ))}
                    </Collapse>
                </>
            ) : (<></>)
            }
        </Card>
    );
}

export default withRouter(Profile)
