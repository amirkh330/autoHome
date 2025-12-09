export type TUnit = {
  id: number;
  name: string; // نام مالک یا مستاجر
};

export type TAnnouncement = {
  id: number;
  title: string;
  description: string;
  seenBy: number[]; // آیدی واحدهایی که دیده‌اند
};