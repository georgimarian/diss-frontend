import AppPage from '../components/AppPage';
import { Roles } from '../utils/roles';
import { AdminHomePage, StudentHomePage, TeacherHomePage } from './homepages';

const Home = () => {
  const role = JSON.parse(localStorage.getItem('user') || '').role;

  return (
    <AppPage title='Acasă'>
      {role === Roles.Admin && <AdminHomePage />}
      {role === Roles.Teacher && <TeacherHomePage />}
      {role === Roles.Student && <StudentHomePage />}
    </AppPage>
  );
};

export default Home;
