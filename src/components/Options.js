import React from 'react';
import Option from './Option';
import { debug } from 'util';

const Options = (props) => (
    <div>
        <div className="widget-header">
            <h3 className="widget-header__title">Your Options:</h3>
            <button className="button button--link" onClick={props.handleDeleteOptions}>Remove All</button>
        </div>
        {/* show the message when there are no options */}
        {props.options.length === 0 && <p className="widget__message">Please add an option to get started!</p>}
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
