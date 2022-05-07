import AppPage from '../components/AppPage';
import GenericProfile from "../components/GenericProfile";
import {teacherList} from "../mock_data/users";

const Profile = () => {
    return (
        <AppPage title='Profile'>
            <GenericProfile user={teacherList[0]}/>
        </AppPage>
    );
}

export default Profile;