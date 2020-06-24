import axios from "axios";

import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";


import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import { OutlinedInput, Button } from "@material-ui/core";
import { addPostComment } from "../../redux/actions/postActions";
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
    marginTop: 5,
  },
  feedcontainer: {
    marginTop: 70,
  }
}));

const buttonStyles = { background: "black", color: "white" }

function BasicTextFields(props) {
  console.log("POST ID: ", props.id)
  const classes = useStyles();
  const [body, setBody] = useState("");

  const addFeedHander = () => {
    if (props.id === "") {
      alert("No post id found!");
    } else if (body === "") {
      alert("Comment text is empty!");
    } else {
      let user = getUserInfo();

      let commentObj={
        text:body,
        commentFirstName:user.firstName,
        commentLastName:user.lastName
      }
      
      props.addPostComment({
        id: props.id,
        comment: commentObj,
      }, () => props.onSubmit());
    }
  };

 const getUserInfo=()=>
  {
   let user= JSON.parse( localStorage.getItem("currentUser") );
   return user;
  }
  return (
    <div style={{paddingTop: "100px", position: "sticky",textAlign: "center"}}>
     
      <h1>Add a new comment...💬</h1>
      <Container maxWidth="lg">
        <FormControl fullWidth className={classes.margin}>
         
        </FormControl>
        <FormControl fullWidth className={classes.margin2} variant="outlined">
          <InputLabel htmlFor="standard-adornment-amount">Comment</InputLabel>
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

export default connect(null, { addPostComment })(withRouter(BasicTextFields));
