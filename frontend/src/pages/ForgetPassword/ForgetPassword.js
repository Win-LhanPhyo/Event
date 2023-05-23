import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import {Button, Form } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import styles from './ForgetPassword.module.scss';
import axios from "../../axios/index";
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const ForgetPassword = () => {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
  });
  const [disabledLoginBtn, setDisabledLoginBtn] = React.useState(true);
  const [errorForm, setErrorForm] = React.useState({
    email: '',
  });
  const history = useHistory();
  const dispatch = useDispatch();
  let validation = (value, name)=>{
    if(name == 'email'){
      if(!value){
        return 'Email is required';
      }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)){
        return 'Email Format is required';
      }
      return '';
    } 
  }

  /**
   * handle textbox change register button disabled enabled.
   */
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let preFormData = formData;
    preFormData[name] = value;
    setFormData({...preFormData});
    const error = validation(value, name);
    let preErrorForm = errorForm;
    if (!error) {
      preErrorForm[name] = error;
      setErrorForm({
        ...preErrorForm
      });
    }
    if(!error && formData.email){
      setDisabledLoginBtn(false);
    }else{
      setDisabledLoginBtn(true);
    }
  };

  const handleBlur = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const error = validation(value, name);
    let preErrorForm = errorForm;
    if (error) {
      preErrorForm[name] = error;
      setErrorForm({
        ...preErrorForm
      });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisabledLoginBtn(true);
    setLoading(true);
    if (formData) {
      axios.post('/forget-password', formData).then(response => {
        setDisabledLoginBtn(false);
        setLoading(false);
        if(response.status === 200) {
          alert('Reset Password Link was successfully sent to your email.');
        }
      }).catch(error => {
        setDisabledLoginBtn(false);
        setLoading(false);
        if(error.response.status === 422) {
          alert('Email does not exist! Please try again.');
          setFormData({email : ''});
        }
      })
    } else {
      alert('Email is wrong');
    }

    // axios.post("auth/login", formData)
    // .then((res) => {
    //   const { data } = res;
    //   const { token } = data.success;
    //   const { user } = data;

    //   /** store logged in user's info to local storage */
    //   localStorage.setItem(
    //     "user",
    //     JSON.stringify({
    //       accessToken: token,
    //       ...user
    //     })
    //   );

    //   /** store logged in user's info to App State */
    //   dispatch({
    //     type: LOGIN_SUCCESS,
    //     payload: {
    //       user: {
    //         accessToken: token,
    //         ...user
    //       },
    //     }
    //   });
    // })
    // .then(() => navigate('/home'))
    // .catch((error) => {
    //   if (error.response) {
    //     console.error(error.response.data);
    //     // if (error.response.data.errors) {
    //     //   this.setState({
    //     //     errors: error.response.data.errors
    //     //   });
    //     // }
    //   }
    // });
  }

  return (
    <Fragment>
      <video autoPlay loop muted className={loading ? styles.backdrop + ' shadow ' + styles.videoBg : styles.videoBg}>
        <source src='../../../login/phone_using.mp4' type='video/mp4'></source>
      </video>

      {loading && <LoadingSpinner text="Sending email... " />}

      <div className={loading ? styles.container + ' shadow ' + styles.backdrop : styles.container }>
        <p className={styles.forgetPasswordTtl}>Forgot your password?</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              required
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.formControl}
              isValid={!errorForm.email}
              isInvalid={errorForm.email}
            />
            {errorForm.email ? (
            <span className='text-danger mt-4'>{errorForm.email}</span>) : ''}
          </Form.Group>
          <div className="d-flex justify-content-around mt-5">
            <Button disabled={disabledLoginBtn} type="submit" className={styles.forgetBtn}>
              Submit
            </Button>
          </div>
          <div className="d-flex justify-content-around mt-3">
            <a href="/admin/login" className={styles.backToLogin}>Back to Login</a>
          </div>
        </Form>
      </div>
    </Fragment>
  )
}

export default ForgetPassword;
