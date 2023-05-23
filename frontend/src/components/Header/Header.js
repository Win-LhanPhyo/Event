import React from 'react';
import {Container, Nav, Navbar, Image, NavDropdown} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { imageURL } from '../../utils/constants/constant';
import styles from './Header.module.scss';
import axios from '../../axios/index';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Header = () => {
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const storageData = JSON.parse(localStorage.getItem("user"));

  const currentUser = {
    'id' : storageData?.id ? storageData?.id : null,
    'name' : storageData?.name ? storageData?.name : null,
    'profile' : storageData?.profile ? storageData?.profile : null
  };

  const handleLogout = () => {
    history.push('/admin/login');
    axios.post("/logout", storageData).then(response => {
      console.log(response);
    })
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const indicatorStyle = {
    lineHeight: '5rem', // Adjust the line height as needed
    color: 'black'
  };

  return (
    <>
      {/* <Navbar className={styles.navBar+' shadow-sm'} variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/admin/events">Event</Navbar.Brand>
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admin/events">Event</Nav.Link>
              <Nav.Link as={Link} to="/admin/users">User</Nav.Link>
            </Nav>
            <Nav className="justify-content-end align-items-center">
              <Nav.Link as={Link} to={`/admin/${currentUser.id}/profile`}>
                <Image src={imageURL + currentUser.profile} roundedCircle className={styles.profileImg}></Image>
              </Nav.Link>
              <NavDropdown title={currentUser.name}>
                <NavDropdown.Item as={Link} onClick={handleLogout}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          
        </Container>
      </Navbar> */}
      <Box sx={{ width: '100%', height: '300', bgcolor: '#1FC46E', padding: '0 100px' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="#000"
            sx={{
              color: '#fff',
              indicatorColor: '#000',
              lineHeight: '5rem',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            <Tab label="Event"></Tab>
            <Tab label="User"></Tab>
          </Tabs>
        </Box>
    </>
  )
}

export default Header;
