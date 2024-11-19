import { Box, Container, Divider, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import MyBox from "./MyBox";

const IconSection = () => {
    const theme = useTheme();
    return (
        <Container
            sx={{ mt: 3, bgcolor: theme.palette.mode === "dark" ? "#000" : "#fff" }}>
            <Stack
                divider={
                    useMediaQuery("(min-width:600px)") ? (
                        <Divider orientation="vertical" flexItem />
                    ) : null
                }
                sx={{ flexWrap: "wrap" }}
                direction={"row"}
                alignItems={"center"}
            >

                <MyBox
                    icon={<ElectricBoltIcon fontSize="large" />}
                    title={"Fast Delivery"}
                    subTitle={"Start from $10"}
                />
                <MyBox
                    icon={<WorkspacePremiumOutlinedIcon fontSize="large" />}
                    title={"Money Guarantee"}
                    subTitle={"7 Days Back"}
                />
                <MyBox
                    icon={<AccessAlarmOutlinedIcon fontSize="large" />}
                    title={"365 Days"}
                    subTitle={"For free return"}
                />
                <MyBox
                    icon={<CreditScoreOutlinedIcon fontSize="large" />}
                    title={"Payment"}
                    subTitle={"Secure system"}
                />
            </Stack>
        </Container>
    );
};

export default IconSection;

// eslint-disable-next-line react/prop-types

