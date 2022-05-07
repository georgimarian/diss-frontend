import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import BallotIcon from '@mui/icons-material/Ballot';

import { ROLES } from './roles';
import { ReactNode } from 'react';

interface MenuItem {
  title: string;
  path: string;
  icon: ReactNode;
  roles: Array<ROLES>;
}

export const MENU_ITEMS: Array<MenuItem> = [
  {
    title: 'Acasă',
    path: '/home',
    icon: <HomeIcon />,
    roles: [ROLES.Student, ROLES.Admin, ROLES.Teacher],
  },
  {
    title: 'Studenți',
    path: '/students',
    icon: <SchoolIcon />,
    roles: [ROLES.Admin, ROLES.Teacher],
  },
  {
    title: 'Profesori',
    path: '/teachers',
    icon: <PeopleIcon />,
    roles: [ROLES.Student, ROLES.Admin],
  },
  {
    title: 'Cereri',
    path: '/requests',
    icon: <BallotIcon />,
    roles: [ROLES.Student, ROLES.Admin, ROLES.Teacher],
  },
  {
    title: 'Profil',
    path: '/profile',
    icon: <PersonIcon />,
    roles: [ROLES.Student, ROLES.Admin, ROLES.Teacher],
  },
  {
    title: 'Setări',
    path: '/settings',
    icon: <SettingsIcon />,
    roles: [ROLES.Admin, ROLES.Teacher],
  },
];
