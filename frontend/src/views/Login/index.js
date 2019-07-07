import React from 'react';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Card from 'reactstrap/lib/Card';
import CardHeader from 'reactstrap/lib/CardHeader';
import CardBody from 'reactstrap/lib/CardBody';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import InputGroup from 'reactstrap/lib/InputGroup';
import InputGroupAddon from 'reactstrap/lib/InputGroupAddon';
import Button from 'reactstrap/lib/Button';

const Login = props => {
    return (
        <section className="static-view" style={{ backgroundImage: `url('./assets/images/bg-05.jpg')` }}>
            <Container>
                <Row className="justify-content-center">
                    <Col sm={5}>
                        <Card>
                            <CardBody>
                                <h2 className="p-2 border-bottom mb-5">Log  in</h2>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <i className="mdi mdi-account-circle input-group-text"></i>
                                        </InputGroupAddon>
                                        <Input placeholder="Username" />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <i className="mdi mdi-key-variant input-group-text"></i>
                                        </InputGroupAddon>
                                        <Input placeholder="Password" />
                                    </InputGroup>
                                </FormGroup>
                                <Button color="primary" block>Login</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

Login.prototype = {

}

export default Login;