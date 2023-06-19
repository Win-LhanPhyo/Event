import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useRecoilState } from "recoil";
import { eventState } from '../../redux/store/Event/event';
import { useState, MouseEvent } from "react";
import { Event } from '../../redux/domain/eventList';
import Box from '@mui/material/Box';
import { Button, ThemeProvider } from "@mui/material";
import { eventTheme } from '../../entries/theme';
import Pagination from '@mui/material/Pagination';
import HeaderPage from '../../components/Header/HeaderPage';
import DeleteModalBox from '../ModalBox/DeleteModalBox';
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVertTwoTone } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImportButton from "./ImportButton";
import ExportButton from '../ExportButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import moment from 'moment';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: eventTheme.palette.info.dark
  },
  '& th': {
    color: eventTheme.palette.text.secondary
  },
  '& td:hover' : {
    color: eventTheme.palette.text.secondary
  }
}));

const EventPage:React.FC<{
  children?: React.ReactNode;
}> = () => {
  const navigate = useNavigate();
  const [events, setEventState] = useRecoilState(eventState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  /* Start Create Modal Box */
  const [isDeleteModal, setIsDeleteModal] = React.useState(false);
  /* Start Create Modal Box */
  const [selectedUser, setSelectedUser] = React.useState<Event | null>(null);
  const [paginationData, setPaginationData] = React.useState({
    from: 1,
    last_page: 1,
    per_page: 1
  });

  const mounted = React.useRef(false);
  const data = events.data;

  React.useEffect(() => {
    if (!mounted.current) {
      fetchEvents();
    }
    mounted.current = true;
    return () => {};
  }, []);

  const fetchEvents = async (param={},page=1) => {
    param = {
      ...param,
      limit: 5,
      page
    };
    await axios.get('http://localhost:8000/api/event/list', { params: param }).then(response => {
      let data = response.data.data;
      console.log(data);
      setPaginationData({
        from: response.data.from,
        last_page: response.data.last_page,
        per_page: response.data.per_page
      });
    })
  }
  
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
  const handleDeleteClick = (data: Event) => {
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
      axios.delete('http://localhost:8000/api/event/delete/' + selectedUser.id).then(response => {
        window.location.reload();
      })
    }
  };

  /**
   *  To Change the status is approved or rejected
   */
  const changeStatus = (id: string | number, status: string) => {
    let preEventList = [...events.data];
    const index = preEventList.findIndex((event: { id: string | number; }) => event.id === id);
    
    preEventList[index] = {
      ...preEventList[index],
      status: status
    };

    const param = {
      event_name: preEventList[index].event_name,
      description: preEventList[index].description,
      from_date: preEventList[index].from_date,
      to_date: preEventList[index].to_date,
      from_time: preEventList[index].from_time,
      to_time: preEventList[index].to_time,
      status: status,
      address: preEventList[index].address,
      approved_by_user_id: preEventList[index].approved_by_user_id,
    }

    axios.post('http://localhost:8000/api/event/update/' + id, param).then((response) => {
      if(response.status === 200) {
        const temp: any = {
          data: preEventList
        };
        setEventState({
          ...temp
        })
      }
    })
  };

  const styles = {
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
  }

  return (
    <div>
        <HeaderPage />
        <ThemeProvider theme={eventTheme}>
          <Box sx={{
              width: '100%',
              backgroundColor: '#4e7294'
          }}>
            <Box sx={{ px: 5, py: 5 }}>
              <Box sx={{pb: 3, textAlign: 'end', display: 'flex', justifyContent: 'space-between'}}>
                <div>
                  <ImportButton />
                </div>
                <div>
                  <ExportButton data={data} filename="exported_data"/>
                  <Button sx={{color: 'white', border: '2px solid #52ea52', background: '#35c4358c'}} onClick={() => navigate('/admin/event/create')}>Create</Button>
                </div>
              </Box>
              <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <StyledTableRow sx={{backgroundColor: '#80bfff'}}>
                        <TableCell>ID</TableCell>
                        <TableCell align="center" color='#e6f2ff'>Event Name</TableCell>
                        <TableCell align="center" color='#e6f2ff'>Description</TableCell>
                        <TableCell align="center" color='#e6f2ff'>From ~ To</TableCell>
                        <TableCell align="center" colSpan={2}></TableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {events?.data.map((row: Event) => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell align="center">{row.event_name}</TableCell>
                          <TableCell align="center">{row.description}</TableCell>
                          <TableCell align="center">
                            {row?.from_date? moment(row.from_date).format("YYYY-MM-DD") : ''}
                          </TableCell>
                          <TableCell align="center">
                            {(row.status === 'new' || row.status === 'rejected') &&
                              <IconButton 
                                sx={{ color: '#0072ff'}}
                                onClick={() =>
                                  changeStatus(row.id, 'approved')}
                              >
                                <ThumbUpIcon/>
                              </IconButton>
                            }
                            {(row.status === 'new' || row.status === 'approved') &&
                              <IconButton
                                sx={{ color: '#d22727'}}
                                onClick={() =>
                                changeStatus(row.id, 'rejected')}
                              >
                                <ThumbDownIcon/>
                              </IconButton>
                            }
                          </TableCell>
                          <TableCell align="right" key={row.id}> 
                            <IconButton
                              aria-controls={`menu-${row.id}`}
                              aria-handleSubmit="true"
                              onClick={(event) => handleClick(event, row?.id.toString())}
                            >
                              <MoreVertTwoTone />
                            </IconButton>
                            <Menu
                              id={`menu-${row.id}`}
                              anchorEl={anchorEl}
                              open={selectedId ? parseInt(selectedId) === row.id : false}
                              onClose={handleClose}
                            >
                              <MenuItem onClick={() => navigate(`/admin/event/edit/${row.id}`)}>Edit</MenuItem>
                              <MenuItem onClick={() => handleDeleteClick(row)}>Delete</MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
              </TableContainer>
              <Box sx={{ 
                pt: 3,
                display: "flex",
                justifyContent: "center"
              }}>
                <Pagination count={10} shape="rounded" />
              </Box>
            </Box>
        </Box>
        <DeleteModalBox
          isOpen={isDeleteModal}
          onClose={handlDeleteModalClose}
          aria-labelledby="modal-modal-title"
        >
        <h1>Delete User</h1>
        <p>Are you sure you want to delete this event ?</p>
        <div style={{display: "flex", justifyContent: "space-evenly", marginBottom: "20px", marginTop: "30px"}}>
          <button type="reset" style={styles.clearbutton} onClick={handlDeleteModalClose}>Close</button>
          <button style={styles.submitButton} type="submit" onClick={handleConfirmDelete}>Confirm Delete</button>
        </div>
      </DeleteModalBox>
      </ThemeProvider>
    </div>
  );
};

export default EventPage;

function strtotime(from_date: Date): any {
  throw new Error('Function not implemented.');
}
