import React, { useEffect,  useState } from 'react';
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
import PushNotification from '../components/extra/PushNotification'



const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 350,
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
    collapsedBox: {
        maxHeight: 500,
        overflow: 'auto',
    },
    collapsedTitle: {
        height: 40,
        alignItems: 'center',
        paddingTop: 20,
    },
    collapsedButton: {
        position: "absolute",
        right: 20,
        width: 20,
        height: 10,
        top: 90
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
        viewNotificationClick()
    };

    const handleNotificationClick = (asset) => {
        location.href = "/Trace/" + asset;
    };

    const viewNotificationClick = () => {

        viewNotification().then(response => {
            console.log(response)
        })

    };

    const getNotification = () => {
        getChain().then(response => {

            newNotification.push(response)
            console.log('getNotification :', newNotification)

            sortNotification(newNotification)
        })
    };

    const sortNotification = (response) => {

        response.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))

        response[0] = response[0].filter(e => (e.to == props.user.id && e.view == 0) || (e.from == props.user.id && e.view == 3) || (e.state != 'Transferido'))

        if (response[0].length > 0) {

            //  if (response[0].hasOwnProperty('state')) {
            PushMessage = {
                title: 'Notificaciones Nuevas',
                body: 'Usted tiene ' + response[0].length + ' nueva(s) notificacion(es)',
            }
            PushNotification(PushMessage)
            //    }
            /*
                    response[0].map((data, order) => (
            
                        PushMessage = {
                            title: 'Producto ' + data.state + ' por ' + data.fromName,
                            body: data.commentary,
                        }
            
                        ,PushNotification(PushMessage)
                    ))
            */
        }
        setCount(response[0].length)
        setNotification(response[0])
    };


    let PushMessage = {}


    const listen = () => {

        Echo.private('notification')
            .listen('NotificationEvent', (response) => {
                console.log('echo :', response.data)
                sortNotification(response.data)

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
            {count > 0 ? (
                <>
                    <CardActions className={classes.collapsedTitle}>
                        <CardContent>
                            <p width='100%'>
                                Notificaciones Nuevas : {count}
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
                    <Collapse className={classes.collapsedBox} in={expanded} timeout="auto" unmountOnExit >
                        {notification.map((data, index) => (

                            (() => {
                                switch (data.state) {
                                    case 'Recibido':
                                        src = '/img/acepted.png'
                                        title = 'Producto Recibido por ' + data.toName
                                        break
                                    case 'Transferido':
                                        src = '/img/acepted.png'
                                        title = 'Producto Transferido por ' + data.toName
                                        break
                                    case 'Enviado':
                                        src = '/img/send.png'
                                        title = 'Producto Enviado por ' + data.fromName
                                        break
                                    case 'Rechazado':
                                        src = '/img/cancel.png'
                                        title = 'Producto Rechazado por ' + data.toName
                                        break
                                    case 'Terminado':
                                        src = '/img/banned.png'
                                        title = 'Producto Terminado por ' + data.toName
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
