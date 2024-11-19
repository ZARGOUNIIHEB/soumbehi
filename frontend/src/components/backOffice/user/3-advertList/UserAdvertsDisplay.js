//----------------- Styling Zone --------------------//
import "./userAdvertsDisplay.css";
import { AnimatePresence, motion } from "framer-motion";


//-----------------Libraries Zone -------------------//
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserAdvertsDisplay = ({ adverts, setClickCard, setHide }) => {

    const [refState, setRefState] = useState('');
    const [advertLoad, setAdvertLoad] = useState([]);

    console.log("Adverts from Display:", adverts);
    useEffect(() => {
        if (adverts.length > 0) {
            const updatedArray = [...adverts];
            const firstAdvert = { ...updatedArray[0] };
            if (firstAdvert._id) {
                firstAdvert._id = "newId";
                updatedArray.push(firstAdvert);
                setAdvertLoad(updatedArray);
            }
        }
    }, [adverts]);

    const myRefs = useRef([]);

    const handleButtonClick = (index) => {
        console.log("index", myRefs.current[index].id);

        if (myRefs.current[index].id === "newId") {
            setHide(false);
        } else {
            const newArray = adverts.find(item => item._id === myRefs.current[index].id);
            setClickCard(newArray);
            setHide(true);
        }
    };
    console.log("AdvertLoad :", advertLoad);

    return (
        <section className="userAdverts flex">
            <AnimatePresence>
                {advertLoad.map((item, index) => {
                    return (<>

                        <motion.article
                            layout
                            initial={{ transform: "scale(0)" }}
                            animate={{ transform: "scale(1)" }}
                            transition={{ dumping: 8, type: "spring", stiffness: 50 }}
                            key={item._id}
                            className={(item._id === "newId") ? "cardPlus" : ((item.advertState === 'Under review') ? "card_Under_Review boxGradient" : "  card")}
                            id={item._id}
                            ref={(el) => (myRefs.current[index] = el)}
                            onClick={() => handleButtonClick(index)}>
                            <img width={177}
                                src={`/${item.imageAdvert[0].path}`}
                                style={{ zIndex: 14 }}
                                alt="" />
                            <div style={{ width: "177px" }} className="box">
                                <h1 className="title">{item.title}</h1>
                                <p className="sub-title">
                                    Lorem ipsum dolor sit amet consectetur elit adipisicing.
                                </p>

                                <div className="flex icons">
                                    <div style={{ gap: "11px" }} className="flex">
                                        <div className="icon-link"></div>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    </>
                    );
                })}
            </AnimatePresence>
        </section >
    );
}
export default UserAdvertsDisplay;