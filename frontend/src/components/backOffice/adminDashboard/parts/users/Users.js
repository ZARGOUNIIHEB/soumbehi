import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";
import {
    AdminPanelSettingsOutlined,
    LockOpenOutlined,
    SecurityOutlined,
} from "@mui/icons-material";
import { useState, useEffect } from 'react';
import { fetchAllUsers } from '../../../../../api/UsersApi';

const Users = () => {
    const theme = useTheme();

    const [rows, setRows] = useState([]);

    const getUsers = async () => {
        const data = await fetchAllUsers();
        let newRow = [];
        for (let i = 0; i < data.users.length; i++) {
            newRow[i] = data.users[i];
            newRow[i].id = i;
        }
        setRows(newRow);
    }
    useEffect(() => {
        getUsers();
    }, []);

    // field ==> Reqird
    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 33,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "firstName",
            headerName: "name",
            align: "center",
            headerAlign: "center",
        },
        {
            field: "email",
            headerName: "email",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        { field: "age", headerName: "age", align: "center", headerAlign: "center" },
        {
            field: "phone",
            headerName: "phone",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "role",
            headerName: "role",
            flex: 1,
            align: "center",
            headerAlign: "center",
            renderCell: ({ row: { role } }) => {
                return (
                    <Box
                        sx={{
                            p: "5px",
                            width: "99px",
                            borderRadius: "3px",
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "space-evenly",

                            backgroundColor:
                                role === "Admin"
                                    ? theme.palette.primary.dark
                                    : role === "Manager"
                                        ? theme.palette.secondary.dark
                                        : "#3da58a",
                        }}
                    >
                        {role === "Admin" && (
                            <AdminPanelSettingsOutlined
                                sx={{ color: "#fff" }}
                                fontSize="small"
                            />
                        )}

                        {role === "Manager" && (
                            <SecurityOutlined sx={{ color: "#fff" }} fontSize="small" />
                        )}

                        {role === "User" && (
                            <LockOpenOutlined sx={{ color: "#fff" }} fontSize="small" />
                        )}

                        <Typography sx={{ fontSize: "13px", color: "#fff" }}>
                            {role}
                        </Typography>
                    </Box>
                );
            },
        },
    ];

    return (
        <Box>
            {/* <Header title={"TEAM"} subTitle={"Managing the Team Members"} /> */}

            <Box sx={{ height: 600, mx: "auto" }}>
                <DataGrid
                    rows={rows}
                    // @ts-ignore
                    columns={columns}
                />
            </Box>
        </Box>
    );
};

export default Users;
