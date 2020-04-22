import React from 'react'
import { connect } from 'react-redux';
import { Card, CardBody, Row, Col, CardHeader } from 'reactstrap';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow";
// import "../../assets/sass/ace-tomorrow.scss";


const FileViewer = props => {
    let { bugDetails } = props;
    console.log(bugDetails);
    if (Object.keys(bugDetails).length) {
        let { source, file, lineno, colno, message } = bugDetails
        let fileName = source.split('/').pop();
        return (
            <Card className="mb-3 bug-file-info" >
                <CardHeader className="bg-gradient-primary text-white">
                    Files
                </CardHeader>
                <CardBody className="p-0">
                    <Row>
                        <Col sm={4} className="pr-0">
                            <div className="border-bottom">
                                <div className="p-3 border-primary">
                                    <div><b>{fileName}</b></div>
                                    <div><small>{source}:{lineno}:{colno}</small></div>
                                </div>
                            </div>
                        </Col>
                        <Col sm={8} className="pl-0">
                            <AceEditor
                                mode="javascript"
                                theme="tomorrow"
                                width="100%"
                                fontSize={16}
                                value={file}
                                editorProps={{ $blockScrolling: true }}
                                readOnly={true}
                                annotations={[
                                    { row: (lineno - 1), column: colno, type: "error", text: message }
                                ]}
                                setOptions={{
                                    tabSize: 4,
                                }}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }
    else {
        return (
            ""
        )
    }
}



const mapStateToProps = ({ BugDetails }) => ({
    bugDetails: BugDetails.bugDetails
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(FileViewer)