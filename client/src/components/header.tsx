import { useContext } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import img1 from '../assets/images/Vector.png';
import img2 from '../assets/images/Vector.svg';
import { ThemeContext } from "../contexts/theme";
import { useTheme } from "@mui/material/styles";


const Header = () => {
  const { mode, toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();
  return (
    <header style = {{backgroundColor: theme.palette.background.default,
        marginBottom : theme.spacing(3),
        display: "flex",
        justifyContent : "flex-end"}}>

      <nav style = {{display: "flex"}}>
        <Link style = {{marginRight: theme.spacing(6), textDecoration: "none", 
            color: theme.palette.text.primary
         }} to="/">Список</Link>
        <Link  style = {{marginRight: theme.spacing(6), textDecoration: "none",
            color: theme.palette.text.primary
          }} to="/statistic">Аналитика</Link>
      </nav>

      <Button onClick={toggleTheme} sx = {{backgroundColor: theme.palette.text.primary, width: "35px", height: "35px",}}>
        <img src={mode === "dark"? img2 : img1} alt="Переключение темы" />
      </Button>
    </header>
  );  
};

export default Header;
