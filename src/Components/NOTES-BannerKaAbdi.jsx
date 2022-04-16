import React, { useState } from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import Axios from 'axios';

const API_URL = "http://localhost:5000";

const Banner = (props) => {

    const [bannerList, setBannerList] = useState([])

    // componentDidMount pada functional component
    React.useEffect(() => {
        getBanner();
    }, [])

    const getBanner = () => {
        Axios.get(`${API_URL}/banner`)
            .then((response) => {
                console.log("From Functional COmponent :", response.data)
                setBannerList(response.data);
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <UncontrolledCarousel
            items={bannerList}
        />
    )
}

export default Banner;