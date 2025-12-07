export const persianToEnglishNumbers = (input: any) => {
  // Persian digits: ۰۱۲۳۴۵۶۷۸۹
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  // Check if input contains Persian digits
  const hasPersianNumbers = persianNumbers.some((persianNum) =>
    input.includes(persianNum)
  );

  if (!hasPersianNumbers) {
    return input; // Return as is if no Persian numbers found
  }

  // Replace Persian digits with English digits
  let converted = input;

  for (let i = 0; i < persianNumbers.length; i++) {
    const persianDigit = persianNumbers[i];
    const englishDigit = englishNumbers[i];

    // Use a regular expression to globally replace all instances of the Persian digit
    converted = converted.replace(new RegExp(persianDigit, "g"), englishDigit);
  }

  return converted;
};
