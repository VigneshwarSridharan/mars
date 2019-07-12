import React from 'react';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import { connect } from 'react-redux';
import PriceInfo from './PriceInfo';

const BasicInfo = props => {
    let { name = "", symbol: sym = "" } = props;
    let [symbol, stockExchange = "NASDAQ"] = sym.split('.');
    
    return (
        <Card>
            <CardBody>
                <h5>{name}<br /><small>{stockExchange} : {symbol}</small></h5>
                <PriceInfo />
            </CardBody>
        </Card>
    )
}

const mapStateToProps = ({ SymbolInfo }) => ({
    name: SymbolInfo.metaData.name,
    symbol: SymbolInfo.metaData.symbol
})
const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);