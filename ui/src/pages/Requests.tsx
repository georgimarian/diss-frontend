import {useContext, useEffect, useState} from 'react';
import {
    Paper,
    useTheme,
    Table,
    TableHead,
    TableRow,
    TableContainer,
    TableBody,
    TableCell, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';

import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AppPage from 'components/AppPage';

import {
    castTeacher,
    findStudent, findTeacher,
    getEmptyStudent,
    parseUser,
    storeUser,
    Student,
    Teacher,
    ThesisRequest
} from 'utils/models/common';
import {RequestStatus, Roles, rolesToString, statusesToString} from 'utils/models/common.enums';
import {StudentContext, TeacherContext} from '../App';
import {RequestAPI} from "../utils/connection.config";

const Requests = () => {
    const theme = useTheme();
    const {students, setStudents} = useContext(StudentContext);
    const {teachers, setTeachers} = useContext(TeacherContext);
    const [teacher, setTeacher] = useState<Teacher>();
    const [teacherId, setTeacherId] = useState<number>();
    const [teacherList, setTeacherList] = useState<Teacher[]>([]);
    const [requestList, setRequestList] = useState<ThesisRequest[]>([]);
    const _user = parseUser()

    useEffect(() => {
        if (_user.type === Roles.TEACHER) {
            setTeacherId(_user.id)
            let tReqs = castTeacher(_user)?.requests
            if (tReqs) {
                setRequestList(tReqs)
            }
        } else {
            if (students) {
                let tReqs = Array.prototype.concat.apply<ThesisRequest[], ThesisRequest[][], ThesisRequest[]>([], students.map(st => st.requests)).filter(r => r.teacherId === -1)
                if (tReqs) {
                    setRequestList(tReqs)
                }
            }
        }

    }, []);
    useEffect(() => {
        let teacherValue = teachers?.find(t => t.id === teacherId)
        if (teacherValue) {
            setTeacher(teacherValue)
        }
    }, [teacherId]);


    function answerRequest(
        s: Student | undefined,
        r: ThesisRequest,
        a: boolean
    ) {
        if (s) {
            r.status = a ? RequestStatus.APPROVED : RequestStatus.DENIED;
            s.requests = s.requests.map(req => r.id === req.id ? r : req)
            RequestAPI.Update(s).then(stud => {
                if (teacher) {
                    teacher.enrolledStudents.push(stud as Student);
                    teacher.requests = teacher.requests.map(req => r.id === req.id ? r : req);
                    storeUser(teacher)
                    window.location.reload()
                }
            });
        }
    }

    const handleTeacherChange =
        (prop: string) => (event: any) => {
            setTeacherId(event.target.value);
        };

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
                            {_user.type === Roles.STUDENT && (
                                <TableCell align='center'>Profesor</TableCell>
                            )}

                            <TableCell align='center'>Răspunde</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requestList.map((row: ThesisRequest) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align='center'>
                                    {findStudent(students, row.studentId)?.username ?? ''}
                                </TableCell>
                                <TableCell align='center'>
                                    {findStudent(students, row.studentId)?.thesisDescription ?? ''}
                                </TableCell>
                                <TableCell align='center'>{statusesToString(row.status)}</TableCell>
                                {_user.type === Roles.STUDENT && (
                                    <TableCell align='center'>
                                        <Select
                                            id="outlined-required"
                                            value={"0"}
                                            label="Tip"
                                            onChange={handleTeacherChange("teacherid")}
                                        >{
                                            teachers?.filter(teach => !teach.requests.map(req => req.studentId).find(sid => sid === row.studentId))
                                                .map(tch => (<MenuItem value={tch.id}>{tch.username}</MenuItem>))
                                        }

                                            <MenuItem value={1}>{rolesToString(Roles.TEACHER)}</MenuItem>
                                            <MenuItem value={2}>{rolesToString(Roles.ADMIN)}</MenuItem>
                                        </Select>
                                    </TableCell>
                                )}
                                <TableCell align='center'>
                                    {_user.type === Roles.ADMIN ||
                                        (teacher?.totalPlaces !==
                                        teacher?.enrolledStudents.length &&
                                        row.status === RequestStatus.IN_PROGRESS ? (
                                            <>
                                                <Button

                                                    sx={{
                                                        border: 0
                                                    }}
                                                    variant='outlined'
                                                    startIcon={<CheckIcon/>}
                                                    onClick={() =>
                                                        answerRequest(findStudent(students, row.studentId), row, true)}
                                                />
                                                {' '}
                                                <Button
                                                    sx={{border: 0}}
                                                    variant='outlined'
                                                    startIcon={<CloseIcon/>}
                                                    onClick={() =>
                                                        answerRequest(findStudent(students, row.studentId), row, false)
                                                    }
                                                />
                                            </>
                                        ) : (
                                            ''
                                        ))}
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
