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
import CreatePage from '../User/CreatePage';
import ExportButton from './ExportButton';
import ImportButton from "./ImportButton";

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
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleUpdateSelectedData = (action: any) => {
    if (action.type === 'UPDATE_SELECTED_DATA') {
      setSelectedData(action.data);
    }
  };
  const handleMenuItemClick = (data: User) => {
    handleClose();
    setShowEditModal(true);
    setSelectedData(data);
  };
  const handleModalClose = () => {
    setShowEditModal(false);
    setUserState(users);
  };

  const [sortedData, setSortedData] = React.useState<User[]>(users.data); // 1,2,3,4,5,6,7,8,9,10...
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");

  const handleSerailNo = (event: React.MouseEvent<HTMLElement>) => {
    const sorted = sortedData.slice().sort((a, b) => {
      if(sortOrder === "asc") {
        return b.id - a.id; // sort descending
      } else {
        return a.id - b.id; // sort ascending
      }
    });

    setSortedData(sorted);
    setSortOrder(sortOrder === "asc"? "desc" : "asc");
  };

  /* Start Modal Box */
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleCreateClick = () => {
      setIsModalOpen(true);
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
  };
  // To Export the data of user
  const data = users.data;

  const styles ={
    modalScroll: {
      overflow: 'scroll',
      height: '500px',
    }
  }
  return (
    <ThemeProvider theme={eventTheme}>
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
              {/* <Button sx={{color: 'primary', border: '1px solid blue',  marginRight: '20px'}} onClick={handleDownload}>Download CSV</Button> */}
              <Button sx={{color: 'primary', border: '1px solid blue'}} onClick={handleCreateClick}>Create</Button>
          </div>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <TableCell sx={{ align: 'center', display: 'flex' }}>ID
                    <IconButton onClick={handleSerailNo} sx={{px: 0, py: 0, color: '#D6D6D6'}}>
                    </IconButton>
                  </TableCell>
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
                        <MenuItem onClick={handleClose}>Delete</MenuItem>
                      </Menu>
                      <Modal 
                        open={showEditModal}
                        onClose={handleModalClose}
                        aria-labelledby="modal-title"
                      >
                        <Box sx={style}>
                          <UserEdit onClose={handleModalClose} selectedData={selectedData} onUpdateSelectedData={handleUpdateSelectedData} />
                        </Box>
                      </Modal>
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
