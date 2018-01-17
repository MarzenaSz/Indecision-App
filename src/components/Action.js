import React from 'react';

const Action = (props) => (
    <div>
        <button className="big-button" onClick={props.handlePick} 
        // flip the boolean 
        disabled={!props.hasOptions}>
            What should I do?
        </button>
    </div>
);

export default Action;