import {
  QueryCache,
  QueryClient,
  MutationCache,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { APIError } from "@/types/apiError/apiError";


declare module "@tanstack/react-query" {
  interface Register {
    defaultError: APIError;
    mutationMeta: {
      onError: (error: APIError, variables: any) => void;
    };
    queryMeta: {
      onError: (error: APIError) => void;
      onSuccess: (data: unknown) => void;
    };
  }
}

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error, variables, _context, mutation) => {
      const mutationMeta = mutation.meta;
      if (mutationMeta?.onError) {
        mutationMeta.onError(error, variables);
      }

      if (error.error.fa_details) {
       
      }
    },
  }),
  queryCache: new QueryCache({
    onSuccess: (data, query) => {
      const queryMeta = query.meta;

      if (queryMeta?.onSuccess) {
        queryMeta.onSuccess(data);
      }
    },
    onError: (error, query) => {
      const queryMeta = query.meta;

      if (queryMeta?.onError) {
        queryMeta.onError(error);
      }
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) =>
        error.status_code >= 500 && failureCount < 4,
    },
  },
});

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default ReactQueryProvider;
