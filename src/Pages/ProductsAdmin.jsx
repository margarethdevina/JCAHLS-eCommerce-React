import React from "react";
import Axios from 'axios';
import { API_URL } from '../helper';
import { Button, Input, FormGroup, Label, ButtonGroup } from "reactstrap";
import ModalDetail from "../Components/ModalDetail";
import { useDispatch, useSelector } from 'react-redux';
import { getProductsAction } from '../redux/actions/productsAction';

const ProductsAdmin = (props) => {

    const dispatch = useDispatch();

    const [dbProducts, setDbProducts] = React.useState([]);
    const [openDetail, setOpenDetail] = React.useState(false);
    const [selectedIdx, setSelectedIdx] = React.useState(null);
    const [paginate, setPaginate] = React.useState(1);
    const [limit, setLimit] = React.useState(5);
    const [productsLength, setProductsLength] = React.useState(0);
    const [filterName, setFilterName] = React.useState("");
    const [filterMin, setFilterMin] = React.useState("");
    const [filterMax, setFilterMax] = React.useState("");
    const [orderData, setOrderData] = React.useState("null");

    const { products } = useSelector((state) => {
        return {
            products: state.productsReducer.products
        }
    })

    React.useEffect(() => {
        getProducts();
        getAllProducts();
    }, [])

    const getProducts = (page = 1) => {
        Axios.get(`${API_URL}/products?_page=${page}&_limit=${limit}`)
            .then((response) => {
                console.log(response.data)
                setPaginate(page)
                dispatch(getProductsAction(response.data));
            }).catch((error) => {
                console.log(error);
            })
    }

    const getAllProducts = () => {
        Axios.get(`${API_URL}/products`)
            .then((response) => {
                console.log(response.data)
                setProductsLength(response.data.length);
            }).catch((error) => {
                console.log(error);
            })
    }

    // CARA 1 -- Kurang tepat
    // const getProductsPagination = (page) => {
    //     Axios.get(`${API_URL}/products?_page=${page}&_limit=5`)
    //         .then((response) => {
    //             // console.log(response.data)
    //             // setDbProducts(response.data);
    //             dispatch(getProductsAction(response.data));
    //         }).catch((error) => {
    //             console.log(error);
    //         })
    // }

    const handlePaginate = (paginate) => {
        getProducts(paginate);
    }

    const printBtPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(productsLength / limit); i++) {
            btn.push(<Button
                outline
                color="primary"
                onClick={() => handlePaginate(i + 1)}
            >
                {i + 1}
            </Button>)
        }
        return btn;
    }

    const printProducts = () => {
        return products.map((value, index) => {
            let stocks = value.stock
            let totalStocks = 0;
            stocks.forEach(stocksval => totalStocks += stocksval.qty)

            return <tr key={value.id} className="align-middle">
                <td className="fw-bold">{paginate > 1 ? (paginate - 1) * limit + index + 1 : index + 1}</td>
                {/* untuk ngeprint index + 1 bisa diapit pakai <th></th> juga karena elemen <th> otomatis ada style fw-bold nya plus 1 kolom & baris ini cuma berisi 1 macam data aja yg mau ditampilkan alas si index+1 itu */}
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

    const handleReset = () => {
        getProducts();
        setFilterName("");
        setFilterMin("");
        setFilterMax("");
        setOrderData("null")
    }

    const handleFilter = async () => {
        try {
            let filterQuery = "?";
            if (filterName) {
                if (filterMax > 0 && filterMin > 0) {
                    // kondisi jika form nama dan harga terisi
                    filterQuery += `nama=${filterName}&harga_gte=${filterMin}&harga_lte=${filterMax}`;
                } else {
                    // kondisi jika form nama saja yang terisi
                    filterQuery += `nama=${filterName}`;
                }
            } else if (filterMax > 0 && filterMin > 0) {
                filterQuery += `harga_gte=${filterMin}&harga_lte=${filterMax}`;
            }

            let response = await Axios.get(`${API_URL}/products${filterQuery}`)

            dispatch(getProductsAction(response.data))

        } catch (error) {
            console.log(error)
        }
    }

    const handleSort = (e) => {
        console.log(e.target.value)

        if (e.target.value != "null") {
            setOrderData(e.target.value)
            let property = e.target.value.split("-")[0];
            let order = e.target.value.split("-")[1];
            Axios.get(`${API_URL}/products?_sort=${property}&_order=${order}`)
                .then((res) => {
                    console.log(res.data);
                    dispatch(getProductsAction(res.data))
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    return (
        <div className="container py-4">
            <h3>Products Admin</h3>

            {
                selectedIdx >= 0 && selectedIdx != null ?
                    <ModalDetail
                        openDetail={openDetail}
                        toggle={handleToogle}
                        data={products[selectedIdx]}
                    />
                    :
                    null
            }

            <div className="row">
                <div className="col-3">
                    <h5 style={{ color: "#4A505E" }}>Filter</h5>
                    <div className='row' style={{ justifyContent: "space-around" }}>
                        <FormGroup>
                            <Label>Nama</Label>
                            <Input type="text" value={filterName} id="text" onChange={(e) => setFilterName(e.target.value)} placeholder="Cari produk" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Harga</Label>
                            <div className="d-flex">
                                <Input type="number" id="numb1" value={filterMin} onChange={(e) => setFilterMin(e.target.value)} placeholder="Minimum" />
                                <Input type="number" id="numb2" value={filterMax} onChange={(e) => setFilterMax(e.target.value)} placeholder="Maksimum" />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label>Sort</Label>
                            <Input type="select" style={{ width: "250px" }} value={orderData} onChange={handleSort}>
                                <option value="null">Pilih order</option>
                                <option value="harga-asc">Harga Asc</option>
                                <option value="harga-desc">Harga Desc</option>
                                <option value="nama-asc">A-Z</option>
                                <option value="nama-desc">Z-A</option>
                            </Input>
                        </FormGroup>

                    </div>
                    <div className="pt-2" style={{ textAlign: "end" }}>
                        <Button outline color="warning" type='button' onClick={handleReset} >Reset</Button>
                        <Button type='button'
                            style={{ marginLeft: 16 }}
                            color="primary" onClick={handleFilter}>
                            Filter
                        </Button>
                    </div>

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

                    <ButtonGroup>
                        {
                            printBtPagination()
                        }
                    </ButtonGroup>


                    {/* CARA 1 -- berhasil tapi tidak tepat */}
                    {/* <Pagination>
                        <PaginationItem>
                            <PaginationLink onClick={()=>getProductsPagination(1)}>
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={()=>getProductsPagination(2)}>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={()=>getProductsPagination(3)}>
                                3
                            </PaginationLink>
                        </PaginationItem>
                    </Pagination> */}

                </div>
            </div>
        </div>
    )
}

export default ProductsAdmin;