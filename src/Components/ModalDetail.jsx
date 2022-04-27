import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Label, Input, Button, Row, Col, Toast, ToastHeader, ToastBody } from "reactstrap";
import { API_URL } from "../helper";
import Axios from "axios";

const ModalDetail = (props) => {

    let { openDetail, toggle, data } = props;
    console.log("isi data yg di transfer dr productsadmin", data)

    const [detail, setDetail] = useState(data)
    console.log("isi data yg di state detail", detail)

    const [openModal, setOpenModal] = useState(openDetail)
    const [openToast, setOpenToast] = useState(false);
    const [toastMsg, setToastMsg] = useState("");

    // MANAGE STOCK

    const btnAddStock = () => {
        let temp = [...detail.stock]
        temp.push({ type: null, qty: null })
        setDetail({ ...detail, stock: temp })
    }

    const printStock = () => {
        if (detail.stock.length > 0) {
            return detail.stock.map((value, index) => {
                return (
                    <div className="d-flex justify-content-between my-1" key={index}>
                        <Input
                            type="text"
                            value={value.type}
                            placeholder={`Type-${index + 1}`}
                            onChange={(e) => handleType(e, index)}
                        />
                        <Input
                            type="number"
                            value={value.qty}
                            placeholder={`Qty-${index + 1}`}
                            onChange={(e) => handleQty(e, index)}
                        />
                        <Button
                            type="button"
                            outline
                            color="danger"
                            onClick={() => handleDeleteStock(index)}
                        >
                            Delete
                        </Button>
                    </div>
                )
            })
        }
    }

    const handleDeleteStock = (index) => {
        let temp = [...detail.stock]
        temp.splice(index, 1)
        setDetail({ ...detail, stock: temp })
    }

    const handleType = (e, index) => {
        let temp = [...detail.stock]
        temp[index].type = e.target.value
        setDetail({ ...detail, stock: temp })
    }

    const handleQty = (e, index) => {
        let temp = [...detail.stock]
        temp[index].qty = parseInt(e.target.value)
        setDetail({ ...detail, stock: temp })
    }

    // MANAGE IMAGE

    const btnAddImage = () => {
        let temp = [...detail.images]
        temp.push("")
        setDetail({ ...detail, images: temp })
    }

    const printImage = () => {
        if (detail.images.length > 0) {
            return detail.images.map((value, index) => {
                return (
                    <div className="d-flex justify-content-between my-1" key={index}>
                        <Input
                            type="text"
                            value={value}
                            placeholder={`ImageURL-${index + 1}`}
                            onChange={(e) => handleImage(e, index)}
                        />
                        <Button
                            type="button"
                            outline
                            color="danger"
                            onClick={() => handleDeleteImage(index)}
                        >
                            Delete
                        </Button>
                    </div>
                )
            })
        }
    }

    const handleDeleteImage = (index) => {
        let temp = [...detail.images]
        temp.splice(index, 1)
        setDetail({ ...detail, images: temp })
    }

    const handleImage = (e, index) => {
        let temp = [...detail.images]
        temp[index] = e.target.value
        setDetail({ ...detail, images: temp })
    }

    const handleSave = () => {
        console.log("saved to current product", detail)

        let { nama, deskripsi, brand, kategori, harga, stock, images } = detail

        Axios.patch(`${API_URL}/products/${detail.id}`, {
            nama, deskripsi, brand, kategori, harga, stock, images
        }).then((res) => {
            console.log("isi res.data pas klik save", res.data)
            props.handleCallbackDetail(res.data)
            setOpenToast(!openToast)
            setToastMsg("Edit data product berhasil tersimpan")
        }).catch((err) => {
            console.log(err)
        })
    }

    if (openToast) {
        setTimeout(() => setOpenToast(!openToast), 3500)
    }

    return (
        <div>
            <Toast isOpen={openToast} style={{ position: "fixed", right: "10px" }}>
                <ToastHeader icon="success" toggle={() => setOpenToast(!openToast)}>
                    Edit detail product status
                </ToastHeader>
                <ToastBody>
                    <span>{toastMsg}</span>
                </ToastBody>
            </Toast>

            <Modal size="lg" isOpen={openDetail} toggle={toggle}>
                <ModalHeader>
                    <h3>Detail Product</h3>
                </ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <FormGroup>
                                <Label>Nama Product</Label>
                                <Input
                                    type="text"
                                    value={detail.nama}
                                    onChange={(e) => setDetail({ ...detail, nama: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Deskripsi</Label>
                                <Input
                                    type="textarea"
                                    value={detail.deskripsi}
                                    onChange={(e) => setDetail({ ...detail, deskripsi: e.target.value })}
                                />
                            </FormGroup>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>Brand</Label>
                                        <Input
                                            type="select"
                                            onChange={(e) => setDetail({ ...detail, brand: e.target.value })}
                                        >
                                            {
                                                detail.brand != "IKEA" && detail.brand != "DIY"
                                                    ?
                                                    <>
                                                        <option value={detail.brand}>
                                                            {detail.brand}
                                                        </option>
                                                        <option value="IKEA">
                                                            IKEA
                                                        </option>
                                                        <option value="DIY">
                                                            Mr. DIY
                                                        </option>
                                                    </>
                                                    :
                                                    <>
                                                        <option value="IKEA">
                                                            IKEA
                                                        </option>
                                                        <option value="DIY">
                                                            Mr. DIY
                                                        </option>
                                                    </>
                                            }
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label>Kategori</Label>
                                        <Input
                                            type="select"
                                            value={detail.kategori}
                                            onChange={(e) => setDetail({ ...detail, kategori: e.target.value })}
                                        >
                                            {
                                                detail.kategori == "living-room" && detail.kategori == "bed-room" &&
                                                    detail.kategori == "kitchen"
                                                    ?
                                                    <>
                                                        <option value="living-room">
                                                            Living Room
                                                        </option>
                                                        <option value="bed-room">
                                                            Bed Room
                                                        </option>
                                                        <option value="kitchen">
                                                            Kitchen
                                                        </option>
                                                    </>
                                                    :
                                                    <>
                                                        <option value={detail.kategori}>
                                                            {detail.kategori}
                                                        </option>
                                                        <option value="living-room">
                                                            Living Room
                                                        </option>
                                                        <option value="bed-room">
                                                            Bed Room
                                                        </option>
                                                        <option value="kitchen">
                                                            Kitchen
                                                        </option>
                                                    </>
                                            }
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label>Harga</Label>
                                <Input
                                    type="number"
                                    value={detail.harga}
                                    onChange={(e) => setDetail({ ...detail, harga: parseInt(e.target.value) })}
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
                                        onClick={btnAddStock}
                                    >Add Stock</Button>
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
                                        onClick={btnAddImage}
                                    >Add Images</Button>
                                </div>
                                {printImage()}
                            </FormGroup>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="button"
                        color="primary"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                    <Button
                        type="button"
                        onClick={toggle}
                    >Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
)}

export default ModalDetail;