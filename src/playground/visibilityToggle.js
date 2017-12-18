
class VisibilityToggle extends React.Component {
    constructor(props){
        super(props);
        // set binding to have access to our setState
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        // set default state for visibility that we want to track throughout our program
        this.state = {
            visibility: false
        }
    }

    handleToggleVisibility(){
        this.setState((prevState) => {
            return {
                // toggle visibility state
                visibility: !prevState.visibility
            };
        });
    }

    render() {
        return (
            <div>
                <h1>Visibility Toggle</h1>
                {/* fire up onButtonCLick function on click and change the clicked state*/}
                <button onClick={this.handleToggleVisibility}>{this.state.visibility ? "Hide details" : "Show details"}</button>
                {/* show the information when visibility is true*/}
                {this.state.visibility && (<div><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p></div>)}
            </div>
        );
    }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));