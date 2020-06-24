// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 140,
//   },
// });

// export default function MediaCard() {
//   const classes = useStyles();

//   return (
//     <Card className={classes.root}>
//       <CardActionArea>
//         <CardMedia
//           className={classes.media}
//           image=""
//           title=""
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="h2">
//             Lizard
//           </Typography>
//           <Typography variant="body2" color="textSecondary" component="p">
//             Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
//             across all continents except Antarctica
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
//         <Button size="small" color="primary">
//           Share
//         </Button>
//         <Button size="small" color="primary">
//           Learn More
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }

import React, { useState } from 'react';
import axios from "axios"
import './profile.css'
function Profile() {
    const [name, setName] = useState()
    const [file, setFile] = useState()

    const send = event => {
        const data = new FormData();
        data.append("name", name);
        data.append("file", file)
        console.log(data)
        axios.post("http://localhost:5000/upload", data)
        .then (res =>
        console.log(res))
        .catch(err => console.log(err))
    }
   
    return (
        <div className="profile">
            <h1>Profile Picture Upload:</h1>
            <form action="#">
            <div className="flex">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" onChange={event => {
                const {value} = event.target;
                setName(value);
                }}/>
            </div>
        <div className="flex">

            <label htmlFor="file">File</label>
            
            <input type="file" id="file" accept=".jpg" onChange={event => {
                const file = event.target.files[0]
                setFile(file)
            }}/>
            
        </div>
        <button onClick={send}>Send</button>
            

            </form>
        </div>
    )
}

export default Profile
