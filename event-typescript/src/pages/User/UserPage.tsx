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
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import { User } from "../../redux/domain/userList";
import "../../App.css";
import styled from "@emotion/styled";
import { IconButton, Menu, MenuItem, Modal } from "@mui/material";
import { MoreVertTwoTone } from "@mui/icons-material";
import UserEdit from "./UserEdit";
import { useState, MouseEvent } from "react";
import moment from 'moment';
import ModalBox from '../ModalBox/ModalBox';
import DeleteModalBox from '../ModalBox/DeleteModalBox';
import CreatePage from '../User/CreatePage';
import ExportButton from './ExportButton';
import ImportButton from "./ImportButton";
import HeaderPage from '../../components/Header/HeaderPage';
import axios from "axios";

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

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: [0, '8px', '8px', 0],
  boxShadow: 24,
  p: 4,
};


/* End Modal Box */

const UserPage: React.FC<{
  children?: React.ReactNode;
}> = () => {
  const [users, setUserState] = useRecoilState(userState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedData, setSelectedData] = useState<User | null>(null);

  /**
   * icon button click show edit modal small box
   * @param event
   */
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * close the modal box for icon click
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * edit modal box's close icon button event
   */
  const handleUpdateSelectedData = (action: any) => {
    if (action.type === 'UPDATE_SELECTED_DATA') {
      setSelectedData(action.data);
    }
  };

  /**
   * show edit modl box when edit button clicked
   */
  const handleMenuItemClick = (data: User) => {
    handleClose();
    setShowEditModal(true);
    setSelectedData(data);
  };

  
  /* Start Create Modal Box */
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  /* Start Create Modal Box */
  const [isDeleteModal, setIsDeleteModal] = React.useState(false);

    /* Start Create Modal Box */
    const [selectedUser, setSelectedUser] = React.useState<User | null>(null);


  /**
   * close edit modl box when close button clicked
   */
  const handleModalClose = () => {
    setShowEditModal(false);
    setUserState(users);
  };

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

  /**
   * show create user modal when create button is clicked
   */
  const handleCreateClick = () => {
      setIsModalOpen(true);
  };

  /**
   * close create user modal 
   */
  const handleCloseModal = () => {
      setIsModalOpen(false);
      setIsDeleteModal(false);
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
      background: '#daef73',
    },
    clearbutton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      background: '#cfde41',
    },     
  }
  return (
    <ThemeProvider theme={eventTheme}>
      <HeaderPage />
      <Box
        sx={{
          width: "100%",
          backgroundColor: "success.light",
          position: "relative !important",
        }}
      >
        <Box sx={{ px: 5, py: 5 }}>
          <Box sx={{pb: 3, textAlign: 'end'}}>
            <div>
              <ImportButton />
              <ExportButton data={data} filename="exported_data"/>
              <Button sx={{color: 'primary', border: '1px solid blue'}} onClick={handleCreateClick}>Create</Button>
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
                    <TableCell align="right">{row.role == "0" ? "User" : "Admin"}</TableCell>
                    <TableCell align="right">{row?.dob ? moment(row.dob).format("YYYY-MM-DD") : ''}</TableCell>
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
                        <MenuItem onClick={() => handleMenuItemClick(row)}>Edit</MenuItem>
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
            <Pagination count={11} shape="rounded" />
          </Box>
        </Box>
      </Box>
      <Modal 
        open={showEditModal}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)"}}
      >
        <Box sx={style}>
          <UserEdit onClose={handleModalClose} selectedData={selectedData} onUpdateSelectedData={handleUpdateSelectedData} />
        </Box>
      </Modal>
      <DeleteModalBox
        isOpen={isDeleteModal}
        onClose={handlDeleteModalClose}
        aria-labelledby="modal-modal-title"
      >
        <h1>Delete User</h1>
        <p>Are you sure to Delete?</p>
        <div style={{display: "flex", justifyContent: "space-evenly", marginBottom: "20px", marginTop: "30px"}}>
          <button type="reset" style={styles.clearbutton} >Clear</button>
          <button style={styles.submitButton} type="submit" onClick={handleConfirmDelete}>Confirm Delete</button>
        </div>
      </DeleteModalBox>
      <div style={styles.modalScroll}>
        <ModalBox
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
        >
          <CreatePage />
        </ModalBox>
      </div>
    </ThemeProvider>
  );
};

export default UserPage;