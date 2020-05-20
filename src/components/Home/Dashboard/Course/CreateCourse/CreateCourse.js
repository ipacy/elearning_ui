import React from "react";
// import icon from "../../../assets/online-learning.png";
import Alert from "react-bootstrap/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const createCourse = (props) => {
    const oWarning = (props.error) ?
        <Alert variant="danger" dismissible>

        <Alert.Heading>Warning</Alert.Heading>
            <p>
                {props.error}
            </p>
        </Alert> : null;

    let categorys = [];
    categorys = props.categories.map(
        cat => {
            return <option key={cat.id} value={cat.id}>{cat.title}</option>
        });
    let languages = [];
    languages = props.languages.map(
        lang => {
            return <option key={lang.id} value={lang.id}>{lang.language}</option>
        });

    const openDia = (props.open) ? true : false;

    // debugger;
    return (
        <Dialog fullWidth={true} open={openDia} onEscapeKeyDown={props.onEscape}
                // onSubmit={props.onSubmit}
                aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
            {oWarning}
            <DialogContent>
                <div className="container">
                    <div className="py-6 text-center">
                        <h2 className="text-success">{props.title}</h2>
                    </div>

                    <div className="col-md-12">
                        <form className="needs-validation" onSubmit={props.onSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" id="title"
                                       placeholder="Title"
                                       required={true}
                                       name="title"
                                       value={props.courseFormData.title || ""}
                                       onChange={props.onChange}/>
                                <div className="invalid-feedback">
                                    Please enter a valid title.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description">Description</label>
                                <textarea type="text" className="form-control" id="description"
                                          placeholder="Description"
                                          name="description" rows="3"
                                          value={props.courseFormData.description || ""}
                                          onChange={props.onChange}/>
                            </div>


                            <div className="mb-3">
                                <label htmlFor="language">Languages</label>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect2">Example multiple select</label>
                                    <select multiple
                                            className="form-control"
                                            id="exampleFormControlSelect2"
                                            name="language"
                                            onChange={props.onChange}>
                                        {languages}
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="category">Categories</label>
                                <div className="form-group">
                                    <select className="custom-select"
                                            multiple
                                            id="category"
                                            required={true}
                                            // value={props.courseFormData.category}
                                            name="category"
                                            onChange={props.onChange}>
                                        {categorys}
                                    </select>
                                    <small id="catHelpInline" className="text-muted">
                                        Please select category / categories.
                                    </small>
                                    <div className="invalid-feedback">Select at least one category</div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="custom-file">
                                    <input type="file"
                                           name="ico"
                                           id="ico"
                                           required={true}
                                           onChange={props.onChange}/>
                                </div>
                                <small id="imageHelpInline" className="text-muted">
                                    Please choose course image
                                </small>

                            </div>

                            <div className="mb-3 input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </div>
                                <input type="text"
                                       className="form-control"
                                       aria-label="Amount (to the nearest dollar)"
                                       required={true}
                                       placeholder="Price"
                                       name="price"
                                       id="courseprice"
                                       onChange={props.onChange}/>
                                <div className="input-group-append">
                                    <span className="input-group-text">.00</span>
                                </div>
                            </div>
                            <button className="btn btn-outline-primary btn-light btn-lg btn-block"
                                    type="submit"> Submit
                            </button>
                            {/*<button className="btn btn-outline-danger btn-light btn-lg btn-block"*/}
                            {/*        onClick={props.onClose}> Cancel*/}
                            {/*</button>*/}
                        </form>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
              {/*  <Button className="btn btn-outline-danger" color="primary" type="submit">
                    Submit
                </Button>*/}
                <Button className="btn btn-outline-danger" onClick={props.onClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>

    )
};
export default createCourse;
