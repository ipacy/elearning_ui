import React, {Component} from 'react';
import axios from '../../../../axios';
import CourseInfo from '../../../../components/Courses/CourseDetail/CourseInfo/CourseInfo';
import './CourseDetail.css';
import TopicList from '../../../../components/TopicList/TopicList'

class CourseDetail extends Component {

    state = {
        loadedCourse: null,
        loadedTopics: []
    }

    componentDidMount(prevProps, prevState, snapshot) {
        this.getData();
        this.getNestedTopics()

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // this.getData();
        // this.getNestedTopics()
    };

    getData = () => {
        if (this.props.match.params.id) {
            if (!this.state.loadedCourse || (this.state.loadedCourse && this.state.loadedCourse.id !== +this.props.match.params.id)) {
                axios.get('/courses/' + this.props.match.params.id)
                    .then(response => {
                        // console.log(response);
                        this.setState({loadedCourse: response.data});
                    });
            }
        }
    }

    getNestedTopics = () => {
        if (this.props.match.params.id) {
            if (!this.state.loadedCourse || (this.state.loadedCourse && this.state.loadedCourse.id !== +this.props.match.params.id)) {
                axios.get('/nested/?course=' + this.props.match.params.id)
                    .then(response => {
                        // console.log(response);
                        this.setState({loadedTopics: response.data});
                    });
            }
        }
    }


    render() {
        let post = <div className="jumbotron"/>;
        if (this.props.match.params.id) {
            post = <p style={{textAlign: 'center'}}>Loading . . . </p>;
        }
        let topicList = <div></div>
        let coursePara = <div></div>
        let sum = null;

        if (this.state.loadedCourse) {
            const course = this.state.loadedCourse;

            coursePara = <CourseInfo
                title={course.title}
                description={course.description}
                id={course.id}
                key={course.id}
                pub_date={course.pub_date}
                lang={course.lang}
                ico={course.ico}
                price={course.price}
                rating={course.rating}
                author_name={course.author_name}

            />

        }

        if (this.state.loadedTopics.length > 0) {
            sum = this.state.loadedTopics
                .map(igKey => {
                    return igKey.duration;
                })
                .reduce((sum, el) => {
                    return sum + el;
                }, 0);
            topicList = this.state.loadedTopics.map(
                topic => {
                    return <TopicList
                        id={topic.id}
                        key={topic.id}
                        title={topic.title}
                        lectures={topic.lectures}
                        duration={topic.duration}
                    />

                });
        }
        post = (
            <div>
                <div className="jumbotron bg-secondary text-light">
                    {coursePara}
                </div>
                <main role="main" className="container">
                    <div className="accordion" id="accordionExample">
                        <div className="card">
                            <div className="card-header" id="headingOne">
                                <h4>
                                    Course Content ({topicList.length} Topics {sum} Hours)
                                </h4>
                                {topicList}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );

        return post;
    }
}

export default CourseDetail;
