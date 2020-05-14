import React from "react";
// import icon from "../../../assets/online-learning.png";
import Alert from "react-bootstrap/Alert";


const createCourse = (props) => {
    const oWarning = (props.error) ? <Alert variant="danger" dismissible>
        <Alert.Heading>Warning</Alert.Heading>
        <p>
            {props.error}
        </p>
    </Alert> : null;
    let categorys = null;
    if (props && props.categories) {
        categorys = props.categories.map(
            cat => {
                return <option key={cat.id} value={cat.id}>{cat.title}</option>
            });
    }
    debugger;
    let languages = null;
    if (props && props.languages) {
        languages = props.languages.map(
            language => {
                return <option key={language.id} value={language.language}>{language.language_name}</option>
            });
    }


    return (
        <div className="container">
            <div className="py-6 text-center">
                <h2 className="text-success">{props.title}</h2>
            </div>
            {oWarning}
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
                        {/*<label htmlFor="language">Language</label>*/}
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <svg className="bi bi-chat-square-quote-fill"
                                         width="1em" height="1em" viewBox="0 0 16 16"
                                         fill="currentColor"
                                         xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M0 2a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-2.5a1 1 0 00-.8.4l-1.9 2.533a1 1 0 01-1.6 0L5.3 12.4a1 1 0 00-.8-.4H2a2 2 0 01-2-2V2zm7.194 2.766c.087.124.163.26.227.401.428.948.393 2.377-.942 3.706a.446.446 0 01-.612.01.405.405 0 01-.011-.59c.419-.416.672-.831.809-1.22-.269.165-.588.26-.93.26C4.775 7.333 4 6.587 4 5.667 4 4.747 4.776 4 5.734 4c.271 0 .528.06.756.166l.008.004c.169.07.327.182.469.324.085.083.161.174.227.272zM11 7.073c-.269.165-.588.26-.93.26-.958 0-1.735-.746-1.735-1.666 0-.92.777-1.667 1.734-1.667.271 0 .528.06.756.166l.008.004c.17.07.327.182.469.324.085.083.161.174.227.272.087.124.164.26.228.401.428.948.392 2.377-.942 3.706a.446.446 0 01-.613.01.405.405 0 01-.011-.59c.42-.416.672-.831.81-1.22z"
                                                  clipRule="evenodd"/>
                                    </svg>
                                </span>
                            </div>

                            <select className="custom-select"
                                    id="language"
                                    required={true}
                                    name="language"
                                    value={props.language || ""}
                                    onChange={props.change}>
                                <option value="">Select course language</option>
                                {languages}
                            </select>
                        </div>
                        <small id="languageHelpInline" className="text-muted">
                            Please provide course language.
                        </small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categories">Categories</label>
                        <div className="form-group">
                            <select className="custom-select"
                                    multiple
                                    id="categories"
                                    required={true}
                                    name="categories"
                                    onChange={props.change}>
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
                                   onChange={props.change}/>
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
                               onChange={props.change}/>
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
    )
};
export default createCourse;
