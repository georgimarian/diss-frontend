import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CheckIcon from '@mui/icons-material/Check';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {Student, Teacher} from "../models/common";
import {RequestStatus} from "../models/common.enums";

function CanRequest(s: Student) {
    return s.requestsLeft > 0 && s.requests.every(r => r.status === RequestStatus.DENIED)
}

const TeachersTable = (props: { rows: Teacher[], student: Student, createRequest: (student: Student, teacher: Teacher) => void }): JSX.Element => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Nume</TableCell>
                        <TableCell align="center">Subiect de Interes</TableCell>
                        <TableCell align="center">Nr Studenți Înscriși</TableCell>
                        <TableCell align="center">Nr Locuri Libere</TableCell>
                        <TableCell align="center">Statusul Cererii</TableCell>
                        <TableCell align="center">Aplică</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row: Teacher) => (
                        <TableRow
                            key={row.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align="center">{row.username}</TableCell>
                            <TableCell align="center">{row.areaOfInterest}</TableCell>
                            <TableCell align="center">{row.enrolledStudents.length}</TableCell>
                            <TableCell align="center">{row.totalPlaces - row.enrolledStudents.length}</TableCell>
                            <TableCell
                                align="center">{props.student.requests.find(r => r.teacherId === row.id)?.status ?? RequestStatus.NO_REQUEST}</TableCell>
                            <TableCell
                                align="center">{CanRequest(props.student) && !props.student.requests.map(r => r.teacherId).find(x => x === row.id) ?
                                <Button variant="outlined" startIcon={<CheckIcon/>}
                                        onClick={() => props.createRequest(props.student, row)}>
                                    Aplică </Button> : ""}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TeachersTable