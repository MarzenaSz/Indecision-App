import React from 'react';

const Header = (props) => {
    return (
        <div>
            {/* use the data (props) */}
            <h1>{props.title}</h1>
            {/* show the subtitle only when a title is provided */}
            {props.title && <h2>{props.subtitle}</h2>}
        </div>
    );
}

// set default prop for the title
Header.defaultProps = {
    title: 'Indecision App'
};

export default Header;