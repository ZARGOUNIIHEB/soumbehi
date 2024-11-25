import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { Alert, Snackbar } from "@mui/material";
import Header from "../../Header";


import { useState, useEffect } from 'react';
import { fetchAllAdverts, updateAdverts } from '../../../../../api/AdvertsApi';

import './adverts.css';



const Adverts = () => {
    const [rows, setRows] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [advertState, setAdvertState] = useState('');
    const [open, setOpen] = useState(false);

    const getAdverts = async () => {
        const data = await fetchAllAdverts();
        let newRow = [];
        for (let i = 0; i < data.adverts.length; i++) {
            newRow[i] = data.adverts[i];
            newRow[i].id = i;
        }
        setRows(newRow);
    }

    const handleShowModal = (row) => {
        setSelectedRow(row);
        setShowModal(true);
    };
    useEffect(() => {
        getAdverts();
    }, [advertState]);

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const approveAdvert = async (id, approval) => {
        console.log("_id :", id);
        console.log("Status :", approval);
        let newApproval = "";
        if (approval === "Approved") {
            newApproval = "Under review";
            setAdvertState("Under review");
            handleClick();
        } else {
            newApproval = "Approved";
            setAdvertState("Approved");
            handleClick();
        }
        try {
            const res = await updateAdverts(id, { advertState: newApproval });
        } catch (err) {
            console.log(err);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    const handleClick = () => {
        setOpen(true);
    };
    return (
        <>
            <Box>
                <Header title="ADVERTS" subTitle="List of Adverts" />
                <Box sx={{ height: 650, mx: "auto" }}>
                    <DataGrid
                        checkboxSelection
                        slots={{
                            toolbar: GridToolbar,
                        }}
                        rows={rows}

                        columns={columns(handleShowModal, setAdvertState)}
                    />
                </Box>
            </Box>

            {
                showModal && (
                    <div className="fixed">
                        <ul className="modal">
                            <li>
                                <button className="icon-close" onClick={() => setShowModal(false)} />
                            </li>
                            <section className="informationDisplay">
                                <div style={{ justifyContent: "space-between" }} className="flex">

                                    <section className="displayAdvetUser">
                                        <div className="displayTopUser" style={{ margin: "30px", width: "40rem" }}>
                                            <Slider {...settings}

                                                style={{ width: "25rem" }}>
                                                {selectedRow.imageAdvert.map((el) =>
                                                    <div key={el._id} >
                                                        <img style={{ width: "25rem", height: "20rem", objectFit: "cover", borderRadius: "20px" }}
                                                            src={el.path}></img>
                                                    </div>)}
                                            </Slider >
                                        </div >
                                    </section >
                                    <section className="InformationAdvert">
                                        <div className="advert-details-container">
                                            <div className="advert-detail-row">
                                                <output className="advert-detail-label">Title:</output>
                                                <output className="advert-detail-value">{selectedRow.title}</output>
                                            </div>
                                            <div className="advert-detail-row">
                                                <output className="advert-detail-label">Type:</output>
                                                <output className="advert-detail-value">{selectedRow.type}</output>
                                            </div>
                                            <div className="advert-detail-row">
                                                <output className="advert-detail-label">Description:</output>
                                                <output className="advert-detail-value"
                                                    style={{ textAlign: "justify" }}
                                                >{selectedRow.description}</output>
                                            </div>
                                            <div className="advert-detail-row">
                                                <output style={{ textAlign: "right", width: "90%" }}>Price :</output>
                                                <output style={{ textAlign: "right", paddingLeft: "5px" }}>{selectedRow.price}</output>
                                                <output style={{ textAlign: "right", paddingLeft: "5px" }}>DT</output>
                                            </div>
                                            <button className="submit" onClick={() => approveAdvert(selectedRow._id, advertState)}>
                                                {advertState === "Approved" ? "Disapprove" : "Approve"}</button>
                                        </div>
                                        <Snackbar
                                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                            open={open}
                                            autoHideDuration={3000}
                                            onClose={handleClose}>
                                            <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                                                {`Advert is ${advertState} !`}
                                            </Alert>
                                        </Snackbar>
                                    </section>
                                </div>
                            </section>

                        </ul>
                    </div>)
            }
        </>
    );
};

export default Adverts;


export const columns = (handleShowModal, setAdvertState) => [
    { field: "id", headerName: "ID", width: 33 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
        field: "title",
        headerName: "Title",
        flex: 1,
        cellClassName: "title-column--cell",
    },
    {
        field: "price",
        headerName: "Price",
        type: "number",
        headerAlign: "left",
        align: "left",
        flex: 1,
    },
    {
        field: "category",
        headerName: "Category",
        flex: 1,
    },
    {
        field: "productCondition",
        headerName: "Condition",
        flex: 1,
    },
    {
        field: "userAdvert",
        headerName: "User",
        flex: 1,
    },
    {
        field: "city",
        headerName: "City",
        flex: 1,
    },
    {
        field: "advertState",
        headerName: "State",

    },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 100,
        renderCell: (params) => (
            <Stack spacing={1} sx={{ width: 1, py: 1 }}>
                <Button variant="outlined" size="small" startIcon={<EditIcon />}
                    onClick={() => { handleShowModal(params.row); setAdvertState(params.row.advertState) }}>
                    Edit
                </Button>

            </Stack>
        ),
    },
];