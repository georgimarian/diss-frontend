import AppPage from '../components/AppPage';
import { ROLES } from '../utils/roles';
import { AdminHomePage, StudentHomePage, TeacherHomePage } from './homepages';

const Home = () => {
  const role = JSON.parse(localStorage.getItem('user') || '').role;

  return (
    <AppPage title='Acasă'>
      {role === ROLES.Admin && <AdminHomePage />}
      {role === ROLES.Teacher && <TeacherHomePage />}
      {role === ROLES.Student && <StudentHomePage />}
    </AppPage>
  );
};

export default Home;
