import React from 'react';
import { connect } from 'react-redux';
import '../assets/sass/navbar.scss';
import { TOGGLE_CHATTING } from '../views/Chatting/constants';

const Navbar = (props) => {
    let { chatingIsOpen } = props;

    // Actions
    let { toggleChating } = props;
    return (
        <div className="main-navigation">
            <div className="navigations">
                <div className="item">
                    <i className="mdi mdi-magnify" />
                </div>
                <div className={`item ${chatingIsOpen ? 'active' : ''}`} onClick={toggleChating}>
                    <i className="mdi mdi-comment-processing-outline" />
                </div>
                <div className="item">
                    <i className="mdi mdi-bell" />
                </div>
                <div className="item" onClick={() => {
                    localStorage.clear();
                    window.location = '/';
                }}>
                    <i className="mdi mdi-power" />
                </div>
            </div>
        </div>
    )
}



const mapStateToProps = ({ Chatting }) => ({
    chatingIsOpen: Chatting.isOpen
})

const mapDispatchToProps = dispatch => ({
    toggleChating: () => dispatch({
        type: TOGGLE_CHATTING
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);