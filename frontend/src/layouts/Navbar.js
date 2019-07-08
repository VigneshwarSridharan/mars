import React from 'react';
import '../assets/sass/navbar.scss';

let icons = [
    'mdi mdi-magnify',
    'mdi mdi-comment-processing-outline',
    'mdi mdi-bell',
]

const Navbar = () => {
    return (
        <div className="main-navigation">
            <div className="navigations">
                {
                    icons.map((icon, inx) => {
                        return (
                            <div className="item" key={window.uid()}>
                                <i className={icon} />
                            </div>
                        )
                    })
                }
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

export default Navbar;