import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class ModalX extends Component {
    state = {
        open: false,
        showActions: false
    };

    componentDidMount() {
        this.setState({open: this.props.open})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.open !== this.props.open) {
            this.setState({open: this.props.open})
        }
    }


    handleClose = () => {
        this.setState({open: false})
    };


    render() {
        let actionButtons = <div/>
        if (this.props.showActions) {
            actionButtons = <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.handleClose} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
        }

        return (
            <Dialog fullWidth={true} open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    {this.props.children}
                </DialogContent>
                {actionButtons}
            </Dialog>
        );
    }
}


export default ModalX;
