import { TextField } from "@mui/material";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderPage from '../../components/Header/HeaderPage';

const EditPage: React.FC = () => {
  interface FormData {
    name: string,
    email: string,
    phone: string,
    profile: string,
    role: string,
    address: string,
    dob: string
  }
  const initialFormData: FormData = {
    name: '',
    email: '',
    phone: '',
    profile: '',
    role: '',
    address: '',
    dob: ''
  };
  const [errors, setErrors]  = useState<{[key: string]: string}>({
    name: '',
    email: '',
    phone: '',
    profile: '',
    role: '',
    address: '',
    dob: ''
  });

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {id} = useParams();

  /**
   * To get the selected ID
   */
  React.useEffect(() => {
    axios.get(`http://localhost:8000/api/user/detail/${id}`).then((response) => {
      if (response.status === 200) {
        setFormData({...response.data});
      }
    })
  }, []);

  /**
   * validation errorr message for input fields
   * @returns 
   */
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}; 
    const  requiredFields:string[] = [formData.name, formData.phone, formData.profile, formData.role, formData.address, formData.dob];
    const errorMessages: string[] = ['name', 'phone', 'profile', 'role', 'address', 'dob']; 
    for(let i=0; i<requiredFields.length; i++){
      if(requiredFields[i] === ''){
        for(let j=0; j<errorMessages.length; j++){
          if( i === j) {
            newErrors[errorMessages[j]] = `${errorMessages[j].charAt(0).toUpperCase() + errorMessages[j].slice(1)} is required.`;
          }
        }
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(formData.email)) {
      newErrors.email = "Email is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  /**
   * handle file change event for the profile image
   * @param event 
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      const { name,value } = event.target;
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        [name]: value
      }));
    } else {
      setSelectedFile(null);
      setPreviewImage(null);
    }
  }

  /**
   * handle clear event for input fields
   */
  const handleClear = () => {
    setPreviewImage(null);
    setFormData(initialFormData);
  };

  /**
 * input field value changes
 */
  const inputChangeForUser = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  /**
   * User Update form
   * @param e
   */
  const editFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if(isFormValid && formData) {
      const apiFormData = new FormData();
      apiFormData.append("name", formData.name);
      
      apiFormData.append("role", formData.role);
      apiFormData.append("email", formData.email);
      apiFormData.append("address", formData.address);
      apiFormData.append("dob", formData.dob);
      if (selectedFile) {
        apiFormData.append("profile", selectedFile);
      }
      apiFormData.append("phone", formData.phone);
      
      axios.post(`http://localhost:8000/api/user/update/${id}`, apiFormData).then((response) => {
        if (response.status === 200) {
          window.location.href = '/admin/users';
        }
      }).catch(error => {
        console.log(error);
      });
    }
  };

  const styles = {    
    edit: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '34px',
        backgroundColor: '#4e7294',
    },
    editBox: {
        marginTop: '1rem',
        width: '500px',
        background: '#e0eaff',
        color: '#cce6ff',
        borderRadius: '8px',
    },
    editHeader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize:' xx-large',
        fontWeight: 'bolder',
        marginTop: '30px',
        color: '#000'
    },
    labelStyle: {
      color: '#4f4c4c',
    },
    input: {
        padding: '20px 0 30px 0',
        margin: "0 auto",
        width: "90%",
    }, 
    inputStyle: {
        display: "flex",
        alignItem: 'center',
        marginBottom: "5px",
        marginTop: "25px",
    },
    radioImageStyle: {
        display: "flex",
        marginBottom: "5px",
        marginTop: "25px",
        width: "100%",
    }, 
    submitButton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      fontSize: "14px",
      background: '#32dc32b0',
      color: '#fff',
      cursor: 'pointer',
    },
    clearbutton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      fontSize: "14px",
      background: '#d41616',
      color: '#fff',
      cursor: 'pointer',
    },
    previewImage: {
      with: "200px",
      height: "200px",
      marginTop: "20px",
    },
    errorMessage: {
      display: "block",
      fontSize: "14px",
      color: "#b41616",
    }
  }

  return (
    <div>
      <HeaderPage />
      <form style={styles.edit} onSubmit={editFormSubmit}> 
        <div style={styles.editBox}>
        <div style={styles.editHeader}>Edit User</div>
        <div style={styles.input}>
          <TextField
            label="Enter user name"
            style={styles.inputStyle}
            name="name" 
            type="name"
            value={formData?.name}
            onChange={inputChangeForUser}
          />
          {errors.name && <span style={styles.errorMessage}>{errors.name}</span>}
          <div style={styles.radioImageStyle}>
            <label style={styles.labelStyle}>
              <input
                type="radio"
                name="role"
                value="1"
                checked={formData?.role.toString() === '1'}
                onChange={inputChangeForUser}
              />
              Admin
            </label>
            <label style={styles.labelStyle}>
              <input
                name="role"
                type="radio"
                value="0"
                checked={formData?.role.toString() === '0'}
                onChange={inputChangeForUser}
              />
              User
            </label>
          </div>
          {errors.role && <span style={styles.errorMessage}>{errors.role}</span>}
          <TextField
            label="Enter user email"
            style={styles.inputStyle}
            name="email" 
            type="email"
            value={formData?.email}
            onChange={inputChangeForUser}
          />
          {errors.email && <span style={styles.errorMessage}>{errors.email}</span>}
          <TextField
            label="Enter user address"
            style={styles.inputStyle}
            name="address"
            type="address"
            value={formData?.address}
            onChange={inputChangeForUser}
          />
          {errors.address && <span style={styles.errorMessage}>{errors.address}</span>}
          <TextField
            label="Enter user Date of Birth"
            style={styles.inputStyle}
            name="dob"
            type="date"
            value={formData?.dob}
            onChange={inputChangeForUser}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {errors.dob && <span style={styles.errorMessage}>{errors.dob}</span>}
          <div>
            { 
              previewImage && 
              <img 
                src={previewImage.toString()} 
                style={styles.previewImage} 
                alt="profile"
              />
            }
            {
                !previewImage && 
                <img
                  src={
                    "http://localhost:8000/" +
                    formData.profile +
                    "?auto=format&fit=crop&w=800"
                  }
                  srcSet={
                    "http://localhost:8000/" +
                    formData.profile +
                    "?auto=format&fit=crop&w=800&dpr=2 2x"
                  }
                  alt={formData.name}
                  loading="lazy"
                  style={styles.previewImage}
                />
            }
            <TextField
              style={styles.radioImageStyle}
              label="Enter user image"
              type="file"
              name="profile"
              onChange={handleFileChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          {errors.profile && <span style={styles.errorMessage}>{errors.profile}</span>}
          <TextField
            label="Enter user phone number"
            style={styles.inputStyle}
            name="phone"
            type="tel"
            value={formData?.phone}
            onChange={inputChangeForUser}
          />
          {errors.phone && <span style={styles.errorMessage}>{errors.phone}</span>}
        </div>
        <div style={{display: "flex", justifyContent: "space-evenly", marginBottom: "20px"}}>
          <button type="reset" style={styles.clearbutton} onClick={handleClear}>Clear</button>
          <button style={styles.submitButton} type="submit">Update User</button>
        </div>
        </div>
      </form>
    </div>
  )
}  

export default EditPage;