import React from 'react'
import { AppBar, Container, Toolbar, Typography, Select, MenuItem } from '@material-ui/core';
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
// import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { useHistory } from "react-router-dom";
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';



const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: 'gold',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}));

const darkTheme = createTheme({
  pallete: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});


// const Header = () => 


function Header() {

  const classes = useStyles();

  // const navigate = useNavigate();
  const history = useHistory();

  // const darkTheme = createTheme({
  //   pallete: {
  //     primary: {
  //       main: "#fff",
  //     },
  //     type: "dark",
  //   },
  // });


  const { currency, setCurrency, user } = CryptoState();


  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography onClick={() => history.push('/')} className={classes.title} variant='h6'>Crypto Trapper</Typography>
            <Select variant='outlined'
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{
                width: 100,
                height: 40,
                marginRight: 15
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}

            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'INR'}>INR</MenuItem>
            </Select>

           {user ? <UserSidebar/> : <AuthModal/>}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header
