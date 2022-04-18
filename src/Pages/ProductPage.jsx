import React from 'react';
import Axios from 'axios';
import { Card, CardBody, CardImg, FormGroup, Input, Label, Button, Collapse } from 'reactstrap';
import { API_URL } from '../helper';
import { useNavigate } from 'react-router-dom';

const ProductsPage = (props) => {
    const navigate = useNavigate();
    const [dbProducts, setDbProducts] = React.useState([]);
    const [filterName, setFilterName] = React.useState("");
    const [filterMin, setFilterMin] = React.useState("");
    const [filterMax, setFilterMax] = React.useState("");
    const [orderData, setOrderData] = React.useState("null");

    React.useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        Axios.get(`${API_URL}/products`)
            .then((response) => {
                // jika berhasil mendapatkan response
                // console.log("From Component :", response.data);
                setDbProducts(response.data)
            }).catch((error) => {
                // jika tidak berhasil mendapatkan response
                console.log(error);
            })
    }

    const printProducts = () => {
        return dbProducts.map((value, index) => {
            return <div key={value.id} className="col-12 col-md-6 col-lg-4 p-2">
                <Card className='border-0 bg-transparent'>
                    <CardImg
                        onClick={() => navigate(`/product/detail?id=${value.id}`)}

                        // onClick={() => navigate('/product/detail', {
                        //     state: value
                        // })}
                        className='shadow'
                        style={{ borderRadius: "15px" }}
                        src={value.images[0]} />
                    <CardBody>
                        <h6 className='fw-bold text-center my-0'>{value.nama}</h6>
                        <p className='text-muted text-center my-0'>{value.kategori}</p>
                        <h4 className='fw-bold text-center' style={{ color: "#9E887E" }}>
                            IDR. {value.harga.toLocaleString()}
                        </h4>
                    </CardBody>
                </Card>
            </div>
        })
    }

    const handleReset = () => {
        getProducts();
        setFilterName("");
        setFilterMin("");
        setFilterMax("");
        setOrderData("null")
    }

    // console.log(filterMin,filterMax)

    // Cara 1
    // const handleFilter = () => {
    //     let filterQuery = "?";
    //     if (filterName) {
    //         if (filterMax > 0 && filterMin > 0) {
    //             // kondisi jika form nama dan harga terisi
    //             filterQuery += `nama=${filterName}&harga_gte=${filterMin}&harga_lte=${filterMax}`;
    //         } else {
    //             // kondisi jika form nama saja yang terisi
    //             filterQuery += `nama=${filterName}`;
    //         }
    //     } else if (filterMax > 0 && filterMin > 0) {
    //         filterQuery += `harga_gte=${filterMin}&harga_lte=${filterMax}`;
    //     }

    //     Axios.get(`${API_URL}/products${filterQuery}`)
    //         .then((res) => {
    //             console.log(res.data);
    //             setDbProducts(res.data);
    //         }).catch((err) => {
    //             console.log(err)
    //         })
    //         console.log(filterQuery)
    // }

    // Cara 2
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

            setDbProducts(response.data)

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
                    setDbProducts(res.data);
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    return (
        <div>
            <div className='container py-3'>
                <div className='row'>
                    <div className='col-12 col-md-3'>
                        <h5 style={{ color: "#4A505E" }}>Filter</h5>
                        <Collapse isOpen={true}>
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
                        </Collapse>
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