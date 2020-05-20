import React from "react";
// import icon from "../../../assets/online-learning.png";
// import Alert from "react-bootstrap/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {PrimaryButton, DefaultButton, TextField} from '@fluentui/react';
// import NLecture from './Lecture/Lecture';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import {Stack} from 'office-ui-fabric-react/lib/Stack';
import Aux from '../../../../../hoc/Aux/Aux'


const createTopic = (props) => {
    const openDia = (props.open) ? true : false;
    const lectureFile = props.lectureFiles.filepaths;
    let lecfiles = [];

    if (!!lectureFile) {
        lecfiles = lectureFile.map(
            cat => {
                return <option key={cat.id} value={cat.id}>{cat.file}</option>
            });
    }
    let oItems = [];

    if (!!props.lectureList && props.lectureList.length > 0) {
        oItems = props.lectureList.map(
            lec => {
                return <Aux>
                    <TableRow key={lec.title}>
                        <TableCell align="left">{lec.title}</TableCell>
                        <TableCell align="right">{lec.description}</TableCell>
                        <TableCell align="right">{lec.duration}</TableCell>
                        <TableCell align="right">{lec.res_file}</TableCell>
                    </TableRow>
                </Aux>
            });
    }

    return (
        <Dialog fullWidth={true} open={openDia} onEscapeKeyDown={props.onEscape}
                aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"></DialogTitle>

            <DialogContent>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className={props.topicClass.appliedClass.topic} id="home-tab" data-toggle="tab" href="#home"
                           role="tab"
                           aria-controls="home" aria-selected="true">Topics</a>
                    </li>
                    <li className="nav-item">
                        <a className={props.topicClass.appliedClass.upload} id="profile-tab" data-toggle="tab"
                           href="#profile" role="tab"
                           aria-controls="profile" aria-selected="false">Uploads</a>
                    </li>
                    <li className="nav-item">
                        <a className={props.topicClass.appliedClass.lecture} id="contact-tab" data-toggle="tab"
                           href="#contact" onClick={props.onLectures} role="tab"
                           aria-controls="contact" aria-selected="false">Lectures</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className={props.topicClass.appliedClass.topicdiv} id="home" role="tabpanel"
                         aria-labelledby="home-tab">
                        <div className="container">
                            <div className="py-6 text-center">
                                <h2 className="text-success">{props.title}</h2>
                            </div>

                            <div className="col-md-12">
                                <form className="needs-validation" onSubmit={props.onSubmit}>
                                    <div className="mb-3">
                                        <TextField htmlFor="title"
                                                   label="Title"
                                                   placeholder="Title"
                                                   required={true}
                                                   name="title"
                                                   value={props.topicFormData.title || ""}
                                                   onChange={props.onChange}/>
                                        <div className="invalid-feedback">
                                            Please enter a valid title.
                                        </div>
                                    </div>
                                    <DefaultButton
                                        type="submit"> Submit
                                    </DefaultButton>

                                </form>
                            </div>
                        </div>
                    </div>

                    <div className={props.topicClass.appliedClass.uploaddiv} id="profile" role="tabpanel"
                         aria-labelledby="profile-tab">
                        <div className="mb-3">
                            <div className="container">
                                <div className="py-6 text-center">
                                    <h2 className="text-success">{props.title}</h2>
                                </div>
                                <form className="needs-validation" onSubmit={props.onLectureFileSubmit}>
                                    <div className="custom-file">
                                        <input type="file"
                                               name="media_file"
                                               id="media_file"
                                               multiple
                                               required={true}
                                               onChange={props.handleLectureFileChange}/>
                                    </div>
                                    <DefaultButton
                                        type="submit"> Submit
                                    </DefaultButton>
                                </form>
                                <small id="imageHelpInline" className="text-muted">
                                    Please choose lecture media files</small>
                            </div>
                        </div>
                    </div>

                    <div className={props.topicClass.appliedClass.lecturediv} id="contact" role="tabpanel"
                         aria-labelledby="contact-tab">

                        <div className="list-group bg-dark text-light">
                            <TableContainer component={Paper}>
                                <TextField label="Title"
                                           required={true}
                                           name="title"
                                           value={props.singleLecture.title || ""}
                                           onChange={props.onLectureChange}/>

                                <TextField label="Description" multiline rows={3}
                                           name="description"
                                           value={props.singleLecture.description || ""}
                                           onChange={props.onLectureChange}/>

                                <TextField label="Duration"
                                           name="duration"
                                           value={props.singleLecture.duration || ""}
                                           onChange={props.onLectureChange}/>

                                <select className="custom-select"
                                        id="inputGroupSelect01"
                                        required={true}
                                        name="res_file"
                                        value={props.singleLecture.res_file || ""}
                                        onChange={props.onLectureChange}>
                                    {lecfiles}
                                </select>

                                <Stack>
                                    <Stack.Item align="end">
                                        <DefaultButton text="Add"
                                                       onClick={props.addLectures}
                                            // checked={checked}
                                        />
                                        <DefaultButton text="Update"
                                            // onClick={_alertClicked}
                                            // checked={checked}
                                        />
                                    </Stack.Item>
                                </Stack>


                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">#</TableCell>
                                            <TableCell align="right">Title</TableCell>
                                            <TableCell align="right">Description</TableCell>
                                            <TableCell align="right">Files</TableCell>
                                            <TableCell align="right">
                                                <Button>
                                                    <AddIcon/>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {oItems}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <PrimaryButton onClick={props.onSubmitLectures}>
                                Submit Lectures
                            </PrimaryButton>
                        </div>
                    </div>
                </div>

            </DialogContent>
            <DialogActions>
                <PrimaryButton onClick={props.onClose}>
                    Cancel
                </PrimaryButton>
            </DialogActions>
        </Dialog>

    )
};
export default createTopic;
