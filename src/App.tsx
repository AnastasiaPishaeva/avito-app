import './App.css'
import { ThemeProviderWrapper } from "./contexts/theme";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from "@mui/material";
import MainPage from './pages/main-page';
import AdDetailsPage from './pages/item-page';
import Analytics from './pages/analitic';
import Header from './components/header';
import {FiltersProvider} from './contexts/filter';

function App() {
  return (
    <ThemeProviderWrapper>
      <FiltersProvider>
      <CssBaseline>
        <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/item/:adId" element={<AdDetailsPage />} />
          <Route path="/statistic" element={<Analytics />} />
        </Routes>
      </BrowserRouter>
      </CssBaseline>
      </FiltersProvider>
    </ThemeProviderWrapper>
  )
}

export default App
