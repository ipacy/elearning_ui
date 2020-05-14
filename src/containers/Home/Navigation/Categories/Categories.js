import React, {Component} from 'react';
import axios from "../../../../axios";
import Category from '../../../../components/Navigation/Toolbar/Category/Category';


class Categories extends Component {
    state = {
        categories: [],
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('/categories/')
            .then(response => {
                const categories = response.data;
                const updatedCategories = categories.map(category => {
                    return {
                        ...category
                    }
                })
                this.setState({categories: updatedCategories})
            }).catch(error => {
            this.setState({error: error})
        });
    };

    postSelectedHandler = (id) => {
        //this.props.history.push({pathname: '/posts/' + id});
        //this.props.history.push('/categories/' + id);
        //this.setState({selectedPostId: '/' + id})
    }

    render() {
        let categories = <p style={{textAlign: 'center'}}> Something went wrong!!</p>
        if (!this.state.error) {
            categories = this.state.categories.map(
                cat => {
                    return <Category
                        id={cat.id}
                        key={cat.id}
                        title={cat.title}
                        clicked={() => this.postSelectedHandler(cat.id)}></Category>
                });
        }
        return (
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                {categories}
            </div>
        )

    }
}

export default Categories
