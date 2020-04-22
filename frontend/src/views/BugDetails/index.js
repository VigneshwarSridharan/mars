import React from 'react'
import { connect } from 'react-redux'
import { SET_BUG_DETAILS, RESET_BUG_DETAILS } from './constants'
import { BugCatcher } from '../../utils/APIService'
import { Container } from 'reactstrap'
import BugInfo from './BugInfo'
import '../../assets/sass/bug-details.scss'
import FileViewer from './FileViewer'

class BugDetails extends React.Component {
    componentDidMount = () => {
        let {id} = this.props.match.params

        // Actions
        let {setBugDetails,resetBugDetails} = this.props
        resetBugDetails();

        BugCatcher.getDetails(id).then(({status,data}) => {
            if(status == "success") {
                setTimeout(() => {
                    
                    setBugDetails(data)
                }, 3000);
            }
        })

    }
    render() {
        return (
            <Container fluid>
                <div className="mb-3 text-lligt"><i className="mdi mdi-bug"></i> <a href="javascript:void(0)">Bug Catcher</a> / <a href="javascript:void(0)">Bug List</a> / Bug Details</div>
                <BugInfo />
                <FileViewer />
            </Container>
        )
    }
}



const mapStateToProps = ({ BugDetails }) => ({
})

const mapDispatchToProps = dispatch => ({
    resetBugDetails : () => dispatch({
        type:RESET_BUG_DETAILS
    }),
    setBugDetails: payload => dispatch({
        type: SET_BUG_DETAILS,
        payload
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(BugDetails);