import React, { useState, useEffect } from "react";
import Axios from "axios";
import { API_URL } from "../helper";
import { useDispatch } from 'react-redux';
import { Modal, ModalBody, ModalHeader, FormGroup, Label, Input, Button, ModalFooter, Row, Col } from "reactstrap";
import { getProductsAction } from "../redux/actions/productsAction";
import ProductsAdmin from "../Pages/ProductsAdmin";

const ModalAddProduct = (props) => {

    const dispatch = useDispatch();

    const [newProduct, setNewProduct] = useState({
        nama: "",
        deskripsi: "",
        brand: "",
        kategori: "",
        harga: 0,
        stock: [],
        images: []
    })

    //MANAGE STOCK

    const btnAddStock = () => {
        let temp = [...newProduct.stock]
        temp.push({ type: null, qty: null })
        setNewProduct({ ...newProduct, stock: temp })
    }

    const printStock = () => {
        if (newProduct.stock.length > 0) {
            return newProduct.stock.map((value, index) => {
                return (
                    <div className="d-flex justify-content-between my-1" key={index}>
                        <Input type="text" placeholder={`Type-${index + 1}`} onChange={(e) => handleType(e, index)} />
                        <Input type="number" placeholder={`Stock-${index + 1}`} onChange={(e) => handleStock(e, index)} />
                        <Button
                            outline
                            color="danger"
                            onClick={() => { handleDeleteStock(index) }}
                        >Delete</Button>
                    </div>
                )
            })
        }
    }

    const handleDeleteStock = (idx) => {
        let temp = [...newProduct.stock]
        temp.splice(idx, 1)
        setNewProduct({ ...newProduct, stock: temp })
    }

    const handleType = (e, index) => {
        let temp = [...newProduct.stock]
        temp[index].type = e.target.value;
        setNewProduct({ ...newProduct, stock: temp })
    }

    const handleStock = (e, index) => {
        let temp = [...newProduct.stock]
        temp[index].qty = parseInt(e.target.value)
        setNewProduct({ ...newProduct, stock: temp })
    }

    // MANAGE IMAGE

    const btnAddImage = () => {
        let temp = [...newProduct.images]
        temp.push("")
        setNewProduct({ ...newProduct, images: temp })
    }

    const printImage = () => {
        if (newProduct.images.length > 0) {
            return newProduct.images.map((value, index) => {
                return (
                    <div className="d-flex justify-content-between my-1" key={index}>
                        <Input
                            type="text"
                            placeholder={`Select Images-${index + 1}`}
                            onChange={(e) => handleImages(e, index)}
                        />
                        <Button
                            type="button"
                            outline
                            color="danger"
                            onClick={() => { handleDeleteImage(index) }}
                        >Delete</Button>
                    </div>
                )
            })
        }
    }

    const handleDeleteImage = (idx) => {
        let temp = [...newProduct.images]
        temp.splice(idx, 1)
        setNewProduct({ ...newProduct, images: temp })
    }

    const handleImages = (e, index) => {
        let temp = [...newProduct.images]
        temp[index] = e.target.value
        setNewProduct({ ...newProduct, images: temp })
    }

    // MANAGE SUBMIT

    const handleSubmit = async () => {
        let { nama, deskripsi, brand, kategori, harga, stock, images } = newProduct
        console.log("cek form", nama, deskripsi, brand, kategori, harga, stock, images)

        try {

            if (nama == "" || deskripsi == "" || brand == "" || kategori == "" || harga == 0 || stock.length == 0 || images.length == 0) {
                alert("Fill in all form")
            } else {
                let res = await Axios.post(`${API_URL}/products`, {
                    nama,
                    deskripsi,
                    brand,
                    kategori,
                    harga,
                    stock,
                    images
                })
                console.log("data yg teregister", res.data)
                dispatch(getProductsAction(res.data))
            }

        } catch (error) {
            console.log(error);
        }
    }

    let { openAddProduct, toggle } = props;
    return (<Modal size="lg" isOpen={openAddProduct} toggle={toggle}>
        <ModalHeader>
            <h3>Add Product</h3>
        </ModalHeader>
        <ModalBody>
            <div className="row">
                <div className="col-12 col-md-6">
                    <FormGroup>
                        <Label>Nama Product</Label>
                        <Input
                            id="namaProduct"
                            type="text"
                            onChange={(e) => setNewProduct({ ...newProduct, nama: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Deskripsi</Label>
                        <Input
                            id="deskripsiProduct"
                            type="textarea"
                            onChange={(e) => setNewProduct({ ...newProduct, deskripsi: e.target.value })}
                        />
                    </FormGroup>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label>Brand</Label>
                                <Input
                                    type="select"
                                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                                >
                                    <option value="null">Choose...</option>
                                    <option value="IKEA">IKEA</option>
                                    <option value="DIY">Mr. DIY</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Kategori</Label>
                                <Input
                                    type="select"
                                    onChange={(e) => setNewProduct({ ...newProduct, kategori: e.target.value })}
                                >
                                    <option value="null">Choose...</option>
                                    <option value="living-room">Living Room</option>
                                    <option value="bed-room">Bed Room</option>
                                    <option value="kitchen">Kitchen</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label>Harga</Label>
                        <Input
                            type="number"
                            id="hargaProduct"
                            onChange={(e) => setNewProduct({ ...newProduct, harga: parseInt(e.target.value) })}
                        />
                    </FormGroup>
                </div>
                <div className="col-12 col-md-6">
                    <FormGroup>
                        <div className="d-flex justify-content-between py-2">
                            <Label>Stock</Label>
                            <Button
                                type="button"
                                outline
                                color="success"
                                onClick={btnAddStock}>Add Stock</Button>
                        </div>
                        {printStock()}
                    </FormGroup>
                    <hr />
                    <FormGroup>
                        <div className="d-flex justify-content-between py-2">
                            <Label>Images</Label>
                            <Button
                                type="button"
                                outline
                                color="success"
                                onClick={btnAddImage}>Add Images</Button>
                        </div>
                        {printImage()}
                    </FormGroup>
                </div>
            </div>
        </ModalBody>
        <ModalFooter>
            <Button
                color="primary"
                onClick={handleSubmit}
            >
                Submit
            </Button>
            <Button
                onClick={toggle}
            >
                Cancel
            </Button>
        </ModalFooter>
    </Modal>

    )
}

export default ModalAddProduct;