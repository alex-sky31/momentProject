import './App.css';
import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './context/AuthProvider';
import { HomePage } from './pages/homePage';
import { LoginPage } from './pages/loginPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/login" replace />,
      errorElement: <div>Error</div>
    },
    {
      path: '/error',
      element: <div>Error</div>
    },
    {
      path: '/login',
      element: <LoginPage />,
      errorElement: <div>Error</div>
    },

    {
      element: <RequireAuth />,
      errorElement: <div>Error</div>,
      children: [
        {
          path: '/home',
          element: <HomePage />,
          errorElement: <div>Error</div>
        }
      ]
    }
  ]);

  return (
    <RecoilRoot>
      <div>
        <ToastContainer />
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </div>
    </RecoilRoot>
  );
}

export default App;
