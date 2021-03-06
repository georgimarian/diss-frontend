import { useNavigate } from "react-router-dom";

import {Box , Divider, List, ListItem, ListItemIcon, ListItemText, styled} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import BallotIcon from '@mui/icons-material/Ballot';

import MuiDrawer from '@mui/material/Drawer';

const menuItems = [
  {title: 'Home', path: '/', icon: <HomeIcon />},
  {title: 'Students', path: '/students', icon: <SchoolIcon />},
  {title: 'Teachers', path: '/teachers', icon: <PeopleIcon />},
  {title: 'Requests', path: '/requests', icon: <BallotIcon />},
  {title: 'Profile', path: '/profile', icon: <PersonIcon />},
  {title: 'Settings', path: '/settings', icon: <SettingsIcon />},
]

const drawerWidth = 240; 

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      height: '100vh',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      overflowX: 'hidden',
      display: 'flex',
      alignItems: 'center'
    },
  }),
);

const Menu = () => {
  const navigate = useNavigate();

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <List>
        {menuItems.map(({title, path, icon}, index) => (
          <ListItem button key={title}  onClick={() => navigate(path)}>
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return ( 
    <Drawer
      variant="permanent"
      anchor={'left'}
    >
      {list()}
    </Drawer>
  );
};

export default Menu;