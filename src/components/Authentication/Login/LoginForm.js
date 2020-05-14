import React from "react";
import icon from "../../../assets/online-learning.png";
import Alert from "react-bootstrap/Alert";

const loginForm = (props) => {
    const oWarning = (props.error) ? <Alert variant="danger" dismissible>
        <Alert.Heading>Warning</Alert.Heading>
        <p>
            {props.error}
        </p>
    </Alert> : null;

    return (
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
                               value={props.logData.title || ""}
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
                               value={props.logData.title || ""}
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
                    <button className="btn btn-outline-danger btn-light btn-lg btn-block"
                            onClick={props.handleClose}> Cancel
                    </button>
                </form>
            </div>
        </div>
    )
};
export default loginForm;
