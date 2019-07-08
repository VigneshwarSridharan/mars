import React from 'react';
import Container from 'reactstrap/lib/Container';
import Symbols from './Symbols';
import { ReportsProvider } from './Context';
import SearchForm from './SearchForm';

const Reports = () => {
    return (
        <ReportsProvider>
            <Container>
                <Container>
                    <SearchForm />
                    <Symbols />
                </Container>
            </Container>
        </ReportsProvider>
    )
}

export default Reports;
