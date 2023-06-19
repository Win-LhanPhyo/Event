import { TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import HeaderPage from '../../components/Header/HeaderPage';

const CreatePage: React.FC = () => {
  interface FormData {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    phone: string,
    profile: string,
    role: string,
    address: string,
    dob: string
  }
  const initialFormData: FormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    profile: '',
    role: '',
    address: '',
    dob: ''
  };
  const [errors, setErrors]  = useState<{[key: string]: string}>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    profile: '',
    role: '',
    address: '',
    dob: ''
  });

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  /**
   * validation errorr message for input fields
   * @returns 
   */
  const validateForm = () => {
    // Assuming newErrors is an object to store the error messages
    const newErrors: { [key: string]: string } = {}; 
    const  requiredFields:string[] = [formData.name, formData.password, formData.confirmPassword, formData.phone, formData.profile, formData.role, formData.address, formData.dob];
    const errorMessages: string[] = ['name', 'password', 'confirmPassword', 'phone', 'profile', 'role', 'address', 'dob']; 
    for(let i=0; i<requiredFields.length; i++){
      if(requiredFields[i] === ''){
        for(let j=0; j<errorMessages.length; j++){
          if( i === j) {
            newErrors[errorMessages[j]] = `${errorMessages[j].charAt(0).toUpperCase() + errorMessages[j].slice(1)} is required.`;
          }
        }
      }
      if(requiredFields[1] !== requiredFields[2] && requiredFields[1] !== '') {
        newErrors[errorMessages[1]] = 'Password and Confirm Password do not match.';
      }
      if(requiredFields[1] !== requiredFields[2] && requiredFields[2] !== '') {
        newErrors[errorMessages[2]] = 'Passwords and Confirm Password do not match.';
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
    const file = event.target.files?.[0];
    if(file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
      const { name,value } = event.target;
      setFormData({...formData, [name]:value });
    } else {
      setSelectedFile(null);
      setPreviewImage(null);
      const { name,value } = event.target;
      setFormData({...formData, [name]:value });
    }
  }

  /**
   * handle clear event for input fields
   */
  const handleClear = () => {
    setPreviewImage(null);
    setFormData(initialFormData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name,value } = event.target;
    setFormData({...formData, [name]:value });
  }

  /**
   * handel submit event for form clicked event
   * @param event 
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)  => {
    event.preventDefault();
    const isFormValid = validateForm();
    if(isFormValid) {
      const apiFormData = new FormData();
      apiFormData.append("name", formData.name);
      apiFormData.append("email", formData.email);
      apiFormData.append("password", formData.password);
      apiFormData.append("role", formData.role);
      apiFormData.append("dob", formData.dob);
      apiFormData.append("phone", formData.phone);
      apiFormData.append("address", formData.address);
      if (selectedFile) {
        apiFormData.append("profile", selectedFile);
      }

      axios.post('http://localhost:8000/api/user/create', apiFormData).then((response) => {
        if (response.status === 200) {
          window.location.href = '/admin/users';
        }
      }).catch(error => {
        console.log(error);
      });
    }else {
      console.log(errors);
    }
  };

  const styles = {    
    create: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '34px',
        backgroundColor: '#4e7294',
    },
    createBox: {
        marginTop: '1rem',
        width: '500px',
        background: '#e0eaff',
        color: '#cce6ff',
        borderRadius: '8px',
    },
    createHeader: {
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
      <form style={styles.create} onSubmit={handleSubmit}> 
        <div style={styles.createBox}>
        <div style={styles.createHeader}>Create User</div>
        <div style={styles.input}>
          <TextField
            label="Enter user name" 
            style={styles.inputStyle}
            name="name" 
            type="name" 
            value={formData.name} 
            onChange={handleChange}
          />
          {errors.name && <span style={styles.errorMessage}>{errors.name}</span>}
          <div style={styles.radioImageStyle}>
            <label style={styles.labelStyle}>
              <input
                type="radio"
                name="role"
                value="1"
                checked={formData.role === '1'}
                onChange={handleChange}
              />
              Admin
            </label>
            <label style={styles.labelStyle}>
              <input
                name="role"
                type="radio"
                value="0"
                checked={formData.role ==='0' ? true : false}
                onChange={handleChange}
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
            value={formData.email} 
            onChange={handleChange}
          />
          {errors.email && <span style={styles.errorMessage}>{errors.email}</span>}
          <TextField
            label="Enter user address"
            style={styles.inputStyle}
            name="address"
            type="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <span style={styles.errorMessage}>{errors.address}</span>}
          <TextField
            label="Select user Date of Birth"
            style={styles.inputStyle}
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
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
            <TextField
              label="Select From Date"
              type="file"
              name="profile"
              value={formData.profile}
              style={styles.radioImageStyle}
              onChange={handleFileChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          {errors.profile && <span style={styles.errorMessage}>{errors.profile}</span>}
          <TextField
            label="Enter user password"
            style={styles.inputStyle}
            name="password"
            type="password" 
            value={formData.password} 
            onChange={handleChange}
          />
          {errors.password && <span style={styles.errorMessage}>{errors.password}</span>}
          <TextField
            label="Enter user confrim password"
            style={styles.inputStyle}
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <span style={styles.errorMessage}>{errors.confirmPassword}</span>}
          <TextField
            label="Enter user phone number"
            style={styles.inputStyle}
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span style={styles.errorMessage}>{errors.phone}</span>}
        </div>
        <div style={{display: "flex", justifyContent: "space-evenly", marginBottom: "20px"}}>
          <button type="reset" style={styles.clearbutton} onClick={handleClear}>Clear</button>
          <button style={styles.submitButton} type="submit">Create</button>
        </div>
        </div>
      </form>
    </div>
  )
}  

export default CreatePage;