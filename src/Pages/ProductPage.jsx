import React, { useState } from "react";
import Axios from "axios";
import { Card, CardBody, CardImg, CardTitle } from "reactstrap";
import { API_URL } from '../helper';

const ProductPage = (props) => {

    const [dbProducts, setDbProducts] = useState([])

    React.useEffect(() => {
        getProduct();
    }, [])

    const getProduct = () => {
        Axios.get(`${API_URL}/products`)
            .then((response) => {
                console.log("isi dbProduct", response.data)
                setDbProducts(response.data)
            }).catch((error) => {
                console.log(error);
            })
    }

    const printProducts = () => {
        return dbProducts.map((value, index) => {
            return <div key={value.id} className="col-12 col-md-6 col-lg-4 p-2">
                <Card className="border-0 bg-transparent">
                    <CardImg
                        className='shadow'
                        style={{ borderRadius: "15px" }}
                        src={value.images[0]}
                    />
                    <CardBody>
                        <h6 className="fw-bold text-center my-0">
                            {value.nama}
                        </h6>
                        <p className='text-muted text-center my-0'>{value.kategori}</p>
                        <h4
                            className="fw-bold text-center"
                            style={{ color: "#9E887E" }}
                        >
                            IDR. {value.harga.toLocaleString()}
                        </h4>
                    </CardBody>
                </Card>
            </div>
        })
    }

    return (
        <div>
            <div className="container py-3">
                <div className="row">
                    <div className="col-12 col-md-3">
                        <h5>
                            Filter
                        </h5>
                    </div>
                    <div className="col-12 col-md-9">
                        <div className="row">
                            {printProducts()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;