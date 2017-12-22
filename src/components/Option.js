import React from 'react';

const Option = (props) => {
    return (
        <div>
            <p>Option: {props.optionText}</p>
            <button onClick={(e) => { props.handleDeleteOption(props.optionText); }}>remove</button>
        </div>
    );
}

export default Option;