import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import { CardContent, Typography } from "@material-ui/core";
import Box from '@material-ui/core/Box';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginTop: 15,
  },
  media: {
    height: 0,
    paddingTop: "5%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));



const MainPost = () => {
  const styles = useStyles();

  return (
      <Box boxShadow={8} styles={{ marginBottom: '3rem'}} >
    <Card className={styles.root} boxShadow={3}>
      <CardContent>
            <Typography  component="h2">TITLE GOES HERE</Typography>
            <Typography component="p">CONTENT GOES HERE</Typography>
      </CardContent>
    </Card>
      </Box>
  );
};

export default MainPost;
