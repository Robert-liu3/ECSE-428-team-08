import React, {useState, useEffect} from 'react'
import { Typography, TextField, Grid, Button } from '@material-ui/core';
import axios from "axios";
import './NotesStyle.css'


function Notes(props) {
  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBodyText(e.target.value);
  };

  const AddNote = ()=>{
    useEffect(() => {
      async function apiCall() {
        await axios.post("http://localhost:5000/notes/");
      }
      apiCall();
    }, []);
  };

  return (props.trigger) ? (
    <div className="popup_background">
      <Grid
      container
      direction="column"
      justifyContent='center'
      alignItems="stretch">
      <div>
        
        {/* <div> className="popup_title"> */}
          {/* <Typography className="title_box_text">
          {title}
          </Typography> */}
          <Grid item xs={12}>
          <TextField
            name="Title"
            value={title}
            onChange={handleTitleChange}
            required='true'
          />
          </Grid>
          <br/>
          <TextField
            name="Body"
            value={bodyText}
            onChange={handleBodyChange}
            required='true'
            className="body_text"
          />
        </div> 
        {/* <Typography className="body_text" onChange={handleBodyChange}>{bodyText}</Typography> */}
        <Grid>
          <Grid item sm={2}>
          <button className="close_btn" onClick={() => props.setTrigger(false)}>Close</button>
          
          </Grid>
        <Grid item sm={2}>
          <button className="add_btn" onClick={AddNote}>Add</button>
          
        </Grid>
        
        </Grid>
        </Grid>
        {props.children}
    </div> //popup background
  ) : "";
}

export default Notes;