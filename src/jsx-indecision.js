

// create app object that will hold information about indecision app
const app = {
    title: "Indecision App",
    subtitle: "Put your life in the hands of a computer",
    options: []
};

const onFormSubmit = (e) => {
    {/*prevent default behaviour of refreshing the whole page after submiting the data*/}
        e.preventDefault();

    {/* get the value that user typed in.
        "e.target - an element that the event started on" */}
        const option = e.target.elements.option.value;

    {/* check of there is any input */}
        if(option){
            {/* push the option into our options array inside of app object */}
            app.options.push(option);

            {/* clear the input */}
            e.target.elements.option.value = '';

            {/* rerender data that has been changed */}
            render();
        }
};

const onRemoveAll = () => {
    // clear out the whole array
    app.options = [];
    // rerender data
    render();
};

const onMakeDecision = () => {
    // store a random number between 0 and exact number of items in an array
    const randNum = Math.floor(Math.random() * app.options.length);
    // sore a random item
    const option = app.options[randNum];
    // display the option
    alert(option);
};

const render = () => {

    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? "Here are your options: " : "No options!"}</p>
            {/* disable the button when there are no options added by the user */}
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
            <button onClick={onRemoveAll}>Remove All</button>
            <ol>
                {
                    // render and set individual key for each item from options array
                    app.options.map((option) => {
                        return <li key={option}>{option}</li>;
                    })
                }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option" />
                <button>Add Option</button>
            </form>
        </div> 
    );
        // render information to the screen
        ReactDOM.render(template, document.getElementById('app'));
};

{/* call initial application */}
render();