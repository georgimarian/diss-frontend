import AppPage from '../components/AppPage';
import {RequestStatus, Student, Teacher, ThesisRequest} from "../components/Models";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from '@mui/icons-material/Close';
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {getEmptyStudent} from "./Main";

const Requests = (props: { students: Student[], teacher: Teacher, answerRequest: (s: Student, t: Teacher, r: ThesisRequest, a: boolean) => void }) => {
    return (
        <AppPage title='Requests'>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nume Student</TableCell>
                            <TableCell align="center">Descrierea tezei</TableCell>
                            <TableCell align="center">Statusul Cererii</TableCell>
                            <TableCell align="center">Răspunde</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.teacher.requests.map((row: ThesisRequest) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell
                                    align="center">{props.students.find(student => student.id === row.studentId)?.name ?? ""}</TableCell>
                                <TableCell
                                    align="center">{props.students.find(student => student.id === row.studentId)?.thesisDescription ?? ""}</TableCell>
                                <TableCell align="center">{row.status}</TableCell>
                                <TableCell
                                    align="center">{props.teacher.totalPlaces !== props.teacher.enrolledStudents.length
                                && row.status === RequestStatus.IN_PROGRESS ?
                                    <>
                                        <Button variant="outlined" startIcon={<CheckIcon/>}
                                                onClick={() => props.answerRequest(props.students.find(student => student.id === row.studentId) ?? getEmptyStudent(), props.teacher, row, true)}>
                                        </Button>
                                        <Button variant="outlined" startIcon={<CloseIcon/>}
                                                onClick={() => props.answerRequest(props.students.find(student => student.id === row.studentId) ?? getEmptyStudent(), props.teacher, row, false)}>
                                        </Button>
                                    </> : ""}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </AppPage>
    );
}

export default Requests;