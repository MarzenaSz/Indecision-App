import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';
import 'normalize.css/normalize.css';
import './styles/style.scss';

// render Indecision App component
ReactDOM.render(<IndecisionApp options={['do shopping (default)', 'clean the kitchen (default)']}/>, document.getElementById('app'));