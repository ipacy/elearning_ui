import React from "react";
import icon from "../../../assets/online-learning.png";
import Alert from "react-bootstrap/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// import {Nav, Navbar} from "react-bootstrap";
import {Button} from "react-bootstrap";

const loginForm = (props) => {
    const oWarning = (props.error) ? <Alert variant="danger" dismissible>
        <Alert.Heading>Warning</Alert.Heading>
        <p>
            {props.error}
        </p>
    </Alert> : null;
    const openDia = !!props.open ? props.open : false
    return (
        <Dialog fullWidth={true} open={openDia}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <div className="container">
                    <div className="py-6 text-center">
                        <img className="d-block mx-auto mb-4"
                             src={icon}
                             alt=""
                             width="72"
                             height="72"/>
                        <h2 className="text-success">Login</h2>
                    </div>
                    {oWarning}
                    <div className="col-md-12">
                        <form className="needs-validation" onSubmit={props.onSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email"
                                       placeholder="you@example.com"
                                       required={true}
                                       name="email"
                                       value={props.email || ""}
                                       onChange={props.change}/>
                                <div className="invalid-feedback">
                                    Please enter a valid email address for sign-in.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password"
                                       placeholder="******"
                                       required aria-describedby="passwordHelpInline"
                                       name="password"
                                       value={props.password || ""}
                                       onChange={props.change}/>
                                <small id="passwordHelpInline" className="text-muted">
                                    Must be 8-20 characters long.
                                </small>
                                <div className="invalid-feedback">
                                    Please enter password
                                </div>
                            </div>
                            <button className="btn btn-outline-primary btn-light btn-lg btn-block"
                                    type="submit"> Login
                            </button>
                        </form>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button className="btn btn-outline-danger" onClick={props.onClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>

    )
};
export default loginForm;
