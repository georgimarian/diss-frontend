import AppPage from '../components/AppPage';
import StudentsTable from '../components/StudentsTable';
import {Teacher} from "../models/common";

const Students = (props:{teacher: Teacher}) => {
    return (
        <AppPage title='Students'>
            <StudentsTable students={props.teacher.enrolledStudents}/>
        </AppPage>
    );
}

export default Students;