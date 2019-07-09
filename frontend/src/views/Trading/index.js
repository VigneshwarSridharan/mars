import React from 'react';
import Container from 'reactstrap/lib/Container';
import Symbols from './Symbols';
import SearchForm from './SearchForm';
import '../../assets/sass/symbol-info.scss';

const Reports = () => {
    return (
        <Container>
            <SearchForm />
            <Symbols />
        </Container>
    )
}

export default Reports;
