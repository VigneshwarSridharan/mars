import React, { useState } from 'react';
import Container from 'reactstrap/lib/Container';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardHeader from 'reactstrap/lib/CardHeader';
import Form from 'reactstrap/lib/Form';
import Input from 'reactstrap/lib/Input';
import Button from 'reactstrap/lib/Button';
import ListGroup from 'reactstrap/lib/ListGroup';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import { Trading } from '../../utils/APIService';

const Reports = () => {
    let [state, setState] = useState({
        processing: false,
        symbols: []
    });
    let { processing, symbols } = state;
    const onSubmit = e => {
        e.preventDefault();
        let query = document.search_symbol.elements['query'].value;
        setState({ ...state, processing: true })
        Trading.getSymbols(query).then(res => {
            setState({ ...state, processing: false })
            if (res.status == "success") {
                setState({ ...state, symbols: res.data })
            }
        })
    }

    return (
        <Container>
            <Card className="mb-3">
                <CardHeader className="bg-gradient-primary text-white">
                    Search Symbol
                </CardHeader>
                <CardBody>
                    <Form name="search_symbol" className="d-flex" onSubmit={onSubmit}>
                        <Input name="query" placeholder="Search" required />
                        <Button color="primary" className="ml-3 flex-shrink-0">{processing ? <><i className="mdi mdi-loading mdi-spin"></i> Searching...</> : 'Search'}</Button>
                    </Form>
                    {
                        console.log({ symbols })
                    }
                    {
                        symbols.length != 0 && (
                            <ListGroup>
                                {
                                    symbols.map((symbol, inx) => {
                                        return (
                                            <ListGroupItem key={`sumbol-${inx}`}>
                                                {symbol.name}
                                            </ListGroupItem>
                                        )
                                    })
                                }
                            </ListGroup>
                        )
                    }
                </CardBody>
            </Card>
        </Container>
    )
}

export default Reports;