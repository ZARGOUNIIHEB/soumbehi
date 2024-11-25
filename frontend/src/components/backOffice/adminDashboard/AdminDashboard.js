import { ThemeProvider, createTheme, styled, useTheme, } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

import { useState, useEffect, useMemo } from 'react';

import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { getDesignTokens } from "../../../theme";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccount } from "../../../api/UsersApi";
import { setUser } from "../../../redux/UserSlice";

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


const Dashboard = () => {
    // @ts-ignore
    const user = useSelector(state => state.userElement);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const getAuth = async () => {
        const data = await fetchAccount();
        dispatch(setUser(data));
    }
    useEffect(() => {
        getAuth();
    }, []);

    const token = localStorage.getItem("token");
    console.log("User from dashboard Admin :", user);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [mode, setMode] = useState(
        Boolean(localStorage.getItem("currentMode"))
            ? localStorage.getItem("currentMode")
            : "light"
    );
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex" }}>
                <TopBar
                    open={open}
                    handleDrawerOpen={handleDrawerOpen}
                    setMode={setMode} />
                <SideBar open={open} handleDrawerClose={handleDrawerClose} user={user} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Outlet />
                </Box>
            </Box>
        </ThemeProvider>
    )
}
export default Dashboard;