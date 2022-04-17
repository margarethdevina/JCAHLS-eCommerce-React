import React, { useState, useEffect } from "react";
import { Button, Input, Label } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../helper";

const FilterProducts = (props) => {

    const [inForm, setInForm] = useState({
        nama: "",
        hargaMin: null,
        hargaMax: null,
        sort: "Reset"
    })

    const [dbFilter, setDbFilter] = useState([])

    const [idFilter, setIdFilter] = useState("")

    useEffect(() => {
        getFilter()
    }, [])

    const getFilter = () => {
        Axios.get(`${API_URL}/products/?${idFilter}`)
            .then((response) => {
                console.log("isi response", response.data)
                setDbFilter(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }

    if (dbFilter.length > 0) {
        console.log("isi dbFilter",dbFilter)
        props.handleParentCallback(dbFilter)
    }

    const handleInput = (value, property) => {
        setInForm({ ...inForm, [property]: value })
        // console.log("nama,hargaMin,hargaMax,sort", inForm.nama, inForm.hargaMin, inForm.hargaMax, inForm.sort)
    }

    const handleFilter = () => {
        alert(`${inForm.nama},${inForm.hargaMin},${inForm.hargaMax},${inForm.sort}`)
        let { nama, hargaMin, hargaMax, sort } = inForm

        if (nama || hargaMin >= 0 || hargaMax > 0 || sort != "Reset") {

            let idSearch = ""

            props.data.map((value, index) => {

                let hargaProduk = Number(value.harga)

                if (nama != "" && hargaMin >= 0 && hargaMax > 0 && value.nama.toLowerCase().includes(nama.toLowerCase())) {

                    if (hargaProduk >= hargaMin && hargaProduk <= hargaMax) {
                        // console.log(hargaProduk)
                        idSearch += `id=${value.id}&`
                        // console.log("idSearch", idSearch)
                    }

                } else if (nama != "" && value.nama.toLowerCase().includes(nama.toLowerCase())) {

                    idSearch += `id=${value.id}&`
                    // console.log("idSearch", idSearch)

                } else if (nama == "" && hargaProduk >= hargaMin && hargaMax > 0 && hargaProduk <= hargaMax) {

                    // console.log(hargaProduk)
                    idSearch += `id=${value.id}&`
                    // console.log("idSearch", idSearch)

                }
                setIdFilter(idSearch)
            })
        }
        
        console.log(idFilter)
        getFilter()

    }

    const handleReset = () => {
        setInForm({
            nama: "",
            hargaMin: 0,
            hargaMax: 0,
            sort: "Reset"
        })
    }

    return (
        <div>
            <h5 className="text-muted">
                Filter
            </h5>

            <form className="row g-3">

                <div className="col-12">
                    <Label className="form-label">
                        Nama
                    </Label>
                    <Input
                        type="text"
                        placeholder="Cari produk"
                        className="form-control"
                        value={inForm.nama}
                        onChange={(event) => handleInput(event.target.value, "nama")}
                    />
                </div>

                <Label className="form-label">
                    Harga
                </Label>
                <div className="col-6 mt-0">
                    <Input
                        type="number"
                        placeholder="Minimum"
                        className="form-control"
                        value={inForm.hargaMin}
                        onChange={(event) => handleInput(event.target.value, "hargaMin")}
                    />
                </div>
                <div className="col-6 mt-0">
                    <Input
                        type="number"
                        placeholder="Maksimum"
                        className="form-control"
                        value={inForm.hargaMax}
                        onChange={(event) => handleInput(event.target.value, "hargaMax")}
                    />
                </div>

                <div className="col-12">
                    <Label className="form-label">
                        Sort
                    </Label>
                    <Input
                        type="select"
                        placeholder="Cari produk"
                        className="form-control"
                        name="sortSelection"
                        value={inForm.sort}
                        onChange={(event) => handleInput(event.target.value, "sort")}
                    >
                        <option value="Harga Asc">Harga Asc</option>
                        <option value="Harga Desc">Harga Desc</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                        <option value="Reset">Reset</option>
                    </Input>
                </div>

                <div className="col-12">
                    <Button
                        className="sm"
                        color="warning"
                        outline
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                    <Button
                        className="sm"
                        color="primary"
                        onClick={handleFilter}
                    >
                        Filter
                    </Button>
                </div>
            </form>

        </div>
    )
}

export default FilterProducts;