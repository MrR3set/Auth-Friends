import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Collapse from "@material-ui/core/Collapse";


const useStyles = makeStyles({
  root: {
    width: 275,
    margin:"2%"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },avatar: {
    backgroundColor: red[500],
  },editform:{
    display:"flex",
    flexDirection:"column",
    flexWrap:"wrap",
    "& input":{
      padding:"0.3rem 0.4rem",
      marginBottom:"3%"
    },
    "& button":{
      padding:"0.5rem 1rem",
      backgroundColor:"slateblue",
      color:"white",
      fontSize:"1.2rem",
      marginTop:"6%",
      border:"none",
      borderRadius:"20px"
    }
  }
});



function Friend(props) {
  //styling things
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //dasidnasiud
  const [friend,setFriend] = useState({
    id:"",
    name:"",
    age:"",
    email:""
  })

  useEffect(()=>{
    setFriend({
      id:props.friend.id,
      name:props.friend.name,
      age:props.friend.age,
      email:props.friend.email
    })
  },[props])

  
  const handleChange = (e) => {
    e.preventDefault();
    setFriend({...friend, [e.target.name]: e.target.value})
  }
  
  const handleSubmit = (e) => {
    handleExpandClick();
    e.preventDefault();
    props.updateFriend(friend);
  }

  const removeF = () => {
    props.removeFriend(props.friend.id);
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {friend.name.charAt(0)}
            </Avatar>
          }
          title={friend.name}
          subheader={friend.age}
        />
        <Typography variant="body1" component="p">
         {friend.email}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="share" onClick={handleExpandClick}>
          <EditIcon/> 
        </IconButton>
        <IconButton aria-label="share"  onClick={removeF}>
          <DeleteIcon/> 
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <form onSubmit={handleSubmit} className={classes.editform}>
          <label htmlFor='name'>Name</label>
          <input name='name' onChange={handleChange} value={friend.name}/>

          <label htmlFor='age'>Age</label>
          <input name='age' type="number" onChange={handleChange} value={friend.age}/>

          <label htmlFor='email'>Email</label>
          <input name='email' onChange={handleChange} value={friend.email}/>

          <button type='submit'>Edit Friend</button>
      </form>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Friend;



