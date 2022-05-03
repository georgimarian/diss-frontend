import Button from '@mui/material/Button';
import AppPage from '../components/AppPage';
import CheckIcon from '@mui/icons-material/Check';
import {RequestStatus, Teacher} from "../components/Models";

let Popescu = new Teacher("Pop Popescu", "Behavioral therapy", 6, 5)
let Popescu2 = new Teacher("Pop Popescuu", "Behavioral therapy", 16, 15)
let Popescu3 = new Teacher("Pop Popescuuu", "Behavioral therapy", 116, 115)
let Popescu4 = new Teacher("Pop Popescuuuu", "Behavioral therapy", 1116, 1115)

Popescu.id = 1;
Popescu2.id = 2;
Popescu3.id = 3;
Popescu4.id = 4;
let teachers = [
    Popescu, Popescu2, Popescu3, Popescu4
]
let requests: Map<string, RequestStatus> = new Map<string, RequestStatus>();
requests.set("1" + Popescu.id, RequestStatus.NO_REQUEST);
requests.set("1" + Popescu2.id, RequestStatus.NO_REQUEST);
requests.set("1" + Popescu3.id, RequestStatus.DENIED);
requests.set("1" + Popescu4.id, RequestStatus.NO_REQUEST);
console.log(requests.get("11"))

function CanRequest(teachersList: Teacher[]) {
    return teachersList.map(teacher => requests.get("1" + teacher.id) ?? "" in [RequestStatus.APPROVED, RequestStatus.IN_PROGRESS]).find(x => x)
}

const Teachers = () => {
    var canRequest = CanRequest(teachers)
    return (
        <AppPage title='Teachers'>
            <>
                <p>Teachers</p>
                <table id="teachers">
                    <colgroup>
                        <col span={1} style={{width: "100px"}}/>
                        <col span={1} style={{width: "100px"}}/>
                        <col span={1} style={{width: "40px"}}/>
                        <col span={1} style={{width: "40px"}}/>
                        <col span={1} style={{width: "80px"}}/>
                        <col span={1} style={{width: "80px"}}/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>Teacher's name</th>
                        <th>Area of interest</th>
                        <th>Nr of enrolled students</th>
                        <th>Nr of available places</th>
                        <th>Request status</th>
                        <th>Apply</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teachers.map(teacher => {
                        return (
                            <tr>
                                <td>{teacher.name}</td>
                                <td>{teacher.interest}</td>
                                <td>{teacher.enrolledStudents}</td>
                                <td>{teacher.availablePlaces}</td>
                                <td>{requests.get("1" + teacher.id)}</td>
                                <td>{canRequest && requests.get("1" + teacher.id) == RequestStatus.NO_REQUEST ? <Button variant="outlined" startIcon={<CheckIcon/>}>
                                    Apply </Button> : ""}
                                </td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
            </>
        </AppPage>
    );
}

export default Teachers;