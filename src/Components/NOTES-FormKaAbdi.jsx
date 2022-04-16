import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <fieldset>
                    <legend>{this.props.title}</legend>
                    <input type="text" ref="inValue" onChange={this.props.handleInput} />
                    <button type='button' onClick={this.props.btnSubmit}>Submit</button>
                </fieldset>
            </div>
        )
    }
}

export default Form;