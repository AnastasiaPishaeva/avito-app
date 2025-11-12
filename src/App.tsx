import './App.css'
import theme from "./contexts/theme";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from "@mui/material";
import MainPage from './pages/main-page';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/item/:id" element={<Item />} /> */}
        </Routes>
      </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
