import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Axios from 'axios';
import { API_URL } from '../helper';

const ModalAddProduct = (props) => {

    const [stocks, setStocks] = React.useState([]);
    const [images, setImages] = React.useState([]);

    const onBtDeleteStock = (index) => {
        let temp = [...stocks]
        temp.splice(index, 1)
        setStocks(temp)
    }

    const onBtDeleteImage = (index) => {
        let temp = [...images]
        temp.splice(index, 1)
        setImages(temp)
    }

    const onBtAddStock = () => {
        let temp = [...stocks]
        temp.push({ type: null, qty: null })
        setStocks(temp)
    }

    // menambah penampung data image pada state.images
    const onBtAddImages = () => {
        let temp = [...images]
        temp.push("")
        setImages(temp)
    }

    const handleImages = (e, index) => {
        let temp = [...images]
        temp[index] = e.target.value
        setImages(temp)
    }

    const handleType = (e, index) => {
        let temp = [...stocks]
        temp[index].type = e.target.value;
        setStocks(temp)
    }

    const handleStock = (e, index) => {
        let temp = [...stocks]
        temp[index].qty = parseInt(e.target.value)
        setStocks(temp)
    }

    const printStock = () => {
        if (stocks.length > 0) {
            return stocks.map((item, index) => {
                return <div className='d-flex my-2'>
                    <Input type="text" placeholder={`Type-${index + 1}`} onChange={(e) => handleType(e, index)} />
                    <Input type="number" placeholder={`Stock-${index + 1}`} onChange={(e) => handleStock(e, index)} />
                    <a className="btn btn-outline-danger" onClick={() => onBtDeleteStock(index)} style={{ cursor: 'pointer' }}>Delete</a>
                </div>
            })
        }
    }

    const printImages = () => {
        if (images.length > 0) {
            return images.map((item, index) => {
                return <div className='d-flex my-2'>
                    <Input
                        type="text"
                        placeholder={`Select Images-${index + 1}`}
                        onChange={(e) => handleImages(e, index)}
                    />
                    <a className="btn btn-outline-danger" onClick={() => onBtDeleteImage(index)} style={{ cursor: 'pointer' }}>Delete</a>

                </div>
            })
        }
    }

    return (
        <Modal
            isOpen={props.openModal}
            size='lg'
            toggle={props.toggle}>
            <ModalHeader >Add Product</ModalHeader>
            <ModalBody>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <FormGroup>
                            <Label for="textNama">Nama Product</Label>
                            <Input type="text" id="textNama" />
                        </FormGroup>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="selectBrand">Brand</Label>
                                    <Input type="select" id="selectBrand" >
                                        <option value={null} >Choose...</option>
                                        <option value="IKEA" >IKEA</option>
                                        <option value="ACE" >ACE</option>
                                        <option value="Mr. DIY" >Mr. DIY</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="textKategori">Kategori</Label>
                                    <Input type="select" id="selectBrand" >
                                        <option value={null} >Choose...</option>
                                        <option value="Livingroom" >Livingroom</option>
                                        <option value="Kitchen" >Kitchen</option>
                                        <option value="Bedroom" >Bedroom</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="textHarga">Harga</Label>
                            <Input type="number" id="textHarga" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textDes">Deskripsi</Label>
                            <Input type="textarea" id="textDes" />
                        </FormGroup>
                    </div>
                    <div className='col-12 col-md-6'>
                        <FormGroup>
                            <Label>Stock</Label>
                            <Button outline color="success" type="button" size="sm" style={{ float: 'right' }} onClick={onBtAddStock}>Add Stock</Button>
                            {printStock()}
                        </FormGroup>
                        <hr />
                        <FormGroup>
                            <Label>Images</Label>
                            <Button outline color="success" type="button" size="sm" style={{ float: 'right' }} onClick={onBtAddImages} >Add Image</Button>
                            <div className='row'>
                                {printImages()}
                            </div>
                        </FormGroup>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button type="button" color="primary">Submit</Button>{' '}
                <Button color="secondary" onClick={props.toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>)
}

export default ModalAddProduct;