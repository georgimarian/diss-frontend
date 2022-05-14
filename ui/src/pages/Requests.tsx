import {useContext} from 'react';
import {
    Paper,
    useTheme,
    Table,
    TableHead,
    TableRow,
    TableContainer,
    TableBody,
    TableCell,
} from '@mui/material';

import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AppPage from 'components/AppPage';

import {getEmptyStudent, parseUser, storeUser, Student, Teacher, ThesisRequest} from 'utils/models/common';
import {RequestStatus, statusesToString} from 'utils/models/common.enums';
import {StudentContext, TeacherContext} from '../App';
import {RequestAPI} from "../utils/connection.config";

const Requests = () => {
    const theme = useTheme();
    const {students, setStudents} = useContext(StudentContext);
    const _user = parseUser()
    const teacherUser = _user as Teacher;

    function answerRequest(
        s: Student,
        r: ThesisRequest,
        a: boolean
    ) {
        let teacher = _user as Teacher;
        r.status = a ? RequestStatus.APPROVED : RequestStatus.DENIED;
        s.requests = s.requests.map(req => r.id === req.id ? r : req)
        RequestAPI.Update(s).then(stud => {
            teacher.enrolledStudents.push(stud as Student);
            teacher.requests = teacher.requests.map(req => r.id === req.id ? r : req);
            storeUser(teacher)
            window.location.reload()
        });
    }

    return (
        <AppPage title='Cereri'>
            <TableContainer
                component={Paper}
                sx={{borderRadius: 10, bgcolor: theme.palette.secondary.dark}}
            >
                <Table sx={{minWidth: 650}} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Nume Student</TableCell>
                            <TableCell align='center'>Descrierea tezei</TableCell>
                            <TableCell align='center'>Statusul Cererii</TableCell>
                            <TableCell align='center'>Răspunde</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teacherUser?.requests.map((row: ThesisRequest) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align='center'>
                                    {students?.find(
                                        (student) => student.id === row.studentId
                                    )?.username ?? ''}
                                </TableCell>
                                <TableCell align='center'>
                                    {students?.find(
                                        (student) => student.id === row.studentId
                                    )?.thesisDescription ?? ''}
                                </TableCell>
                                <TableCell align='center'>{statusesToString(row.status)}</TableCell>
                                <TableCell align='center'>
                                    {teacherUser.totalPlaces !==
                                    teacherUser.enrolledStudents.length &&
                                    row.status === RequestStatus.IN_PROGRESS ? (
                                        <>
                                            <Button

                                                sx = {{ border : 0
                                                }}
                                                variant='outlined'
                                                startIcon={<CheckIcon />}
                                                onClick={() =>
                                                    answerRequest(
                                                        students?.find(
                                                            (student) => student.id === row.studentId
                                                        ) ?? getEmptyStudent(),
                                                        row,
                                                        true
                                                    )
                                                }
                                            />

                                            <Button
                                                sx = {{ border : 0}}
                                                variant='outlined'
                                                startIcon={<CloseIcon/>}
                                                onClick={() =>
                                                    answerRequest(
                                                        students?.find(
                                                            (student) => student.id === row.studentId
                                                        ) ?? getEmptyStudent(),
                                                        row,
                                                        false
                                                    )
                                                }
                                            />
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </AppPage>
    );
};

export default Requests;
