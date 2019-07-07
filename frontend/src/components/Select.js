import React from 'react';
import Async from 'react-select/async';

const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
        callback([
            { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
            { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
            { value: 'purple', label: 'Purple', color: '#5243AA' },
        ]);
    }, 1000);
};

const Select = props => {
    return (
        <Async
            loadOptions={loadOptions}
            defaultOptions
        />
    )
}

export default Select;