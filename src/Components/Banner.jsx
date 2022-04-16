import React, { useState, useEffect } from "react";
// useState di distructuring di awal pas import React
// useEffect sebagai pengganti componentDidMount di class component
// klo useEffect ga diimpor tinggal dipanggil dibawah pakai React.useEffect()
import { UncontrolledCarousel } from "reactstrap";
import Axios from 'axios';

const API_URL = "http://localhost:5000";

const Banner = (props) => {

    // kalau properti props yg dikirimkan banyak bisa pakai:
    //1️⃣
    // let {bannerList} = props 
    //2️⃣ 
    // const Banner = ({bannerList})
    // kalau propsnya ada banyak tinggal panggil dalam kurung kurawalnya
    // const Banner = ({bannerList, xxx, xxx})
    // nantinya disaat mau dipakai bisa panggil bannerList aja

    // data bannerList di bawah ini yg biasa disimpan di API biar lebih ringan pemanggilannya
    const [bannerList, setBannerList] = useState([])
    
    // componentDidMount cuma jalan sekali aja di awal render
    // componentDidUpdate akan selalu tertrigger tiap kali ada perubahan state.
    // contoh componentDidUpdate
    // React.useEffect(()=>{ // () blank argumen = parameter nya adalah callback
    //     getBanner();
    // })

    // contoh panggil componentDidMount untuk function component
    React.useEffect(()=>{
        getBanner();
    }, []) // parameter array kosong atau [] membuat useEffect menjadi componentDidMount pd functional component

    const getBanner = () => {
        Axios.get(`${API_URL}/banner`)
        .then((response)=>{
            console.log("From functional component",response.data)
            setBannerList(response.data)
        }).catch((error)=>{
            console.log(error);
        })
    }

    return (
        <div className='container'>
            <UncontrolledCarousel
                //  items={props.bannerList} // ini saat pakai axios di class component di landing page
                className='shadow-sm'
                items={bannerList}
            />
        </div>
    )

}

export default Banner;