import AppPage from '../components/AppPage';
import StudentsTable from '../components/StudentsTable';
import { Teacher } from '../models/common';

// Find logic for this using context
// <StudentsTable students={props.teacher.enrolledStudents} />

const Students = (props: { teacher: Teacher }) => {
  return <AppPage title='Studenți'>{<StudentsTable />}</AppPage>;
};

export default Students;
