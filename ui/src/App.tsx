import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Box, useTheme} from "@mui/material";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './App.css';

function App() {
    const theme = useTheme()
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
                        `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                }}
            >
                <Routes>
                    <Route path="*" element={<Main/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </Box>
        </Router>
    );
}

export default App;
