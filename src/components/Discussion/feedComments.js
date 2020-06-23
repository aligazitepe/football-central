import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AddFeed from './addFeedComment';
import axios from "axios";
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import AddCommentIcon from '@material-ui/icons/AddComment';
import Avatar from '@material-ui/core/Avatar';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { Link } from 'react-router-dom'

const buttonStyles =  { background: "black", color: "white", width: 'auto' }
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
  const [showAddFeed, setShowAddFeed] = useState(false);
  console.log("PROPS HERE: ", props.location.state)
  function handleDelete (){
    alert("Post deleted!")
    const id = props.location.state;
    props.deletePost(id);
  }

  const toggleAddFeed = () => {
    setShowAddFeed(prev => !prev)
  }

  return (
    <div>

      <h1 style={{paddingTop: "120px", position: "sticky",textAlign: "center"}}>Comments📯</h1>
      <Container maxWidth="lg">
        <div style={{ height: "5vh" }} />
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
        title={props.location.state.topic ? props.location.state.topic : "-"}
        subheader={props.location.state.createdAt ? moment(props.location.state.createdAt).format("MMMM DD, YYYY") : "-"}
      />
      <CardMedia
        className={classes.media}
        image=""
        title="Card"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.location.state.body ? props.location.state.body : "-"}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
          <Button style={buttonStyles} onClick={toggleAddFeed} >Comment!</Button>
      </CardActions>
   
      {showAddFeed ?  <AddFeed id={props.location.state._id} onSubmit={toggleAddFeed}/> : null}


      {
    props.location.state.comments.length ?
    props.location.state.comments.map(comment => (
      <Card className={classes.root}>
        <div style={{ marginLeft: 15}}>Posted by: anonymous</div>
        <div style={{ padding: 10, fontSize: 20, marginLeft: 15 }}>
          {comment}
        </div>
    <div style={{ padding: 10}}>{" "}{moment(Date.now()).format("MMMM DD, YYYY")}</div>
      </Card>
    ))
  :
      <div>No comments yet!</div>
} 
</Card>
        
      </Container>
    </div>
    
  );
}

export default FeedCards