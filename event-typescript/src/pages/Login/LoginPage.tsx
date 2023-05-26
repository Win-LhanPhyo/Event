import React, { useState } from "react";
import axios from 'axios';

let LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({
    email: '',
    password: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name,value } = event.target;
    setFormData({...formData, [name]:value });
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Name Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(formData.email)) {
      newErrors.email = 'Email is not valid.';
    }

    if(formData.password.trim() === '') {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isFormValid = validateForm();
    if(isFormValid) {
      axios.post('http://localhost:8000/api/login', formData).then((response) => {
        if(response.status === 200) {
          /** store logged in user's info to local storage */
          const { data } = response;
          console.log(response);
          localStorage.setItem(
            "user",
            JSON.stringify({
              accessToken: data.token,
              ...data.user
            })
          );
          window.location.href = '/admin/events';
        }
      }).catch((error) => {
        console.log(error);
      });
    } else {
      console.log(errors);
    }
  }

  const styles = {    
    login: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginBox: {
        marginTop: '8rem',
        width: '450px',
        background: '#b1b592',
    },
    loginHeader: {
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
        marginBottom: "10px",
        marginTop: "30px",
    }, 
    submitButton: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        background: '#daef73',
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
    <form style={styles.login}  onSubmit={handleSubmit}>
      <div style={styles.loginBox}>
        <div style={styles.loginHeader}>Login</div>
        <div style={styles.input}>
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
            placeholder="Enter your password" 
            name="password" 
            type="password" 
            value={formData.password} 
            onChange={handleChange}
          />
          {errors.password && <span style={styles.errorMessage}>{errors.password}</span>}
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
          <button type="submit"style={styles.submitButton}>Login</button>
        </div>
        <div style={{display: "flex", justifyContent: "center", marginTop: "15px", marginBottom: "30px", fontSize: "13px"}}>
          <span>Don't Have Account?</span>
          <a href="/admin/register">
            Register
          </a>
        </div>
      </div>
    </form>
  )
}  

export default LoginPage;