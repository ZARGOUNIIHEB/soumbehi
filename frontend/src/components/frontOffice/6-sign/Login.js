// Material UI Imports
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import bcrypt from 'bcryptjs'
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchAccount } from '../../../api/UsersApi';
import UserZone from '../../backOffice/user/UserZone';
import {
    TextField, InputAdornment, FormControl, InputLabel, IconButton, Button, Input, Checkbox, Alert,
    Stack,
} from "@mui/material";

// Material UI Icon Imports
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

// Email Validation
const isEmail = (mail) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail);

export default function Login() {

    const [showPassword, setShowPassword] = React.useState(false);

    //Inputs
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [rememberMe, setRememberMe] = useState();

    // Inputs Errors
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    // Overall Form Validity
    const [formValid, setFormValid] = useState();
    const [success, setSuccess] = useState();
    const [verif, setVerif] = useState("")

    const navigate = useNavigate();
    // Handles Display and Hide Password
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Label for Checkbox
    const label = { inputProps: { "aria-label": "Checkbox demo" } };

    // Validation for onBlur Email
    const handleEmail = () => {
        console.log(isEmail(email));
        if (!isEmail(email)) {
            setEmailError(true);
            return;
        }

        setEmailError(false);
    };

    // Validation for onBlur Password
    const handlePassword = () => {
        if (
            !password ||

            password.length < 5 ||

            password.length > 20
        ) {
            setPasswordError(true);
            return;
        }

        setPasswordError(false);
    };

    const submitLogin = async (values) => {
        setSuccess("false");
        console.log("provided email:", values.email);
        console.log("provided password:", values.password);
        try {
            const res = await axios.post('http://localhost:5000/user/signin', values);
            console.log('reponse login', res.data.token);
            localStorage.setItem('token', res.data.token);
            const data = await fetchAccount();
            console.log("email from MongoDB", data.email);
            console.log("Password from MongoDB :", data.password);

            console.log("email res:", values.email)
            console.log("password res:", values.password)

            const test = bcrypt.compareSync(values.password, data.password)
            console.log("test", test)

            if ((values.email === data.email) && (test)) {

                if ((data.role === "Admin")) {
                    navigate("/dashboardadmin");
                } else {
                    console.log("success", success)
                    setSuccess("form submitted successfully");
                    navigate("/userzone");
                }
            } else {

                setFormValid("incorrect")
                // navigate("/");

            }


        } catch (err) {
            console.log(err);
        }

    }

    //handle Submittion
    const handleSubmit = () => {


        //First of all Check for Errors

        // If Email error is true
        if (emailError || !email) {

            setFormValid("Email is Invalid. Please Re-Enter");
            return;
        }

        // If Password error is true
        if (passwordError || !password) {

            setFormValid(

                "Password is set btw 5 - 20 characters long. Please Re-Enter"
            );
            return;
        }
        setFormValid(null);

        console.log("verif=", verif)
        submitLogin({ email, password });

    };

    return (
        <div>
            <div style={{ marginTop: "5px" }}>
                <TextField
                    label="Email Address"
                    fullWidth
                    error={emailError}
                    id="standard-basic"
                    variant="standard"
                    sx={{ width: "100%", input: { color: "#fff" }, label: { color: "#fff" } }}
                    value={email}
                    InputProps={{}}
                    size="small"
                    onBlur={handleEmail}
                    onChange={(event) => {

                        setEmail(event.target.value);
                    }}
                />
            </div>
            <div

            >
                <FormControl sx={{ width: "100%" }} variant="standard">
                    <InputLabel
                        error={passwordError}
                        htmlFor="standard-adornment-password"
                        sx={{ color: "#fff" }}
                    >
                        Password
                    </InputLabel>
                    <Input
                        error={passwordError}
                        onBlur={handlePassword}
                        id="standard-adornment-password"
                        type={showPassword ? "text" : "password"}
                        onChange={(event) => {

                            setPassword(event.target.value);
                        }}
                        value={password}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    sx={{ color: "#fff" }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </div>

            <div

                fontSize="10px" style={{ color: "#fff" }}>
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
                    fullWidth
                    startIcon={<LoginIcon />}
                    onClick={handleSubmit}

                >
                    LOGIN
                </Button>
            </div>

            {/* Show Form Error if any */}
            {
                formValid && (
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
                )
            }

            {/* Show Success if no issues */}
            {
                success && (
                    <>
                        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                            <Alert severity="success"
                                size="small">
                                {success}
                            </Alert>
                        </Stack>

                    </>
                )
            }

            <div style={{ marginTop: "7px", fontSize: "10px", color: "#fff" }}

                margin="left">
                <a style={{ color: "#fff" }}>Forgot Password</a>
                <br />
                Do you have an account ?{" "}
                <small style={{ textDecoration: "underline", color: "blue" }}>
                    Sign Up
                </small>
            </div>
        </div >
    );
}