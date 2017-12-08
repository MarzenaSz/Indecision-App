// PARENT component
class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        // set default state
        this.state = {
            options: ["Thing one", "Thing two", "Thing Six"]
        };
    }

    handleDeleteOptions() {
        // wipe the options array
        this.setState(() => {
            return {
                options: []
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
                {/* pass in boolean props to check if there is anyhing in an array */}
                <Action hasOptions={this.state.options.length > 0} />
                <Options options={this.state.options}
                handleDeleteOptions={this.handleDeleteOptions}
                />
                <AddOption /> 
            </div>
        );
    }
}

class Header extends React.Component {
    
    render() {
        return (
            <div>
                {/* use the data (props) */}
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        );

    }
}

class Action extends React.Component {
    handlePick() {
        alert("handlePick");
    }

    render() {
        return (
            <div>
                <button onClick={this.handlePick} 
                // flip the boolean 
                disabled={!this.props.hasOptions}>
                    What should I do?
                </button>
            </div>
        );
    }
}

class Options extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.handleDeleteOptions}>Remove All</button>
                {/* create new instance of Option for each item in an array */}
                {this.props.options.map((option, i) => <Option key={`option_${i + 1}`} optionText={option}/>)}
            </div>
        );
    }
}

class Option extends React.Component {
    render() {
        return (
            <div>
                <p>Option: {this.props.optionText}</p>
            </div>
        );
    }
}

class AddOption extends React.Component {
    handleAddOption(e) {
        // prevent the full page refresh on submit
        e.preventDefault();

        // check if there is any value typed in and remove any trailing spaces (trim())
        const option = e.target.elements.option.value.trim();

        if(option)
        {
            alert(option);
        }
    }

    render() {
        return (
            <div>
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