import React from 'react';
import './Lecture.css';
// import EditIcon from '@material-ui/icons/Edit';
import Fab from "@material-ui/core/Fab";
import YouTubeIcon from '@material-ui/icons/YouTube';
// import ButtonGroup from "@material-ui/core/ButtonGroup";
// import DeleteIcon from "@material-ui/icons/Delete";
const lecture = (props) => {
    return (
         <li key={props.id}  className="list-group-item list-group-item-action
                d-flex justify-content-between align-items-center bg-dark text-light small">
                <div>
                    <Fab color="default" className="mr-1" style={{width: '2rem', height: '2rem'}} aria-label="add">
                        <YouTubeIcon/>
                    </Fab>
                    {props.title}
                </div>
              {/* <ButtonGroup variant="contained" color="default" aria-label="text default button group">
                    <EditIcon/>
                    <DeleteIcon/>
                  </ButtonGroup>*/}
            </li>
    )
};

export default lecture;
