import React from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../helper";
import { Button, ButtonGroup, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

const ProductDetail = (props) => {

    const { search } = useLocation();
    // console.log("cek search query", search);
    // CARA PERTAMA
    // const { state } = useLocation();
    // useLocation() returnnya berupa objek

    const [detail, setDetail] = React.useState({})
    console.log("isi detail", detail)

    const [openDropdown, setOpenDropdown] = React.useState(false)

    const [valueDropdown, setValueDropdown] = React.useState("Type: ")

    React.useEffect(() => {
        getDetail()
    }, [])

    const getDetail = () => {
        Axios.get(`${API_URL}/products/${search}`)
            .then((response) => {
                console.log("isi query", response.data)
                setDetail(response.data[0])
                // if (Object.keys(detail).length === 0 && detail.constructor === Object) {
                // }
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleDropdown = () => {
        setOpenDropdown(!openDropdown)
    }

    // const handleDropValue = (value) => {
    //     setValueDropdown(value)
    // }

    const printDetail = () => {

        const handleDropValue = (value) => {
            setValueDropdown(value)
        }

        if (Object.keys(detail).length != 0 && detail.constructor === Object) {

            const printSmallImg = () => {
                let smallImg = detail.images
                let innerHtml = "";
                smallImg.forEach((val) => {
                    innerHtml += <img
                        className="col-3 col-md-12"
                        alt={`${val}`}
                        width="25%"
                        src={val}
                    />
                })
                return innerHtml
            }
            console.log(printSmallImg())


            const printType = () => {
                let stockArray = detail.stock
                console.log(stockArray)
                let innerHtml = "";
                stockArray.forEach((val, idx) => {
                    innerHtml += <div>
                        {`${val.type}-stock ${val.qty}`}
                    </div>
                })
                return innerHtml
            }
            console.log(printType())

            return <div className="row">

                <div className="col-12 col-md-6 order-md-2 text-center">
                    <img
                        src={detail.images[0]}
                    />
                </div>

                <div className="col-12 col-md-1 order-md-1 text-center">
                    <div className="row container-fluid mx-auto">
                        {printSmallImg()}
                    </div>
                </div>

                <div className="col-12 col-md-5 order-md-3 my-3">
                    <div className="container-fluid mx-auto">
                        <h5>{detail.nama}</h5>
                        <small className="text-muted">{detail.kategori}</small>

                        <h4
                            className="fw-bold"
                            style={{ color: "#9E887E" }}
                        >
                            IDR. {detail.harga.toLocaleString()}
                        </h4>

                        <hr />

                        <div>
                            <Dropdown 
                            isOpen={openDropdown}
                            toggle={() => setOpenDropdown(!openDropdown)}>
                                <DropdownToggle
                                    data-toggle="dropdown"
                                    tag="span"
                                    className="fw-bold"
                                >
                                    {valueDropdown}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <div onChange={(event) => handleDropValue(event.currentTarget.textContent)}>
                                        1
                                    </div>
                                    <div>
                                        <h6>2</h6>
                                    </div>
                                </DropdownMenu>
                            </Dropdown>
                        </div>

                        <hr />

                        <p
                            className="fs-6"
                        >
                            {detail.deskripsi}
                        </p>

                        <div className="d-flex justify-content-between align-items-center">
                            <p>
                                Jumlah:
                            </p>

                            <ButtonGroup

                            >
                                <Button
                                    className="mx-2"
                                >
                                    -
                                </Button>
                                <p
                                    className="fw-bold mx-2"
                                >
                                    xx
                                </p>
                                <Button
                                    className="mx-2"
                                >
                                    +
                                </Button>
                            </ButtonGroup>
                        </div>

                        <Button
                            className="w-100 my-3"
                        >
                            Add to cart
                        </Button>
                    </div>
                </div>

            </div>
        } else {
            return null
        }
    }



    return (
        <div>

            {/* CARA PERTAMA {state.nama} */}

            {printDetail()}

            {/* {
                detail != null ?
                    printDetail()
                    : null
            } */}

            {/* <div className="row">

                <div className="col-12 col-md-6 order-md-2 text-center">
                    <img
                        src={detail.images[0]}
                    />
                </div>

                <div className="col-12 col-md-1 order-md-1 text-center">
                    <div className="row container-fluid mx-auto">
                        <img
                            className="col-3 col-md-12"
                            alt="img1"
                            width="25%"
                        />
                        <img
                            className="col-3 col-md-12"
                            alt="img2"
                            width="25%"
                        />
                        <img
                            className="col-3 col-md-12"
                            alt="img3"
                            width="25%"
                        />
                        <img
                            className="col-3 col-md-12"
                            alt="img4"
                            width="25%"
                        />
                    </div>
                </div>

                <div className="col-12 col-md-5 order-md-3 my-3">
                    <div className="container-fluid mx-auto">
                        <h5>{detail.nama}</h5>
                        <small className="text-muted">{detail.kategori}</small>

                        <hr />

                        <div>
                            <Dropdown toggle>
                                <DropdownToggle
                                    data-toggle="dropdown"
                                    tag="span"
                                    className="fw-bold"
                                >
                                    Type: default kosong
                                </DropdownToggle>
                                <DropdownMenu>
                                    <div>
                                        Tipe 1
                                    </div>
                                    <div>
                                        Tipe 2
                                    </div>
                                </DropdownMenu>
                            </Dropdown>
                        </div>

                        <hr />

                        <p
                            className="fs-6"
                        >
                            {detail.deskripsi}
                        </p>

                        <div className="d-flex justify-content-between align-items-center">
                            <p>
                                Jumlah:
                            </p>

                            <ButtonGroup

                            >
                                <Button
                                    className="mx-2"
                                >
                                    -
                                </Button>
                                <p
                                    className="fw-bold mx-2"
                                >
                                    xx
                                </p>
                                <Button
                                    className="mx-2"
                                >
                                    +
                                </Button>
                            </ButtonGroup>
                        </div>

                        <Button
                            className="w-100 my-3"
                        >
                            Add to cart
                        </Button>
                    </div>
                </div>

            </div> */}


        </div>
    )
}

export default ProductDetail;