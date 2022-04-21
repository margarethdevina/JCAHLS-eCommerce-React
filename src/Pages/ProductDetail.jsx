import React from 'react';
import Axios from 'axios';
import { API_URL } from '../helper';
import { Button, Collapse, Input, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartAction } from '../redux/actions/usersAction';

const ProductDetail = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state, search } = useLocation()

    const [detail, setDetail] = React.useState({});
    const [thumbnail, setThumbnail] = React.useState(0);
    const [selectedType, setSelectedType] = React.useState({});
    const [openType, setOpenType] = React.useState(false);
    const [qty, setQty] = React.useState(1);
    const [openToast, setOpenToast] = React.useState(false);
    const [toastMsg, setToastMsg] = React.useState("");

    const { role, id, cart } = useSelector((state) => {
        return {
            role: state.usersReducer.role,
            id: state.usersReducer.id,
            cart: state.usersReducer.cart,
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


        // console.log(selectedType.qty)
        // if (selectedType.qty) {
        //     let temp = qty
        //     if (temp < selectedType.qty) {
        //         temp += 1
        //         setQty(temp)
        //         console.log(temp)
        //     } else if (temp == selectedType.qty) {
        //         console.log("max")
        //         setOpenToast(!openToast)
        //         console.log(openToast)
        //     }
        // }
    }

    const handleDec = () => {
        let temp = qty;
        if (temp > 1) {
            setQty(temp -= 1)
        }

        // let temp = qty
        // if (temp > 1) {
        //     temp -= 1
        //     setQty(temp)
        // }
        // console.log(temp)
    }

    const handleQty = (e) => {
        if (parseInt(e.target.value) > 0 && parseInt(e.target.value) < selectedType.qty) {
            setQty(parseInt(e.target.value))
        }
    }

    // Jika dia admin atau orang yg belum login, dia tidak bisa menambah produk ke keranjang
    const handleAddtoCart = () => {

        if (role == "user") { // proteksi role
            if (selectedType.qty) { // proteksi type sudah dipilih atau belum
                // fungsi menambah produk ke dalam keranjang

                // cari index yang sesuai kondisi findIndex
                let filterCart = cart.findIndex(val => val.idProduct == detail.id && val.type == selectedType.type)

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
                    })
                }

                // axios.patch untuk melakukan editing
                Axios.patch(`${API_URL}/users/${id}`, {
                    cart
                }).then((res) => {
                    // console.log(res.data) // dapatnya objek
                    dispatch(updateCartAction(res.data.cart))
                    alert("Add product success ✅")
                }).catch((err) => {
                    console.log(err)
                })

            } else {
                // alert pilih type dulu
                setOpenToast(!openToast)
                setToastMsg("Pilih type terlebih dahulu")
            }
        } else {
            // alert jika belum login sebagai user
            setOpenToast(!openToast)
            setToastMsg("Silahkan Login sebagai user terlebih dahulu")
        }
    }

    if (openToast) { //otomatis saat semua toast == true / muncul, dalam 3.5 detik toast akan tertutup
        setTimeout(() => setOpenToast(!openToast), 3500)
    }

    return (
        <div>

            <Toast isOpen={openToast} style={{ position: "fixed", right: "10px" }}>
                <ToastHeader icon="warning" toggle={() => setOpenToast(!openToast)}>
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
                        {/* react fragment atau empty tag seakan menjadi parent element, dan supaya return elemen ini tidak ada styling bawaan */}
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
                                                            // setQty(1)
                                                        }
                                                        }
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

                                    <span
                                        onClick={handleDec}
                                        className="material-icons p-1 text-white shadow-sm"
                                        style={{ cursor: 'pointer', backgroundColor: "#9C867B", borderRadius: "45px" }} >
                                        remove
                                    </span>

                                    <Input
                                        size="sm"
                                        placeholder="qty"
                                        value={qty}
                                        style={{
                                            width: "40%", fontSize: "24px", fontWeight: "bolder", textAlign: "center",
                                            border: 0
                                        }}
                                        onChange={handleQty}
                                    />

                                    <span
                                        onClick={handleInc}
                                        className="material-icons p-1 text-white shadow-sm"
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: "#9C867B",
                                            borderRadius: "45px"
                                        }} >
                                        add
                                    </span>

                                </span>
                            </div>
                            <Button
                                type="button"
                                color="secondary"
                                outline
                                style={{ width: '100%' }}
                                onClick={handleAddtoCart}
                            >Masukkan ke Keranjang</Button>
                        </div>
                    </>
                }
            </div>

        </div >
    )
}

export default ProductDetail;