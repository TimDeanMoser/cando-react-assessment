import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {BrowserRouter, Route, Routes} from "react-router-dom";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false
        }
    }
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            {/*<ReactQueryDevtools initialIsOpen={false}/>*/}
            <Routes>
                <Route path="/" element={
                    <App/>
                }/>
            </Routes>
        </QueryClientProvider>
    </BrowserRouter>
);