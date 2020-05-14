import React, {Component} from 'react';
import axios from '../../../axios';
import Log from '../../../components/Authentication/Login/LoginForm';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";



class Login extends Component {
    state = {
        open: false,
        error: null,
        logData: {
            username: '',
            email: '',
            password: ''
        },
        modal: {
            show: false,
            title: '',
            body: '',
            bodyCSS: ''
        },
    }

    componentDidMount() {
        this.setState({open: this.props.open})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.open !== this.props.open) {
            this.setState({open: this.props.open})
        }
    }

    handleLogin(event) {
        event.preventDefault();
        const regObj = {...this.state.logData};
        regObj['username'] = regObj.email.split('@')[0];
        this.setState({logData: regObj});

        axios.post('/restauth/login/', regObj)
            .then(response => {
                this.setState({
                    modal: {
                        show: true,
                        body: 'Registration has been successfully',
                        bodyCSS: 'text-success',
                        title: 'Registration Status'
                    }
                })
                localStorage.setItem('token', response.data.key);
                localStorage.setItem('email', JSON.parse(response.config.data).email);
                window.location.href = window.location.origin;
            }).catch(error => {
            const errorMsg = Object.keys(error.response.data)
                .map(igKey => {
                    return error.response.data[igKey]
                }).reduce((sum, el) => {
                    return sum + el;
                }, '');
            this.setState({
                error: errorMsg,
                modal: {
                    show: true,
                    body: errorMsg,
                    error: errorMsg,
                    bodyCSS: 'text-error',
                    title: 'Registration Status'
                }
            })
        });
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const data = {...this.state.logData};
        data[name] = value;
        this.setState({
            logData: data
        });
    };


    handleClose = () => {
        this.setState({open: false})
    };


    render() {
        let log = (<Log
            email={this.state.logData.email}
            password={this.state.logData.password}
            error={this.state.error}
            onSubmit={(evt) => this.handleLogin(evt)}
            handleClose={(evt) => this.handleClose(evt)}
            change={(evt) => this.handleChange(evt)}
        />)
        const showDia = !!this.state.open;
        return (


            <Dialog fullWidth={true} open={showDia} onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                    {log}
                </DialogContent>
                <DialogActions>
                    {/*  <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>*/}
                </DialogActions>
            </Dialog>
        )
    }
}


export default Login;
