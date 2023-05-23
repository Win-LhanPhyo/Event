import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useRecoilState, useRecoilValue } from "recoil";
import { eventState } from '../../redux/store/Event/event';
import { Event } from '../../redux/domain/eventList';
import Box from '@mui/material/Box';
import { ThemeProvider } from "@mui/material";
import { eventTheme } from '../../entries/theme';
import Pagination from '@mui/material/Pagination';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,) {
    return { name, calories, fat, carbs, protein };
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: eventTheme.palette.info.dark
    },
    '& th': {
        color: eventTheme.palette.text.secondary
    },
    '& td:hover' : {
        color: eventTheme.palette.text.secondary
    }
}));

const EventPage:React.FC<{
    children?: React.ReactNode;
}> = () => {
    const [events, setEventState] = useRecoilState(eventState);

    console.log("event list", events);

    return (
        <ThemeProvider theme={eventTheme}>
            <Box sx={{
                width: '100%',
                backgroundColor: 'success.light'
            }}>
                <Box sx={{ px: 5, py: 5 }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <StyledTableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="center">Event Name</TableCell>
                                    <TableCell align="center">Description</TableCell>
                                    <TableCell align="center">From ~ To</TableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                            {events?.data.map((row: Event) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="center">{row.event_name}</TableCell>
                                    <TableCell align="center">{row.description}</TableCell>
                                    <TableCell align="center">{row.from_date.toString()}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ 
                        pt: 3,
                        display: "flex",
                        justifyContent: "center"
                     }}>
                        <Pagination count={10} shape="rounded" />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default EventPage;