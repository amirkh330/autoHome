export const BaseURL =
  import.meta.env.MODE == "development"
    ? import.meta.env.VITE_APP_BASE_URL_DEV
    : import.meta.env.VITE_APP_BASE_URL_PROD;

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export enum ReminderDateEnum {
  ONE_MONTH = "one_month",
  TWO_MONTH = "two_month",
  THREE_MONTH = "three_month",
  FOUR_MONTH = "four_month",
  FIVE_MONTH = "five_month",
  SIX_MONTH = "six_month",
}

export const months = [
  { value: [ReminderDateEnum.ONE_MONTH], title: "یک ماه دیگر" },
  { value: [ReminderDateEnum.TWO_MONTH], title: "دو ماه دیگر" },
  { value: [ReminderDateEnum.THREE_MONTH], title: "سه ماه دیگر" },
  { value: [ReminderDateEnum.FOUR_MONTH], title: "چهار ماه دیگر" },
  { value: [ReminderDateEnum.FIVE_MONTH], title: "پنج ماه دیگر" },
  { value: [ReminderDateEnum.SIX_MONTH], title: "شش ماه دیگر" },
];

export enum RoleEnum {
  CUSTOMER = "customer",
  ADMIN = "admin",
  SHOP = "shop",
}
