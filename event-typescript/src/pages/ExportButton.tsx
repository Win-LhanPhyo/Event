import React from 'react';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import dayjs from 'dayjs';

interface ExportButtonProps {
  data: any[]; // The data you want to export
  filename: string; // The desired name for the exported file
}

const ExportButton: React.FC<ExportButtonProps> = ({ data, filename }) => {

    /**
     * change Date format to "YYYY-MM-DD"
     * @param data for change date format
     */
    const changeDateFormat = (data:any[]) => {
      return data.map((item) => ({
        ...item,
        role: item.role.toString() === '0' ? 'User' : 'Admin',
        created_at: dayjs(item.created_at).format('YYYY-MM-DD'),
        updated_at: dayjs(item.updated_at).format('YYYY-MM-DD')
      }));
    }

    /**
     * export csv file from export csv button
     */
    const exportToCSV = () => {
      const newData = changeDateFormat(data);
      const csvData = convertToCSV(newData);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, `${filename}.csv`);
    };
  
    /**
     * export excel file from export excel button
     */
    const exportToExcel = () => {
      const newData = changeDateFormat(data);
      const worksheet = XLSX.utils.json_to_sheet(newData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
      const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `${filename}.xlsx`);
    };
    
    /**
     * convert file array to csv format
     * @param dataArray 
     */
    const convertToCSV = (dataArray: any[]) => {
      const header = Object.keys(dataArray[0]).join(',');
      const rows = dataArray.map(item => Object.values(item).join(','));
      return `${header}\n${rows.join('\n')}`;
    };
   ;
    return (
      <span>
        <Button 
          sx={{color: '#fff', border: '2px solid #7cdaff',  marginRight: '20px', background: '#38a4cf9c'}} 
          onClick={exportToCSV}>
            Download CSV
        </Button>
        <Button 
          sx={{color: '#fff', border: '2px solid #7cdaff',  marginRight: '20px', background: '#38a4cf9c'}} 
          onClick={exportToExcel}>
            Download Excel
        </Button>
      </span>
    );
};

export default ExportButton;
