import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Courses from "./containers/Home/Courses/Courses";
import CourseDetail from "./containers/Home/Courses/CourseDetail/CourseDetail";
import Register from "./containers/Authentication/Register/Register";
import * as actions from "./store/actions";
import {connect} from "react-redux";
import Dashboard from './containers/Home/Dashboard/Dashboard'
// import ReactLoading from "react-loading";
import LoadingOverlay from 'react-loading-overlay';
import MyCourses from "./containers/Home/Dashboard/Tutor/MyCourses/MyCourses";


class App extends Component {
    componentDidMount() {
        this.props.onAuth();
    }


    render() {
        let UserType = <LoadingOverlay
            active={true}
            spinner
            text='Loading your content...'>
            <p>Some content or children or something.</p>
        </LoadingOverlay>

        if (this.props.group === "tutor") {
            UserType = <Route path="/" exact component={Dashboard}/>;
        } else if (this.props.group === 'student') {
            UserType = <Route path="/" exact component={Courses}/>;
        }
        let mainApp = <Layout>
            <Switch>
                <Route path="/course/:id" component={CourseDetail}/>
                <Route path="/register" component={Register}/>
                <Route path="/mycourses" component={MyCourses}/>
                {UserType}
            </Switch>
        </Layout>
        if (this.props.group === "load") {
            mainApp = UserType
        }


        return (
            <div>
                {mainApp}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        fullname: state.auth.fullname,
        username: state.auth.username,
        group: (state.auth.group === 4) ? 'tutor' : (state.auth.group === 3) ? 'student' : 'load',
        authen: state.auth.authen,
        id: state.auth.id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: () => dispatch(actions.auth()),
    };
};

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);