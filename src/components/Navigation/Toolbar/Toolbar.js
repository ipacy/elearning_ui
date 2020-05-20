import React, {Component} from 'react';
import {
    Link
} from "react-router-dom";
// import Categories from '../../../containers/Home/Navigation/Categories/Categories';
import './Toolbar.css';
import {Button, Nav, Navbar} from "react-bootstrap";
import logo from "../../../assets/online-learning.png";
import Register from "../../../containers/Authentication/Register/Register";
// import Login from "../../../containers/Authentication/Login/Login";
import axios from "../../../axios"
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Badge from "react-bootstrap/Badge";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import AppsIcon from '@material-ui/icons/Apps';
import {connect} from 'react-redux';
import LoginForm from '../../Authentication/Login/LoginForm';
// import Log from "../../Authentication/Login/LoginForm";
// import Log from "../../Authentication/Login/LoginForm";
// import Dialog from "@material-ui/core/Dialog";

// import * as actions from '../../../store/actions/index';

class Toolbar extends Component {

    state = {
        showHide: false,
        title: '',
        message: null,
        showLogin: false,
        error: null,
        logData: {
            username: '',
            email: '',
            password: '',
        },
        modal: {
            show: false,
            title: '',
            body: '',
            bodyCSS: ''
        }
    }

    // componentDidMount() {
    //     this.props.onAuth();
    // }
    handleClose = () => {
        this.setState({showLogin: false})
    };

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const data = {...this.state.logData};
        data[name] = value;
        this.setState({
            logData: data
        });
    };

    handleLogin(event) {
        event.preventDefault();
        const regObj = {...this.state.logData};
        regObj['username'] = regObj.email.split('@')[0];
        this.setState({logData: regObj});

        axios.post('/restauth/login/', regObj)
            .then(response => {
                this.setState({
                    modal: {
                        show: true,
                        body: 'Registration has been successfully',
                        bodyCSS: 'text-success',
                        title: 'Registration Status'
                    }
                })
                localStorage.setItem('token', response.data.key);
                localStorage.setItem('email', JSON.parse(response.config.data).email);
                window.location.href = window.location.origin;
            }).catch(error => {
            const errorMsg = Object.keys(error.response.data)
                .map(igKey => {
                    return error.response.data[igKey]
                }).reduce((sum, el) => {
                    return sum + el;
                }, '');
            this.setState({
                error: errorMsg,
                modal: {
                    show: true,
                    body: errorMsg,
                    error: errorMsg,
                    bodyCSS: 'text-error',
                    title: 'Registration Status'
                }
            })
        });
    }

    onLogout = () => {
        axios.post('/restauth/logout/', {})
            .then(response => {
                localStorage.removeItem('email');
                localStorage.removeItem('token');
                window.location.href = window.location.origin;
                // this.props.history.push('');
            }).catch(error => {
            this.setState({message: error.message, loggedOut: true});
        });
    }

    render() {
        const onLoginElemnts = (!this.props.authen) ?
            <Aux>
                <Nav>
                    <Button variant="dark" onClick={() => {
                        this.setState({showLogin: true, title: "", showHide: false})
                    }}>Sign In</Button>
                    {/*<Login open={this.state.showLogin} title={this.state.title}/>*/}
                    <LoginForm open={this.state.showLogin}
                               email={this.state.logData.email}
                               password={this.state.logData.password}
                               change={this.handleChange}
                               onSubmit={(evt) => this.handleLogin(evt)}
                               onClose={this.handleClose}/>
                </Nav>
                <Nav>
                    <Button variant="dark" onClick={() => {
                        this.setState({showLogin: false, showHide: true, title: ""});
                    }}>Sign Up</Button>
                    <Register open={this.state.showHide} title={this.state.title}/>
                </Nav>
            </Aux>
            : //or
            <Aux>
                <Nav>
                    <Link to='/mycourses'>
                        <Button variant="dark">My Courses</Button>
                    </Link>
                </Nav>
                <Nav>
                    <Button variant="dark"><AccountCircleIcon/><Badge
                        variant="light">{this.props.fullname}</Badge></Button>
                </Nav>
                <Nav>
                    <Link to=''>
                        <Button variant="dark" onClick={this.onLogout}><ExitToAppIcon/></Button>
                    </Link>
                </Nav>
            </Aux>;

        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand style={{marginLeft: '1rem'}}>
                    <Link to='/' style={{color: 'white'}}>
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}ELearning</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {/*   <Button variant="dark">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#categories" id="navbarDropdownMenuLink"
                               role="button" data-hover="dropdown"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <AppsIcon/>Categories
                            </a>
                            <Categories/>
                        </li>
                        </Button>*/}
                    </Nav>
                    {onLoginElemnts}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}


const mapStateToProps = state => {
    return {
        email: state.auth.email,
        fullname: state.auth.fullname,
        username: state.auth.username,
        group: (state.auth.group === 1) ? 'tutor' : 'student',
        authen: state.auth.authen,
        id: state.auth.id
    };
};


export default connect(mapStateToProps)(Toolbar);

