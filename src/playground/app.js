// PARENT component
class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        // bind the functions
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        // set default state
        this.state = {
            options: []
        };
    }

    // fetching data
    componentDidMount() {
        // chack if the JSON data is valid
        try {
            // grab and store stringified options array
            const json = JSON.getItem('options');
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

    // method responsible for wiping the whole options array
    handleDeleteOptions() {
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
    }

    // method responsible for wiping picked option from the array
    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option)=> {
                // do not keep this item in an array (false)
                return optionToRemove !== option;
            })
        }));
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

        // !!!!!!!!!!!!!!!!!!!!!! concat() method //
        // merge two arrays(concat) and return a new array that contains all of the elements from both arrays
        this.setState((prevState) => ({ options: prevState.options.concat([option]) }));
    }

    // render components
    render() {
        const subtitle = "Put your life in the hands of a computer";

        return (
            <div>
                {/* nesting components */}
                {/* pass in the data that will be used inside Header class component*/}
                <Header subtitle={subtitle}/>
                {/* pass in boolean props to check if there is anyhing in an array, as well as
                 hanldePick function to pick randomly and item from an array */}
                <Action handlePick={this.handlePick} hasOptions={this.state.options.length > 0} />
                <Options options={this.state.options}
                handleDeleteOptions={this.handleDeleteOptions}
                handleDeleteOption={this.handleDeleteOption}
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
            {/* show the subtitle only when a title is provided */}
            {props.title && <h2>{props.subtitle}</h2>}
        </div>
    );
}

// set default prop for the title
Header.defaultProps = {
    title: 'Indecision App'
};

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
}

const Option = (props) => {
    return (
        <div>
            <p>Option: {props.optionText}</p>
            <button onClick={(e) => { 
                props.handleDeleteOption(props.optionText);
            }}>remove</button>
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
        this.setState(() => ({ error /*or you can set it up this way: error: error */}));

        // if there was no error, clear the ipnut
        if(!error){
            e.target.elements.option.value = '';
        }
        
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
ReactDOM.render(<IndecisionApp options={['do shopping (default)', 'clean the kitchen (default)']}/>, document.getElementById('app'));