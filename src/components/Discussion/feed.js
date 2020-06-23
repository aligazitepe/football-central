import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import axios from "axios";
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginTop: 15
  },
  media: {
    height: 0,
    paddingTop: '5%', // 16:9
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
    backgroundColor: red[500],
  },
}));

function FeedCards(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  console.log("Feed Item: ", props.feed)

  function handleDelete (){
    alert("Post deleted!")
    const id = props.feed;

    props.deletePost(id);
  }

  return (
     <Link to={{ pathname: `/Discussion/${props.feed._id}`, state: props.feed}}>
       
    <Card className={classes.root}>
      <CardHeader 
       avatar={
        <Avatar style={{backgroundColor:"rgba(33, 181, 100, 0.93)"}}aria-label="recipe" className={classes.avatar}>
          
        </Avatar>
      }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.feed.topic ? props.feed.topic : "-"}
        subheader={props.feed.createdAt ? moment(props.feed.createdAt).format("MMMM DD, YYYY") : "-"}
      />
      <CardMedia
        className={classes.media}
        image=""
        title="Topic"
      />
      <CardContent>
        <Typography  style={{fontSize: 20, color:"black"}} variant="body2" color="textSecondary" component="p">
          {props.feed.body ? props.feed.body : "-"}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton onClick={handleDelete}
          className={clsx(classes.expand)}
          
          aria-expanded={expanded}
          aria-label="show more"
        >
          <DeleteOutlineIcon />
        </IconButton>
      </CardActions>
   
    </Card>
    </Link>
    
  );
}

export default FeedCards