import React from 'react';
import Container from 'reactstrap/lib/Container';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardHeader from 'reactstrap/lib/CardHeader';
import Button from 'reactstrap/lib/Button';
import Animate from '../../components/Animate';
import Select from '../../components/Select';

const Dashboard = (props) => {
    return (
        <Container fluid>

            <Animate>
                <Card className="mb-3">
                    <CardHeader className="bg-gradient-primary text-white">
                        Buttons
                    </CardHeader>
                    <CardBody>
                        {
                            ['primary', "secondary", "success", "danger", "warning", "info", "light", "dark", "link",].map((btn, inx) => {
                                return (
                                    <Button
                                        color={btn}
                                        key={`button-${inx}`}
                                        className="text-capitalize mr-2"
                                    >{btn}</Button>
                                )
                            })
                        }

                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <Select />
                        <input className="form-control" placeholder="Placeholder" />
                    </CardBody>
                </Card>
            </Animate>
        </Container>
    )
}

export default Dashboard;