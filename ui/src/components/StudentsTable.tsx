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
import ProfileIcon from "./ProfileIcon";
import {useState} from "react";

type StudentsTableProps = {
    students: Student[]
}

const StudentsTable = ({students}: StudentsTableProps) => {
    const [searchValue, setSearchValue] = useState('')
    const theme = useTheme()

    return <TableContainer
        component={Paper}
        elevation={0}
        sx={{borderRadius: 10,
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
                    <TableCell align="left">Student's Name</TableCell>
                    <TableCell align="left">Area of Interest</TableCell>
                    <TableCell align="left">Email</TableCell>
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
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
}

export default StudentsTable;
