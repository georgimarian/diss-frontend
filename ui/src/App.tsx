import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import Home from "./pages/Home";
import Teachers from './pages/Teachers';
import Students from './pages/Students';
import Requests from './pages/Requests';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

import Menu from './components/Menu';
import './App.css';
import Login from "./pages/Login";
import Register from "./pages/Register";

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<MuiAppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
}));

function App() {
  return (
    <Router>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background:
            "linear-gradient(90deg, rgba(81,62,183,1) 0%, rgba(0,212,255,1) 100%)",
        }}
      >
        <AppBar position="absolute">
        <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Licente
            </Typography>
        </AppBar>
        <Menu />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/students" element={<Students />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
