import React from 'react';
import Axios from 'axios';
import { Card, CardBody, CardImg, CardTitle } from 'reactstrap';

const API_URL = "http://localhost:5000";

const ProductsPage = (props) => {

    const [dbProducts, setDbProducts] = React.useState([])

    React.useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        Axios.get(`${API_URL}/products`)
            .then((response) => {
                // jika berhasil mendapatkan response
                console.log("From Component :", response.data);
                setDbProducts(response.data)
            }).catch((error) => {
                // jika tidak berhasil mendapatkan response
                console.log(error);
            })
    }

    const printProducts = () => {
        return dbProducts.map((value, index) => {
            return <div key={value.id} className="col-12 col-md-6 col-lg-4 p-2">
                <Card className='border-0 shadow-sm'>
                    <CardImg src={value.images[0]} />
                    <CardBody>
                        <h6 className='fw-bold'>{value.nama}</h6>
                        <h5 className='fw-bold' style={{ textAlign: "right", color: "#00a8ff" }}>IDR. {value.harga.toLocaleString()}</h5>
                    </CardBody>
                </Card>
            </div>
        })
    }

    return (
        <div>
            <div className='container py-3 my-2 my-md-4'>
                <div className='row'>
                    <div className='col-12 col-md-3'>
                        <h5>Filter</h5>
                    </div>
                    <div className='col-12 col-md-9'>
                        <div className='row'>
                            {printProducts()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsPage;