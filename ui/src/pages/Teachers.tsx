import AppPage from '../components/AppPage';
import {RequestStatus, Student, Teacher} from "../components/Models";
import TeachersTable from "../components/TeachersTable";
import {Button, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


const Teachers = () => {

    var s: Student = {
        id: 1,
        password: "lorena",
        name: "denis",
        email: "criste.denis15@yahoo.com",
        thesisDescription: "muhaha",
        requests: [
            {
                id: 1,
                status: RequestStatus.DENIED,
                description: "muhaha",
                studentId: 1,
                teacherId: 3
            },
            {
                id: 1,
                status: RequestStatus.DENIED,
                description: "muhaha",
                studentId: 1,
                teacherId: 2
            }
        ],
        description: "i am a mothefucker",
        requestsLeft: 1
    }
    var teachers: Teacher[] =
        [{
            id: 2,
            name: "Pop Popescu",
            interest: "Behavioral therapy",
            email: "popescu@yahoo.com",
            enrolledStudents: [],
            totalPlaces: 15,
            password: "pass",
            requests: [
                {
                    id: 1,
                    status: RequestStatus.DENIED,
                    description: "muhaha",
                    studentId: 1,
                    teacherId: 2
                },
            ]
        },
            {
                id: 12,
                name: "Pop Popescu2",
                interest: "Behavioral therapy",
                email: "popescu@yahoo.com",
                enrolledStudents: [],
                totalPlaces: 15,
                password: "pass",
                requests: []
            },
            {
                id: 112,
                name: "Pop Popescu3",
                interest: "Behavioral therapy",
                email: "popescu@yahoo.com",
                enrolledStudents: [],
                totalPlaces: 15,
                password: "pass",
                requests: []
            },
            {
                id: 1112,
                name: "Pop Popescu3",
                interest: "Behavioral therapy",
                email: "popescu@yahoo.com",
                enrolledStudents: [],
                totalPlaces: 15,
                password: "pass",
                requests: []
            },
            {
                id: 3,
                name: "Pop Popescu3",
                interest: "Behavioral therapy",
                email: "popescu@yahoo.com",
                enrolledStudents: [],
                totalPlaces: 15,
                password: "pass",
                requests: [
                    {
                        id: 2,
                        status: RequestStatus.DENIED,
                        description: "muhaha",
                        studentId: 1,
                        teacherId: 3
                    },
                ]
            },
        ]
    if (s.requestsLeft > 0)
        return (
            <AppPage title='Teachers'>

                <TeachersTable rows={teachers} student={s}/>
                <Typography variant="h6" sx={{padding: "2px"}} align="left">
                    Mai ai <Typography sx={
                    {
                        color: s.requestsLeft == 1 ? "red" : "green"
                        , display: "inline"
                    }}>{s.requestsLeft}</Typography> cereri rămase
                </Typography>
            </AppPage>
        );
    return (
        <AppPage title='Teachers'>
            <Typography variant="h5" sx={{padding: "2px"}} align="left">
                Mai ai <Typography variant="h5" sx={{color: "red", display: "inline"}}>0</Typography> cereri rămase. Te
                rugăm să ceri adminilor să îți aleagă un profesor.
            </Typography>
            <Button variant="outlined" sx={{color: "red"}} startIcon={<AddIcon sx={{color: "green"}}/>}>
                Cere ajutorul adminilor </Button>

        </AppPage>
    )
}

export default Teachers;