import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import BallotIcon from '@mui/icons-material/Ballot';

import { Roles } from './roles';
import { ReactNode } from 'react';

interface MenuItem {
  title: string;
  path: string;
  icon: ReactNode;
  roles: Array<Roles>;
}

export const MENU_ITEMS: Array<MenuItem> = [
  {
    title: 'Acasă',
    path: '/home',
    icon: <HomeIcon />,
    roles: [Roles.Student, Roles.Admin, Roles.Teacher],
  },
  {
    title: 'Studenți',
    path: '/students',
    icon: <SchoolIcon />,
    roles: [Roles.Admin, Roles.Teacher],
  },
  {
    title: 'Profesori',
    path: '/teachers',
    icon: <PeopleIcon />,
    roles: [Roles.Student, Roles.Admin],
  },
  {
    title: 'Cereri',
    path: '/requests',
    icon: <BallotIcon />,
    roles: [Roles.Student, Roles.Admin, Roles.Teacher],
  },
  {
    title: 'Profil',
    path: '/profile',
    icon: <PersonIcon />,
    roles: [Roles.Student, Roles.Admin, Roles.Teacher],
  },
  {
    title: 'Setări',
    path: '/settings',
    icon: <SettingsIcon />,
    roles: [Roles.Admin, Roles.Teacher],
  },
];
