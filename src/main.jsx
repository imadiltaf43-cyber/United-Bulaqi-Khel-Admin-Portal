import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from "./context/AuthContext";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <>
<AuthProvider>

    <App />

    <ToastContainer position="top-right" />

    <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
          },
        }}
    />

</AuthProvider>
  </>,
)
