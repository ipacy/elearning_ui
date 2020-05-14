import React, {Component} from 'react';
import {Row, Col, Button} from 'react-bootstrap';

class Toast extends Component {
    state = {
        show: false,
        message: null
    }

    render() {
        return (
            <Row>
                <Col xs={6}>
                    <Toast onClose={() => this.setState({show: false})} show={this.state.show} delay={3000} autohide>
                        <Toast.Header>
                            <img
                                src="../../../assets/online-learning.png"
                                className="rounded mr-2"
                                alt=""
                            />
                            <strong className="mr-auto">Bootstrap</strong>
                            <small>11 mins ago</small>
                        </Toast.Header>
                        <Toast.Body>{this.state.message}</Toast.Body>
                    </Toast>
                </Col>
                <Col xs={6}>
                    <Button onClick={() => this.setState({show: true})}>Show Toast</Button>
                </Col>
            </Row>
        )
    }
}

export default Toast;
