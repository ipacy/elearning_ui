import React, {Component} from 'react';
import axios from "../../../../../axios";
import './MyCourses.css';
import Course from '../../../../../components/Home/Dashboard/Course/Course'
import Lecture from '../../../../../components/Home/Dashboard/Lecture/Lecture';
import Topic from '../../../../../components/Home/Dashboard/Topic/Topic';
import AddBoxIcon from '@material-ui/icons/AddBox';
import {connect} from "react-redux";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import CourseForm from "../../../../../components/Home/Dashboard/Course/CreateCourse/CreateCourse";
import CourseDialogX from "../../../../../components/Utils/DialogX";
import LectureDialogX from "../../../../../components/Utils/DialogX";
import TopicDialogX from "../../../../../components/Utils/DialogX";
import DialogX from "../../../../../components/Utils/DialogX";

// import Aux from "../../../../../hoc/Aux/Aux";

class MyCourses extends Component {
    state = {
        courses: [],
        topics: [],
        topicId: null,
        cateFilter: "",
        currentHash: "",
        courseLoad: true,
        topicRefreshLoad: false,
        courseDetails: {},
        topicDetails: {},
        lectures: [],
        model: {
            show: true
        },
        courseFormModel: {},
        editCourseFormModel: {},
        courseFormData: {},
        courseEditData: {},
        categories: [],
        languages:[]
    }

    componentDidMount() {
        this.setState({courseLoad: true});

        axios.get('/categories/')
            .then(response => {
                const categories = response.data;
                this.setState({categories: categories})

            }).catch(error => {
            this.setState({error: error})
        });
        axios.get('/languages/')
            .then(response => {
                const languages = response.data;
                this.setState({languages: languages})

            }).catch(error => {
            this.setState({error: error})
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const hash = this.props.location.hash;

        if (this.state.courseLoad) {
            this.setState({courseLoad: false})
            this.getCourseList();
        }

        if ((prevProps.location.hash !== hash || this.state.topicRefreshLoad)) {
            this.setState({openCourseForm: false})
            if (hash.search('course') >= 0 && hash.search('topic') < 0) {
                this.getCourseDetail(hash);
                this.setState({topicRefreshLoad: false})
            } else if (hash.search('course') >= 0 && hash.search('topic') >= 0) {
                this.getTopicDetail(hash);
            }
        }
    }

    getCourseList() {
        if (this.props.id) {
            axios.get('/courses/?author=' + this.props.id)
                .then(response => {
                    const courses = response.data;
                    const updatedCourses = courses.map(course => {
                        return {
                            ...course
                        }
                    })
                    this.setState({courses: updatedCourses})
                    const hash = this.props.location.hash;
                    if (hash.search('course') >= 0) {
                        this.getCourseDetail(hash);
                    } else if (courses.length > 0) {
                        this.getCourseDetail(`/${courses[0].id}`);
                    }

                }).catch(error => {
                this.setState({error: error})
            });
        }
    }

    getCourseDetail(hash) {
        if (this.state.courses.length > 0) {
            const courses = [...this.state.courses];
            const id = hash.split('/')[1];
            const courseDetails = courses.find((obj) => {
                return obj.id === parseInt(id);
            });
            this.setState({courseDetails: courseDetails});
            this.getTopicByCourse(id);
        }
    }

    getTopicByCourse = (id) => {
        axios.get(`/nested/?course=${id}`)
            .then(response => {
                const topics = response.data;
                const updatedTopics = topics.map(topic => {
                    return {
                        ...topic
                    }
                })
                this.setState({
                    topics: updatedTopics
                })
                const hash = this.props.location.hash;
                if (hash.search('topic') >= 0) {
                    this.getTopicDetail(hash);
                } else if (topics.length > 0) {
                    this.getTopicDetail(`/course/topic/${topics[0].id}`);
                }
            }).catch(error => {
            this.setState({error: error})
        });
    }

    getTopicDetail = (hash) => {
        const topics = [...this.state.topics];
        const id = hash.split('/')[3];
        // debugger;
        const topicDetails = topics.find(function (obj) {
            return obj.id === parseInt(id)
        });
        this.setState({topicDetails: topicDetails});
        this.setState({lectures: topicDetails.lectures});
    }

    onNewCourseSubmit = (event) => {
        event.preventDefault();
        debugger;
        const courseData = {...this.state.courseFormData};

        if (courseData.hasOwnProperty('title')) {

            courseData.category = [
                1
            ]

            this.setState({courseFormData: courseData});

            axios.post('courses/create/', courseData)
                .then(response => {
                    this.setState({courseFormModel: {show: false}});
                    this.getCourseList();
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

    }

    handleCourseChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const data = {...this.state.courseFormData};
        data[name] = value;
        this.setState({
            courseFormData: data
        });
    };

    closeDialog = () => {
        this.setState({courseFormModel: {show: false}})
    }

    render() {

        let courses = <p style={{textAlign: 'center'}}> No Courses Found!!</p>,
            topics = <p style={{textAlign: 'center'}}> No topics found !!</p>,
            lectures = <p style={{textAlign: 'center'}}> No Lectures found !!</p>;

        if (!this.state.error) {

            courses = (this.state.courses.length > 0) ? this.state.courses.map(
                (course) => {
                    return <Course title={course.title}
                                   description={course.description}
                                   id={course.id}
                                   key={course.id}
                                   ico={course.ico}
                                   price={course.price}
                                   openCourseForm={() => {
                                       this.setState({editCourseFormModel: {...this.state.model}, courseEditData: course})
                                   }}
                                   courseFormModel={this.state.courseFormModel}
                                   onClose={() => {
                                       this.setState({courseFormModel: {show: false}})
                                   }}
                                   onSubmit={this.onNewCourseSubmit}
                                   onChange={this.handleCourseChange}
                                   rating={course.rating}
                                   author_name={course.author_name}
                                   clicked={(evt) => {
                                       this.setState({openCourseForm: evt})
                                   }}
                    />


                }) : courses;

            topics = (this.state.topics.length > 0) ? this.state.topics.map(
                topic => {
                    return <Topic title={topic.title}
                                  description={topic.description}
                                  course={topic.course}
                                  id={topic.id}
                                  key={topic.id}
                    />

                }) : topics;

            lectures = (this.state.lectures.length > 0) ? this.state.lectures.map(
                lecture => {
                    return <Lecture title={lecture.title}
                                    description={lecture.description}
                                    course={lecture.duration}
                                    id={lecture.id}
                                    key={lecture.id}
                    />

                }) : lectures;
        }

        const lectureSpan =
            <div className="col mr-3">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Lectures
                    <button onClick={() => {
                        this.setState({courseFormModel: {...this.state.model}})
                    }}>
                        <AddBoxIcon/>
                    </button>

                    <LectureDialogX open={this.state.courseFormModel.show}>
                        <CourseForm courseFormData={this.state.courseFormData}
                                    onClose={() => {
                                        this.setState({courseFormModel: {show: false}})
                                    }}
                                    onChange={this.handleCourseChange}
                                    onSubmit={this.onNewCourseSubmit}/>
                    </LectureDialogX>

                </li>
                <div className="list-group bg-dark text-light">
                    {lectures}
                </div>
            </div>;

        const topicSpan =
            <div className="col m-0">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Topics
                    <button onClick={() => {
                        this.setState({courseFormModel: {...this.state.model}})
                    }}>
                        <AddBoxIcon/>
                    </button>
                    <TopicDialogX open={this.state.courseFormModel.show}>
                        <CourseForm courseFormData={this.state.courseFormData}
                                    onClose={() => {
                                        this.setState({courseFormModel: {show: false}})
                                    }}
                                    onChange={this.handleCourseChange}
                                    onSubmit={this.onNewCourseSubmit}/>
                    </TopicDialogX>
                </li>
                <div className="list-group bg-dark text-light">
                    {topics}
                </div>
            </div>;

        const courseSpan =
            <div className="col-3 ml-3 mr-0">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Courses
                    <button onClick={() => {
                        this.setState({courseFormModel: {...this.state.model}})
                    }}>
                        <AddBoxIcon/>
                    </button>

                    <CourseDialogX open={this.state.courseFormModel.show}>
                        <CourseForm courseFormData={this.state.courseFormData}
                                    onClose={() => {
                                        this.setState({courseFormModel: {show: false}})
                                    }}
                                    onChange={this.handleCourseChange}
                                    onSubmit={this.onNewCourseSubmit}/>


                    </CourseDialogX>
                </li>
                <div className="list-group bg-dark text-light">
                    {courses}
                </div>
            </div>;


        return (
            <div className="container mt-4">
                <div className="jumbotron">
                    <main className="container">
                        <Breadcrumbs aria-label="breadcrumb">
                            <div color="inherit" className="font-weight-bold">
                                Course: {this.state.courseDetails.title}
                            </div>
                            <div color="inherit" className="font-weight-bold">
                                Topic: {this.state.topicDetails.title}
                            </div>
                        </Breadcrumbs>
                    </main>
                </div>
                <div className="row align-items-start">

                    {courseSpan}

                    {topicSpan}

                    {lectureSpan}

                </div>

                <DialogX open={this.state.editCourseFormModel.show}
                         title="Edit Course"
                         onEscape={this.closeDialog}
                         onClose={this.closeDialog}>
                    <CourseForm courseFormData={this.state.courseEditData}
                                categories={this.state.categories}
                                languages={this.state.languages}
                                onClose={this.closeDialog}
                                onSubmit={this.onNewCourseSubmit}
                                onChange={this.handleCourseChange}/>
                </DialogX>
            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        fullname: state.auth.fullname,
        username: state.auth.username,
        group: (state.auth.group === 1) ? 'tutor' : 'student',
        id: state.auth.id
    };
};


export default connect(mapStateToProps)(MyCourses);
