import React from 'react';
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

import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { MDBIcon, MDBBtn } from "mdbreact";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
        position: "fixed",
        right: 30,
        top: 10
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
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
}));

export default function RecipeReviewCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <img className={classes.avatar} src={'/storage/images/' + props.config.logotype}></img>
                }
                action={
                    <IconButton aria-label="settings" className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >

                        <ExpandMoreIcon />

                    </IconButton>
                }
                title={props.user.name}
                subheader={props.user.email}
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent className='text-center'>
                    <Typography paragraph><a className='lightDark-text' href='/logout'><MDBIcon className='lightDark-text' icon="door-open" style={{ fontSize: '1.75em' }} />Salir</a></Typography>
                </CardContent>
            </Collapse>
        </Card>

    );
}
