import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import EventPagination from '../../components/EventPagination/EventPagination';
import { eventData, eventTableProperty, eventDialogProperty, paginationLimit } from '../../utils/constants/constant';
import EventDetailDialog from '../../components/EventDetailDialog/EventDetailDialog';
import ListTable from '../../components/ListTable/ListTable';
import styles from './EventPage.module.scss';
import axios from '../../axios/index';

const EventListPage = () => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [eventDialogData, setEventDialogData] = React.useState({});
  const [eventList, setEventList] = React.useState([]);
  const [paginationData, setPaginationData] = React.useState({
    from: 1,
    last_page: 1,
    per_page: 1
  })
  const mounted = React.useRef(false);
  let nameInput = React.createRef();
  let fromDateInput = React.createRef();
  let toDateInput = React.createRef();

  const handleDialog = (data) => {
    const flag = !showDialog;
    setShowDialog(flag);
    setEventDialogData(data);
  }

  const changeStatus = (id, status) => {
    let preEventList = eventList;
    const index = preEventList.findIndex(event => event.id === id);
    const event_list_data = preEventList.filter(event =>event.id === id)[0];
    preEventList[index].status =  status;
    preEventList[index].approved_by_user_id = status === 'approved' ? 1 : null;
    axios.post('/event/update/' + id, preEventList[index]).then((response) => {
      if(response.status === 200) {
        console.log('Event data was successfully updated!');
      }
    })
    searchEvent();
    if(status == 'approved'){
      sentLineMessage(event_list_data);
    }
  }

  const sentLineMessage = (event_list_data) =>{
    let formData = new FormData();
    formData.append('id', event_list_data.id);
    formData.append('address', event_list_data.address);
    formData.append('approved_by_user_id', event_list_data.approved_by_user_id);
    formData.append('description', event_list_data.description);
    formData.append('dob', event_list_data.dob);
    formData.append('event_name', event_list_data.event_name);
    formData.append('from_date', event_list_data.from_date);
    formData.append('from_time', event_list_data.from_time);
    formData.append('image', event_list_data.image);
    formData.append('phone', event_list_data.phone);
    formData.append('profile', event_list_data.profile);
    formData.append('user_address', event_list_data.user_address);
    formData.append('username', event_list_data.username);
    axios.post('/line/webhook/message',formData).then((response) => {
      console.log('line message send successfully');
    }).catch((error) => {
      console.log(`error message ${error}`);
    });
  }

  const searchEvent = () => {
    const param = {};
    if (nameInput.current.value) {
      param.name = nameInput.current.value;
    }
    if (fromDateInput.current.value) {
      param.from_date = fromDateInput.current.value;
    }
    if (toDateInput.current.value) {
      param.to_date = toDateInput.current.value;
    }
    fetchEvents(param);
  }

  React.useEffect(() => {
    if (!mounted.current) {
      console.log('mounted');
      fetchEvents();
    }
    mounted.current = true;

    return () => {};
  }, []);

  const fetchEvents = async (param={},page=1) => {
    param = {
      ...param,
      limit: paginationLimit,
      page
    };
    await axios.get('/event/list', { params: param }).then(response => {
      let data = response.data.data;
      setEventList(data);
      setPaginationData({
        from: response.data.from,
        last_page: response.data.last_page,
        per_page: response.data.per_page
      });
    })
  }

  return (
    <Container className={styles.container}>
      <div className={styles.title}>
        Event List
      </div>
      <div className={styles.filterGroup}>
        <Form>
          <Row>
            <Col className={styles.filterCol}>
              <Form.Control className={styles.searchName} type="text" placeholder="Search By Name"
              ref={nameInput} />
            </Col>
            <Col className={styles.filterCol}>
              <div className={styles.fromDate}>
                <label>From Date</label>
                <Form.Control type="date" className={styles.fromDateInput} name="fromDate" placeholder="From Date" ref={fromDateInput} />
              </div>
            </Col>
            <Col className={styles.filterCol}>
              <div className={styles.toDate}>
                <label>To Date</label>
                <Form.Control type="date" className={styles.toDateInput} name="toDate" placeholder="To Date" ref={toDateInput} />
              </div>
            </Col>
            <Col className={styles.filterCol}>
              <Button variant="primary" onClick={searchEvent}>Search</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <ListTable
        tableProperty={eventTableProperty}
        list={eventList}
        btnFunction={changeStatus}
        handleDialog={handleDialog}
      />
      <EventPagination
        metadata={paginationData}
        fetchData={fetchEvents}
      />
      <EventDetailDialog
        show={showDialog}
        handleClose={handleDialog}
        data={eventDialogData}
        dialogProperty={eventDialogProperty} />
    </Container>
  )
}

export default EventListPage;