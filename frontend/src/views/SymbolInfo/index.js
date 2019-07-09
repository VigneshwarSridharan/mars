import React, { useEffect, useState } from 'react';
import Container from 'reactstrap/lib/Container';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import { Trading } from '../../utils/APIService';
import BasicInfo from './BasicInfo';
import { UPDATE_INFO } from './constants';
import { connect } from 'react-redux';
import Animate from '../../components/Animate';


const SymbolInfo = (props) => {
    const [process, setprocess] = useState(true)
    let { symbol } = props.match.params;
    let { updateInfo } = props;
    useEffect(() => {
        setprocess(true)
        Trading.getSymbolBasicInfo(symbol).then(res => {
            if (res.status == "success") {
                setprocess(false)
                updateInfo(res.data)
            }
        })
        // eslint-disable-next-line
    }, [])
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

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
    updateInfo: payload => dispatch({
        type: UPDATE_INFO,
        payload
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(SymbolInfo)
