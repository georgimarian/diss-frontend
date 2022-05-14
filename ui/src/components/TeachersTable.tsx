import {useContext, useState} from 'react';
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import {createThesisRequest, parseUser, Student, Teacher, ThesisRequest} from '../utils/models/common';
import {enumToString, RequestStatus, Roles} from '../utils/models/common.enums';
import SearchBar from 'components/SearchBar';
import ProfileIcon from 'components/profile-components/ProfileIcon';
import {StudentContext, TeacherContext} from '../App';
import {RequestAPI} from "../utils/connection.config";

function CanRequest(s: Student) {
    return (
        s.requestsLeft > 0 &&
        s.requests.every((r) => r.status === RequestStatus.DENIED)
    );
}

const TeachersTable = (props: { view: number }): JSX.Element => {
    const theme = useTheme();
    const {teachers, setTeachers} = useContext(TeacherContext);
    const {students, setStudents} = useContext(StudentContext);
    const [searchValue, setSearchValue] = useState('');
    const _user = parseUser()

    function createRequest(s: Student, t: Teacher) {
        RequestAPI.Request(createThesisRequest(s, t)).then(req => {
            if (req) {
                s.requests.push(req);
                s.requestsLeft -= 1;
                t.requests.push(req);
                setStudents(students?.map((student) => student.id === s.id ? {...s} : student));
                setTeachers(teachers?.map((teacher) => teacher.id === t.id ? {...t} : teacher));
            }
        });
    }

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{borderRadius: 10, bgcolor: theme.palette.secondary.dark}}
            >
                <SearchBar searchValue={searchValue} onSearch={setSearchValue}/>
                <Table sx={{minWidth: 650}} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Nume</TableCell>
                            <TableCell align='center'>Subiect de Interes</TableCell>
                            <TableCell align='center'>Nr Studenți Înscriși</TableCell>
                            <TableCell align='center'>Nr Locuri Libere</TableCell>
                            {props.view === Roles.STUDENT && (
                                <TableCell align='center'>Statusul Cererii</TableCell>
                            )}
                            {props.view === Roles.STUDENT && (
                                <TableCell align='center'>Aplică</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teachers?.filter(teacher => teacher.totalPlaces - teacher.enrolledStudents.length > 0 &&
                            Object.values(teacher).filter(isNaN)
                                .concat([enumToString(teacher.type), enumToString(teacher.areaOfInterest)])
                                .find(value => value.includes(searchValue))).map((row: Teacher) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell
                                    align='center'
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <ProfileIcon
                                        firstName={row.firstName}
                                        lastName={row.lastName}
                                        iconSize={'4rem'}
                                        variant={'h6'}
                                    />
                                    <Typography
                                        sx={{pl: 2}}
                                        variant={'h6'}
                                        color={theme.palette.primary.main}
                                    >
                                        {row.firstName} {row.lastName}
                                    </Typography>
                                </TableCell>
                                <TableCell align='center'>{enumToString(row.areaOfInterest)}</TableCell>
                                <TableCell align='center'>
                                    {row.enrolledStudents.length}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.totalPlaces - row.enrolledStudents.length}
                                </TableCell>
                                {props.view === Roles.STUDENT && (
                                    <TableCell align='center'>
                                        {enumToString(_user.requests.find((r: ThesisRequest) => r.teacherId === row.id)
                                            ?.status ?? RequestStatus.NO_REQUEST)}
                                    </TableCell>
                                )}
                                {props.view === Roles.STUDENT && (
                                    <TableCell align='center'>
                                        {CanRequest(_user) &&
                                        !_user.requests.map((r: ThesisRequest) => r.teacherId)
                                            .find((x: number) => x === row.id) ? (
                                            <Button
                                                variant='outlined'
                                                startIcon={<CheckIcon/>}
                                                onClick={() => createRequest(_user, row)}
                                            >
                                                Aplică{' '}
                                            </Button>
                                        ) : (
                                            ''
                                        )}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {_user.role === Roles.ADMIN && (
                <Button
                    sx={{
                        width: '50%',
                        borderRadius: 10,
                        color: theme.palette.secondary.main,
                        bgcolor: theme.palette.primary.main,
                        '&:hover': {
                            color: theme.palette.secondary.main,
                            background: theme.palette.primary.dark,
                        },
                        mt: 3,
                    }}
                    onClick={() => {
                        alert('You will add teachers soon!');
                    }}
                >
                    Adauga
                </Button>
            )}
        </>
    );
};

export default TeachersTable;
