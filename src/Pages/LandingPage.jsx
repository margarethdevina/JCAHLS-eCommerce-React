import React from 'react'; // untuk mengaktifkan library react
import Form from '../Components/Form';
import Banner from '../Components/Banner';
import Cards from '../Components/Cards';
import Axios from 'axios';
import { API_URL } from '../helper';

// const API_URL = "http://localhost:5000";

class LandingPage extends React.Component {
    constructor(props) {
        console.log("cek urutan render 1 constructor")
        super(props);
        this.state = {
            dbBanner: [], // diisi array kosong krn data yg mau diambil berbentuk array of object
            dbProducts: []
        }

    }

    componentDidMount() {
        this.getBanner();
        this.getProducts();
        // pakai () karena tidak menggunakan event dan ingin langsung dijalankan saat komponendidmount dijalankan
    }

    getBanner = () => {
        Axios.get(`${API_URL}/banner`)
            // butuh promise sbg asynchronous function krn membutuhkan waktu untuk mendapatkan balasan respon dr backend
            // salah satu fungsi promise adalah .then
            .then((response) => {
                // then berisi data jika berhasil diresponse
                // pasti ambil dari properti.data
                console.log("From class component", response.data);
                this.setState({ dbBanner: response.data });
            }).catch((error) => {
                // jika tidak berhasil diresponse akan dianggap sebagai error
                console.log(error);
            })
    }

    getProducts = () => {
        Axios.get(`${API_URL}/products`)
            .then((response) => {
                console.log(response.data)
                this.setState({ dbProducts: response.data });
            }).catch((error) => {
                console.log(error);
            })
    }

    render() {
        console.log("cek urutan render 2 render function")


        return (
            <div>

                <div style={{ backgroundColor: "#006CCE" }}>
                    <Banner
                        bannerList={this.state.dbBanner}
                    />
                </div>

                <Cards
                    dbProducts={this.state.dbProducts}
                />

            </div>
        )
    }
}

export default LandingPage;