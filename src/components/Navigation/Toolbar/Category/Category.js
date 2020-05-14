import React from 'react';
import {Link} from "react-router-dom";


const categpry = (props) => {
    const navto = "#category=" + props.title;

    return (
        <Link className="dropdown-item" key={props.id} to={navto} onClick={props.clicked}>{props.title}</Link>
    )
};

export default categpry;
