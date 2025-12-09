import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";

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
    <DatePicker
      className="teal"
      style={{
        height: "40px",
        borderRadius: "8px",
        fontSize: "14px",
        padding: "3px 10px",
        width: "100%",
        border: "1px solid #e2e8f0",
      }}
      containerStyle={{
        width: "100%",
      }}
      value={value}
      onChange={(e: any) => setValue(e)}
      calendar={persian}
      locale={persian_fa}
    />
  );

  return (
    <Calendar
      className="teal"
      value={value}
      onChange={(e: any) => setValue(e)}
      calendar={persian}
      locale={persian_fa}
    />
  );
};
