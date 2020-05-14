import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import './Course.css';

const course = (props) => {
    // console.log(props);
    let i = 0;
    let fstars = [];
    while (i < 5) {
        if (props.rating > i)
            fstars.push(<span key={i} className="fa fa-star checked"/>)
        else fstars.push(<span key={i} className="fa fa-star"/>)
        i++;
    }
    const cauthor = "By: " + props.author_name;
    const nWrap = true;
    return (
        <Card className="root IndCourse bg-dark text-light" key={props.id} onClick={props.clicked}>
            <CardHeader className="myTitleWhite"
                title=""
                subheader={cauthor}
            />
            <CardMedia
                className="media"
                image={props.ico}
                title={props.title}
            />
            <CardContent className='text-light'>
                <Typography variant="body2" className="text-light" noWrap={nWrap}  component="p">
                    {props.title}
                    {props.author_name}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button disabled><small className="text-muted text-light">Price: {props.price}$ </small></Button>
                <Button disabled><span>{fstars}</span><strong className="text-light">{props.rating}</strong></Button>
            </CardActions>
        </Card>
        /*  <div className="col mb-sm-5" onClick={props.clicked}>
              <div className="card h-100 w-100 IndCourse" onClick={props.clicked}>
                  <img style={{height: '100px', alignSelf: 'center', padding: '0rem'}} src={props.ico}
                       className="card-img-top IndCourseBody"
                       alt="no image"/>
                  <div className="card-body">
                      <h5 className="card-title small">{props.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted"><small
                          className="text-muted">by {props.author_name} </small></h6>
                      <h7> <span>{fstars}</span><strong>{props.rating}</strong></h7>
                      {/!*<p className="card-text"><small className="text-muted">Price: {props.price}$ </small></p>*!/}
                  </div>
                  <div className="card-footer text-muted">
                      <small className="text-muted">Price: {props.price}$ </small>
                  </div>

              </div>
          </div>*/
        // <div className="card CourseDetail" style={{ height:'20rem'}} onClick={props.clicked}>
        //     <img  className="card-img-top" src={props.ico} alt="Logo" />
        //     <div className="card-body">
        //         <h5 className="card-title">{props.title}</h5>
        //         <p className="card-text">{props.description}</p>
        //     </div>
        //
        //     <div className="card-footer text-muted">
        //         {props.author_name}
        //         {props.price}
        //     </div>
        // </div>
    )
};

// export default withRouter(course);
export default course;
