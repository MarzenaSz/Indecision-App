class Counter extends React.Component {
    //set up binding for out three methods
    constructor(props){
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
        // set up state 
        this.state = {
            // pass in props info for count ( in this case default value has been set up below this class )
            count: 0
        };
    }

    // fetching data
    componentDidMount() {
        // grab the data from local storage and store it in locCount variable
        const locCount = localStorage.getItem('count');
        // change string into int
        const count = parseInt(locCount, 10);
        // check if count is actually a number
        if(!isNaN(count)) {
            // rerender data
            this.setState(() => ({
                count: count
            }))
            // testing
            console.log('fetching...');
        } 
    }

    // saving data
    componentDidUpdate(prevProps, prevState) {
        // check if previous state and current state are different
        if(prevState.count !== this.state.count){
            // ...then store the new value
            localStorage.setItem('count', this.state.count);
            // testing
            console.log('saving...');
            console.log(`previous state: ${prevState.count}`);
            console.log(`current state: ${this.state.count}`);
        }
        
    }

    handleAddOne() {
        //update count state on click
        this.setState((prevState)=> {
            return {
                // increment count by 1 and automaticaly rerender data
                count: prevState.count + 1
            };
        });
    }

    handleMinusOne() {
        //update count state on click
        this.setState((prevState)=> {
            return {
                // decrease count by 1 and automaticaly rerender data
                count: prevState.count - 1
            };
        });
    }

    handleReset() {
        //update count state on click
        this.setState(() => {
            return {
                // reset data back to zero
                count: 0
            };
        });
    }
    render(){
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>reset</button>
            </div>
        );
    }
}

//render UI
ReactDOM.render(<Counter />, document.getElementById('app'));