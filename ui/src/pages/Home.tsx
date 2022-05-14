import AppPage from '../components/AppPage';
import { AdminHomePage, StudentHomePage, TeacherHomePage } from './homepages';
import {Roles} from "../utils/models/common.enums";
import {parseUser} from "../utils/models/common";

const Home = () => {
  const role = parseUser()

  return (
    <AppPage title='Acasă'>
      {role.type === Roles.ADMIN && <AdminHomePage />}
      {role.type === Roles.TEACHER && <TeacherHomePage />}
      {role.type === Roles.STUDENT && <StudentHomePage />}
    </AppPage>
  );
};

export default Home;
