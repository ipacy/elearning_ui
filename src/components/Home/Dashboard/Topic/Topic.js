import React from 'react';
import './Topic.css';
// import Aux from "../../../../hoc/Aux/Aux";
import {Link} from "react-router-dom";
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';
import Fab from "@material-ui/core/Fab";
/*import Divider from '@material-ui/core/Divider';
*/
import LabelImportantIcon from '@material-ui/icons/LabelImportant';

const topic = (props) => {

    const sId = `#course/${props.course}/topic/${props.id}`
    return (
        <Link to={sId}  style={{textDecoration: 'none', color: 'white'}} key={props.id}>
            <li className="list-group-item list-group-item-action d-flex
            justify-content-between align-items-center bg-dark text-light small">
                <div>
                    <Fab className="mr-1" style={{width: '2rem', height: '2rem'}} aria-label="add">
                        <LabelImportantIcon/>
                    </Fab>
                    {props.title}
                </div>
                {/* <div className="col">
                      <button onClick={props.openCourseForm}><EditIcon/></button>
                      <button onClick={props.openCourseForm}><DeleteIcon/></button>
                 </div>*/}
            </li>

        </Link>
    )
};

export default topic;
