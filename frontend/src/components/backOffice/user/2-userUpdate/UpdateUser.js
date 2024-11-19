// @ts-nocheck
//----------------- Styling Zone --------------------//
import "./updateUser.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, MenuItem, Snackbar, Stack } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
//-----------------Libraries Zone -------------------//
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
//----------------- Components Zone -----------------//
import { updateUser } from "../../../../api/UsersApi";
import { fetchAccount } from "../../../../api/UsersApi";
import { setUser } from "../../../../redux/UserSlice";
import HomePage from "../../../frontOffice/HomePage";
import HeaderUser from '../1-headerUser/HeaderUser';
import Footer from '../../../frontOffice/5-footer/Footer';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const data = [
    {
        value: "Admin",
        label: "Admin",
    },
    {
        value: "User",
        label: "User",
    },
];

const UpdateUser = () => {
    // @ts-ignore
    const user = useSelector((state) => state.userElement);
    const dispatch = useDispatch();

    console.log("This is user from profil :", user);

    const [switchOnOff, setSwitchOnOff] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [imageUser, setImageUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const updatePictureRef = useRef('');

    const getAuth = async () => {
        const data = await fetchAccount();
        dispatch(setUser(data));
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setRole(data.role);
        setAge(data.age);
        setPhone(data.phone);
        setImageUser(data.imageUser);
        setEmail(data.email);
        setPassword(data.password);
    }
    useEffect(() => {
        getAuth();
    }, []);

    const token = localStorage.getItem("token");

    const submitImageUser = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("imageUser", imageUser);
        console.log("formData:", formData);
        const result = await axios.post(
            "http://localhost:5000/upload-image",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        setImageUser(`/images/${result.data}`);
        setSwitchOnOff(false);
    };

    const handleAdd = async (id, value) => {
        await updateUser(id, value);
    }

    const onInputChange = (e) => {
        setImageUser(e.target.files[0]);
    };
    //////////////////////////////////

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const onSubmit = () => {
        handleAdd(user._id, { firstName, lastName, role, age, phone, imageUser, email, password });
        dispatch(setUser({ firstName, lastName, role, age, phone, imageUser, email, password }))
        handleClick();
    };
    const handleClick = () => {
        setOpen(true);
    };

    return (
        <>
            {token ?
                (<div>
                    <Box sx={{ marginTop: 15 }}>
                        <Box onSubmit={handleSubmit(onSubmit)}
                            component="form"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 3,
                            }}
                            noValidate
                            autoComplete="off">
                            <Stack sx={{ gap: 2 }} direction={"row"}>

                                <TextField
                                    error={Boolean(errors.firstName)}
                                    helperText={
                                        Boolean(errors.firstName)
                                            ? "This field is required & min 3 character"
                                            : null
                                    }
                                    {...register("firstName", { minLength: 3 })}
                                    sx={{ flex: 1, input: { color: "var(--subtitle)" }, label: { color: "var(--subtitle)" } }}
                                    label="First Name"
                                    variant="filled"
                                    value={firstName}
                                    onChange={(e) => { setFirstName(e.target.value) }} />

                                <TextField
                                    error={Boolean(errors.lastName)}
                                    helperText={
                                        Boolean(errors.lastName)
                                            ? "This field is required & min 3 character"
                                            : null
                                    }
                                    {...register("lastName", { minLength: 3 })}
                                    sx={{ flex: 1, input: { color: "var(--subtitle)" }, label: { color: "var(--subtitle)" } }}
                                    label="Last Name"
                                    variant="filled"
                                    value={lastName}
                                    onChange={(e) => { setLastName(e.target.value) }} />
                            </Stack>
                            <TextField
                                error={Boolean(errors.email)}
                                helperText={
                                    Boolean(errors.email) ? "Please provide a valid email address" : null
                                }
                                {...register("email", { pattern: regEmail })}
                                sx={{ input: { color: "var(--subtitle)" }, label: { color: "var(--subtitle)" } }}
                                label="Email"
                                variant="filled"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }} />
                            <TextField
                                error={Boolean(errors.password)}
                                helperText={
                                    Boolean(errors.password)
                                        ? "This field is required & min 8 character"
                                        : null
                                }
                                {...register("password", { minLength: 8 })}
                                sx={{ flex: 1, input: { color: "var(--subtitle)" }, label: { color: "var(--subtitle)" } }}
                                label="Password"
                                variant="filled"
                                type="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }} />
                            <TextField
                                error={Boolean(errors.phone)}
                                helperText={
                                    Boolean(errors.phone)
                                        ? "Please provide a valid Phone number"
                                        : null
                                }
                                {...register("phone", { pattern: phoneRegExp })}
                                sx={{ input: { color: "var(--subtitle)" }, label: { color: "var(--subtitle)" } }}
                                label="Phone Number"
                                variant="filled"
                                value={phone}
                                onChange={(e) => { setPhone(e.target.value) }} />
                            {/* Image */}
                            <Stack sx={{ gap: 2 }} direction={"row"}>
                                <TextField label="Picture" variant="filled"
                                    sx={{ flex: 1, input: { color: "var(--subtitle)" }, label: { color: "var(--subtitle)" } }}
                                    value={imageUser}
                                    onChange={(e) => { setImageUser(e.target.value) }} />
                                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}
                                    onClick={() => setSwitchOnOff(true)}
                                    disabled={switchOnOff}
                                >
                                    Upload Picture
                                    <VisuallyHiddenInput type="file" onChange={onInputChange} />
                                </Button>
                                <Button
                                    type="submit"
                                    sx={{ textTransform: "capitalize" }}
                                    variant="contained"
                                    onClick={submitImageUser}
                                    disabled={!switchOnOff}>
                                    Update Picture
                                </Button>
                            </Stack>
                            {/* Image */}

                            <TextField label="Age" variant="filled"
                                sx={{ input: { color: "var(--subtitle)" }, label: { color: "var(--subtitle)" } }}
                                value={age}
                                onChange={(e) => { setAge(e.target.value) }}
                            />
                            {/* <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        variant="standard" htmlFor="uncontrolled-native"
                                        sx={{ color: "var(--subtitle)" }}>
                                        Role
                                    </InputLabel>
                                    <NativeSelect
                                        sx={{ color: "var(--subtitle)" }}
                                        defaultValue={role}
                                        onChange={(e) => { setRole(e.target.value) }}
                                        disable>
                                        {data.map((option) => (
                                            <option>{option.value}</option>
                                        ))}
                                    </NativeSelect>
                                </FormControl>
                            </Box> */}
                            <Box sx={{ textAlign: "right" }}>
                                <Button
                                    type="submit"
                                    sx={{ textTransform: "capitalize" }}
                                    variant="contained">
                                    Update User
                                </Button>
                                <Snackbar
                                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                    open={open}
                                    autoHideDuration={3000}
                                    onClose={handleClose}>
                                    <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
                                        Account updated successfully
                                    </Alert>
                                </Snackbar>
                            </Box>

                        </Box>

                    </Box>
                </div >) : (<HomePage />)
            }
        </>);
}
export default UpdateUser;