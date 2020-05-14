import React, {Component} from 'react';
// import axios from '../../axios';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";


class DialogX extends Component {
    state = {
        open: false,
        body: null
    }

    componentDidMount() {
        this.setState({open: this.props.open})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.open !== this.props.open) {
            this.setState({open: this.props.open})
        }
    }


    render() {
        const showDia = !!this.state.open;
        return (
            <Dialog fullWidth={true} open={showDia} onEscapeKeyDown={this.props.onEscape}
                    onSubmit={this.onNewCourseCreate}
                    aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                    {this.props.children}
                </DialogContent>
                <DialogActions>
                    <Button className="btn btn-outline-danger"  onClick={this.props.onClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}


export default DialogX;
