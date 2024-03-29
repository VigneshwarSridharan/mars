import React from 'react';
import { Trail } from 'react-spring/renderprops';
// import PropTypes from 'prop-types';


const Animate = ({ children, ...props }) => {
    if(!Array.isArray(children)) children = [children]
    return (
        <Trail
            items={children}
            {...props}
        >
            {child => style => (<div style={style}>{child}</div>)}
        </Trail>
    )
}

Animate.propTypes = {
    // children: PropTypes.arrayOf(PropTypes.element) || PropTypes.element
}

Animate.defaultProps = {
    children: [],
    from: {
        transform: 'scale(0.8)',
        opacity: 0
    },
    to: {
        transform: 'scale(1)',
        opacity: 1
    },
    keys: () => window.uid()
}



export default Animate