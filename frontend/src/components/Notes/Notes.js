import React from 'react'

function Notes(props) {
  return (props.trigger) ? (
    <div className="popup_notes">
        <div className="popup_inner">
            <button className="close_btn">close</button>
            {props.children}
        </div>
    </div>
  ) : "";
}

export default Notes;