import React from 'react';
import '../assets/sass/sidebar.scss';
import { Trail } from 'react-spring/renderprops';
import { Scrollbars } from 'react-custom-scrollbars';
import routes from '../router';
import { NavLink } from 'react-router-dom';


const Sidebar = () => {
    let { userDetails = {} } = localStorage
    userDetails = JSON.parse(userDetails);
    let navData = routes.filter(({ display = true }) => display)
    return (
        <div className="sidebar shadow-lg">
            <div className="brand">
                <img src="/assets/images/logo.png" alt="" />
            </div>
            <Scrollbars>
                <div className="navigation">

                    <Trail
                        items={navData}
                        keys={() => window.uid()}
                        from={{
                            transform: 'scale(0.5)',
                            opacity: 0
                        }}
                        to={{
                            transform: 'scale(1)',
                            opacity: 1
                        }}
                    >
                        {(item) => props => {
                            let className = `main-nav`;
                            let { icon, name, path } = item;
                            let isActive = (val = {}) => {
                                let { url = "" } = val || {};
                                if(url == '/' || url == '') {
                                    return window.location.pathname == url
                                }
                                else {
                                    return window.location.pathname.includes(url)
                                }
                            }
                            return (
                                <NavLink
                                    to={path}
                                    activeClassName={"active"}
                                    isActive={isActive}
                                    style={props}
                                    className={className}
                                >
                                    <div className="icon">
                                        <i className={icon} />
                                    </div>
                                    <span>{name}</span>
                                </NavLink>
                            )
                        }}
                    </Trail>
                </div>
            </Scrollbars>
            <div className="user-info-wrapper">
                <div className="user-info">
                    <img className="profile-pic" src="/assets/images/profile.jpg" alt="" />
                    <div className="ml-2 w-100">
                        <div className="text-capitalize"><b>{userDetails.first_name} {userDetails.last_name}</b></div>
                        <div><span className="dot bg-success"></span> <small>Active</small></div>
                    </div>
                    <h5 className="m-0">
                        <i className="mdi mdi-chevron-right"></i>
                    </h5>
                </div>

            </div>
        </div>
    )
}

export default Sidebar;