import React from 'react';
import Option from './Option';
import { debug } from 'util';

const Options = (props) => (
    <div>
        <button onClick={props.handleDeleteOptions}>Remove All</button>
        {/* show the message when there are no options */}
        {props.options.length === 0 && <p>Please add an option to get started</p>}
        {/* create new instance of Option for each item in an array */}
        {props.options.map((option, i) => (
            <Option key={`option_${i + 1}`} 
            optionText={option}
            handleDeleteOption={props.handleDeleteOption}
            />
        ))}
    </div>
);

export default Options;
