// @ts-ignore
import { ResponsivePie } from "@nivo/pie";
import { Box, useTheme } from "@mui/material";
import Pie from "./Pie";
import Header from "../../Header";

const PieChart = () => {
    // @ts-ignore
    const theme = useTheme();
    return (
        <Box>
            <Header title="Pie Chart" subTitle="Simple Pie Chart" />

            <Pie />
        </Box>
    );
};

export default PieChart;
