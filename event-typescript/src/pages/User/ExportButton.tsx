import React from 'react';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface ExportButtonProps {
  data: any[]; // The data you want to export
  filename: string; // The desired name for the exported file
}

const ExportButton: React.FC<ExportButtonProps> = ({ data, filename }) => {

    /**
     * export csv file from export csv button
     */
    const exportToCSV = () => {
      const csvData = convertToCSV(data);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, `${filename}.csv`);
    };
  
    /**
     * export excel file from export excel button
     */
    const exportToExcel = () => {
      const worksheet = XLSX.utils.json_to_sheet(data);
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
  
    return (
      <span>
        <Button 
          sx={{color: 'primary', border: '1px solid blue',  marginRight: '20px'}} 
          onClick={exportToCSV}>
            Download CSV
        </Button>
        <Button 
          sx={{color: 'primary', border: '1px solid blue',  marginRight: '20px'}} 
          onClick={exportToExcel}>
            Download Excel
        </Button>
      </span>
    );
};

export default ExportButton;
