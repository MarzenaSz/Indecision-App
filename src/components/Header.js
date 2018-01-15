import React from 'react';

const Header = (props) => (
    <div className="header">
        {/* use the data (props) */}
        <h1 className='header__title'>{props.title}</h1>
        {/* show the subtitle only when a title is provided */}
        {props.title && <h2 className='header__subtitle'>{props.subtitle}</h2>}
    </div>
);

// set default prop for the title
Header.defaultProps = {
    title: 'Indecision App'
};

export default Header;