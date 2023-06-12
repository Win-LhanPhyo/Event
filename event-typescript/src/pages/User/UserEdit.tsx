import { Box, NativeSelect, Select } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DateOfBirth from "./DateOfBirth";
import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@mui/material";
import { User, Users } from "../../redux/domain/userList";
import axios from "axios";

type ModalContentProps = {
  onClose: () => void;
  selectedData: User | null;
  onUpdateSelectedData: (data: any) => void;
};


const role = [
  {
    value: "",
    label: "Select",
  },
  {
    value: "1",
    label: "Admin",
  },
  {
    value: "0",
    label: "User",
  },
];

const UserEdit : React.FC<ModalContentProps> = ({ selectedData, onUpdateSelectedData }) => {
  const [formData , setFormData] =useState(selectedData);

  const inputChangeForUser = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const editFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if(formData) {
      axios.post(`http://localhost:8000/api/user/update/${formData['id']}`, formData).then((response) => {
        if (response.status === 200) {
          window.location.href = '/admin/users';
        }
      }).catch(error => {
        console.log(error);
      });
      onUpdateSelectedData({ type: 'UPDATE_SELECTED_DATA', data: formData });
    }


  };
  return (
    <Box
      component="form"
      onSubmit={editFormSubmit}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch"},
        "& .MuiNativeSelect-root": { m: 1, width: "50ch"}
      }}
      noValidate
      autoComplete="off"
    >
      <h2>User Edit</h2>
      <div>
        <TextField
          required
          id="outlined-id"
          label="id"
          name="id"
          value={formData?.id}
          onChange={inputChangeForUser}
          disabled
        />
        <TextField
          required
          id="outlined-name"
          label="Name"
          name="name"
          placeholder="Your Name"
          value={formData?.name}
          onChange={inputChangeForUser}
        />
        <TextField
          required
          id="outlined-email"
          label="email"
          name="email"
          placeholder="example@gmail.com"
          value={formData?.email}
          onChange={inputChangeForUser}
        />
        <TextField
          required
          id="outlined-address"
          label="Address"
          name="address"
          placeholder="Fill your address"
          value={formData?.address}
          onChange={inputChangeForUser}
        />
        <TextField
          id="outlined-number"
          label="Phone Number"
          type="number"
          name="phone"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Fill your phone number"
          value={formData?.phone}
          onChange={inputChangeForUser}
        />
        <NativeSelect
        >
          {role.map((option) => (
            <option value={option.value} key={option.value} selected={option.value === formData?.role}>{option.label}</option>
          ))}
        </NativeSelect>
        {formData && (
          <DateOfBirth selectData={formData} />
        )}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </Box>
  );
};

export default UserEdit;
