import React, { useState } from 'react';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardHeader from 'reactstrap/lib/CardHeader';
import Form from 'reactstrap/lib/Form';
import Input from 'reactstrap/lib/Input';
import Button from 'reactstrap/lib/Button';
import { Trading } from '../../utils/APIService';
import { connect } from 'react-redux';

const SearchForm = ({ updateSymbols }) => {
    const [processing, setProcessing] = useState(false)
    const onSubmit = e => {
        e.preventDefault();
        let query = document.search_symbol.elements['query'].value;
        setProcessing(true);
        Trading.getSymbols(query).then(res => {
            setProcessing(false)
            if (res.status == "success") {
                updateSymbols(res.data);
            }
        })
    }
    return (
        <Card className="mb-3">
            <CardHeader className="bg-gradient-primary text-white">
                Search Symbol
            </CardHeader>
            <CardBody>
                <Form autoComplete="off" name="search_symbol" className="d-flex mb-3" onSubmit={onSubmit}>
                    <Input name="query" placeholder="Search" required />
                    <Button color="primary" className="ml-3 flex-shrink-0">{processing ? <><i className="mdi mdi-loading mdi-spin"></i> Searching...</> : 'Search'}</Button>
                </Form>
            </CardBody>
        </Card>
    )
}


const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
    updateSymbols: payload => dispatch({
        type: 'UPDATE_SYMBOLS',
        payload
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)