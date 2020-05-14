import React from 'react';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

const topicList = (props) => {
    let sId = "idt" + props.id;
    let target = "#" + sId;
    let lectureList;
    lectureList = props.lectures.map(
        lecture => {
            return  <ul className="list-group"  key={lecture.id}>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <h4><PlayCircleOutlineIcon/> {lecture.title}</h4>
                    <span className="badge badge-light badge-pill"> <h5><AccessAlarmIcon/>{lecture.duration}</h5></span>
                </li>
            </ul>
        });


    return (
        <div  key={props.id} >
            <div className="card-header" id="headingOne" type="button" data-toggle="collapse"
                 data-target={target} aria-expanded="false"
                 aria-controls={sId}>

                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <h4>{props.title}</h4>
                            <span className="badge badge-light badge-pill"> <h5>{props.duration} lectures</h5></span>
                            <span className="badge badge-light badge-pill"> <h5>{props.duration}</h5></span>
                        </li>
                    </ul>

            </div>

            <div id={sId} className="collapse hide" aria-labelledby="headingOne"
                 data-parent="#accordionExample">
                <div className="card-body">
                    {lectureList}
                </div>
            </div>
        </div>
    )
};

export default topicList;
