import React, { useRef, useState } from "react";
import { Breadcrumb, Button, Container, Form, InputGroup, Row, Col, Image } from "react-bootstrap";
import { useHistory, useLocation, useParams } from 'react-router-dom';
import styles from './CreatePage.module.scss';
import axios from "../../axios/index";
import { imageURL } from "../../utils/constants/constant";
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const CreatePage = () => {
  const history = useHistory();
  const location = useLocation().pathname;
  const [createForm, setCreateForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [profile, setProfile] = useState({});
  const [changePassword, setChangePassword] = useState(false);
  const mounted = useRef(false);
  const param = useParams();
  const [loading, setLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
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

  React.useEffect(() => {
    if (!mounted.current) {
      checkURL();
    }
    mounted.current = true;

    function checkURL() {
      if (location === '/admin/user/create') {
        setCreateForm(true);
        setChangePassword(true);
      }
      else {
        let id = param['id'];
        axios.get('/user/detail/' + id).then(response => {
          if (response.status === 200) {
            let responseData = response.data;

            if (responseData.profile) {
              const url = imageURL + responseData.profile;
              setPreview(url);
            }

            const data = {
              'name': responseData.name,
              'email': responseData.email,
              'phone': responseData.phone,
              'address': responseData.address,
              'role': responseData.role,
              'dob': responseData.dob,
              'profile': '',
              'password': 'password',
              'confirmPassword': 'password',
            }
            setFormData(data);
          }
        })
        setUpdateForm(true);
        setDisabledSubmitBtn(false);
        setValidated(true);
      }
    }
  }, []);

  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })
  const [disabledSubmitBtn, setDisabledSubmitBtn] = React.useState(true);
  const [validated, setValidated] = React.useState(false);
  const [preview, setPreview] = React.useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let preFormData = formData;
    preFormData[name] = value;
    setFormData({ ...preFormData });

    if (preFormData.name && preFormData.email && preFormData.password && preFormData.confirmPassword && preFormData.phone) {
      setDisabledSubmitBtn(false);
    } else {
      setDisabledSubmitBtn(true);
    }

    if (name === 'profile') {
      const file = event.target.files[0];
      setProfile(file);
      handlePreview(file);
    }

    let valid = validateInput(preFormData);
    if (valid) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  };

  const handlePreview = (file) => {
    const objURL = URL.createObjectURL(file);
    setPreview(objURL);
  }

  const validateInput = (preFormData) => {
    if (preFormData.password.length > 0 && preFormData.password.length < 8) {
      errors.password = "Passwords should be at least 8 characters.";
    } else {
      errors.password = '';
    }

    if (preFormData.password !== preFormData.confirmPassword) {
      errors.confirmPassword = "Passwords don't match! Please try again.";
    } else {
      errors.confirmPassword = '';
    }

    let digitPattern = new RegExp("^[0-9]{0,11}$");
    if (!digitPattern.test(preFormData.phone)) {
      errors.phone = "Invalid phone number format! Please try again.";
    } else if (preFormData.phone && digitPattern.test(preFormData.phone) && preFormData.phone.length > 0 && preFormData.phone.length < 11)
      errors.phone = "Phone number should be at least 11 characters! Please try again.";
    else {
      errors.phone = '';
    }

    let emailPattern = new RegExp("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[\.][A-Za-z]{2,4}$");
    if (preFormData.email && emailPattern.test(preFormData.email)) {
      errors.email = '';
    }

    if (errors.email || errors.password || errors.confirmPassword || errors.phone) {
      return false;
    }
    else {
      return true;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisabledSubmitBtn(true);
    setLoading(true);
    if (validated) {
      const apiFormData = new FormData();
      apiFormData.append("name", formData.name);
      apiFormData.append("email", formData.email);
      if (changePassword) {
        apiFormData.append("password", formData.password);
      }
      apiFormData.append("role", formData.role);
      apiFormData.append("dob", formData.dob);
      apiFormData.append("phone", formData.phone);
      apiFormData.append("address", formData.address);
      if (profile) {
        apiFormData.append("profile", profile);
      }
      if (createForm) {
        axios.post('/user/create', apiFormData).then((response) => {
          setDisabledSubmitBtn(false);
          setLoading(false);
          if (response.status === 200) {
            history.push('/admin/users');
          }
        }).catch(error => {
          setLoading(false);
          setDisabledSubmitBtn(false);
        });
      } else {
        let id = param['id'];
        axios.post('/user/update/' + id, apiFormData).then(response => {
          setDisabledSubmitBtn(false);
          setLoading(false);
          if (response.status === 200) {
            history.push('/admin/users');
          }
        }).catch(error => {
          setLoading(false);
          setDisabledSubmitBtn(false);
        })
      }
    }
  };

  const handleBlur = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let preFormError = errors;
    if (!value) {
      preFormError[`${name}`] = name + ' is required.';
    } else {
      preFormError[`${name}`] = '';
    }

    if (name === 'email') {
      let emailPattern = new RegExp("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[\.][A-Za-z]{2,4}$");
      if (value && !emailPattern.test(value)) {
        preFormError[`${name}`] = "Invalid email format";
      }
    }

    setErrors({ ...preFormError });
  }

  const handleClear = () => {
    setFormData({
      'name': '',
      'email': '',
      'password': '',
      'confirmPassword': '',
      'phone': ''
    });
  }

  const handleChangePwd = (event) => {
    event.target.value === '1' ? setChangePassword(true) : setChangePassword(false);
  }

  return (
    <div className={loading ? styles.wrapper + ' ' + styles.backdrop : styles.wrapper}>
      {loading && createForm && <LoadingSpinner text="Creating new user..." />}
      {loading && updateForm && <LoadingSpinner text="Updating profile..." />}
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item href='/admin/users'>Users</Breadcrumb.Item>
        {createForm && <Breadcrumb.Item href='#' active className={styles.active}>Create User</Breadcrumb.Item>}
        {updateForm && <Breadcrumb.Item href='#' active className={styles.active}>Update User</Breadcrumb.Item>}
      </Breadcrumb>
      <Container className={styles.container}>
        {createForm && <h1 className={styles.registerTtl}> User Create Form </h1>}
        {updateForm && <h1 className={styles.registerTtl}> User Update Form </h1>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              required
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className={styles.formControl}
              isValid={!errors.name}
              isInvalid={errors.name}
              onBlur={handleBlur}
            />
            <span className="invalid-feedback px-2">
              {errors.name}
            </span>
          </Form.Group>
          <InputGroup className="mb-3 align-items-center justify-content-between">
            <InputGroup.Text>User Role</InputGroup.Text>
            <Form.Check
              required
              name="role"
              type="radio"
              label="Admin"
              value="admin"
              checked={formData.role === 'admin' ? true : false}
              onChange={handleChange}
            />
            <Form.Check
              required
              name="role"
              type="radio"
              label="User"
              value="user"
              checked={formData.role === 'user' ? true : false}
              onChange={handleChange}
            />
          </InputGroup>
          <Form.Group className="mb-3">
            <Form.Control
              required
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={styles.formControl}
              isValid={!errors.email}
              isInvalid={errors.email}
              onBlur={handleBlur}
            />
            <span className="invalid-feedback px-2">
              {errors.email}
            </span>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              name="address"
              as="textarea"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className={styles.formControl}
            />
          </Form.Group>
          <InputGroup className="mb-3">
            <InputGroup.Text>Date of Birth</InputGroup.Text>
            <Form.Control
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              className={styles.formControl}
            />
          </InputGroup>
          <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column sm={4} className={styles.formLabel}>Profile Picture</Form.Label>
            <div className="mb-3">
              <Image src={preview} name="profile" className={styles.profileImg}></Image>
            </div>
            <Col>
              <Form.Control
                type="file"
                name="profile"
                value={formData.profile}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          {updateForm &&
            <Form.Group as={Row} className="mb-3">
              <Col>
                <Form.Label>Change Password?</Form.Label>
              </Col>
              <Col className="d-flex justify-content-around">
                <Form.Check type="radio" name="changePwd" label="Yes" value="1" onChange={handleChangePwd}></Form.Check>
                <Form.Check type="radio" name="changePwd" label="No" value="0" onChange={handleChangePwd}></Form.Check>
              </Col>
            </Form.Group>}
          {changePassword &&
            <Form.Group className="mb-3">
              <Form.Control
                required
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={styles.formControl}
                isInvalid={errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>}
          {changePassword &&
            <Form.Group className="mb-3">
              <Form.Control
                required
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={styles.formControl}
                isInvalid={errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>}
          <Form.Group className="mb-3">
            <Form.Control
              required
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={styles.formControl}
              isInvalid={errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex mt-5 justify-content-around">
            <Button type="reset" className={styles.resetBtn} onClick={handleClear}>
              Clear
            </Button>
            {createForm &&
              <Button type="submit" className={styles.registerBtn} disabled={disabledSubmitBtn}>
                Create
              </Button>
            }
            {updateForm &&
              <Button type="submit" className={styles.registerBtn} disabled={disabledSubmitBtn}>
                Update
              </Button>
            }
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default CreatePage;
