import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import moment from "moment";

interface CSVRow {
  [key: string]: string;
}

const ImportButton: React.FC = () => {
  const [file, setFile] = useState<File | undefined>();

  const fileReader = new FileReader();

  /**
   * file is selected change the file name and import file
   * @param e 
   */
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      fileReader.onload = function (event) {
        if (event.target && event.target.result) {
          const text = event.target.result.toString();
          csvFileToArray(text);
        }
      };
      fileReader.readAsText(e.target.files[0]);
    }
  };

  /**
   * to upload csv file to the server
   * @param string 
   */
  const csvFileToArray = (string: string): void => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const rows: CSVRow[] = csvRows.map((row) => {
      const  values= row.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {} as CSVRow);
      return obj;
    });
    rows.map((row) => {
        const form_date = moment(row?.from_date).format("YYYY-MM-DD");
        const to_date = moment(row?.to_date).format("YYYY-MM-DD");
        const apiFormData = new FormData();
        apiFormData.append("event_name", row?.event_name);
        apiFormData.append("description", row?.description);
        apiFormData.append("from_date", form_date);
        apiFormData.append("to_date", to_date);
        apiFormData.append("from_time", row?.from_time);
        apiFormData.append("to_time", row?.to_time);
        apiFormData.append("status", row?.status);
        apiFormData.append("image", row?.image);
      
        apiFormData.append("address", row?.address);
        apiFormData.append("approved_by_user_id", row?.id);
        axios.post('http://localhost:8000/api/event/create', apiFormData).then((response) => {
          if (response.status === 200) {
            window.location.href = '/admin/events';
          }
        }).catch(error => {
          console.log(error);
        });
    })
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Button sx={{color: 'white', border: '2px solid #d9d95e', background: '#b1b1228a'}}>
        <input
          type="file"
          id="csvFileInput"
          accept=".csv"
          onChange={handleOnChange}
        />
        IMPORT CSV
      </Button>
      <br />
    </div>
  );
}

export default ImportButton;
