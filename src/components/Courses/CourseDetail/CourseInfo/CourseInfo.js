import React from 'react';


const courseInfo = (props) => {
    let i = 0;
    let fstars = [];
    while (i < 5) {
        if (props.rating > i)
            fstars.push(<span key={i} className="fa fa-star checked"/>)
        else fstars.push(<span key={i} className="fa fa-star"/>)
        i++;
    }
    let oDate = new Date(props.pub_date.split('T')[0]).toDateString();
    return (
        <div className="container">
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={props.ico} className="card-img" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h4>{props.title}</h4>
                        <h5 className="display-8">{props.description}</h5>
                        <p>Created by {props.author_name}  <strong>Last Updated on : {oDate}</strong></p>
                        <p>Language: {props.lang}</p>
                        <p><span>{fstars}</span>({fstars.length})</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

// export default withRouter(course);
export default courseInfo;
