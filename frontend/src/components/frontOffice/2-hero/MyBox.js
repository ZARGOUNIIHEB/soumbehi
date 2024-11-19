import { Box, useTheme, useMediaQuery, Typography } from "@mui/material";

const MyBox = ({ icon, title, subTitle }) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                width: 250,
                display: "flex",
                flexGrow: 1,
                alignItems: "center",
                gap: 3,
                py: 1.6,
                justifyContent: useMediaQuery("(min-width:600px)") ? "center" : "left",
            }}
        >
            {icon}
            <Box>
                <Typography variant="body1">{title}</Typography>
                <Typography
                    sx={{ fontWeight: 300, color: theme.palette.text.secondary }}
                    variant="body1"
                >
                    {subTitle}
                </Typography>
            </Box>
        </Box>
    );
};
export default MyBox;