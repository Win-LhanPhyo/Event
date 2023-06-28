import { TextField } from "@mui/material";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderPage from '../../components/Header/HeaderPage';


const EventCreatePage: React.FC = () => {
  interface FormData {
    event_name: string,
    description: string,
    from_date: string,
    to_date: string,
    from_time: string,
    to_time: string,
    address: string,
    image: string,
  }
  const initialFormData: FormData = {
    event_name: '',
    description: '',
    from_date: '',
    to_date: '',
    from_time: '',
    to_time: '',
    address: '',
    image: '',
  };
  const [errors, setErrors]  = useState<{[key: string]: string}>({
    event_name: '',
    description: '',
    from_date: '',
    to_date: '',
    from_time: '',
    to_time: '',
    address: '',
    image: '',
  });

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [ status, setStatus] = useState('new');
  const [ approveUser, setApproveUser] = useState('1');

  const {id} = useParams();

  /**
   * To get the selected ID
   */
   React.useEffect(() => {
    axios.get(`http://localhost:8000/api/event/detail/${id}`).then((response) => {
      if (response.status === 200) {
        setStatus(response.data.status);
        setApproveUser(response.data.approved_by_user_id);
        setFormData({...response.data});
      }
    })
  }, []);

  /**
   * validation errorr message for input fields
   * @returns 
   */
  const validateForm = () => {
    // Assuming newErrors is an object to store the error messages
    const newErrors: { [key: string]: string } = {}; 
    const  requiredFields:string[] = [formData.event_name, formData.description, formData.from_date, formData.to_date, formData.from_time, formData.to_time,formData.address, formData.image];
    const errorMessages: string[] = ['event_name', 'description', 'from_date', 'to_date', 'from_time', 'to_time','address', 'image']; 
    for(let i=0; i<requiredFields.length; i++){
      if(requiredFields[i] === ''){
        for(let j=0; j<errorMessages.length; j++){
          if( i === j) {
            newErrors[errorMessages[j]] = `${errorMessages[j].charAt(0).toUpperCase() + errorMessages[j].slice(1)} is required.`;
          }
        }
      }
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
      const { name, value } = event.target;
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value
    }));
  }

  /**
   * Event Update form
   * @param e
   */
   const editFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if(isFormValid && formData) {
      const apiFormData = new FormData();
      apiFormData.append("event_name", formData.event_name);
      apiFormData.append("description", formData.description);
      apiFormData.append("from_date", formData.from_date);
      apiFormData.append("to_date", formData.to_date);
      apiFormData.append("from_time", formData.from_time);
      apiFormData.append("to_time", formData.to_time);
      apiFormData.append("address", formData.address);
      apiFormData.append("status", status.toString());
      apiFormData.append("approved_by_user_id", approveUser.toString());
      if(selectedFile) {
        apiFormData.append("image", selectedFile);
      }
      apiFormData.append("address", "Yangon");
      axios.post(`http://localhost:8000/api/event/update/${id}`, apiFormData).then((response) => {
        if (response.status === 200) {
          window.location.href = '/admin/events';
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
        <div style={styles.editHeader}>Edit Event</div>
        <div style={styles.input}>
          <TextField
            label="Enter event name"
            style={styles.inputStyle} 
            name="event_name" 
            type="event_name" 
            value={formData?.event_name} 
            onChange={handleChange}
          />
          {errors.event_name && <span style={styles.errorMessage}>{errors.event_name}</span>}
          <TextField
            label="Enter event description"
            style={styles.inputStyle}
            name="description" 
            type="description" 
            value={formData?.description} 
            onChange={handleChange}
          />
          {errors.description && <span style={styles.errorMessage}>{errors.description}</span>}
          <TextField
            label="Enter from date"
            style={styles.inputStyle}
            name="from_date"
            type="date"
            value={formData?.from_date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {errors.from_date && <span style={styles.errorMessage}>{errors.from_date}</span>}
          <TextField
            label="Select To Date"
            style={styles.inputStyle}
            name="to_date"
            type="date"
            value={formData?.to_date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {errors.to_date && <span style={styles.errorMessage}>{errors.to_date}</span>}
          <TextField
            label="Select From Time"
            style={styles.inputStyle}
            name="from_time"
            type="time"
            value={formData?.from_time}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {errors.from_time && <span style={styles.errorMessage}>{errors.from_time}</span>}
          <TextField
            label="Select To Time"
            style={styles.inputStyle}
            name="to_time"
            type="time"
            value={formData?.to_time}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {errors.to_time && <span style={styles.errorMessage}>{errors.to_time}</span>}
          <TextField
            label="Select the address"
            style={styles.inputStyle}
            name="address"
            type="address"
            value={formData?.address}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {errors.address && <span style={styles.errorMessage}>{errors.address}</span>}
          <div>
            { 
              previewImage && 
              <img 
                src={previewImage.toString()} 
                style={styles.previewImage} 
                alt="image"
              />
            }
            {
              !previewImage && 
              <img
                src={
                  "http://localhost:8000/" +
                  formData.image +
                  "?auto=format&fit=crop&w=800"
                }
                srcSet={
                  "http://localhost:8000/" +
                  formData.image +
                  "?auto=format&fit=crop&w=800&dpr=2 2x"
                }
                alt={formData.event_name}
                loading="lazy"
                style={styles.previewImage}
              />
            }
            <TextField
              label="Select the image"
              type="file"
              name="image"
              style={styles.radioImageStyle}
              onChange={handleFileChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          {errors.image && <span style={styles.errorMessage}>{errors.image}</span>}
        </div>
        <div style={{display: "flex", justifyContent: "space-evenly", marginBottom: "20px"}}>
          <button type="reset" style={styles.clearbutton} onClick={handleClear}>Clear</button>
          <button style={styles.submitButton} type="submit">Update Event</button>
        </div>
        </div>
      </form>
    </div>
  )
}  

export default EventCreatePage;