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
import PowerSettingsNewTwoToneIcon from '@material-ui/icons/PowerSettingsNewTwoTone';

import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { MDBIcon, MDBBtn } from "mdbreact";

import { NavLink, Link, withRouter } from 'react-router-dom';
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
        position: "fixed",
        right: 30,
        top: 10,
        zIndex:999
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
    button: {
        marginTop: 10,
        marginLeft: 10,
    },
}));

 function RecipeReviewCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleClick = () => {
        location.href = "/logout";
    };

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
             
        </Card>

    );
}

export default withRouter(RecipeReviewCard)
