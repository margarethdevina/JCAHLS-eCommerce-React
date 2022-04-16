import React from "react";
import Axios from 'axios';
import { API_URL } from '../helper';
import { Button } from "reactstrap";

const ProductsAdmin = (props) => {

    const [dbProducts, setDbProducts] = React.useState([]);

    React.useEffect(() => {
        getProducts()
    }, [])

    const getProducts = () => {
        Axios.get(`${API_URL}/products`)
            .then((response) => {
                console.log(response.data)
                setDbProducts(response.data);
            }).catch((error) => {
                console.log(error);
            })
    }

    const printProducts = () => {
        return dbProducts.map((value, index) => {
            let totalStocks = 0;
            value.stock.forEach(val => totalStocks += val.qty)

            // atau cara lainnya memakai forloop
            // for (i=0;i<value.stock.length;i++){
            //     totalStocks += value.stock[i].qty
            // }

            return <tr key={value.id} className="align-middle">
                <th>{index + 1}</th>
                <td>
                    <img
                        alt={`${value.id}-${value.nama}`}
                        width="150px"
                        src={value.images[0]}
                    />
                </td>
                <td>
                    <h5 className="fw-bold">{value.nama}</h5>
                    <p className="text-muted">{value.kategori}</p>
                </td>
                <td>{totalStocks.toLocaleString()}</td>
                <td>IDR. {value.harga.toLocaleString()}</td>
                <td>
                    <Button
                        type="button"
                        outline
                        color="info"
                        className="w-100 my-2">
                        Detail
                    </Button>
                    <Button
                        type="button"
                        outline
                        color="warning"
                        className="w-100 my-2">
                        Delete
                    </Button>
                </td>
            </tr>
        })
    }

    return (
        <div className="container py-4">
            <h3>Products Admin</h3>
            <div className="row">
                <div className="col-3">

                </div>
                <div className="col-9">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Products</th>
                                <th>Name</th>
                                <th>Stocks</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {printProducts()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductsAdmin;