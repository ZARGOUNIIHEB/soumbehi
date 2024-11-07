//Material UI Imports
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { fetchAccount } from '../../../api/UsersApi';

import {
    TextField, InputAdornment, FormControl, InputLabel,
    IconButton, Button, Input, Checkbox, Alert, Stack
} from "@mui/material";

// Material UI Icon Imports
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

// Email Validation
const isEmail = (mail) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail);

export default function Login() {

    const Navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    //Inputs
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [rememberMe, setRememberMe] = useState();

    //Inputs Errors
    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();

    //Overall Form Validity

    const [formValid, setFormValid] = useState();
    const [success, setSuccess] = useState();


    // Handles Display and Hide 
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Label for Checkbox

    const label = { inputProps: { "arial-label": "Checkbox demo" } };

    // Validation for onBlur Email

    const handleEmail = () => {
        console.log(isEmail(email));
        if (!isEmail(email)) {
            setEmailError(true);
            return;
        }
        setEmailError(false);
    };

    // Validation for OnBlur Password

    const handlePassword = () => {
        if (!password || password.length < 8 || password.length > 20) {
            setPasswordError(true);
            return;
        }
        setPasswordError(false);
    };

    const submitLogin = async (values) => {
        console.log("provided email:", values.email);
        console.log("provided password:", values.password);
        try {
            const res = await axios.post('http://localhost:5000/user/signin', values);
            console.log('reponse login', res.data.token);
            localStorage.setItem('token', res.data.token);
            const data = await fetchAccount();
            console.log("email from MongoDB", data.email);
            console.log("Password from MongoDB:", data.password);
            if ((values.email === data.email) && (values.password === data.password)) {
                if ((data.role === "Admin")) {
                    Navigate("/");
                } else {
                    Navigate("/");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    //handle Submittion
    const handleSubmit = () => {
        setSuccess(null);
        //First of all Check for Errors
        //If Email error is true
        if (emailError || !email) {
            setFormValid("Email is Invalid. Please Re-Enter");
            return;
        }
        // If Password error is true
        if (passwordError || !password) {
            setFormValid("Password is set btw 8 - 20 characters long. Please Re-Enter");
            return;
        }
        setFormValid(null);

        //Proceed to use the information passed 
        console.log("Email :" + email);
        console.log("Password :" + password);
        console.log("Remember me :" + rememberMe);
        //Show Successfull Submission
        setSuccess("Form Submitted Successfully");
        submitLogin({ email, password });
    };
    return (
        <div>
            <div style={{ marginTop: "5px" }}>
                <TextField
                    label="Email Address"
                    fullWidtherror={emailError}
                    id="standard-basic"
                    variant="standard"
                    sx={{ width: "100%", input: { color: "#fff" }, label: { color: "#fff" } }}
                    value={email}
                    InputProps={{}}
                    size="small"
                    onBlur={handleEmail}
                    onChange={(event) => { setEmail(event.target.value) }}
                />
            </div>
            <div>
                <FormControl sx={{ width: "100%" }} variant="standard">
                    <InputLabel
                        error={passwordError}
                        htmlFor="standard-adornment-password"
                        sx={{ color: "#fff" }}
                    >Password</InputLabel>
                    <Input
                        error={passwordError}
                        onBlur={handlePassword}
                        id="standard-adornment-password"
                        type={showPassword ? "text" : "password"}
                        onChange={(event) => { setPassword(event.target.value) }}
                        value={password}
                        endEdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    arial-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    sx={{ color: "#fff" }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </div>
            <div fontSize="10px" style={{ color: "#fff" }}>
                <Checkbox
                    {...label}
                    size="small"
                    sx={{ color: "#fff" }}
                    onChange={(event) => setRememberMe(event.target.checked)}
                />
                Remember Me
            </div>
            <div>
                <Button
                    variant="contained"
                    fullWidthstartIcon={<LoginIcon />}
                    onClick={handleSubmit}
                >
                    LOGIN
                </Button>
            </div>
            {formValid && (
                <>
                    <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                        <Alert severity="error"
                            size="small">
                            {formValid}
                        </Alert>
                    </Stack>
                    <Snackbar
                        autoHideDuration={6000}
                        message="Note archived"
                    />
                </>
            )}
            {success && (
                <>
                    <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                        <Alert severity='success'
                            size="small">
                            {success}
                        </Alert>
                    </Stack>
                </>
            )
            }
            <div style={{ marginTop: "7px", fontSize: "10px", color: "#fff" }}
                margin="left">
                <a style={{ color: "#fff" }}>Forget Password</a>
                <br />
                Do you have an account ?{" "}
                <small style={{ textDecoration: "underline", color: "blue" }}>
                    Sign Up
                </small>
            </div>
        </div >
    )
}