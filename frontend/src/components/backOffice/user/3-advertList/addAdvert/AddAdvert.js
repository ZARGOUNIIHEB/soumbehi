import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, MenuItem, Snackbar, Stack } from "@mui/material";
import { styled } from '@mui/material/styles';
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";


import { data, dataType, dataCity, dataCategory, dataDelegation, dataSubCategory, dataProductCondition } from './Data';




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

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const AddAdvert = ({ user, handleAdd }) => {


    const [hide, setHide] = useState(true);
    const [switchOnOff, setSwitchOnOff] = useState(false);

    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [city, setCity] = useState('');
    const [delegation, setDelegation] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [productCondition, setProductCondition] = useState('');
    const [imageAdvert, setImageAdvert] = useState([]);
    const [userAdvert, setUserAdvert] = useState(user.email);
    const [advertState, setAdvertState] = useState('Under review');

    //////////////////Images section Begin //////////////////
    const [selectedFiles, setSelectedFiles] = useState(null);

    const handleFileChange = (e) => {
        e.preventDefault();
        setSelectedFiles(e.target.files);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('images', selectedFiles[i]);
        }
        try {
            const response = await axios.post('http://localhost:5004/upload-images', formData);
            const result = response.data.uploadedFiles;
            const arrayImages = [];
            for (let i = 0; i < result.length; i++) {
                const imageObject = { "path": `\\images\\${result[i].filename}` };
                arrayImages.push(imageObject);
            }
            setImageAdvert(arrayImages);
        } catch (error) {
            console.error('Error uploading files:', error);
        }
        setSwitchOnOff(false);
    };


    /////////////////Images section End ///////////////////
    //////////////////// Form Begin /////////////////////////////////
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
        handleAdd({ title, type, price, city, delegation, category, subCategory, productCondition, imageAdvert, userAdvert, advertState });
        handleClick();
        setTitle('');
        setPrice('');
    }
    const handleClick = () => {
        setOpen(true);
    };
    /////////////////// Form End ///////////////////////////////////

    return (<section className="informationUpdate">
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

                <TextField
                    sx={{ flex: 1, input: { color: "var(--subtitle)" }, label: { color: "var(--subtitle)" } }}
                    label="Title"
                    variant="filled"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel
                            variant="standard" htmlFor="uncontrolled-native"
                            sx={{ color: "var(--subtitle)" }}>
                            Type
                        </InputLabel>
                        <NativeSelect sx={{ color: "var(--subtitle)" }}
                            defaultValue={type}
                            onChange={(e) => { setType(e.target.value) }}
                        >
                            {dataType.map((option) => (
                                <option key={option.value}>{option.value}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </Box>
                <TextField
                    sx={{ flex: 1, input: { color: "var(--subtitle)" }, label: { color: "var(--subtitle)" } }}
                    label="Price"
                    variant="filled"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <Stack sx={{ gap: 2 }} direction={"row"}>
                    <Box sx={{ width: 600 }}>
                        <FormControl fullWidth>
                            <InputLabel
                                variant="standard" htmlFor="uncontrolled-native"
                                sx={{ flex: 1, color: "var(--subtitle)" }}>
                                City
                            </InputLabel>
                            <NativeSelect sx={{ color: "var(--subtitle)" }}
                                defaultValue={city}
                                onChange={(e) => setCity(e.target.value)}
                            >
                                {data.map((option) => (
                                    <option key={option.value}>{option.value}</option>
                                ))}
                            </NativeSelect>
                        </FormControl>
                    </Box>
                    <Box sx={{ width: 600 }}>
                        <FormControl fullWidth>
                            <InputLabel
                                variant="standard" htmlFor="uncontrolled-native"
                                sx={{ flex: 1, color: "var(--subtitle)" }}>
                                Delegation
                            </InputLabel>
                            <NativeSelect sx={{ color: "var(--subtitle)" }}
                                defaultValue={delegation}
                                onChange={(e) => { setDelegation(e.target.value) }}
                            >
                                {dataDelegation.map((option) => (
                                    <option key={option.value}>{option.value}</option>
                                ))}
                            </NativeSelect>
                        </FormControl>
                    </Box>
                </Stack>
                <Stack sx={{ gap: 2 }} direction={"row"}>
                    <Box sx={{ width: 600 }}>
                        <FormControl fullWidth>
                            <InputLabel
                                variant="standard" htmlFor="uncontrolled-native"
                                sx={{ flex: 1, color: "var(--subtitle)" }}>
                                Category
                            </InputLabel>
                            <NativeSelect sx={{ color: "var(--subtitle)" }}
                                defaultValue={category}
                                onChange={(e) => { setCategory(e.target.value) }}
                            >
                                {dataCategory.map((option) => (
                                    <option key={option.value}>{option.value}</option>
                                ))}
                            </NativeSelect>
                        </FormControl>
                    </Box>
                    <Box sx={{ width: 600 }}>
                        <FormControl fullWidth>
                            <InputLabel
                                variant="standard" htmlFor="uncontrolled-native"
                                sx={{ flex: 1, color: "var(--subtitle)" }}>
                                SubCategory
                            </InputLabel>
                            <NativeSelect sx={{ color: "var(--subtitle)" }}
                                defaultValue={subCategory}
                                onChange={(e) => { setSubCategory(e.target.value) }}
                            >
                                {dataSubCategory.map((option) => (
                                    <option key={option.value}>{option.value}</option>
                                ))}
                            </NativeSelect>
                        </FormControl>
                    </Box>
                </Stack>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel
                            variant="standard" htmlFor="uncontrolled-native"
                            sx={{ flex: 1, color: "var(--subtitle)" }}>
                            Product Condition
                        </InputLabel>
                        <NativeSelect sx={{ color: "var(--subtitle)" }}
                            defaultValue={productCondition}
                            onChange={(e) => { setProductCondition(e.target.value) }}
                        >
                            {dataProductCondition.map((option) => (
                                <option key={option.value}>{option.value}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </Box>

                <Box sx={{ textAlign: "right" }}>
                    <Snackbar
                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}>
                        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
                            Advert added successfully
                        </Alert>
                    </Snackbar>
                    {/* Image */}
                    <Stack sx={{ gap: 2 }} direction={"row"}>
                        <TextField label="Picture" variant="filled"
                            sx={{ flex: 1, input: { color: "var(--subtitle)" }, label: { color: "var(--subtitle)" } }} />
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}
                            onClick={() => setSwitchOnOff(true)}
                            disabled={switchOnOff}>
                            Upload Picture
                            <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple
                            />
                        </Button>
                        <Button
                            type="submit"
                            sx={{ textTransform: "capitalize" }}
                            variant="contained"
                            onClick={handleUpload}
                            disabled={!switchOnOff}
                        >
                            Update Picture
                        </Button>
                    </Stack>
                    {/* Image */}
                </Box>
                <Box sx={{ textAlign: "right" }}>
                    <Button
                        type="submit"
                        sx={{ textTransform: "capitalize" }}
                        variant="contained">
                        Add Advert
                    </Button>
                    <Snackbar
                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}>
                        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
                            Advert added successfully
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>


        </Box>
    </section >);
}
export default AddAdvert;