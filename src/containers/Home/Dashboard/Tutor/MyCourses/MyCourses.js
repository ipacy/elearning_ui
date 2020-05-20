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
import EditCourseForm from "../../../../../components/Home/Dashboard/Course/CreateCourse/CreateCourse";
import CreateTopic from "../../../../../components/Home/Dashboard/Topic/CreateTopic/CreateTopic";

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
        courseFormData: {
            "title": "",
            "description": "",
            "language": "",
            "price": 0,
            "category": []
        },
        courseEditData: {},
        topicFormModel: {},
        topicFormData: {
            "currentTopicId": 0,
            "title": "",
            "duration": 0
        },
        mytopic: {
            title: '',
            description: '',
            lectures: [],
            lectureFile: {filepaths: []}
        },
        lectureList: [],
        singleLecture: {
            title: "",
            description: "",
            duration: 0,
            res_file: ""
        },
        topicClass: {
            "defaultClass": {
                topic: "nav-link active",
                upload: "nav-link",
                lecture: "nav-link",
                topicdiv: "tab-pane fade show active",
                uploaddiv: "tab-pane fade",
                lecturediv: "tab-pane fade",
            },
            "appliedClass": {
                topic: "nav-link active",
                upload: "nav-link",
                lecture: "nav-link",
                topicdiv: "tab-pane fade show active",
                uploaddiv: "tab-pane fade",
                lecturediv: "tab-pane fade",
            }
        },
        categories: [],
        languages: []
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
        const topicDetails = topics.find(function (obj) {
            return obj.id === parseInt(id)
        });
        this.setState({topicDetails: topicDetails});
        this.setState({lectures: topicDetails.lectures});
    }

    onNewCourseSubmit = (event, formtype) => {
        event.preventDefault()
        let courseData, path;
        const formData = new FormData();
        if (formtype === 'editForm') {
            courseData = {...this.state.courseEditData};
            let cats = [];
            for (let i = 0; i < courseData.category.length; i++) {
                cats.push(courseData.category[i].value)
            }
            courseData.category = cats;
            path = courseData.id;
            formData.append('title', courseData.title);
            formData.append('category', courseData.category);
            formData.append('language', ['1']);
            formData.append('description', courseData.description);
            formData.append('price', courseData.price);
            formData.append('ico', courseData.ico);
        }

        if (formtype === 'createForm') {
            courseData = {...this.state.courseFormData};
            let cats = [];
            for (let i = 0; i < courseData.category.length; i++) {
                cats.push(courseData.category[i].value)
            }
            courseData.category = cats;
            formData.append('title', courseData.title);
            formData.append('category', courseData.category);
            formData.append('language', ['1']);
            formData.append('description', courseData.description);
            formData.append('price', courseData.price);
            formData.append('ico', courseData.ico);
            path = 'create/';

            if (courseData.hasOwnProperty('title')) {

                this.setState({courseFormData: courseData});

                axios.post('courses/' + path, formData)
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


    }

    handleCourseChange = (event) => {
        const name = event.target.name;
        let value;
        const data = {...this.state.courseFormData};

        switch (name) {
            case 'ico':
                value = event.target.files[0];
                data[name] = value;
                break;
            case 'category':
                value = event.target.selectedOptions;
                data[name] = value;
                break;
            case 'language':
                value = event.target.selectedOptions;
                data[name] = value;
                break;
            default:
                value = event.target.value;
                data[name] = value;
        }

        this.setState({
            courseFormData: data
        });
    };

    handleEditCourseChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const data = {...this.state.courseEditData};
        data[name] = value;
        this.setState({
            courseEditData: data
        });
    };

    handleTopicChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const data = {...this.state.topicFormData};

        data[name] = value;

        this.setState({
            topicFormData: data
        });

    };

    onNewTopicSubmit = (event) => {
        event.preventDefault()

        let topicData = {...this.state.topicFormData};
        if (topicData.hasOwnProperty('title')) {

            this.setState({topicFormData: topicData});
            let sendData = {
                title: topicData.title,
                duration: 0,
                course: this.state.courseDetails.id
            }

            axios.post('topics/create/', sendData)
                .then(response => {
                    this.getCourseList();
                    try {
                        this.setState({topicFormData: {currentTopicId: response.data.id}});
                        this.setState({
                            topicClass: {
                                appliedClass: {
                                    topic: "nav-link disabled",
                                    upload: "nav-link active",
                                    lecture: "nav-link disabled",
                                    topicdiv: "tab-pane fade",
                                    uploaddiv: "tab-pane fade show active",
                                    lecturediv: "tab-pane fade"
                                }
                            },
                        })
                    } catch (e) {
                    }
                }).catch(error => {
                console.log(error);
            });
        }
    }

    onLectureFileSubmit = (event) => {
        event.preventDefault()
        const topics = {...this.state.mytopic};

        const hash = this.props.location.hash;
        topics.course = this.state.courseDetails.id;

        let data = new FormData();

        topics.lecUpload.forEach((obj) => {
            data.append('lecture_file', obj)
        })

        data.append('course', this.state.courseDetails.id)
        data.append('topic', this.state.topicDetails.id)

        axios.post('lectureFiles/', data)
            .then(response => {

                this.setState({
                    classes: {
                        topic: "nav-link disabled",
                        upload: "nav-link disabled",
                        lecture: "nav-link active",
                        topicdiv: "tab-pane fade",
                        uploaddiv: "tab-pane fade",
                        lecturediv: "tab-pane fade show active",
                    },
                });
            }).catch(error => {
            console.log(error);
        });

    }

    getUploadedFiles = () => {
        const path = "lectureFiles/?course=" + this.state.courseDetails.id + "&topic=" + this.state.topicDetails.id + ""
        axios.get(path)
            .then(response => {
                const mytopic = {...this.state.mytopic};
                mytopic.filepaths = response.data;
                this.setState({mytopic: mytopic})
            }).catch(error => {
            this.setState({error: error})
        });
    };

    handleLectureFileChange = (event) => {
        const topic = {...this.state.mytopic};
        let uploadedFiles = [];

        for (var i = 0; i < event.target.files.length; i++) {
            uploadedFiles.push(event.target.files[i])
        }

        topic.lecUpload = uploadedFiles;

        this.setState({
            mytopic: topic
        });

    };

    onBatchLectureSubmit = (event) => {
        event.preventDefault()

        let lectureList = {...this.state.lectureList};


        this.setState({lectureList: lectureList});
        let sendData = lectureList
        // debugger;

        let sample = {
            "lectures": [
                {
                    "title": "lec5",
                    "description": "",
                    "duration": 10,
                    "topic": 1,
                    "res_file": 1
                }
            ]
        }


      /*  axios.post('nested/create/', sendData)
            .then(response => {
                debugger;
            }).catch(error => {
            debugger;
            console.log(error);
        });*/
    }

    handleLectureChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const data = {...this.state.singleLecture};

        data[name] = value;

        this.setState({
            singleLecture: data
        });
    };


    addNewLecture = (event) => {
        let singleLecture = {...this.state.singleLecture};
        this.state.lectureList.push(singleLecture)
        // debugger;
        this.setState({lectureList: [...this.state.lectureList]})
    }

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
                                       this.setState({
                                           editCourseFormModel: {...this.state.model},
                                           courseEditData: course
                                       })
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
                        this.setState({
                            topicFormModel: {...this.state.model},
                            topicClass: {appliedClass: {...this.state.topicClass.defaultClass}}
                        })
                    }}>
                        <AddBoxIcon/>
                    </button>
                    <CreateTopic
                        title="Create Course"
                        open={this.state.topicFormModel.show}
                        singleLecture={this.state.singleLecture}
                        topicFormData={this.state.topicFormData}
                        topicClass={this.state.topicClass}
                        lectureList={this.state.lectureList}
                        lectureFiles={this.state.mytopic}
                        onClose={() => {
                            this.setState({topicFormModel: {show: false}})
                        }}
                        onEscape={() => {
                            this.setState({topicFormModel: {show: false}})
                        }}
                        onSubmit={(event) => {
                            this.onNewTopicSubmit(event, 'createForm')
                        }}
                        onLectureFileSubmit={(event) => {
                            this.onLectureFileSubmit(event, 'createForm')
                        }}
                        addLectures={(event) => {
                            this.addNewLecture(event)
                        }}
                        onLectures={this.getUploadedFiles}
                        onChange={this.handleTopicChange}
                        onLectureChange={this.handleLectureChange}
                        onSubmitLectures={this.onBatchLectureSubmit}
                        handleLectureFileChange={this.handleLectureFileChange}
                    />
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
                    }}><AddBoxIcon/>
                    </button>

                    <CourseForm
                        title="Create Course"
                        open={this.state.courseFormModel.show}
                        courseFormData={this.state.courseFormData}
                        languages={this.state.languages}
                        categories={this.state.categories}
                        onClose={() => {
                            this.setState({courseFormModel: {show: false}})
                        }}
                        onEscape={this.closeDialog}
                        onSubmit={(event) => {
                            this.onNewCourseSubmit(event, 'createForm')
                        }}
                        onChange={this.handleCourseChange}/>
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

                <EditCourseForm
                    open={this.state.editCourseFormModel.show}
                    title="Edit Course"
                    courseFormData={this.state.courseEditData}
                    languages={this.state.languages}
                    categories={this.state.categories}
                    onClose={() => {
                        this.setState({editCourseFormModel: {show: false}})
                    }}
                    onEscape={this.closeDialog}
                    onSubmit={(event) => {
                        this.onNewCourseSubmit(event, 'editForm')
                    }}
                    onChange={this.handleEditCourseChange}/>
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
