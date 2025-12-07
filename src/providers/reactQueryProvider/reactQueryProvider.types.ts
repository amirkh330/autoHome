import { APIError } from "@/types/apiError/apiError";
import { Query } from "@tanstack/react-query";

export type QueryObjectErrorType = {
  show: true;
  duration: number;
};
export type QueryObjectSuccessType = {
  message: string;
  duration: number;
};
export type ReactQuerySideEffect<TData = any> = {
  onError?: (error: APIError, query: Query<unknown, unknown, unknown>) => void;
  onSuccess?: (data: TData, query: Query<unknown, unknown, unknown>) => void;
  onSettled?: (
    data: TData | undefined,
    error: APIError | null,
    query: Query<unknown, unknown, unknown>
  ) => void;
};
