const error = null;
const server_error = null;
var eventData = [];
var is_edit = false;
let handleEdit = (id) => {
    is_edit = true;
    eventData.forEach(event => {
        if (event.id == id) {
            console.log(event.id);
            $("#exampleModalLabel").text("Event Edit");
            $('.event_name').val(event.event_name);
            $('.id').val(event.id);
            $('.address').val(event.address);
            $('.description').val(event.description);
            $('.from_date').val(event.from_date);
            $('.to_date').val(event.to_date);
            $('.from_time').val(event.from_time);
            $('.to_time').val(event.to_time);
        }
    })
    $("#exampleModal").modal('show');
};
let handleDelete = (id) => {
    is_edit = false;
    eventData.forEach(event => {
        if (event.id == id) {
            if (confirm("Are you sure you want to delete this event ?")) {
                $(".container-box").loading({ message: "Event loading..." });
                $.ajax({
                    type: "DELETE",
                    url: `http://localhost:8000/api/event/delete/${id}`,
                    headers: { Accept: "application/json" },
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        $(".container-box").loading("stop");
                        const message = res.message;
                        Toast.fire({
                            icon: "success",
                            title: message,
                        });
                    },
                    error: function (error) {
                        $(".container-box").loading("stop");
                        if (error.status === 422) {
                            this.server_error = $.parseJSON(
                                error.responseText
                            ).errors.email;
                            Toast.fire({
                                icon: "error",
                                title: this.server_error,
                            });
                        }
                    },
                });
            }
        }
    })
}
let OpenModal = () => {
    is_edit = false;
    console.log('model box');
    $("#exampleModalLabel").text("Event Create");
    $('.event_name').val('');
    $('.id').val('');
    $('.address').val('');
    $('.description').val('');
    $('.from_date').val('');
    $('.to_date').val('');
    $('.from_time').val('');
    $('.to_time').val('');
    $("#exampleModal").modal('show');
}
$(document).ready(function () {
    var URL = "http://127.0.0.1:8000";
    $.get(URL + "/api/event/list", function (data, status) {
        console.log("--------data", data);
        eventData = data.data;
        this.event_Data = data.data;
        console.log(eventData);

        $("#eventlist_tbl").DataTable({
            responsive: true,
            data: eventData,
            order: [[0, 'desc']],
            lengthMenu: [5, 10, 20, 50, 100, 200, 500],
            columns: [
                { data: "id" },
                { data: "image" },
                { data: "event_name" },
                { data: "from_date" },
                { data: "from_time" },
                { data: "status" },
                { data: "approved_by_user_id" },
                { data: "created_at" },
                { data: "updated_at" },
                {
                    data: "id",
                    render: (data, type, row) => {
                        return `<div class="d-flex justify-content-around">
                        <button class="btn btn-primary mx-1" onclick="handleEdit(${row.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style="width: 25px; height:25px" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        </button>
                        <button class="btn btn-danger" onclick="handleDelete(${row.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style="width: 25px; height:25px">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        </button>
                        </div>`;
                    },
                },
            ],
        });
    });
});
const handleSubmit = (event) => {
    event.preventDefault();
    $(".container-box").loading({ message: "Event loading..." });
    const formData = new FormData(document.getElementById("form"));
    if (formData && is_edit == false) {
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/api/event/create",
            headers: { Accept: "application/json" },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (res) {
                console.log("res", res);
                $("#exampleModal").modal('hide');
                $(".container-box").loading("stop");
                const message = res.message;
                Toast.fire({
                    icon: "success",
                    title: message,
                });
            },
            error: function (error) {
                $(".container-box").loading("stop");
                if (error.status === 422) {
                    this.server_error = $.parseJSON(error.responseText).errors.email;
                    Toast.fire({
                        icon: "error",
                        title: this.server_error,
                    });
                }
            },
        });
    } else {
        console.log('edit mode');
        var id = $(".id").val();
        $.ajax({
            type: "POST",
            url: `http://localhost:8000/api/event/update/${id}`,
            headers: { Accept: "application/json" },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (res) {
                console.log("res", res);
                $("#exampleModal").modal('hide');
                $(".container-box").loading("stop");
                const message = res.message;
                Toast.fire({
                    icon: "success",
                    title: message,
                });
            },
            error: function (error) {
                $(".container-box").loading("stop");
                if (error.status === 422) {
                    this.server_error = $.parseJSON(error.responseText).errors.email;
                    Toast.fire({
                        icon: "error",
                        title: this.server_error,
                    });
                }
            },
        });
    }
};
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});
let editEvent = (data) => {
    console.log("edie");
    console.log(data);
};
let validation = (value, name) => {
    if (name == "email") {
        if (!value) {
            $(".button").prop("disabled", true);
            return "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            $(".button").prop("disabled", true);
            return "Email Format is required";
        }
        $(".button").prop("disabled", false);
        return "";
    }
};
const handleBlur = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.error = validation(value, name);
    $(".error").text(this.error);
    this.error
        ? $(".email").addClass("is-invalid")
        : $(".email").removeClass("is-invalid");
};
const hanleKeydown = (event) => {
    if (event.target.name == "email") {
        if (!event.target.value) {
            $(".button").prop("disabled", true);
            return;
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(event.target.value)
        ) {
            $(".button").prop("disabled", true);
            return;
        }
        $(".button").prop("disabled", false);
    }
    $(".error").empty();
    $(".email").removeClass("is-invalid");
};
