import axios from "axios";
import React, { useState } from "react";
import HeaderPage from '../Header/HeaderPage';

const RegistrationForm: React.FC = () => {
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

  const validateForm = () => {
    const newErrors: {[key: string]: string} ={};
    const  requiredFields:string[] = [formData.name, formData.password, formData.confirmPassword, formData.phone, formData.profile, formData.role, formData.address, formData.dob];
    const  errorMessages:string[] = ['name', 'password', 'confirmPassword', 'phone', 'profile', 'role', 'address', 'dob'];
    requiredFields.forEach((field) => {
      if(field.trim() === '') {
        errorMessages.forEach((message) => {
          newErrors[message] = `${message.charAt(0).toUpperCase() + message.slice(1)} is required.`;
        });
      }
    })

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(formData.email)) {
      newErrors.email = "Email is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if(file) {
      const reader = new FileReader();
      console.log(reader);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  }

  const handleClear = () => {
    setFormData(initialFormData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name,value } = event.target;
    setFormData({...formData, [name]:value });
  }

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
      apiFormData.append("profile", formData.profile);

      axios.post('http://localhost:8000/api/user/create', apiFormData).then((response) => {
        if (response.status === 200) {
          window.location.href = '/admin/loginForm';
        }
      }).catch(error => {
        console.log(error);
      });
    }else {
      console.log(errors);
    }
  };

  const styles = {    
    register: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerBox: {
        marginTop: '4rem',
        width: '450px',
        background: '#b1b592',
    },
    registerHeader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize:' xx-large',
        fontWeight: 'bolder',
        marginTop: '52px',
    },
    input: {
        padding: '20px 0 30px 0',
        margin: "0 auto",
        width: "83%",
    }, 
    inputStyle: {
        border: 'none',
        borderRadius: '5px',
        padding: '10px',
        width: '95%',
        display: 'block',
        marginBottom: "5px",
        marginTop: "30px",
    }, 
    submitButton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      background: '#daef73',
    },
    clearbutton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      background: '#cfde41',
    },
    previewImage: {
      with: "200px",
      height: "200px"
    },
      errorMessage: {
        display: "block",
        fontSize: "14px",
        color: "#b41616",
      }
    // submitButton:hover: {
    //     background: '#def183',
    //     cursor: 'pointer',
    // }
  }

  return (
    <div>
      <HeaderPage />
      <form style={styles.register} onSubmit={handleSubmit}> 
        <div style={styles.registerBox}>
        <div style={styles.registerHeader}>Register</div>
        <div style={styles.input}>
          <input 
            style={styles.inputStyle} 
            placeholder="Enter your name" 
            name="name" 
            type="name" 
            value={formData.name} 
            onChange={handleChange}
          />
          {errors.name && <span style={styles.errorMessage}>{errors.name}</span>}
          <div style={styles.inputStyle}>
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={formData.role === 'admin'}
                onChange={handleChange}
              />
              Admin
            </label>
            <label>
              <input
                name="role"
                type="radio"
                value="user"
                checked={formData.role ==='user' ? true : false}
                onChange={handleChange}
              />
              User
            </label>
          </div>
          {errors.role && <span style={styles.errorMessage}>{errors.role}</span>}
          <input
            style={styles.inputStyle} 
            placeholder="Enter your email" 
            name="email" 
            type="email" 
            value={formData.email} 
            onChange={handleChange}
          />
          {errors.email && <span style={styles.errorMessage}>{errors.email}</span>}
          <input
            style={styles.inputStyle}
            placeholder="Enter your address"
            name="address"
            type="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <span style={styles.errorMessage}>{errors.address}</span>}
          <input
            style={styles.inputStyle}
            placeholder="Enter your Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
          />
          {errors.dob && <span style={styles.errorMessage}>{errors.dob}</span>}
          <div style={styles.inputStyle}>
            { 
              previewImage && 
              <img 
                src={previewImage.toString()} 
                style={styles.previewImage} 
                alt="Preview"
              />
            }
            <input
              type="file"
              name="profile"
              onChange={handleFileChange}
            />
          </div>
          {errors.profile && <span style={styles.errorMessage}>{errors.profile}</span>}
          <input
            style={styles.inputStyle} 
            placeholder="Enter your password" 
            name="password"
            type="password" 
            value={formData.password} 
            onChange={handleChange}
          />
          {errors.password && <span style={styles.errorMessage}>{errors.password}</span>}
          <input
            style={styles.inputStyle}
            placeholder="Enter your confrim password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <span style={styles.errorMessage}>{errors.confirmPassword}</span>}
          <input
            style={styles.inputStyle}
            placeholder="Enter your phone number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span style={styles.errorMessage}>{errors.phone}</span>}
        </div>
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
          <button type="reset" style={styles.clearbutton} onClick={handleClear}>Clear</button>
          <button style={styles.submitButton} type="submit">Register</button>
        </div>
        <div style={{display: "flex", justifyContent: "center", marginTop: "15px", marginBottom: "20px", fontSize: "13px"}}>
          <span>Click Here for </span>
          <a href="/admin/loginForm">
            Login
          </a>
        </div>
        </div>
      </form>
    </div>
      
  )
}  

export default RegistrationForm;