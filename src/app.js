// PARENT component
class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        // bind the functions
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        // set default state
        this.state = {
            options: []
        };
    }

    // method responsible for wiping the whole options array
    handleDeleteOptions() {
        // wipe the options array
        this.setState(() => {
            return {
                options: []
            };
        });
    }

    // method responsible for picking an option
    handlePick(){
        // pick a random option from options array
        const randNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randNum];
        // print the picked option to the screen
        alert(option);

    }

    // method responsible for addin an option to optons array
    handleAddOption(option){
        // add validation
        // if there is empty string added...
        if(!option){
            //...print this message
            return 'Enter valid value to add item';
        }
        // check if passed in option already exists
        else if(this.state.options.indexOf(option) > -1){
            return 'This option already exists';
        }

        // otherwise make a change and rerender data
        this.setState((prevState) => {
            return {
                // !!!!!!!!!!!!!!!!!!!!!! contact() method //
                // merge two arrays(concat) and return a new array that contains all of the elements from both arrays
                options: prevState.options.concat([option])
            };
        });
    }

    // render components
    render() {
        const title = "Indecision App";
        const subtitle = "Put your life in the hands of a computer";

        return (
            <div>
                {/* nesting components */}
                {/* pass in the data that will be used inside Header class component*/}
                <Header title={title} subtitle={subtitle}/>
                {/* pass in boolean props to check if there is anyhing in an array, as well as
                 hanldePick function to pick randomly and item from an array */}
                <Action handlePick={this.handlePick} hasOptions={this.state.options.length > 0} />
                <Options options={this.state.options}
                handleDeleteOptions={this.handleDeleteOptions}
                />
                {/* pass in handleAddOption prop to this component */}
                <AddOption handleAddOption={this.handleAddOption}/> 
            </div>
        );
    }
}

const Header = (props) => {
    return (
        <div>
            {/* use the data (props) */}
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );
}

const Action = (props) => {
    return (
        <div>
            <button onClick={props.handlePick} 
            // flip the boolean 
            disabled={!props.hasOptions}>
                What should I do?
            </button>
        </div>
    );
}

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {/* create new instance of Option for each item in an array */}
            {props.options.map((option, i) => <Option key={`option_${i + 1}`} optionText={option}/>)}
        </div>
    );
}

const Option = (props) => {
    return (
        <div>
            <p>Option: {props.optionText}</p>
        </div>
    );
}

class AddOption extends React.Component {
    constructor(props){
        super(props);
        // bind handleAddOption method so we can use "this" inside it
        this.handleAddOption = this.handleAddOption.bind(this);
        // set default state
        this.state = {
            error: undefined
        };
    }
    
    handleAddOption(e) {
        // prevent the full page refresh on submit
        e.preventDefault();

        // check if there is any value typed in and remove any trailing spaces (trim())
        const option = e.target.elements.option.value.trim();

         // (log data)...pass in option as an argument inside of handleAddOption method. (!Rebind!)
        const error = this.props.handleAddOption(option);

        // update data and rerender it
        this.setState(() => {
            return {
                error //or you can set it up this way: error: error
            };
        });
    }

    render() {
        return (
            <div>
                {/* print error message if there is any*/}
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

// render PARENT component
ReactDOM.render(<IndecisionApp />, document.getElementById('app'));