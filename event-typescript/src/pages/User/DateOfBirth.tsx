import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

type DateOfBirthProps = {
  selectData: string;
};

const DateOfBirth = ({ selectData }: DateOfBirthProps) => {
  const [dateValue, setDateValue] = React.useState<Dayjs | null>(null);

  React.useEffect(() => {
    if (selectData) {
      setDateValue(dayjs(selectData));
    }
  }, [selectData]);


  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const parsedDate = dayjs(value);
    setDateValue(parsedDate);
  };

  return (
    <input
      type="date"
      value={dateValue ? dateValue.format('YYYY-MM-DD') : ''}
      onChange={handleDateChange}
    />
  );
};

export default DateOfBirth;
