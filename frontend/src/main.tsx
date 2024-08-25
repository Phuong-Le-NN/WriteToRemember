import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from "react-query";
import {AppContextProvider} from './contexts/AppContext.tsx';

//- as we use a single instance of the QueryClient to the QueryClientProvider component, React Query ensures that all components in your application share the same cache, configuration, and event handling. 
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, //if there is error, dont retry
    }
  }
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
          <App />
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
