import React from 'react';
import {Modal, Button, Container, Row, Col} from 'react-bootstrap';
import moment from 'moment';
import styles from './EventDetailDialog.module.scss';

const EventDetailDialog = ({show, handleClose, data, dialogProperty}) => {

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{dialogProperty.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className={styles.eventImgRow}>
            {data?.image ? <img className={styles.eventImg} src={'http://localhost:8000/' + data?.image} />
            :
            <img className={styles.eventImg} src={'http://localhost:8000/' + data?.profile} />}
          </Row>
          {dialogProperty.property.map((dist, index) => (
            <Row className={styles.eventRow} key={index}>
              <Col>{dist.label}</Col>
              {(dist.type === 'date') ? 
              <Col>
              {(dist.key === 'from_date') ? moment(data?.[dist.key]).format('DD/MM/YYYY') + '~' + moment(data?.toDate).format('DD/MM/YYYY') : data?.[dist.key] ? moment(data?.[dist?.key]).format('DD MMM YYYY') : ''}
              </Col>
              :
              (dist.type === 'time') ? <Col>{data?.from_time + '~' + data?.to_time}</Col>
              :
              <Col>{data?.[dist.key]}</Col>
              }
            </Row>
          ))}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>);
};

export default EventDetailDialog;