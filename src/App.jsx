import "./App.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Header } from "./components/header/header";
import { Body } from "./components/body/body";

let queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 15,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="lg:px-28 md:px-6 px-4 pt-12 pb-20 flex flex-col gap-16">
        <Header />
        <Body />
      </div>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
