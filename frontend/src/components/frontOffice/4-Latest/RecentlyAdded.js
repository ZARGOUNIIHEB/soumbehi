
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";




import './recentlyAdded.css';

// Partie Redux
import { useSelector } from 'react-redux';

function SimpleSlider() {
    const Adverts = useSelector(state => state.advertElement);
    const [arr, setArr] = useState(Adverts);

    useEffect(() => {
        setArr(Adverts);
    }, [Adverts]);
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                {arr.map((item) => {
                    return (
                        <div className="card-last-adverts" >
                            <div style={{ width: "50px", backgroundImage: `url(${item.imageAdvert})` }}>

                                <img width={250} src={item.imageAdvert[0].path}></img>

                            </div>
                        </div>
                    );
                })}
            </Slider >

        </div>

    );
}

export default SimpleSlider;
