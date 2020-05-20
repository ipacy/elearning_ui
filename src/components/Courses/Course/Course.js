import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Rating from "react-rating";

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
                <Typography variant="body2" className="text-light" noWrap={nWrap} component="p">
                    {props.title}
                    {props.author_name}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button disabled><small className="text-muted text-light">Price: {props.price}$ </small></Button>
                <Button disabled>
                   <Rating initialRating={props.rating} emptySymbol="fa fa-star"
                                 fullSymbol="fa fa-star checked" readonly={true}/>
                </Button>
                {/*<Button disabled><span>{fstars}</span><strong className="text-light">{props.rating}</strong></Button>*/}
            </CardActions>
        </Card>
    )
};

// export default withRouter(course);
export default course;
