import React from 'react';
import { connect } from 'react-redux';
import * as API from '../../utils/APIService';
import { UPDATE_BUG_LIST, ADD_BUG_ITEM } from './constants';
import BugList from './BugList';
import { Container } from 'reactstrap';
import '../../assets/sass/bug-catcher.scss'
import { API_ROOT } from '../../constants';


class BugCatcher extends React.Component {

    socket = {}

    componentDidMount = () => {
        // Actions
        let { updateBugList } = this.props

        API.BugCatcher.all().then(({ status, data }) => {
            if (status == 'success') {
                updateBugList(data)
            }
        })
        this.createSoket()
    }

    createSoket = () => {
        let { token } = localStorage;

        // Actions
        let { addBugItem } = this.props

        if (!token) return console.error("Token missing, can't create soket connection");

        this.socket = window.io(API_ROOT, {
            path: '/soket/bug-catcher',
            query: `token=${localStorage.token}`
        });
        
        this.socket.on('add-bug',bug => {
            addBugItem(bug)
        })

    }

    componentWillUnmount = () => {
        this.socket.close();
    }

    render() {
        return (
            <Container fluid>
                <div className="mb-3 text-lligt"><i className="mdi mdi-bug"></i> <a href="javascript:void(0)">Bug Catcher</a> / Bug List</div>
                <BugList />
            </Container>
        )
    }
}


const mapStateToProps = ({ }) => ({
})

const mapDispatchToProps = dispatch => ({
    updateBugList: payload => dispatch({
        type: UPDATE_BUG_LIST, payload
    }),
    
    addBugItem: payload => dispatch({
        type: ADD_BUG_ITEM, payload
    }),

})

export default connect(mapStateToProps, mapDispatchToProps)(BugCatcher);