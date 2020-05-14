import React, {Component} from 'react';
import axios from '../../../axios';
import Reg from '../../../components/Authentication/Register/RegisterForm';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";


class Register extends Component {
    state = {
        open: false,
        regData: {
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            address: '',
            country: '',
            state: '',
            zip: '',
            phone: '',
            website: '',
            qualification: '',
            biography: '',
            groups: []
        },
        modal: {
            show: false,
            title: '',
            body: '',
            bodyCSS: ''
        },
        error: ''
    }

    componentDidMount() {
        this.setState({open: this.props.open})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.open !== this.props.open) {
            this.setState({open: this.props.open})
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const regObj = {...this.state.regData};
        regObj['username'] = regObj.email.split('@')[0];
        this.setState({regData: regObj});

        axios.post('/users/', this.state.regData)
            .then(response => {
                this.setState({
                    modal: {
                        show: true,
                        body: 'Registration has been successfully',
                        bodyCSS: 'text-success',
                        title: 'Registration Status'
                    }
                })
                alert('User successfully created');
                this.props.history.push('/');
            }).catch(error => {
            const errorMsg = Object.keys(error.response.data)
                .map(igKey => {
                    return error.response.data[igKey]
                }).reduce((sum, el) => {
                    return sum + el;
                }, '');
            this.setState({
                modal: {
                    show: true,
                    body: errorMsg,
                    bodyCSS: 'text-error',
                    title: 'Registration Status'
                }
            })
        });
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const data = {...this.state.regData};
        data[name] = value;
        this.setState({
            regData: data
        });
    };
    handleGroupChange = (event) => {
        const value = event.target.dataset.groups;
        const userType = parseInt(value);
        const gr = [];
        gr.push(userType);
        const data = {...this.state.regData};
        data['groups'] = gr
        this.setState({regData: data})
    }
    onModalClose = () => {
        this.setState({modal: {show: false}})
    }
    handleClose = () => {
        this.setState({open: false})
    };
    render() {
        let reg = (<Reg first_name={this.state.regData.first_name}
                        last_name={this.state.regData.last_name}
                        username={this.state.regData.username}
                        email={this.state.regData.email}
                        password={this.state.regData.password}
                        address={this.state.regData.address}
                        country={this.state.regData.country}
                        state={this.state.regData.state}
                        zip={this.state.regData.zip}
                        phone={this.state.regData.phone}
                        website={this.state.regData.website}
                        qualification={this.state.regData.qualification}
                        biography={this.state.regData.biography}
                        groups={this.state.regData.groups}
                        onSubmit={(evt) => this.handleSubmit(evt)}
                        handleClose={(evt) => this.handleClose(evt)}
                        change={(evt) => this.handleChange(evt)}
                        groupsChange={(evt) => this.handleGroupChange(evt)}
        />)
        return (
            <Dialog fullWidth={true} open={this.state.open} onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                    {reg}
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


export default Register;
