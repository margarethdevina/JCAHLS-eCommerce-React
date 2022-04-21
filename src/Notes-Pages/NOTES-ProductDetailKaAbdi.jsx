import React from 'react';
import Axios from 'axios';
import { API_URL } from '../helper';
import { Button, Collapse, Input, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { updateCartAction } from '../redux/actions/usersAction';

const ProductDetail = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state, search } = useLocation()

    const [detail, setDetail] = React.useState({});
    const [thumbnail, setThumbnail] = React.useState(0);
    const [selectedType, setSelectedType] = React.useState({});
    const [openType, setOpenType] = React.useState(false);
    const [openToast, setOpenToast] = React.useState(false);
    const [toastMsg, setToastMsg] = React.useState("");
    const [qty, setQty] = React.useState(1);

    const { role, id, cart } = useSelector((state) => {
        return {
            role: state.usersReducer.role,
            id: state.usersReducer.id,
            cart: state.usersReducer.cart
        }
    })

    React.useEffect(() => {
        getDetail()
    }, []);


    const getDetail = () => {
        Axios.get(`${API_URL}/products${search}`)
            .then((response) => {
                // jika berhasil mendapatkan response
                console.log("Detail Product :", response.data);
                setDetail(response.data[0])
            }).catch((error) => {
                // jika tidak berhasil mendapatkan response
                console.log(error);
            })
    }

    const renderImages = () => {
        let { images } = detail
        return images.map((item, index) => {
            return (
                <div className='col-3 col-md-12'>
                    <img className="select-image mb-1 shadow bg-white rounded" src={item}
                        key={index}
                        width="100%"
                        onClick={() => setThumbnail(index)}
                        style={{ borderBottom: thumbnail == index && "3px solid #407AB1" }}
                    />
                </div>
            )
        })
    }

    const handleInc = () => {
        let temp = qty;
        if (selectedType.qty) {
            if (temp < selectedType.qty) {
                setQty(temp += 1)
            } else {
                setOpenToast(!openToast)
                setToastMsg("Stock tidak mencukupi")
            }
        } else {
            setOpenToast(!openToast)
            setToastMsg("Pilih type terlebih dahulu")
        }
    }

    const handleDec = () => {
        let temp = qty;
        if (temp > 1) {
            setQty(temp -= 1)
        }
    }

    const handleQty = (e) => {
        if (parseInt(e.target.value) > 0 && parseInt(e.target.value) < selectedType.qty) {
            setQty(parseInt(e.target.value))
        }
    }

    const handleAddToCart = () => {
        if (role == "user") {
            if (selectedType.type) {
                // fungsi menambah produk kedalam keranjang
                let filterCart = cart.findIndex((val, idx) => val.idProduct == detail.id && val.type == selectedType.type)
                if (filterCart >= 0) {
                    cart[filterCart].qty += qty
                } else {
                    cart.push({
                        idProduct: detail.id,
                        img: detail.images[0],
                        nama: detail.nama,
                        type: selectedType.type,
                        qty,
                        harga: detail.harga
                    });
                }

                Axios.patch(`${API_URL}/users/${id}`, {
                    cart
                }).then((res) => {
                    // console.log(res.data)
                    dispatch(updateCartAction(res.data.cart))
                    alert("Add product success ✅")
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                setOpenToast(!openToast)
                setToastMsg("Pilih type terlebih dahulu")
            }
        } else {
            setOpenToast(!openToast);
            setToastMsg("Silahkan login sebagai user terlebih dahulu");
        }

    }

    if (openToast) {
        setTimeout(() => setOpenToast(!openToast), 3500)
    }

    return (
        <div>
            <Toast isOpen={openToast} style={{ position: "fixed", right: "10px" }}>
                <ToastHeader icon="warning">
                    Add to cart warning
                </ToastHeader>
                <ToastBody>
                    <span>{toastMsg}</span>
                </ToastBody>
            </Toast>
            <div className="container row p-5 m-auto bg-white rounded">
                {
                    detail.id &&
                    <>
                        <div className="row col-md-8 text-center">
                            <div className="col-12 order-md-2 col-md-10">
                                <img className="shadow-sm bg-white rounded" src={detail.images[thumbnail]} width="100%" />
                            </div>
                            <div className="col-12 order-md-1 col-md-2">
                                <div className='row my-2 my-md-0'>
                                    {renderImages()}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div style={{ borderBottom: '1.5px solid gray', color: "#49505D" }}>
                                <h4 style={{ fontWeight: 'bolder' }}>{detail.nama}</h4>
                                <h6 className="text-mute">{detail.kategori}</h6>
                                <h2 style={{ fontWeight: 'bolder', color: "#9E887E" }}>Rp {detail.harga.toLocaleString()}</h2>
                            </div>
                            <div style={{ borderBottom: '1.5px solid gray' }}>
                                <div
                                    style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                    onClick={() => setOpenType(!openType)} >
                                    Type: {selectedType.type}</div>
                                <Collapse isOpen={openType}>
                                    {
                                        detail.stock.map((item, index) => {
                                            return (
                                                <div>
                                                    <Button outline color="secondary" size="sm"
                                                        style={{ width: '100%', border: 'none', textAlign: 'left' }}
                                                        onClick={() => {
                                                            setSelectedType(item)
                                                        }}
                                                    > {item.type} : {item.qty}</Button>
                                                </div>
                                            )
                                        })
                                    }
                                </Collapse>
                            </div>
                            <p className="my-3" style={{ textAlign: "justify" }}>
                                {detail.deskripsi}
                            </p>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span>Jumlah :</span>
                                <span style={{ width: '30%', display: 'flex', alignItems: 'center' }}>
                                    <span className="material-icons p-1 text-white shadow-sm" onClick={handleDec} style={{ cursor: 'pointer', backgroundColor: "#9C867B", borderRadius: "45px" }} >
                                        remove
                                    </span>
                                    <Input size="sm" placeholder="qty" value={qty} onChange={handleQty} style={{ width: "40%", fontSize: "24px", fontWeight: "bolder", textAlign: "center", border: 0 }} />
                                    <span className="material-icons p-1 text-white shadow-sm" onClick={handleInc} style={{ cursor: 'pointer', backgroundColor: "#9C867B", borderRadius: "45px" }} >
                                        add
                                    </span>
                                </span>
                            </div>
                            <Button
                                type="button"
                                color="secondary" outline
                                onClick={handleAddToCart}
                                style={{ width: '100%' }} >
                                Masukkan ke Keranjang
                            </Button>
                        </div>
                    </>
                }
            </div>
        </div >
    )
}

export default ProductDetail;