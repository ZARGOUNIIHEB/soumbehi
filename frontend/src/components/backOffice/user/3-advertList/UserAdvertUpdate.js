import Slider from "react-slick";
import "./userAdvertUpdate.css";

import AddAdvert from "./addAdvert/AddAdvert";
import { postAdverts } from '../../../../api/AdvertsApi';

import { useState, useEffect, useRef } from "react";

const UserAdvertUpdate = ({ clickCard, user, hide, adverts, setAdverts }) => {

    console.log("clickCard :", clickCard);
    console.log("adverts from UserAdvertUpdate :", adverts[0] ? adverts[0].imageAdvert : []);
    const [imageArray, setImageArray] = useState([]);
    const [neverEmpty, setNeverEmpty] = useState([]);

    useEffect(() => {

        if (clickCard && clickCard.imageAdvert && clickCard.imageAdvert.length > 0) {

            setImageArray(clickCard.imageAdvert);
            setNeverEmpty(clickCard);
        } else {
            setImageArray(adverts[0] ? adverts[0].imageAdvert : []);
            setNeverEmpty(adverts[0] ? adverts[0] : []);
        }


    }, [clickCard, adverts]);


    console.log("imageArray :", imageArray);


    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const handleAdd = async (values) => {
        await postAdverts(values);
        //  console.log("values:", [...adverts, values]);
        setAdverts([...adverts, values]);
    }
    // console.log("Hide from User advert update:", hide);
    // console.log("Adverts from User Advert update: ", adverts);
    return (
        <>
            {hide ?
                (<section className="informationDisplay">
                    <div style={{ justifyContent: "space-between" }} className="flex">
                        <section className="displayAdvetUser">
                            <div className="displayTopUser" style={{ margin: "30px", width: "40rem" }}>
                                <Slider {...settings}

                                    style={{ width: "25rem" }}>
                                    {imageArray.map((el) =>
                                        <div key={el._id} >
                                            <img style={{ width: "25rem", height: "20rem", objectFit: "cover", borderRadius: "20px" }}
                                                src={`/${el.path}`}></img>
                                        </div>)}
                                </Slider >
                            </div >
                        </section >
                        <section className="InformationAdvert">
                            <div className="advert-details-container">
                                <div className="advert-detail-row">
                                    <output className="advert-detail-label">Title:</output>
                                    <output className="advert-detail-value">{neverEmpty.title}</output>
                                </div>
                                <div className="advert-detail-row">
                                    <output className="advert-detail-label">Type:</output>
                                    <output className="advert-detail-value">{neverEmpty.type}</output>
                                </div>
                                <div className="advert-detail-row">
                                    <output className="advert-detail-label">Description:</output>
                                    <output className="advert-detail-value"
                                        style={{ textAlign: "justify" }}
                                    >{neverEmpty.description}</output>
                                </div>
                                <div className="advert-detail-row">
                                    <output style={{ textAlign: "right", width: "90%" }}>Price :</output>
                                    <output style={{ textAlign: "right", paddingLeft: "5px" }}>{clickCard.price}</output>
                                    <output style={{ textAlign: "right", paddingLeft: "5px" }}>DT</output>
                                </div>
                            </div>
                        </section>
                    </div >
                </section >)
                :
                (
                    <AddAdvert user={user} handleAdd={handleAdd} />
                )}
        </>
    );
}
export default UserAdvertUpdate;