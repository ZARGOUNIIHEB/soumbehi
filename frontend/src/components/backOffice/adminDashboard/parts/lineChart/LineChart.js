import { Box, useTheme } from "@mui/material";
// @ts-ignore
import React from "react";
// @ts-ignore
import { ResponsiveLine } from "@nivo/line";
import Line from "./Line";
import Header from "../../Header";

const LineChart = () => {
    // @ts-ignore
    const theme = useTheme();
    return (
        <Box>
            <Header title="Line Chart" subTitle="Simple Line Chart" />

            <Line />
        </Box>
    );
};

export default LineChart;
