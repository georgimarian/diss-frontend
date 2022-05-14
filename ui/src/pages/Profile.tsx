import AppPage from 'components/AppPage';
import GenericProfile from 'components/profile-components/GenericProfile';
import { teacherList } from 'mock_data/users';
import {parseUser} from "../utils/models/common";

const Profile = () => {
  return (
    <AppPage title='Profil'>
      <GenericProfile user={parseUser()} />
    </AppPage>
  );
};

export default Profile;
