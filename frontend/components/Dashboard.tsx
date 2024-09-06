'use client';

import React from 'react';
import { ChakraProvider, Grid, GridItem, Box } from '@chakra-ui/react';
import BarChart from './charts/BarChart';
import LineChart from './charts/LineChart';
import CandlestickChart from './charts/CandlestickChart';
import PieChart from './charts/PieChart';

const Dashboard: React.FC = () => {
    return (
        <ChakraProvider>
            <Grid
                templateColumns="repeat(2, 1fr)"
                templateRows="repeat(2, 1fr)"
                gap={4}
                h="100vh"
                p={4}
            >
                <GridItem>
                    <ChartContainer>
                        <BarChart />
                    </ChartContainer>
                </GridItem>
                <GridItem>
                    <ChartContainer>
                        <LineChart />
                    </ChartContainer>
                </GridItem>
                <GridItem>
                    <ChartContainer>
                        <CandlestickChart />
                    </ChartContainer>
                </GridItem>
                <GridItem>
                    <ChartContainer>
                        <PieChart />
                    </ChartContainer>
                </GridItem>
            </Grid>
        </ChakraProvider>
    );
};

const ChartContainer: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => (
    <Box
        bg="gray.50"
        borderRadius="lg"
        p={4}
        h="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
    >
        {children}
    </Box>
);

export default Dashboard;
