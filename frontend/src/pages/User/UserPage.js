import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import EventPagination from '../../components/EventPagination/EventPagination';
import { userData, userTableProperty, userDialogProperty, paginationLimit } from '../../utils/constants/constant';
import EventDetailDialog from '../../components/EventDetailDialog/EventDetailDialog';
import ListTable from '../../components/ListTable/ListTable';
import styles from './UserPage.module.scss';
import { useHistory } from 'react-router-dom';
import axios from '../../axios/index';
import { imageURL } from '../../utils/constants/constant';

const UserPage = () => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [userDialogData, setUserDialogData] = React.useState({});
  const [userList, setUserList] = React.useState([]);
  const [paginationData, setPaginationData] = React.useState({
    from: 1,
    last_page: 1,
    per_page: 1
  })
  const mounted = React.useRef(false);
  let nameInput = React.createRef();
  let emailInput = React.createRef();
  let history = useHistory();

  const handleDialog = (data) => {
    const flag = !showDialog;
    setShowDialog(flag);
    setUserDialogData(data);
  }

  const updateDeleteUser = (id, status) => {
    if (status === 'edit') {
      history.push('/admin/user/' + id + '/update', {data : id});
    } else {
      axios.delete('/user/delete/' + id).then(response => {
        fetchUsers();
      })
    }
  }

  const searchEvent = () => {
    const param = {};
    if (nameInput.current.value) {
      param.name = nameInput.current.value;
    }
    if (emailInput.current.value) {
      param.email = emailInput.current.value;
    }
    fetchUsers(param);
  }

  React.useEffect(() => {
    if (!mounted.current) {
      console.log('mounted');
      fetchUsers();
    }
    mounted.current = true;

    return () => {};
  }, []);

  const fetchUsers = async (param={}, page=1) => {
    param = {
      ...param,
      limit: paginationLimit,
      page
    }
    await axios.get('/user/list', { params: param }).then((response) => {
      const data = response.data.data;
      setUserList(data);
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
        User List
      </div>
      <div className={styles.filterGroup}>
        <Form>
          <Row>
            <Col className={styles.filterCol}>
              <Form.Control className={styles.searchName} type="text" placeholder="Search By Name"
                ref={nameInput} />
            </Col>
            <Col className={styles.filterCol}>
              <Form.Control className={styles.searchName} type="text" placeholder="Search By Email"
                ref={emailInput} />
            </Col>
            <Col className={styles.filterCol}>
              <Button variant="primary" onClick={searchEvent}>Search</Button>
            </Col>
            <Col className={styles.filterCol}>
              <Button variant="primary" onClick={() => history.push('/admin/user/create')}>Create</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <ListTable
        tableProperty={userTableProperty}
        list={userList}
        btnFunction={updateDeleteUser}
        handleDialog={handleDialog}
      />
      <EventPagination
        metadata={paginationData}
        fetchData={fetchUsers}
      />
      <EventDetailDialog
        show={showDialog}
        handleClose={handleDialog}
        data={userDialogData}
        dialogProperty={userDialogProperty} />
    </Container>
  )
}

export default UserPage;