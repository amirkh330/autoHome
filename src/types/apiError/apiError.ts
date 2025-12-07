export type APIError = {
  status_code: number;
  message: string;
  is_success: boolean;
  response: null;
  error: {
    type: string | null;
    code: string | null;
    detail: string | null;
    attr: string | null;
    fa_attr: string | null;
    fa_details: string | null;
  };
};
