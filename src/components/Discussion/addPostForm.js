import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
form: {
  display: 'flex',
  flexDirection: 'column'
},
textArea: {
  width:'100%',
  height: '5rem'
}
}))

const AddPostForm = () => {

  const classes = useStyles();

  return (
    <form className={classes.form}>
      <textarea className={classes.textArea}/>
      <button>Add</button>
    </form>
  );
};

export default AddPostForm;
