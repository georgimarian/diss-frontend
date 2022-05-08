import AppPage from '../components/AppPage';
import StudentsTable from '../components/StudentsTable';
import {Student} from "../models/common";
import {AreaOfInterest} from "../models/common.enums";

const mockStudents: Student[] = [
    {
        email: "email1",
        username: "username1",
        password: "password1",
        firstName: "john",
        lastName: "doe",
        areaOfInterest: AreaOfInterest.PSYCHOLOGY
    },
    {
        email: "email2",
        username: "username2",
        password: "password2",
        firstName: "marco",
        lastName: "pollo",
        areaOfInterest: AreaOfInterest.PSYCHOLOGY
    },
    {
        email: "email3",
        username: "username3",
        password: "password3",
        firstName: "phoebe",
        lastName: "buffay",
        areaOfInterest: AreaOfInterest.APPLIED_PSYCHOLOGY
    }
]

const Students = () => {
    return (
        <AppPage title='Students'>
            <StudentsTable students={mockStudents}/>
        </AppPage>
    );
}

export default Students;