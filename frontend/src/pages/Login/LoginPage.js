import React, { Fragment} from 'react';
import { useHistory } from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "../../store/actions/types";
import styles from './LoginPage.module.scss';
import axios from '../../axios/index';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const LoginPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });
  const [disabledLoginBtn, setDisabledLoginBtn] = React.useState(true);
  const [errorForm, setErrorForm] = React.useState({
    email: '',
    password: ''
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
    if(name == 'password'){
      if(!value){
        return 'Password is required';
      } else if(value.length > 10){
        return 'Password is greater than 10';
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
    if(!error && formData.email && formData.password){
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
    setLoading(true);
    setDisabledLoginBtn(true);
    axios.post('/login', formData).then((response) => {
      console.log(response);
      setLoading(false);
      setDisabledLoginBtn(false);
      if(response.status === 200) {
        const { data } = response;
        const token = data.token;
        const { user } = data;
        console.log('token',response);
        /** store logged in user's info to local storage */
        localStorage.setItem(
          "user",
          JSON.stringify({
            accessToken: token,
            ...user
          })
        );
        /** store logged in user's info to App State */
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            user: {
              accessToken: token,
              ...formData
            },
          }
        });
        history.push('/admin/events');
      }
    }).catch((error) => {
      setLoading(false);
      setDisabledLoginBtn(false);
      alert("Email or Password name is incorrect.");
      console.log(error);
    });

    // if (formData.email === 'admin@gmail.com' && formData.password === 'password') {
    //   const token = 12345;

    //   /** store logged in user's info to local storage */
    //   localStorage.setItem(
    //     "user",
    //     JSON.stringify({
    //       accessToken: token,
    //       ...formData
    //     })
    //   );

    //   /** store logged in user's info to App State */
    //   dispatch({
    //     type: LOGIN_SUCCESS,
    //     payload: {
    //       user: {
    //         accessToken: '12345',
    //         ...formData
    //       },
    //     }
    //   });
    //   history.push('/admin/events');
    // } else {
    //   alert('username or password is wrong');
    // }

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

      {loading && <LoadingSpinner text="Logging in..." />}

      <div className={loading ? styles.container + ' shadow ' + styles.backdrop : styles.container }>
        <p className={styles.loginTtl}>Event Login Form</p>
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

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              required
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.formControl}
              isValid={!errorForm.password}
              isInvalid={errorForm.password}
            />
            {errorForm.password ? (
            <span className='text-danger mt-4'>{errorForm.password}</span>) : ''}
          </Form.Group>
          <div className="mb-3 d-flex justify-content-end">
            <a href="/admin/forgetPassword" className={styles.forgotPwd}>Forgot Password?</a>
          </div>
          <div className="d-flex justify-content-around mt-5">
            <Button disabled={disabledLoginBtn} type="submit" className={styles.loginBtn}>
              Log In
            </Button>
          </div>
        </Form>
      </div>

    </Fragment>
  )
}

export default LoginPage;
