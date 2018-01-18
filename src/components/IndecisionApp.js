import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
    // set default state
    state = {
        options: [],
        selectedOption: undefined
    };

    // method responsible for wiping the whole options array
    handleDeleteOptions = () => {
        /*
        // wipe the options array
        this.setState(() => {
            return {
                options: []
            };
        });
        */
        // more simplified setState that implicitly returns an object
        // wipe the options array
        this.setState(() => ({ options: [] }));
    };

    // method responsible for clearning selectedOption state
    handleClearSelectedOption = () => {
        this.setState({ selectedOption: undefined });
    };

    // method responsible for wiping picked option from the array
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option)=> {
                // do not keep this item in an array (false)
                return optionToRemove !== option;
            })
        }));
    };

    // method responsible for picking an option
    handlePick = () => {
        // pick a random option from options array
        const randNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randNum];
        // print the picked option to the screen
        this.setState({ selectedOption: option });
    };

    // method responsible for addin an option to optons array
    handleAddOption = (option) => {
        // add validation
        // if there is empty string added...
        if(!option){
            //...print this message
            return 'Enter valid value to add item';
        }
        // check if passed in option already exists
        else if(this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

        // !!!!!!!!!!!!!!!!!!!!!! concat() method //
        // merge two arrays(concat) and return a new array that contains all of the elements from both arrays
        this.setState((prevState) => ({ options: prevState.options.concat([option]) }));
    };

    // fetching data
    componentDidMount() {
        // chack if the JSON data is valid
        try {
            // grab and store stringified options array
            const json = localStorage.getItem('options');
            // convert stringified options array into normal JS object
            const options = JSON.parse(json);

            if(options){
                // show it up to the screen once again after refresh of a page
                this.setState(() => ({
                    options: options
                }));
            }
        
            console.log('fetching data');

        } 
        catch (e) {
            // Do nothing at all
        }
    }

    // saving data
    componentDidUpdate(prevProps, prevState) {
        // save data only when length of the array changed
        if(prevState.options.length !== this.state.options.length){
            // return string representation of options array and store the data
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
            console.log('saving data');
        }
    }

    // render components
    render() {
        
        const subtitle = "Put your life in the hands of a computer";

        return (
            <div>
                {/* nesting components */}
                {/* pass in the data that will be used inside Header class component*/}
                <Header subtitle={subtitle}/>
                <div className="container">
                    {/* pass in boolean props to check if there is anyhing in an array, as well as
                    hanldePick function to pick randomly and item from an array */}
                    <Action handlePick={this.handlePick} hasOptions={this.state.options.length > 0} />
                    <div className="widget">
                        <Options options={this.state.options}
                        handleDeleteOptions={this.handleDeleteOptions}
                        handleDeleteOption={this.handleDeleteOption}
                        />
                        {/* pass in handleAddOption prop to this component */}
                        <AddOption handleAddOption={this.handleAddOption}/>
                    </div>  
                </div>
                <OptionModal handleClearSelectedOption={this.handleClearSelectedOption} selectedOption={this.state.selectedOption}/>
            </div>
        );
    }
}

export default IndecisionApp;