import React from 'react'; // untuk mengaktifkan library react
import Form from '../Components/Form';
import Banner from '../Components/Banner';

/** REACT DATA MANAGEMENT:
 * State dan props merupakan manajemen data untuk mengelola tampilan
 * 1️⃣ State: 
 * - untuk memanage data pd suatu komponen tertentu (dikenal jg dgn local data management)
 * - ini serupa dengan variabel global
 * - misal statenya cuma di landing page berarti cuma memanage di landing page itu aja
 * - kita akan menyimpan data pd state ketika data tersebut mempengaruhi tampilan (saat data berubah maka tampilan berubah)
 * - bisa didefinisikan di dalam class constructor memakai this.state ATAU
 * - bisa didefinisikan di luar class constructor juga (jadi tanpa pakai this.)
 * 
 * 2️⃣ Props: 
 * - untuk mengelola data supaya bisa dipake oleh komponen lain
 * - props transfer data dr 1 komponen ke komponen lainnya
 * - spesifik nya mentransfer data dari parent component ke child component
 * - contoh mentransfer data dr LandingPage.jsx ke form.jsx atau komponen lainnya
 * 
 * Global variabel bisa dipake asalkan varibel itu tidak ada pengaruh ke tampilan
 * 
 */

// variabel global example
// let counter = 0;

// urutan render di react js: ❗❗❗
/**
 * 1. constructor
 * 2. render function
 * 3. menampilkan komponen
 * 4. semua komponen tertampil baru dilakukan componentDidMount
 *      componentDidMount fungsi yg jalan setelah semua komponen dirender.
 *  
 *      render data baru ambil data dari database scr backend lewat componentDidMount
 *      umumnya componentDidMount dipanggil di bawah constructor
 * 
 *      untuk menjalankan fungsi pertama kali ketika component dirender
 * 
 *      componentDidMount cuma berlaku di class component
 */

// CLASS COMPONENT
class LandingPage extends React.Component { // INITIALIZE COMPONENT
    constructor(props) { // constructor utk memanage data yg akan digunakan pd komponen react
        console.log("cek urutan render 1 constructor")
        super(props);
        // local data management
        // state deklarasi properti di constructor
        // merupakan tipe data objek
        this.state = {
            counter: 0,
            input: "",
            // kalau mau deklarasi objek bisa isi null
            // kalau mau deklarasi array bisa isi empty array
            dbStudent: []
            //     {
            //         id: 1,
            //         name: "Abdi",
            //         class: "JC-Full Stack",
            //         time: "After-hour",
            //         job: "Product Manager",
            //         age: 26
            //     },
            //     {
            //         id: 2,
            //         name: "Edo",
            //         class: "JC-Full Stack",
            //         time: "After-hour",
            //         job: "Product Manager",
            //         age: 22
            //     }
            // ]
        }
    }

    // untuk menjalankan fungsi pertama kali ketika component dirender
    // fungsi2 data yg dijalankan di componentDidMount() itu fungsi ambil data dr database seperti dr API
    componentDidMount() {
        console.log("cek urutan render 3 componentDidMount")
        let dataServer = [
            {
                id: 1,
                name: "Abdi",
                class: "JC-Full Stack",
                time: "After-hour",
                job: "Product Manager",
                age: 26
            },
            {
                id: 2,
                name: "Edo",
                class: "JC-Full Stack",
                time: "After-hour",
                job: "Product Manager",
                age: 22
            }
        ]
        this.setState({ dbStudent: dataServer})
    }

    printData = () => {
        return this.state.dbStudent.map((value, index) => {
            return <tr>
                <td>{index + 1}</td>
                <td>{value.name}</td>
                <td>{value.class}</td>
                <td>{value.time}</td>
                <td>{value.job}</td>
            </tr>
        })
    }

    // efective nya semua function dibuat pakai arrow function
    // kalau buat function tanpa arrow diperlukan binding >> lihat rekaman
    btnIncrement = () => {
        // counter++;
        // console.log(counter);
        // this.setState untuk mengubah State
        // saat hover function dan ada keterangan any berarti isinya objek
        let temp = this.state.counter
        temp++
        this.setState({
            counter: temp
        })
    }

    btnDecrement = () => {
        // counter--;
        // console.log(counter);
        let temp = this.state.counter
        temp--
        this.setState({
            counter: temp
        })
    }


    // jika ambil nilai dari input saat set atribut id / ref
    // btnSubmit = (referensi) => {
    //     // tidak membuat temporary karena asal data dari input bukan dari value properti state
    //     console.log(this.referensi);
    //     this.setState({
    //         input: this.referensi
    //     })
    // }

    // saat ambil nilai dr input saat pakai atribut onChange
    // isi event akan sama dengan this.refs.inValue.value namun berubah2 terus sesuai perubahan di input
    // best practice sebaiknya pakai refs tapi banyak digunakan orang itu onChange
    handleInput = (event) => {
        console.log(event.target)
        this.setState({ input: event.target.value })
    }

    // RETURN HTML COMPONENT
    // render untuk generate komponen html
    // return cuma bisa return 1 komponen jadi ga boleh ada return bertumpuk, INI BERLAKU DI FUNCTION COMPONENT JG
    render() {
        console.log("cek urutan render 2 render function")
        // render () merupakan fungsi jadi bisa dipake untuk declare variabel jg
        // biar di dalam span mau panggil counter aja bisa destructuring dulu
        // objeknya si state, propertinya si counter dan valuenya 0
        let { counter, input } = this.state;

        return (
            <div>
                
                <Banner />

                {/* atribut ref cuma bisa dipake di class component, saat ini dah nonaktif jg tapi masih bisa dipake */}
                {/* <input type="text" ref="inValue" onChange={this.handleInput} />
                <button type="button" onClick={this.btnSubmit}>Submit</button> */}
                {/* bisa panggil dalam bentuk input karena sudah di destructuring di atas */}
                <span>Value from state input</span>
                <h4>{input}</h4>

                {/* saat tipe data bukan string diapit kurawal, klo string baru diapit quotes. karena yg dipanggil adalah fungsi button makannya pakai kurawal. panggil pakai this. karena masih di dalam class. kalo fungsi kita ga ada argumen ga perlu pake kurang buka tutup, klo pake kurung buka tutup fungsi akan dirun terus menerus. */}
                <button type="button" onClick={this.btnDecrement}>Decrement</button>
                <span style={{ fontSize: "24px", margin: "0px 8px" }}>
                    {/* this.state.counter bisa dipake untuk panggil value 0 itu */}
                    {/* {this.state.counter} */}
                    {/* kalau mw panggil dlm bentuk {counter} aja perlu lakukan destructuring dulu */}
                    {counter}
                </span>
                <button type="button" onClick={this.btnIncrement}>Increment</button>

                <table className="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Time</th>
                            <th>Job</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* this.printData perlu kurung bukatutup supaya langsung dijalankan */}
                        {this.printData()}
                    </tbody>
                </table>

                {/* memanggil Child atau Form yang dibuat di folder components */}
                {/* atribut title itu bebas */}
                {/* pembuatan props itu unlimited */}
                {/* yg ditransfer ga cuma string bisa boolean,fungsi,component */}
                <Form
                    title="Data Form Input"
                    handleInput={this.handleInput}
                    btnSubmit={this.btnSubmit}
                />

            </div>
        )
    }
}

export default LandingPage;

// class component biasanya dipakai untuk buat page, sudah ada pengembangan.

// function component ada react hooks system yang menghasilkan tampilan sama dgn class component
// konfigurasi projek function component lebih mudah dipahami
// bebas tergantung perusahaan prefer component yg mana
// functional untuk komponen kecil seperti navbar
// class component untuk bagian kompleks