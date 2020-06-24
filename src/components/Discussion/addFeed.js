import axios from "axios";

import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";


import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import { OutlinedInput, Button } from "@material-ui/core";
import { createPost } from "../../redux/actions/postActions";
import { connect } from "react-redux";
// connect passes actions to the component as props and it connects react with redux
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  margin2: {
    margin: theme.spacing(1),
    marginTop: 30,
  },
  feedcontainer: {
    marginTop: 70,
  }
}));

const buttonStyles = { background: "black", color: "white" }

function BasicTextFields(props) {
  const classes = useStyles();
  const [topic, setTopic] = useState("");
  const [body, setBody] = useState("");

  const addFeedHander = () => {
    let  user=getUserInfo();
    if (topic === "" || body === "") {
      alert("Both fields are required!");
    } else {
      props.createPost({
        topic,
        body,
        createdBy:user,
        comments: []
      }, () => props.history.push('/Discussion'));
    }
  };

  const getUserInfo=()=>
  {
   let user= JSON.parse( localStorage.getItem("currentUser") );
   return user;
  }
  ////copy get user function . 

  return (
    <div style={{paddingTop: "170px", position: "sticky",textAlign: "center"}}>
     
      <h1>Add a new post...📯</h1>
      <Container maxWidth="lg">
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">Topic</InputLabel>
          <Input
            id="standard-adornment-amount"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
          />
        </FormControl>
        <FormControl fullWidth className={classes.margin2} variant="outlined">
          <InputLabel htmlFor="standard-adornment-amount">Body</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            labelWidth={60}
            multiline
            rows={10}
          />
        </FormControl>
        <Button
          onClick={addFeedHander}
          style={buttonStyles}
        >
          ADD
        </Button>
      </Container>
    </div>
  );
}

export default connect(null, { createPost })(withRouter(BasicTextFields));
