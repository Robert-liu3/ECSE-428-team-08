import React from 'react';
import { Link } from 'react-router-dom';

import {Card} from '@material-ui/core';

const NotesItem = props => {
  return (
    <li>
      <Card>
        <Link to={`/${props.id}`}>
          <div>
            <h2>{props.title} - {props.section}</h2>
            <h3>
              {props.notes} 
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};  

export default NotesItem;
