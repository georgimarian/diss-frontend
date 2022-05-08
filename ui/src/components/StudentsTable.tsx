import {Student} from "../models/common";
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import ProfileIcon from "./profile-components/ProfileIcon";
import {useEffect, useState} from "react";
import {Roles} from "../utils/roles";
import {Actions, initializedStudent} from "../mock_data/users";
import StudentForm from "./StudentForm";

type StudentsTableProps = {
    students: Student[]
}

const StudentsTable = ({students}: StudentsTableProps) => {
    const [searchValue, setSearchValue] = useState('')
    const [chosenUser, setChosenUser] = useState<Student>(initializedStudent)
    const [open, setOpen] = useState(false)
    const [action, setAction] = useState<number>(-1)
    const [studentsList, setStudentsList] = useState<Student[]>([])

    const theme = useTheme()
    const _user = JSON.parse(localStorage.getItem('user') || '')

    useEffect(() => {
        setStudentsList(students)
    }, [])

    return <>
        <StudentForm studentsList={studentsList} setStudentsList={setStudentsList} user={chosenUser} open={open}
                     setOpen={setOpen} action={action}/>
        <TableContainer
            component={Paper}
            elevation={0}
            sx={{
                borderRadius: 10,
                bgcolor: theme.palette.secondary.dark
            }}>
            <Box sx={{
                display: 'flex',
                justifyContent: "space-between",
                alignItems: 'center',
                pt: 4,
                pb: 2,
                px: 4
            }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    sx={{
                        width: '70%',
                        borderRadius: 25
                    }}/>
                <Button
                    onClick={() => {
                        searchValue.length && console.log(searchValue)
                    }}
                    sx={{
                        width: '10%',
                        borderRadius: 10,
                        color: theme.palette.secondary.main,
                        bgcolor: theme.palette.primary.main,
                        '&:hover': {
                            color: theme.palette.secondary.main,
                            background: theme.palette.primary.dark
                        }
                    }}
                >Search</Button>
            </Box>
            <Table sx={{minWidth: 650}}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Numele studentului</TableCell>
                        <TableCell align="left">Aria de Interes</TableCell>
                        <TableCell align="left">Email</TableCell>
                        {_user.role === Roles.Admin && <TableCell align="center"/>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((user: Student, index) => (
                        <TableRow
                            key={index}
                        >
                            <TableCell
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                <ProfileIcon
                                    firstName={user.firstName}
                                    lastName={user.lastName}
                                    iconSize={'4rem'}
                                    variant={'h6'}
                                />
                                <Typography sx={{pl: 2}} variant={"h6"}
                                            color={theme.palette.primary.main}>{user.firstName + ' ' + user.lastName}</Typography>
                            </TableCell>
                            <TableCell align="left">{user.areaOfInterest}</TableCell>
                            <TableCell align="left">{user.email}</TableCell>
                            {_user.role === Roles.Admin && <TableCell align="center">
                                <Button onClick={() => {
                                    setChosenUser(user);
                                    setAction(Actions.EDIT)
                                    setOpen(true)
                                }}>Editeaza</Button>
                            </TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        {
            _user.role === Roles.Admin &&
            <Button
                sx={{
                    width: '50%',
                    borderRadius: 10,
                    color: theme.palette.secondary.main,
                    bgcolor: theme.palette.primary.main,
                    '&:hover': {
                        color: theme.palette.secondary.main,
                        background: theme.palette.primary.dark
                    },
                    mt: 3
                }}
                onClick={() => {
                    setChosenUser(initializedStudent);
                    setAction(Actions.ADD)
                    setOpen(true)
                }}>Adauga</Button>
        }
    </>
}

export default StudentsTable;
