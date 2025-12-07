import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
export const CustomDatePicker = ({
  value,
  setValue,
}: {
  value: any;
  setValue: any;
}) => {
  //   const [value, setValue] = useState(new Date());

  return (
    <Calendar
      // className="teal"
      value={value}
      onChange={(e: any) => setValue(e)}
      // calendar={persian}
      // locale={persian_fa}
    />
  );
};
