import React from 'react';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardHeader from 'reactstrap/lib/CardHeader';
import Form from 'reactstrap/lib/Form';
import Input from 'reactstrap/lib/Input';
import Button from 'reactstrap/lib/Button';
import { Trading } from '../../utils/APIService';
import { Consumer } from './Context';

const SearchForm = () => {

    return (
        <Consumer>
            {({ processing, toggleProcess, updateSymbols }) => {
                const onSubmit = e => {
                    e.preventDefault();
                    let query = document.search_symbol.elements['query'].value;
                    toggleProcess(true);
                    Trading.getSymbols(query).then(res => {
                        toggleProcess(false)
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
                            <Form name="search_symbol" className="d-flex mb-3" onSubmit={onSubmit}>
                                <Input name="query" placeholder="Search" required />
                                <Button color="primary" className="ml-3 flex-shrink-0">{processing ? <><i className="mdi mdi-loading mdi-spin"></i> Searching...</> : 'Search'}</Button>
                            </Form>
                        </CardBody>
                    </Card>
                )
            }}
        </Consumer>
    )
}

export default SearchForm;