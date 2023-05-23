let list = [];

function addData(dist) {
  let eventList = "";
  for (i = 0; i < dist.data.length; i++) {
    eventList += `
        <div class='col col-md-4 col-12 p-3'>
            <div class='card'>
                <img class='card-img-top event-img' src='http://localhost:8000/${dist.data[i].image}'>
                <div class='card-body'>
                    <h5 class='card-title'>${dist.data[i].event_name}</h5>
                    <p class='card-text'>${dist.data[i].description}</p>
                </div>
                <div class='d-flex p-3'>
                    <button class='btn btn-primary detail-btn' data-bs-toggle='modal'
                    data-bs-target='#detailModal' onclick='openEventDetail(${i})'
                    >Detail</button>
                </div>
            </div>
        </div>
      `
  }
  return eventList;
}

function formatDate(date) {
  var d = new Date(date);
  return [
    d.getFullYear(),
    ('0' + (d.getMonth() + 1)).slice(-2),
    ('0' + d.getDate()).slice(-2)
  ].join('-');
}

function openEventDetail(index) {
  console.log(index);
  let detailData = `
    <div class="container-fluid" id="event-dialog-body">
      <div class="row event-row">
        <div class="col-md-8">
          <img class="dialog-img" src="http://localhost:8000/${list[index].image}" />
        </div>
    <div>
    <div class="row event-row">
        <div
          class="col-md-4">
          Event Name
        </div>
        <div
          class="col-md-8 ms-auto">
          ${list[index].event_name}
        </div>
    </div>
  
    <div class="row event-row">
        <div
          class="col-md-4">
          Description
        </div>
        <div
          class="col-md-8 ms-auto">
          ${list[index].description}
        </div>
    </div>
      
    <div class="row event-row">
        <div
          class="col-md-4">
          From Date
        </div>
        <div
          class="col-md-8 ms-auto">
          ${list[index].from_date}
        </div>
    </div>
  
    <div class="row event-row">
        <div
          class="col-md-4">
          To Date
        </div>
        <div
          class="col-md-8 ms-auto">
          ${list[index].to_date}
        </div>
    </div>
  
    <div class="row event-row">
        <div
          class="col-md-4">
          From Time
        </div>
        <div
          class="col-md-8 ms-auto">
          ${list[index].from_time}
        </div>
    </div>
  
    <div class="row event-row">
        <div
          class="col-md-4">
          To Time
        </div>
        <div
          class="col-md-8 ms-auto">
          ${list[index].to_time}
        </div>
    </div>
  
    <div class="row event-row">
        <div
          class="col-md-4">
          Status
        </div>
        <div
          class="col-md-8 ms-auto">
          ${list[index].status}
        </div>
    </div>
      
    <div class="row event-row">
        <div
          class="col-md-4">
          Address
        </div>
        <div
          class="col-md-8 ms-auto">
          ${list[index].address}
        </div>
    </div>
  
    <div class="row event-row">
        <div
          class="col-md-4">
          Approved By User
        </div>
        <div
          class="col-md-8 ms-auto">
          ${list[index].username}
        </div>
    </div>
  
    <div class="row event-row">
        <div
            class="col-md-4">
            Created At
        </div>
        <div
            class="col-md-8 ms-auto">
            ${formatDate(list[index].created_at)}
        </div>
    </div>
  
    <div class="row event-row">
        <div
            class="col-md-4">
            Updated At
        </div>
        <div
            class="col-md-8 ms-auto">
            ${formatDate(list[index].updated_at)}
        </div>
        </div>
    </div>`;
  $("#event-dialog-body").replaceWith(detailData);
}


$(document).ready(function () {
  var URL = 'http://127.0.0.1:8000';

  $.get(URL + '/api/event/previous/list', function (dist, status) {
    list = dist.data;
    var eventList = addData(dist);
    console.log(eventList);
    $(".current-events-list").append(eventList);
  });
})
