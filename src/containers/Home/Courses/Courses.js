import React, {Component} from 'react';
import Post from "../../../components/Courses/Course/Course";
import axios from "../../../axios";
import './Courses.css';
import CourseSearch from "../../../components/Courses/CoursesSearch/CourseSearch";


class Courses extends Component {
    state = {
        courses: [],
        cateFilter:""
    }

    componentDidMount() {
        const hash = this.props.location.hash;
        if(hash.length ===0){
            this.getCourseList();
        }
        else {
            const Cats = hash.split('/')[0].search('#category')
            if (Cats === 0) {
                const Cats_hash = hash.split('#')[1];
                this.catCourseService(Cats_hash);
            }
        }

    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const hash = this.props.location.hash;
        if (prevProps.location.hash !== hash) {
            if (hash) {
                const Cats = hash.split('/')[0].search('#category')
                if (Cats === 0) {
                    const Cats_hash = hash.split('#')[1];
                    this.catCourseService(Cats_hash);
                }
            } else if (hash.length === 0){
                this.getCourseList();
                this.getCourseList();
            }
        }
    }

    getCourseList(){
        axios.get('/courses/')
            .then(response => {
                const courses = response.data;
                const updatedCourses = courses.map(course => {
                    return {
                        ...course
                    }
                })
                this.setState({courses: updatedCourses})
            }).catch(error => {
            this.setState({error: error})
        });
    }

    catCourseService(uriPath){
        axios.get('/courses/?'+uriPath)
            .then(response => {
                const courses = response.data;
                const updatedCourses = courses.map(course => {
                    return {
                        ...course
                    }
                })
                this.setState({courses: updatedCourses})
            }).catch(error => {
            this.setState({error: error})
        });
    }

    postSelectedHandler = (id) => {
        //this.props.history.push({pathname: '/posts/' + id});
        this.props.history.push('/course/' + id);
    }

    render() {
        let courses = <p style={{textAlign: 'center'}}> Something went wrong!!</p>
        if (!this.state.error) {
            courses = this.state.courses.map(
                course => {
                    return <Post title={course.title}
                                 description={course.description}
                                 id={course.id}
                                 key={course.id}
                                 ico={course.ico}
                                 price={course.price}
                                 rating={course.rating}
                                 author_name={course.author_name}
                                 clicked={() => this.postSelectedHandler(course.id)}/>

                });
        }

        return (
            <div>
               <CourseSearch/>
                <section className="CourseLi">
                    <div className="card-group">
                        {courses}
                    </div>
                </section>
            </div>
        )

    }
}

export default Courses
