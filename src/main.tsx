import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/routes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { generateRandomRpoducts } from "./mock/fakeFetches";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


const bootstrap = () => {
  generateRandomRpoducts();
}

try {
  bootstrap();
} catch (error) {
  console.log(error);
}


const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools></ReactQueryDevtools>
    </QueryClientProvider>
  </StrictMode>
);
