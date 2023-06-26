import { Input } from '@mui/material';
import React from 'react';

const FileUploadForm: React.FC<any> = ({ inputValues, handleInputChange, handleFileChange, previewImage}) => {

  const styles ={
    textStyle: {
      color: '#000'
    },
    inputGroup: {
      display: 'flex',
      justifyContent: 'space-evenly'
    },
    textBox: {
      width: '40%',
    }
  }

  return (
    <div style={styles.inputGroup}>
      <div style={{position: 'relative', height: '300px', width:'200px', marginTop: '50px'}}>
          <label 
            htmlFor="fileInput" 
            style={{
              position: 'absolute', 
              top: '62px', 
              left: '47px', 
              color: 'rgb(255 255 255)',
              border: '1px solid #0083ffb0',
              padding:' 5px 12px', 
              background: '#4e7294b0'
            }}
          >
            Select file
          </label>
        <input
          type="file"
          name="image"
          value={inputValues.image}
          id="fileInput"
          style={{clip: 'rect(0, 0, 0, 0)', position: 'absolute'}}
          onChange={handleFileChange}
        />
        {
          previewImage && 
          <img src={previewImage} alt="Preview" style={{ width: '200px'}}/>
        }
      </div>
      <div style={styles.textBox}>
          <h4 style={styles.textStyle}>Title</h4>
          <Input
            name="title"
            value={inputValues.title}
            sx={{ width: '100%', marginBottom: '30px'}}
            onChange={handleInputChange}
          />

          <p style={styles.textStyle}>Description</p>
          <Input
            name="description"
            value={inputValues.description}
            sx={{ width: '100%' }}
            onChange={handleInputChange}
          />
        </div>
      
    </div>
  );
}

export default FileUploadForm;