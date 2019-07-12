import React from 'react';
import Container from 'reactstrap/lib/Container';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import { Trading } from '../../utils/APIService';
import BasicInfo from './BasicInfo';
import { UPDATE_INFO, UPDATE_QUOTE } from './constants';
import { connect } from 'react-redux';
import Animate from '../../components/Animate';
import { API_ROOT } from '../../constants';

class SymbolInfo extends React.Component {

    state = {
        process: true
    }

    price = '';

    socket = {}

    componentDidMount = () => {
        let { symbol } = this.props.match.params;

        // Actions
        let { updateInfo } = this.props;

        Trading.getSymbolBasicInfo(symbol).then(res => {
            if (res.status == "success") {
                this.setState({ process: false })
                this.price = res.data.lastQuote.price;
                updateInfo(res.data)
            }
            else {
                console.error(res.data)
            }
        })
        this.createSoket(symbol);
    }

    createSoket = (symbol) => {
        let { token } = localStorage;

        // Actions
        let { updateQuote } = this.props

        if (!token) return console.error("Token missing, can't create soket connection");

        this.socket = window.io(API_ROOT, {
            path: '/soket/trading',
            query: `token=${localStorage.token}`
        });

        this.socket.on('connect', () => {
            setTimeout(() => {
                this.socket.emit('quote-symbol', { symbol })
            }, 5000);
        });

        this.socket.on('quote-symbol', data => {
            console.log(data)
            let { price = "" } = data
            if (this.price != price) {
                this.price = price
                updateQuote(data)
            }
        })

    }

    componentWillUnmount = () => {
        this.socket.close();
    }

    render() {
        let { process } = this.state;

        if (process) {
            return (
                <Container>
                    <Card>
                        <CardBody>
                            <h3 className="text-center m-0">
                                <i className="mdi mdi-loading mdi-spin text-primary"></i> Loading...
                            </h3>
                        </CardBody>
                    </Card>
                </Container>
            )
        }
        else {
            return (
                <Container>
                    <Animate>
                        <BasicInfo />
                        <div></div>
                    </Animate>
                </Container>
            )
        }
    }
}


const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
    updateInfo: payload => dispatch({
        type: UPDATE_INFO,
        payload
    }),

    updateQuote: payload => dispatch({
        type: UPDATE_QUOTE,
        payload
    }),

})

export default connect(mapStateToProps, mapDispatchToProps)(SymbolInfo)
