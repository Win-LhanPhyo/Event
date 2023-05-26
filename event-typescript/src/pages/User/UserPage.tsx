import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useRecoilState } from "recoil";
import { userState } from "../../redux/store/User/user";
import { ThemeProvider } from "@mui/material/styles";
import { eventTheme } from "../../entries/theme";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import { User } from "../../redux/domain/userList";
import "../../App.css";
import styled from "@emotion/styled";
import { IconButton, Menu, MenuItem, Modal } from "@mui/material";
import { MoreVertTwoTone } from "@mui/icons-material";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: eventTheme.palette.info.dark,
  },
  "& th": {
    color: eventTheme.palette.text.secondary,
  },
  "& td:hover": {
    color: eventTheme.palette.text.secondary,
  },
}));

const UserPage: React.FC<{
  children?: React.ReactNode;
}> = () => {
  const [users, setUserState] = useRecoilState(userState);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = () => {
    handleClose();
  };
  return (
    <ThemeProvider theme={eventTheme}>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "success.light",
          position: "absolute",
          // zIndex: "1"
        }}
      >
        <Box sx={{ px: 5, py: 5 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Profile</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Role</TableCell>
                  <TableCell align="center">DateOfBirth</TableCell>
                  <TableCell align="center">Address</TableCell>
                  <TableCell align="center">Phone</TableCell>
                  <TableCell align="center">Created Date</TableCell>
                  <TableCell align="center">Updated Date</TableCell>
                  <TableCell align="center">Menu</TableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {users.data.map((row: User) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">
                      <img
                        src={
                          "http://localhost:8000/" +
                          row.profile +
                          "?auto=format&fit=crop&w=800"
                        }
                        srcSet={
                          "http://localhost:8000/" +
                          row.profile +
                          "?auto=format&fit=crop&w=800&dpr=2 2x"
                        }
                        alt={row.name}
                        loading="lazy"
                        className="user-img"
                      />
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.role}</TableCell>
                    <TableCell align="right">{row.dob}</TableCell>
                    <TableCell align="right">{row.address}</TableCell>
                    <TableCell align="right">{row.phone}</TableCell>
                    <TableCell align="right">
                      {row.created_at.toString()}
                    </TableCell>
                    <TableCell align="right">
                      {row.updated_at.toString()}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={handleClick}
                        onMouseOver={handleClick}
                      >
                        <MoreVertTwoTone />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleMenuItemClick}>Edit</MenuItem>
                        <MenuItem onClick={handleClose}>Delete</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              pt: 3,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination count={11} shape="rounded" />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default UserPage;
