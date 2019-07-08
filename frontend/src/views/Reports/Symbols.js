import React from 'react';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { Trail } from 'react-spring/renderprops';
import { Consumer } from './Context';

const Symbols = () => {
    return (
        <Consumer>
            {
                ({ symbols: data }) => {
                    return (
                        <Row>
                            <Trail
                                items={data}
                                keys={() => window.uid()}
                                from={{ opacity: 0 }}
                                to={{ opacity: 1 }}
                            >
                                {
                                    item => style => (
                                        <Col sm={4} style={style}>
                                            <Card className="mb-2">
                                                <CardBody>
                                                    <p>{item.name}</p>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    )
                                }
                            </Trail>
                        </Row>
                    )
                }
            }
        </Consumer>
    )
}

export default Symbols;