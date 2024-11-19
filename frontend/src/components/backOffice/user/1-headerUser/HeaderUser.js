

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { fetchaccount } from "../../../../api/UsersApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../../redux/UserSlice";

import './headerUser.css';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';

const HeaderUser = ({ user }) => {

    // const user = useSelector(state => state.userElement);
    // const dispatch = useDispatch();

    // console.log("User from HeaderUser:", user);
    // console.log("Image user :", user.imageUser);

    const [theme, setTheme] = useState(localStorage.getItem("currentMode") ?? "dark");
    const [showModal, setShowModal] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);

    const navigate = useNavigate();

    //------------             Begin switching the mode             ------------//

    useEffect(() => {
        if (theme === "light") {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
        } else {
            document.body.classList.remove("light");
            document.body.classList.add("dark");
        }
    }, [theme]);

    //------------             End switching the mode             ------------//
    //------------             Begin Token Zone             ------------//

    const token = localStorage.getItem('token');

    const logout = () => {
        localStorage.removeItem('token');
        navigate("/");
    }
    //------------             End Token Zone             ------------//

    return (
        <header className="headerUser flex">
            {token ? (<div className="session-form flex">
                <div className="icon-session">
                    {user.imageUser != '' ? (
                        <img className="img-session" src={user.imageUser} alt='Original' />
                    ) : (

                        <img className="img-session" src="images/profil.jpg" alt='default' />
                    )}

                </div>
                {user.firstName}
            </div>) : (<></>)}
            <button className="menu icon-menu flex" onClick={() => setShowModal(true)} />

            <nav>
                <ul className="flex">
                    {token ? (
                        <>
                            <li>
                                <Link to="/userzone">Home</Link>
                            </li>
                            <li>
                                <Link to="/userzone/profile">Profile</Link>
                            </li>
                            <li>
                                <Link to="/userzone/advert">
                                    <button className="mode flex"><NoteAddOutlinedIcon></NoteAddOutlinedIcon></button>
                                </Link>
                            </li>
                            <li>
                                <button className="mode flex"
                                    onClick={() => logout()}><LogoutIcon style={{ color: "red" }}></LogoutIcon></button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <a href="">Nav 2</a>
                            </li>
                            <li>
                                <a href="">Nav 3</a>
                            </li>
                            <li>
                                <a href="">Nav 4</a>
                            </li>
                            <li>
                                <Link to="">
                                    <button className="mode flex"><NoteAddOutlinedIcon></NoteAddOutlinedIcon></button>
                                </Link>
                            </li>
                            <li>
                                <button className="mode flex"
                                    onClick={() => setShowLoginForm(true)}><LoginIcon style={{ color: "green" }}></LoginIcon></button>
                            </li>
                        </>
                    )}


                </ul>
            </nav>
            <button onClick={() => {

                localStorage.setItem("currentMode", theme === "dark" ? "light" : "dark");

                setTheme(localStorage.getItem("currentMode"));
            }
            }
                className="mode flex">
                {theme === "dark" ? (<span className="icon-moon-o"></span>) : <span className="icon-sun"></span>}
            </button>
            {
                showModal && (
                    <div className="fixed">
                        <ul className="modal">
                            <li>
                                <button className="icon-close" onClick={() => setShowModal(false)} />
                            </li>
                            <li><a href="">Nav 1</a></li>
                            <li><a href="">Nav 2</a></li>
                            <li><a href="">Nav 3</a></li>
                            <li><a href="">Nav 4</a></li>
                            <li>
                                <button className="mode flex"
                                    onClick={() => { setShowLoginForm(true); setShowModal(false); }}></button>
                            </li>
                        </ul>
                    </div>)
            }

            {/* ========================
           Login / Sign up
        ===========================  */}

            {
                showLoginForm && (
                    <div className="loginForm">

                        {/* <ul className="loginModal">
                    <li>
                        <button className="icon-close" onClick={() => setShowLoginForm(false)} />
                    </li>
                    <li><a href="">Item 1</a></li>
                    <li><a href="">Item 2</a></li>
                    <li><a href="">Item 3</a></li>
                    <li><a href="">Item 4</a></li>
                    <li><a href="">Item 5</a></li>
                </ul> */}
                    </div>)
            }

        </header >
    );
}
export default HeaderUser;