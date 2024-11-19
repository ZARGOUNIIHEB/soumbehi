import Sign from "../6-sign/Sign";

import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


import './header.css';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';

const Header = () => {
    const [theme, setTheme] = useState(localStorage.getItem("currentMode") ?? "dark");
    const [showModal, setShowModal] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);

    const navigate = useNavigate();

    const user = useSelector(state => state.userElement);


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
        <header className="flex">
            <button className="menu icon-menu flex" onClick={() => setShowModal(true)} />
            <nav>
                <ul className="flex">
                    <>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <a href="/">Dashboard</a>
                        </li>
                        <li>
                            <a href="/">New Adverts</a>
                        </li>
                        <li>
                            <a href="">Last Added</a>
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
                </ul>
            </nav>
            <button onClick={() => {
                //Send to LS
                localStorage.setItem("currentMode", theme === "dark" ? "light" : "dark");
                //Get from LS
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
                            <li><a href="">Home</a></li>
                            <li><a href="">Dashboard</a></li>
                            <li><a href="">New Adverts</a></li>
                            <li><a href="">Last Added</a></li>
                            <li>
                                <button className="mode flex"
                                    onClick={() => { setShowLoginForm(true); setShowModal(false); }}><LoginIcon style={{ color: "green" }}></LoginIcon></button>
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
                        <Sign setShowLoginForm={setShowLoginForm} />
                    </div>)
            }

        </header >
    );
}
export default Header;