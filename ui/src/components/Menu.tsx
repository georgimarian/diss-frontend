import { useNavigate } from 'react-router-dom';

import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';

import MuiDrawer from '@mui/material/Drawer';
import { MENU_ITEMS } from '../utils/constants';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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
    alignItems: 'center',
  },
}));

const Menu = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const list = () => (
    <Box sx={{ width: 250 }} role='presentation'>
      <List>
        {MENU_ITEMS.map(({ title, path, icon, roles }, index) => {
          const user = JSON.parse(localStorage.getItem('user') || '');
          if (roles.includes(user.role))
            return (
              <ListItem button key={title} onClick={() => navigate(path)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            );
        })}
        <ListItem button key='logout' onClick={() => logout()}>
          <ListItemText primary='log out' />
        </ListItem>
      </List>
    </Box>
  );
  return (
    <Drawer variant='permanent' anchor={'left'}>
      {list()}
    </Drawer>
  );
};

export default Menu;
