import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import BallotIcon from '@mui/icons-material/Ballot';

import { ReactNode } from 'react';
import {Roles} from "./models/common.enums";

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
    roles: [Roles.STUDENT, Roles.ADMIN, Roles.TEACHER],
  },
  {
    title: 'Studenți',
    path: '/students',
    icon: <SchoolIcon />,
    roles: [Roles.ADMIN, Roles.TEACHER],
  },
  {
    title: 'Profesori',
    path: '/teachers',
    icon: <PeopleIcon />,
    roles: [Roles.STUDENT, Roles.ADMIN],
  },
  {
    title: 'Cereri',
    path: '/requests',
    icon: <BallotIcon />,
    roles: [Roles.ADMIN, Roles.TEACHER],
  },
  {
    title: 'Profil',
    path: '/profile',
    icon: <PersonIcon />,
    roles: [Roles.STUDENT, Roles.ADMIN, Roles.TEACHER],
  },
  {
    title: 'Setări',
    path: '/settings',
    icon: <SettingsIcon />,
    roles: [Roles.ADMIN, Roles.TEACHER],
  },
];
