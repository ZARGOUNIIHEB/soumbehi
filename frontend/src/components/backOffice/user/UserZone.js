import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { fetchAccount } from "../../../api/UsersApi";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../../../redux/UserSlice";
import { Outlet } from "react-router";

import HomePage from "../../frontOffice/HomePage";
import HeaderUser from "./1-headerUser/HeaderUser";

import Footer from '../../frontOffice/5-footer/Footer';

const UserZone = () => {
    const Adverts = useSelector(state => state.advertElement);
    const navigate = useNavigate();

    const user = useSelector(state => state.userElement);
    const dispatch = useDispatch();
    const getAuth = async () => {
        const data = await fetchAccount();
        dispatch(setUser(data));
    }
    useEffect(() => {
        getAuth();
    }, []);
    const token = localStorage.getItem("token");
    return (
        <>
            {token ?
                (<div>
                    <HeaderUser user={user} />
                    <Outlet />
                    <div className='divider' />
                    <Footer />
                </div>) : (<HomePage />)}
        </>
    );
}
export default UserZone;
