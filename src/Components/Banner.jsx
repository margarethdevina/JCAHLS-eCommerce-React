import React, { useState } from "react";
// useState di distructuring di awal pas import React
import { UncontrolledCarousel } from "reactstrap";

const Banner = (props) => {

    // data bannerList di bawah ini yg biasa disimpan di API biar lebih ringan pemanggilannya
    const [bannerList, setBannerList] = useState([
        {
            key: 1,
            src: 'https://a.m.dana.id/danaweb/promo/1649482098-DANA-CARD-NIVAL-2.png'
        },
        {
            key: 2,
            src: 'https://i2.wp.com/sobatpromo.com/wp-content/uploads/2020/06/Promo-Spesial-Pengguna-Baru-DANA-Bonus-Voucher-Belanja-40.png'
        },
        {
            key: 3,
            src: 'https://i2.wp.com/sobatpromo.com/wp-content/uploads/2020/06/Promo-Spesial-Pengguna-Baru-DANA-Bonus-Voucher-Belanja-40.png'
        }
    ])

    return (
        <UncontrolledCarousel 
         items={bannerList}
        />

    )

}

export default Banner;