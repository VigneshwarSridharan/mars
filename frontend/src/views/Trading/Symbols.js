import React from 'react';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { Trail } from 'react-spring/renderprops';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const Symbols = ({ data }) => {
    return (
        <div className="symbol-list">
            <Row>
                <Trail
                    items={data}
                    keys={() => window.uid()}
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}
                >
                    {
                        item => style => {
                            // eslint-disable-next-line
                            let [symbol, stockExchange = "NASDAQ"] = item.symbol.split('.');
                            return (
                                <Col sm={4} style={style}>
                                    <Link to={`/trading/${item.symbol}`} className="item">
                                        <Card className="mb-2">
                                            <CardBody>
                                                <div><b>{item.name}</b> {stockExchange != '' && (<small>( {stockExchange} )</small>)}</div>
                                                <div>{item.type}</div>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                </Col>
                            )
                        }
                    }
                </Trail>
            </Row>
        </div>
    )
}



const mapStateToProps = ({ Reports }) => ({
    data: Reports.symbols
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Symbols);