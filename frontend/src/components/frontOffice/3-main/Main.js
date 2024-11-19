// import { Link } from 'react-router-dom';
import './main.css';
// Partie Redux
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";

import { Link } from 'react-router-dom';


const Main = () => {
    // Partie Redux 
    const Adverts = useSelector(state => state.advertElement);
    const dispatch = useDispatch();
    const [currentActive, setCurrentActive] = useState("all");
    const [arr, setArr] = useState(Adverts);

    useEffect(() => { setArr(Adverts); }, [Adverts]);

    const filterArray = (cat) => {
        const newArray = Adverts.filter((element) => {
            return element.category === cat;
        })
        setArr(newArray);
    }

    console.log("adverts from main:", arr[0].imageAdvert[0].path);
    return (
        <main className="flex">

            <section className="flex left-section">
                <button onClick={() => { setCurrentActive("all"); setArr(Adverts); }}
                    className={currentActive === "all" ? "active" : null}
                >all</button>
                <button onClick={() => { setCurrentActive("clothes"); filterArray("clothes"); }}
                    className={currentActive === "clothes" ? "active" : null}
                >clothes</button>
                <button onClick={() => { setCurrentActive("vacation"); filterArray("vacation"); }}
                    className={currentActive === "vacation" ? "active" : null}
                >vacation</button>
                <button onClick={() => { setCurrentActive("homemade tips"); filterArray("homemade tips"); }}
                    className={currentActive === "homemade tips" ? "active" : null}
                >homemade tips</button>
                <button onClick={() => { setCurrentActive("jobs"); filterArray("job"); }}
                    className={currentActive === "jobs" ? "active" : null}
                >jobs</button>
                <button onClick={() => { setCurrentActive("real estate"); filterArray("real estate"); }}
                    className={currentActive === "real estate" ? "active" : null}
                >real estate</button>
                <button onClick={() => { setCurrentActive("cars"); filterArray("cars"); }}
                    className={currentActive === "cars" ? "active" : null}
                >cars</button>
                <button onClick={() => { setCurrentActive("decoration"); filterArray("decoration"); }}
                    className={currentActive === "decoration" ? "active" : null}
                >decoration</button>
                <button onClick={() => { setCurrentActive("books"); filterArray("books"); }}
                    className={currentActive === "books" ? "active" : null}
                >books</button>
            </section>
            <section className="right-section flex">
                <AnimatePresence>
                    {arr.map((item) => {
                        return (
                            <motion.article
                                layout
                                initial={{ transform: "scale(0)" }}
                                animate={{ transform: "scale(1)" }}
                                transition={{ dumping: 8, type: "spring", stiffness: 50 }}
                                key={item._id}
                                className=" card">
                                <img width={266} src={item.imageAdvert[0].path} alt="" />
                                <div style={{ width: "266px" }} className='box'>
                                    <h1 className="title">{item.title}</h1>
                                    <p className="sub-title">
                                        lorem ipsem
                                    </p>
                                    <div className="flex icons">
                                        <div style={{ gap: "11px" }} className="flex">
                                            <div className='icon-link'></div>
                                        </div>
                                        <Link className="link" to={`/displayadvert/${item._id}`}>
                                            more
                                            <span style={{ alignSelf: "end" }}
                                                className="icon-arrow-right"></span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </AnimatePresence>
            </section>
        </main>
    );
}
export default Main;