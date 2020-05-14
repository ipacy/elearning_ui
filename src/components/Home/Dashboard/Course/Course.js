import React from 'react';
import './Course.css';
import {Link} from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';



const course = (props) => {

    const sId = `#course/${props.id}`

    return (
        <Link to={sId} style={{textDecoration: 'none', color: 'white'}} key={props.id}>
            <li className="list-group-item list-group-item-action d-flex
            justify-content-between  bg-dark text-light small">
                {props.title}
                <EditIcon onClick={props.openCourseForm}/>
            </li>
        </Link>
    )
};

export default course;

