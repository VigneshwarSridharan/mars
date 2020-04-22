import React from 'react'
import { connect } from 'react-redux';
import { Container, Card, CardBody } from 'reactstrap';

const BugInfo = props => {
    let { bugDetails } = props;
    console.log(bugDetails);
    if (Object.keys(bugDetails).length) {
        return (
            <Card className="mb-3 bug-info" >
                <CardBody className="p-0">
                    <div className="d-flex align-items-center top-info bg-light">
                        <div className="p-3 border-right bg-danger text-white rounded-left error-icon">
                            <h4 className="mdi mdi-close-circle m-0"></h4>
                        </div>
                        <div className="w-100 text-danger">
                            <div className="p-3">
                                {bugDetails.message}
                            </div>
                        </div>
                    </div>

                    <div className="content">
                        <pre>
                            {bugDetails.error}
                        </pre>
                        <a href={bugDetails.source} target="_blank">{bugDetails.source}</a>
                    </div>
                </CardBody>
            </Card>
        )
    }
    else {
        return (
            <Card className="mb-3">
                <CardBody>
                    <h3 className="text-center m-0">
                        <i className="mdi mdi-loading mdi-spin text-primary"></i> Loading...
                            </h3>
                </CardBody>
            </Card>
        )
    }
}



const mapStateToProps = ({ BugDetails }) => ({
    bugDetails: BugDetails.bugDetails
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(BugInfo)