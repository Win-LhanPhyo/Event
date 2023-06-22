import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Button from '@mui/material/Button';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useRecoilState } from "recoil";
import { userState } from "../../redux/store/User/user";
import { ThemeProvider } from "@mui/material/styles";
import { eventTheme } from "../../entries/theme";
import Box from "@mui/material/Box";
import { User } from "../../redux/domain/userList";
import "../../App.css";
import styled from "@emotion/styled";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVertTwoTone } from "@mui/icons-material";
import { useState, MouseEvent } from "react";
import moment from 'moment';
import DeleteModalBox from '../ModalBox/DeleteModalBox';
import ExportButton from '../ExportButton';
import ImportButton from "./ImportButton";
import HeaderPage from '../../components/Header/HeaderPage';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

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

/* End Modal Box */

const UserPage: React.FC<{
  children?: React.ReactNode;
}> = () => {
  const [users, setUserState] = useRecoilState(userState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [ selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const pageNums = [1, 2, 3, 4, 5];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(users.data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = users.data.slice(startIndex, endIndex);
  /**
   * icon button click show edit modal small box
   * @param event
   */
  const handleClick = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  /**
   * close the modal box for icon click
   */
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  /* Start Create Modal Box */
  const [isDeleteModal, setIsDeleteModal] = React.useState(false);

  /* Start Create Modal Box */
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  /**
   * close edit modl box when close button clicked
   */
  const handlDeleteModalClose = () => {
    setIsDeleteModal(false);
  };

  /**
   *  show delete modal dialog
   * @param data for selected user
   */
  const handleDeleteClick = (data: User) => {
    setSelectedUser(data);
    setIsDeleteModal(true);
    handleClose();
  };

  /**
   *  Delete the selected users
   */
  const handleConfirmDelete = () => {
    if(selectedUser) {
      handleClose();
      axios.delete('http://localhost:8000/api/user/delete/' + selectedUser.id).then(response => {
        window.location.reload();
      })
    }
  };

  // To Export the data of user
  const data = users.data;

  const styles ={
    modalScroll: {
      overflow: 'scroll',
    },
    submitButton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      background: '#d41616',
      color: '#e6f2ff',
      cursor: 'pointer',
    },
    clearbutton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      color: '#e6f2ff',
      background: '#1a8cff',
      cursor: 'pointer',
    },
    paginateStyle: {
      padding: '4px 10px 0 10px',
      border: '1px solid #bdbdbe',
    },
  }
  return (
    <ThemeProvider theme={eventTheme}>
      <HeaderPage />
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#4e7294",
          position: "relative !important",
        }}
      >
        <Box sx={{ px: 5, py: 5 }}>
          <Box sx={{pb: 3, textAlign: 'end', display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <ImportButton />
            </div>
            <div>
              <ExportButton data={data} filename="userLists_data"/>
              <Button sx={{color: 'white', border: '2px solid #52ea52', background: '#35c4358c'}} onClick={() => navigate('/admin/user/create')}>Create</Button>
            </div>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <TableCell sx={{ align: 'center', display: 'flex' }}>ID</TableCell>
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
                {currentData.map((row: User) => (
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
                    <TableCell align="center" color="#393939">
                      <Link to={`/admin/user/edit/${row.id}`} style={{ color: '#393939'}}>{row.name}</Link>
                    </TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.role == "0" ? "User" : "Admin"}</TableCell>
                    <TableCell align="center">{row?.dob ? moment(row.dob).format("YYYY-MM-DD") : ''}</TableCell>
                    <TableCell align="center">{row.address}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">
                      {row?.created_at ? moment(row.created_at).format("YYYY-MM-DD") : ''}
                    </TableCell>
                    <TableCell align="center">
                      {row?.updated_at ? moment(row.updated_at).format("YYYY-MM-DD") : ''}
                    </TableCell>
                    <TableCell align="right" key={row.id}>
                      <IconButton
                        aria-controls={`menu-icon-${row.id}`}
                        aria-haspopup="true"
                        onClick={(event) => handleClick(event, row.id.toString())}
                      >
                        <MoreVertTwoTone />
                      </IconButton>
                      <Menu
                        id={`menu-${row.id}`}
                        anchorEl={anchorEl}
                        open={selectedId? parseInt(selectedId) === row.id: false}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => navigate(`/admin/user/edit/${row.id}`)}>Edit</MenuItem>
                        <MenuItem onClick={() => handleDeleteClick(row)}>Delete</MenuItem>
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
            <button style={styles.paginateStyle} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              <KeyboardDoubleArrowLeftIcon/>
            </button>
            {pageNums.map((pageNum: number, idx: React.Key | null | undefined) => (
              pageNum <= totalPages ? (
                <button
                  onClick={() => setCurrentPage(pageNum)} 
                  key={idx} 
                  disabled={isNaN(pageNum)}
                  style={{
                    ...styles.paginateStyle,
                    backgroundColor: currentPage === pageNum ? '#7baee6ba' : ''
                  }}
                >
                  {pageNum}
                </button>
              ) : null
            ))}
            <button style={styles.paginateStyle} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
              <KeyboardDoubleArrowRightIcon/>
            </button>
          </Box>
        </Box>
      </Box>
      <DeleteModalBox
        isOpen={isDeleteModal}
        onClose={handlDeleteModalClose}
        aria-labelledby="modal-modal-title"
      >
        <h1>Delete User</h1>
        <p>Are you sure to Delete?</p>
        <div style={{display: "flex", justifyContent: "space-evenly", marginBottom: "20px", marginTop: "30px"}}>
          <button type="reset" style={styles.clearbutton} onClick={handlDeleteModalClose}>Close</button>
          <button style={styles.submitButton} type="submit" onClick={handleConfirmDelete}>Confirm Delete</button>
        </div>
      </DeleteModalBox>
    </ThemeProvider>
  );
};

export default UserPage;