import React from 'react';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import { connect } from 'react-redux';

const BasicInfo = props => {
    let { name = "", symbol: sym = "", price = "" ,currency=""} = props;
    let [symbol, stockExchange = "NASDAQ"] = sym.split('.');
    return (
        <Card>
            <CardBody>
                <h5>{name}<br /><small>{stockExchange} : {symbol}</small></h5>
                <div className="d-flex">
                    <h5><b>{Number(price).toFixed(2)}</b></h5>
                    <p>{currency}</p>
                </div>
            </CardBody>
        </Card>
    )
}

const mapStateToProps = ({ SymbolInfo }) => ({
    name: SymbolInfo.metaData.name,
    symbol: SymbolInfo.metaData.symbol,
    price: SymbolInfo.lastQuote.price,
    currency: SymbolInfo.metaData.currency
})
const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);