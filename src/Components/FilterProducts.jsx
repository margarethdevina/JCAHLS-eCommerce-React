import React, { useState } from "react";
import { Button, Input, Label } from "reactstrap";

const FilterProducts = (props) => {

    const [inForm, setInForm] = useState({
        nama: "",
        hargaMin: null,
        hargaMax: null,
        sort: "Reset"
    })

    const handleInput = (value, property) => {
        setInForm({ ...inForm, [property]: value })
        console.log("nama,hargaMin,hargaMax,sort", inForm.nama, inForm.hargaMin, inForm.hargaMax, inForm.sort)
    }

    const handleFilter = () => {
        alert(`${inForm.nama},${inForm.hargaMin},${inForm.hargaMax},${inForm.sort}`)
        let Min = Number(inForm.hargaMin)
        let Max = Number(inForm.hargaMax)
        
        if (inForm.nama || Min >= 0 || Max > 0 || inForm.sort != "Reset") {
            let idSearch = ""
            props.data.map((value, index) => {
                let hargaProduk = Number(value.harga)
                if (value.nama.toLowerCase().includes(inForm.nama.toLowerCase()) || hargaProduk >= Min && hargaProduk <= Max) {
                    console.log("filterNama", value.id)
                    idSearch += `id=${value.id}&`
                    console.log("idSearch",idSearch)
                } 
            })
        }
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