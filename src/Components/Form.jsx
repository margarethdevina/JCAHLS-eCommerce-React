import React from 'react'

class Form extends React.Component {
    // disisi child compoenent harus ada constructor props ini supaya bisa panggil atribut dr parent component nya
    constructor(props) {
        super(props);

    }

    btnSubmit = () => {
        // tidak membuat temporary karena asal data dari input bukan dari value properti state
        console.log(this.refs.inValue.value);
        this.setState({
            input: this.refs.inValue.value
        })
    }


    render() {
        return (
            <div>
                <fieldset>
                    {/* this.props.title untuk panggil atribut title dari LandingPage */}
                    <legend>{this.props.title}</legend>
                    <input type="text" ref="inValue" onChange={this.props.handleInput} />
                    <button type="button" onClick={this.btnSubmit}>Submit</button>
                    {/* <h1>{this.props.usia}</h1> */}
                </fieldset>
            </div>
        )
    }
}


export default Form;