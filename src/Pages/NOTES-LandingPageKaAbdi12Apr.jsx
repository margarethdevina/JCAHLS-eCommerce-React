import React from 'react'; // untuk mengaktifkan library react
import Form from '../Components/Form';
import Banner from '../Components/Banner';
import { Button, CardBody } from 'reactstrap';
import Axios from 'axios';

const API_URL = "http://localhost:5000";
/**
 * React Data Management :
 * 1️⃣. state : 
 * - untuk memanage data pada suatu component
 * - kita akan menyimpan data pada state ketika data tersebut mempengaruhi tampilan
 * 2️⃣. props : untuk mengelola data agar dapat digunakan oleh component lain, 
 *             spesifiknya mentransfer data dari parent component ke child component
 * 
 * */

// CLASS COMPONENT
// Initialize component
// let counter = 0;
class LandingPage extends React.Component {
    // Urutan render component 1️⃣ CONSTRUCTOR
    // untuk memanage data yg akan digunakan pada component react
    constructor(props) {
        console.log("1️⃣ Constructor")
        super(props);
        // local data management
        this.state = {
            dbBanner: []
        }
    }

    // Urutan render component 3️⃣ componentDidMount
    // untuk menjalankan fungsi pertama kali ketika component dirender
    componentDidMount() {
        this.getBanner();
    }

    getBanner = () => {
        Axios.get(`${API_URL}/banner`)
            .then((response) => {
                // jika berhasil mendapatkan response
                console.log("From Class COmponent :",response.data);
                this.setState({ dbBanner: response.data })
            }).catch((error) => {
                // jika tidak berhasil mendapatkan response
                console.log(error);
            })
    }

    // Urutan render component 2️⃣ render()
    // mengenerate component html
    render() {
        console.log("2️⃣ Render")
        // destructering state
        const { counter, input } = this.state;
        // return html component
        return (
            <div>
                <Banner bannerList={this.state.dbBanner} />
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-4 text-center'>
                            <CardBody>
                                <img className='rounded-circle' src='https://miro.medium.com/max/598/0*8or0oFmHDRKnlETg' width="180px" />
                                <h3>Category 1</h3>
                                <p>
                                    Some representative placeholder content for the three columns of text below the carousel. This is the first column.
                                </p>
                                <Button color='secondary'>Detail</Button>
                            </CardBody>
                        </div>
                        <div className='col-12 col-md-4 text-center'>
                            <CardBody>
                                <img className='rounded-circle' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYDSSjj7hEq0mET7eL8cjwNWrXhSmW0dWHT2X8UBV-u8wDONeAMBnZ28JNQpSMy3UJu-s&usqp=CAU' width="180px" />
                                <h3>Category 2</h3>
                                <p>
                                    Some representative placeholder content for the three columns of text below the carousel. This is the first column.
                                </p>
                                <Button color='secondary'>Detail</Button>
                            </CardBody>
                        </div>
                        <div className='col-12 col-md-4 text-center'>
                            <CardBody>
                                <img className='rounded-circle' src='https://miro.medium.com/max/598/0*8or0oFmHDRKnlETg' width="180px" />
                                <h3>Category 3</h3>
                                <p>
                                    Some representative placeholder content for the three columns of text below the carousel. This is the first column.
                                </p>
                                <Button color='secondary'>Detail</Button>
                            </CardBody>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        )
    }
}

export default LandingPage;