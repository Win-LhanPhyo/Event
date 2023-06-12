import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { User } from '../../redux/domain/userList';

type DateOfBirthProps = {
    selectData: User;
};
const DateOfBirth = ({ selectData }: DateOfBirthProps) => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(selectData?.dob));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateField', 'DateField']}>
        {value && 
          <DateField
          label="Date of Birth"
          value={value}
        //   onChange={(newValue) => setValue(newValue)}
        />
        }
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DateOfBirth;
