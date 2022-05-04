import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Box } from "@mui/material";

import Main from "./pages/Main";

import './App.css';
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(90deg, rgba(81,62,183,1) 0%, rgba(0,212,255,1) 100%)",
        }}
      >  
        <Routes>
          <Route path="*" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
