import React from 'react';
import { connect } from 'react-redux';
import Animate from '../../components/Animate';

const PriceInfo = props => {
    let { price = "", currency = "", change = "", changePercent = "" } = props;
    let color = '', icon = '';
    change = Number(change);
    if (change >= 0) {
        color = 'text-success'
        change = `+${change.toFixed(2)}`;
        icon = 'mdi mdi-arrow-up';
    }
    else {
        color = 'text-danger'
        change = change.toFixed(2);
        icon = 'mdi mdi-arrow-down';
    }
    return (
        <Animate
            from={{ opacity: 0.3 }}
            to={{ opacity: 1 }}
        >
            <div className="d-flex">
                <h5><b>{Number(price).toFixed(2)}</b></h5>
                <p className="ml-1">{currency}</p>
                <div className={color}>
                    <span className="ml-2">{change}</span>
                    <span className="ml-2">( {changePercent} )</span>
                    <i className={icon}></i>
                </div>
            </div>
        </Animate>
    )
}

const mapStateToProps = ({ SymbolInfo }) => ({
    price: SymbolInfo.lastQuote.price,
    currency: SymbolInfo.metaData.currency,
    change: SymbolInfo.lastQuote.change,
    changePercent: SymbolInfo.lastQuote.changePercent
})
const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(PriceInfo);