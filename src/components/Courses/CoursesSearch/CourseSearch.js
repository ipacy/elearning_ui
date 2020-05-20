import React from "react";
import bgImg from '../../../assets/streetart2.jpg';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import './CourseSearch.css';
import {Nav} from "react-bootstrap";
// import {Button} from "react-bootstrap";
// import AppsIcon from "@material-ui/icons/Apps";
// import Categories from "../../../containers/Home/Navigation/Categories/Categories";

const courseSearch = (props) => {

    return (
        <div className="jumbotron"
             style={{backgroundImage: `url(${bgImg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
            <main className="container">
                <Paper component="form" className="rootSearch align-content-center">
                    <IconButton className="iconButtonSearch" aria-label="menu">
                        <Nav className="mr-auto">
                            {/*  <Button variant="secondary" className="btn-sm">
                                <li className="nav-item dropdown">
                                    <a href="" className="dropdown-toggle" id="navbarDropdownMenuLink"
                                       role="button" data-hover="dropdown"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <AppsIcon/>Categories
                                    </a>
                                    <Categories/>
                                </li>
                            </Button>*/}
                        </Nav>
                    </IconButton>
                    <InputBase
                        className="inputSearch"
                        placeholder="Search for courses"
                        inputProps={{'aria-label': 'search for courses'}}
                    />
                    <IconButton type="submit" className="iconButtonSearch" aria-label="search">
                        <SearchIcon/>
                    </IconButton>
                    <Divider className="dividerSearch" orientation="vertical"/>
                </Paper>
            </main>
        </div>
    )
};

export default courseSearch;
