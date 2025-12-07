import ReactQueryProvider from "@/providers/reactQueryProvider/reactQueryProvider";
import RouterProvider from "./routerProvider/routerProvider";

const Providers = () => {
  return (
    <ReactQueryProvider>
      <RouterProvider />
    </ReactQueryProvider>
  );
};

export default Providers;
