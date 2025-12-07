import {
  NumberInputField,
  NumberInput as NumberInputt,
} from "@chakra-ui/react";

export const NumberInput = (props: any) => {
  const format = (value: string | number) =>
    `${Number(value).toLocaleString("fa-IR")} تومان`;

  const parse = (value: string) =>
    (parseInt(value.replace(/[ تومان,]/g, "")) || 0).toString();

  return (
    <NumberInputt
      // parse={parse}
      // format={format}
      value={props.value}
      onChange={(valueAsString, valueAsNumber) => props.onChange(Number(valueAsString))}
      // onChange={(e) => props.onChange(e)}
    >
      <NumberInputField

      // onChange={(e) => props.onChange(e.target.value)}
      />
    </NumberInputt>
  );
};
