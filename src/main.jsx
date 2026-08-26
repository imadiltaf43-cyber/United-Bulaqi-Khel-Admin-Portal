import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { Toaster } from 'react-hot-toast';

import { AuthProvider } from "./context/AuthContext";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createRoot(document.getElementById('root')).render(
  <>
    <AuthProvider>

      <App />

      {/* M-05: Using react-hot-toast only — react-toastify removed */}
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
);
