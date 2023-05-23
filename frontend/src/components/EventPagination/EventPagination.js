import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import styles from './EventPagination.module.scss';

const EventPagination = ({ metadata, fetchData }) => {
  const [items, setItems] = React.useState([]);
  const [pageNo, setPageNo] = React.useState(1);

  React.useEffect(() => {
    changePagination(metadata.from || 1);
  }, []);

  const changePagination = (pageNumber) => {
    pageNumber = pageNumber < 1 ? 1 : pageNumber > metadata.last_page ? metadata.last_page : pageNumber;
    let data = [];
    let loopCount = metadata.last_page;
    if (metadata.last_page > 5) {
      loopCount = 4
    };
    console.log('meta data', metadata, pageNumber);

    for (let number = 1; number <= loopCount; number++) {
      data.push(
        <Pagination.Item key={number} active={number === pageNumber}>
          {number}
        </Pagination.Item>,
      );
    }
    setItems(data);
    setPageNo(pageNumber);
    fetchData({},pageNumber);
  }

  return (
    <div className={styles.paginationContainer}>
      <Pagination>
        <Pagination.First onClick={(event) => changePagination(1)} />
        <Pagination.Prev onClick={(event) => changePagination(pageNo - 1)} />
        <Pagination onClick={(event) => changePagination(Number(event.target.text))}>{items}</Pagination>
        {metadata.last_page > 5 &&
          (<>
            <Pagination.Ellipsis />
            <Pagination.Item active={metadata.last_page === pageNo} onClick={() => changePagination(metadata.last_page)}>{metadata.last_page}</Pagination.Item>
          </>)
        }
        <Pagination.Next onClick={(event) => changePagination(pageNo + 1)} />
        <Pagination.Last onClick={(event) => changePagination(Number(metadata.last_page))} />
      </Pagination>
      <br />
    </div>);
};

export default EventPagination;