import React from 'react';

class AddOption extends React.Component {
    // set default state
    state = {
        error: undefined
    };

    handleAddOption = (e) => {
        // prevent the full page refresh on submit
        e.preventDefault();

        // check if there is any value typed in and remove any trailing spaces (trim())
        const option = e.target.elements.option.value.trim();

         // (log data)...pass in option as an argument inside of handleAddOption method.
        const error = this.props.handleAddOption(option);

        // update data and rerender it
        this.setState(() => ({ error /*or you can set it up this way: error: error */}));

        // if there was no error, clear the ipnut
        if(!error){
            e.target.elements.option.value = '';
        }
        
    };

    render() {
        return (
            <div>
                {/* print error message if there is any*/}
                {this.state.error && <p className="add-option-error">{this.state.error}</p>}
                <form className="add-option" onSubmit={this.handleAddOption}>
                    <input className="add-option__input" type="text" name="option" />
                    <button className="button">Add Option</button>
                </form>
            </div>
        );
    }
}

export default AddOption;