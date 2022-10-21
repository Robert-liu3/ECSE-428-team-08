import React from 'react'
import './NotesStyle.css'

function Notes(props) {
  return (props.trigger) ? (
    <div className="popup_background">
        <div className="popup_title">
          <div className="title_box_text">
          Insert Title Here
          </div>
            {props.children}
        </div> //popup title
        <div className="body_text">Insert Text here</div>
        <button className="close_btn" onClick={() => props.setTrigger(false)}>Close</button>
        {props.children}
    </div> //popup background
  ) : "";
}

export default Notes;