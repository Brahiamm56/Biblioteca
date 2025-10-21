import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Socios from './pages/Socios';
import Libros from './pages/Libros';

// Tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#dc004e'
    },
    success: {
      main: '#4caf50'
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif'
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Ruta pública */}
            <Route path="/login" element={<Login />} />

            {/* Rutas protegidas */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/socios"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Socios />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/libros"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Libros />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Redirigir cualquier ruta no encontrada al dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
