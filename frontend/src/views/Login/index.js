import React, { useState } from 'react';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import InputGroup from 'reactstrap/lib/InputGroup';
import InputGroupAddon from 'reactstrap/lib/InputGroupAddon';
import Button from 'reactstrap/lib/Button';
import Form from 'reactstrap/lib/Form';
import Alert from 'reactstrap/lib/Alert';
import { User } from '../../utils/APIService';
import { Spring } from 'react-spring/renderprops'
import Animate from '../../components/Animate';


const Login = () => {
    return (
        <div className="static-view bg-gradient-primary">
            <Container>
                <Row>
                    <Col sm={{ size: 8, offset: 2 }}>
                        <Animate>
                            <LoginContent />
                        </Animate>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const LoginContent = () => {
    const [state, setState] = useState({
        processing: false,
        error: false
    })
    let { processing, error } = state;
    let toggleAlert = (error = false) => setState({ error })
    return (
        <div className="login-view">
            <div className="info" style={{ backgroundImage: `url('./assets/images/bg-05.jpg')` }}>
                <h2>Wellcome</h2>
                <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quisquam impedit optio id sint aliquid veritatis, minus temporibus eum nostrum. Itaque est rerum ad quis, nostrum rem eos consequatur exercitationem?</p>
            </div>
            <div className="content">
                <div className="text-center mt-2 mb-5">
                    <img src="./assets/images/logo.png" alt="" width="82" />
                </div>
                <Form
                    name="login"
                    onSubmit={e => {
                        e.preventDefault();
                        let username = document.login.elements['username'].value;
                        let password = document.login.elements['password'].value;
                        setState({ processing: true });
                        User.login(username, password).then(res => {
                            setState({ processing: false })
                            if (res.status == 'success') {
                                localStorage.token = res.data.token;
                                localStorage.userDetails = JSON.stringify(res.data);
                                window.location = '/'
                            }
                            else {
                                toggleAlert(res.data);
                                setTimeout(() => {
                                    toggleAlert();
                                }, 5000);
                            }
                        })
                    }}
                >
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <i className="mdi mdi-account-circle input-group-text"></i>
                            </InputGroupAddon>
                            <Input name="username" type="email" placeholder="Username" required />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <i className="mdi mdi-key-variant input-group-text"></i>
                            </InputGroupAddon>
                            <Input name="password" type="password" placeholder="Password" required />
                        </InputGroup>
                    </FormGroup>
                    <Spring
                        from={{ height: error ? 0 : 'auto' }}
                        to={{ height: error ? 'auto' : 0 }}
                    >
                        {styles => (
                            <div style={{ ...styles, overflow: 'hidden' }}>
                                <Alert color="danger">{error}</Alert>
                            </div>
                        )}
                    </Spring>
                    <Button color="primary" block disabled={processing}>{processing ? <><i className="mdi mdi-loading mdi-spin"></i> Please wait...</> : 'Login'}</Button>
                </Form>

                <div className="or-devider">
                    <span>OR</span>
                </div>
                <div className="text-center">
                    Don't have an account? <a href="javascript:void(0)">sign up</a>
                </div>
            </div>
        </div>
    )

}


Login.prototype = {

}

export default Login;