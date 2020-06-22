

import React, { useState, useEffect } from "react";

import Fab from "@material-ui/core/Fab";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';

import Feed from "./feed";
import MainPost from './mainpost';

import { withRouter } from "react-router-dom";
import { getAllPosts } from "../../redux/actions/postActions";
import { connect } from "react-redux";


const buttonStyles =  { background: "black", color: "white", width: 'auto' }


function SimpleContainer(props) {

  const [posts, setPosts] = useState([]);
  const [showAddFeed, setShowAddFeed] = useState(false);

  useEffect(() => {
    props.getAllPosts();
  }, []);

  useEffect(() => {
    setPosts(currentPosts => {
      if(JSON.stringify(currentPosts) !== JSON.stringify(props.posts))
          return props.posts

      return currentPosts;
    })

  }, [posts, props.posts]);

  // function buttonRoute() {
  //  props.history.push("/league/NewPost");
  // }
 

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };


  const toggleAddFeed = () => {
    setShowAddFeed(prev => !prev)
  }

  return (
    <div>

<h1 style={{paddingTop: "120px", position: "sticky",textAlign: "center"}}>Discussion Boards📯</h1>
      <Container maxWidth="lg">
        <div style={{ height: "5vh" }} />
       
        {posts.length ? (
          posts.map((item) => <Feed feed={item} />)
        ) : (
          <div>NO POSTS</div>
        )}

        <div style={{ height: "2vh" }} />
        <Fab
          color="primary"
          style={{backgroundColor:"black", position: "fixed", bottom: "5vh", right: "22vw" }}
          aria-label="add"
          onClick={scrollTop}
        >
          <ArrowUpwardIcon style={{ color:"white"}}/>
        </Fab>

        <Fab
          color="primary"
          style={{backgroundColor:"blue", position: "fixed", top: "7vh", right: "22vw" }}
          aria-label="add"
          onClick={()=>props.history.push("/NewPost")}
        >
          <AddIcon style={{ color:"white"}}/>
        </Fab>
      </Container>
    </div>
  );
}

const mapStateToProps = (store) => {
  return {
    posts: store.postReducer.posts,
  };
};

export default connect(mapStateToProps, { getAllPosts })(
  withRouter(SimpleContainer)
);
