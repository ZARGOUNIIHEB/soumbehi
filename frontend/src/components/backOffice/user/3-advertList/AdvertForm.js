//----------------- Styling Zone --------------------//
//-----------------Libraries Zone -------------------//
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
//----------------- Components Zone -----------------//
import { fetchAccount } from "../../../../api/UsersApi";
import { setUser } from "../../../../redux/UserSlice";
import { setAdvert } from "../../../../redux/AdvertSlice";
import { getAdvertsByUserAdvert } from "../../../../api/AdvertsApi";
import HeaderUser from '../1-headerUser/HeaderUser';
import Footer from '../../../frontOffice/5-footer/Footer';
import UserAdvertsDisplay from './UserAdvertsDisplay';
import UserAdvertUpdate from './UserAdvertUpdate';

const AdvertForm = () => {
    const [hide, setHide] = useState(true);

    const user = useSelector(state => state.userElement);
    const dispatch = useDispatch();

    const advertRedux = useSelector(state => state.advertElement);
    // console.log("Advert Redux: ", advertRedux);
    const [adverts, setAdverts] = useState([]);
    const [clickCard, setClickCard] = useState(adverts[0] ? adverts[0] : {});

    const getAuth = async () => {
        const data = await fetchAccount();
        dispatch(setUser(data));
    }
    useEffect(() => {
        getAuth();
    }, []);

    const getUserAdvert = async (el) => {
        try {
            const data = await getAdvertsByUserAdvert(el);
            // dispatch(setAdvert(data.advert));
            setAdverts(data.advert);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getUserAdvert(user.email);
    }, [user]);
    return (
        <>
            <div className='divider' />
            <UserAdvertsDisplay setClickCard={setClickCard} setHide={setHide} adverts={adverts} />
            <div className='divider' />
            <UserAdvertUpdate clickCard={clickCard} user={user} hide={hide} adverts={adverts} setAdverts={setAdverts} />
        </>
    );
}
export default AdvertForm;