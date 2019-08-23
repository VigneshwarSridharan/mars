import React from 'react';

const Preloader = (
    <div className="preloader">
        <img className="m-auto" src={'./assets/images/logo.png'} alt="" />
    </div>
)

const avatar = option => {
    let defaultOption = {
        'name': '',
        'font-size': 0.5,
        'bold': true,
        'color': 'ffffff',
        'background': '6f35ed',
        'length': 1,
        'uppercase': true,
        'rounded': true,
        'size': 40
    }
    if (typeof option == 'string') {
        let [name] = option;
        defaultOption.name = name;
        option = defaultOption;
    }
    else {
        option = {
            ...defaultOption,
            ...option
        }
    }
    let query = Object.keys(option).map(key => `${key}=${option[key]}`).join('&')
    return `https://ui-avatars.com/api/?${query}`
}

export {
    Preloader,
    avatar
}