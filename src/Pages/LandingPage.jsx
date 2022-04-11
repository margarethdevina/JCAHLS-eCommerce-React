import React from 'react'; // untuk mengaktifkan library react
import Form from '../Components/Form';
import Banner from '../Components/Banner';
import Cards from '../Components/Cards';

class LandingPage extends React.Component { 
    constructor(props) { 
        console.log("cek urutan render 1 constructor")
        super(props);
        this.state={}

    }

    componentDidMount() {
        
    }


    render() {
        console.log("cek urutan render 2 render function")


        return (
            <div>

                <Banner />

                <Cards />

            </div>
        )
    }
}

export default LandingPage;