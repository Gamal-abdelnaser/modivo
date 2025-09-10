// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter as Router } from 'react-router';
// import { Provider  } from "@/components/ui/provider"
// import { createRoot } from 'react-dom/client';
// import { store } from './app/store'
// import { Provider as ReduxProvider } from 'react-redux'
// import React, { StrictMode } from 'react';
// import App from './App.jsx';
// import './index.css';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false, // default: true
//     },
//   },
// });


// createRoot(document.getElementById('root')).render(
//   <ReduxProvider store={store}>
//     <QueryClientProvider client={queryClient}>
//       <chakraProvider>
//         <Router>
//           <App />
//         </Router>
//       </chakraProvider>
//     </QueryClientProvider>
//   </ReduxProvider>
// )

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from 'react-router-dom'; // use react-router-dom
import { Provider as UIProvider } from "@/components/ui/provider"; // renamed for clarity
import { createRoot } from 'react-dom/client';
import { store } from './app/store';
import { Provider as ReduxProvider } from 'react-redux';
import React from 'react';
import App from './App.jsx';
import './index.css';
import InternetConnectionProvider from "./Provider/internetConnectionProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ReduxProvider store={store}>
      <InternetConnectionProvider>
          <UIProvider> {/* make sure this is the correct one */}
            <Router>
              <App />
            </Router>
          </UIProvider>
      </InternetConnectionProvider>
    </ReduxProvider>
  </QueryClientProvider>
);
