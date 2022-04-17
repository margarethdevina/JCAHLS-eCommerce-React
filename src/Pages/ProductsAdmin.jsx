import React from "react";
import Axios from 'axios';
import { API_URL } from '../helper';
import { Button } from "reactstrap";
import ModalDetail from "../Components/ModalDetail";

const ProductsAdmin = (props) => {

    const [dbProducts, setDbProducts] = React.useState([]);

    const [openDetail, setOpenDetail] = React.useState(false);

    const [selectedIdx, setSelectedIdx] = React.useState(null);

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
            let stocks = value.stock
            let totalStocks = 0;
            stocks.forEach(stocksval => totalStocks += stocksval.qty)

            return <tr key={value.id} className="align-middle">
                <td className="fw-bold">{index + 1}</td>
                {/* untuk ngepring index + 1 bisa diapit pakai <th></th> juga karena elemen <th> otomatis ada style fw-bold nya plus 1 kolom & baris ini cuma berisi 1 macam data aja yg mau ditampilkan alas si index+1 itu */}
                <td>
                    <img
                        alt={`${value.id}-${value.nama}`}
                        src={value.images[0]}
                        width="150px"
                    />
                </td>
                <td>
                    <span className="fw-bold">{value.nama}</span>
                    <br />
                    <span className='text-muted'>{value.kategori}</span>
                </td>
                <td>{totalStocks.toLocaleString()}</td>
                <td>IDR {value.harga.toLocaleString()}</td>
                <td>
                    <Button
                        type="button"
                        outline
                        color="info"
                        className="w-100 my-2"
                        onClick={() => handleDetail(index)}>
                        Detail
                    </Button>
                    <Button
                        type="button"
                        outline
                        color="warning"
                        className="w-100 my-2"
                        onClick={() => handleDelete(value.id)}>
                        Delete
                    </Button>
                </td>
            </tr>

        })
    }

    const handleDelete = (id) => {
        // 1. Menghapus data pada server berdasarkan parameter id data
        Axios.delete(`${API_URL}/products/${id}`)
            .then((response) => {
                // 2. Jika berhasil, get ulang data
                getProducts();
                // getProducts() dipanggil biar ga ketik ulang Axios.get bla bla lagi
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleDetail = (idx) => {
        setSelectedIdx(idx);
        setOpenDetail(!openDetail);
    }

    const handleToogle = () => {
        setSelectedIdx(null);
        setOpenDetail(!openDetail);
    }


    return (
        <div className="container py-4">
            <h3>Products Admin</h3>

            {
                selectedIdx >= 0 && selectedIdx != null ?
                    <ModalDetail
                        openDetail={openDetail}
                        toggle={handleToogle}
                        data={dbProducts[selectedIdx]}
                    />
                    :
                    null
            }

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