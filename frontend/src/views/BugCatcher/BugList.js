import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap';


const BugList = props => {
    // State
    let { bugList } = props
    return (
        <div className="bugs">
            {
                bugList.map((bug, inx) => {
                    return (
                        <Link to={`/bug/${bug.id}`} className="item" key={"bug-list" + inx}>
                            <Card className="mb-3" >
                                <CardBody className="d-flex p-0 align-items-center">

                                    <div className="p-3 border-right bg-danger text-white rounded-left">
                                        <h4 className="mdi mdi-close-circle m-0"></h4>
                                    </div>
                                    <div className="pl-3 w-100 text-danger">
                                        {bug.message}
                                    </div>
                                    <div className="p-3">
                                        <h5 className="mdi mdi-chevron-right m-0"></h5>
                                    </div>
                                </CardBody>
                            </Card>
                        </Link>
                    )
                })
            }
        </div>
    )
}



const mapStateToProps = ({ BugCatcher }) => ({
    bugList: BugCatcher.bugList
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(BugList);