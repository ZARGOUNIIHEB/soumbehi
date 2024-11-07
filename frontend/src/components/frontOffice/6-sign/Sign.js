import { useState } from 'react';

import "./sign.css";
import Login from "./Login";
import Signup from "./Signup";

// Material UI imports
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import LockIcon from "@mui/icons-material/Lock";
import FaceIcon from "@mui/icons-material/Face";
import Switch from "@mui/material/Switch";

const Sign = ({ setShowLoginForm }) => {
    const [checked, setChecked] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    return (
        <Paper className="loginModal">
            <button className="icon-close" onClick={() => setShowLoginForm(false)} />
            <div align="center">
                {checked ? (
                    <Chip
                        icon={<LockIcon />}
                        label="Log In"
                        variant="outlined"
                        color="info"
                    />
                ) : (
                    <Chip
                        icon={<FaceIcon />}
                        label="Sign Up"
                        variant="outlined"
                        color="info"
                    />
                )}
                <br />
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "arial-label": "controlled" }}
                />
            </div>
            {checked ?
                <Login />
                :
                <Signup />}
        </Paper>
    );
}
export default Sign;