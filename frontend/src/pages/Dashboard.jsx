import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import {
  LibraryBooks as LibraryBooksIcon,
  AssignmentReturn as ReturnIcon
} from '@mui/icons-material';
import { sociosService, librosService, prestamosService } from '../services/api';

export default function Dashboard() {
  // Estados para Préstamos
  const [socios, setSocios] = useState([]);
  const [librosDisponibles, setLibrosDisponibles] = useState([]);
  const [prestamoData, setPrestamoData] = useState({
    socioId: '',
    libroId: '',
    fechaInicio: '',
    fechaDevolucionPrevista: ''
  });
  const [prestamoMessage, setPrestamoMessage] = useState({ type: '', text: '' });

  // Estados para Devoluciones
  const [prestamosActivos, setPrestamosActivos] = useState([]);
  const [devolucionData, setDevolucionData] = useState({
    prestamoId: '',
    estaDañado: false
  });
  const [devolucionMessage, setDevolucionMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [sociosRes, librosRes, prestamosRes] = await Promise.all([
        sociosService.getAll(),
        librosService.getAll(),
        prestamosService.getActivos()
      ]);

      setSocios(sociosRes.data);
      setLibrosDisponibles(librosRes.data.filter(l => l.estado === 'disponible'));
      setPrestamosActivos(prestamosRes.data);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

  // Proceso 1: Préstamo de Libro
  const handlePrestamoSubmit = async (e) => {
    e.preventDefault();
    setPrestamoMessage({ type: '', text: '' });

    try {
      await prestamosService.create(prestamoData);
      setPrestamoMessage({ type: 'success', text: 'Préstamo registrado correctamente' });
      setPrestamoData({ socioId: '', libroId: '', fechaInicio: '', fechaDevolucionPrevista: '' });
      loadData();
    } catch (error) {
      setPrestamoMessage({
        type: 'error',
        text: error.response?.data?.error || 'Error al registrar préstamo'
      });
    }
  };

  // Proceso 2: Devolución de Libro
  const handleDevolucionSubmit = async (e) => {
    e.preventDefault();
    setDevolucionMessage({ type: '', text: '' });

    try {
      const response = await prestamosService.devolver(
        devolucionData.prestamoId,
        devolucionData.estaDañado
      );
      setDevolucionMessage({
        type: 'success',
        text: response.data.message
      });
      setDevolucionData({ prestamoId: '', estaDañado: false });
      loadData();
    } catch (error) {
      setDevolucionMessage({
        type: 'error',
        text: error.response?.data?.error || 'Error al devolver libro'
      });
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Prestamos
      </Typography>

      <Grid container spacing={3}>
        {/* Proceso 1: Prestar Libro */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LibraryBooksIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Prestar Libro</Typography>
            </Box>

            {prestamoMessage.text && (
              <Alert severity={prestamoMessage.type} sx={{ mb: 2 }}>
                {prestamoMessage.text}
              </Alert>
            )}

            <Box component="form" onSubmit={handlePrestamoSubmit}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Socio</InputLabel>
                <Select
                  value={prestamoData.socioId}
                  label="Socio"
                  required
                  onChange={(e) =>
                    setPrestamoData({ ...prestamoData, socioId: e.target.value })
                  }
                >
                  {socios.map((socio) => (
                    <MenuItem key={socio.id} value={socio.id}>
                      {socio.nombre} ({socio.numeroSocio})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Libro</InputLabel>
                <Select
                  value={prestamoData.libroId}
                  label="Libro"
                  required
                  onChange={(e) =>
                    setPrestamoData({ ...prestamoData, libroId: e.target.value })
                  }
                >
                  {librosDisponibles.map((libro) => (
                    <MenuItem key={libro.id} value={libro.id}>
                      {libro.titulo} - {libro.autor}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Fecha de Inicio"
                type="date"
                value={prestamoData.fechaInicio}
                onChange={(e) =>
                  setPrestamoData({ ...prestamoData, fechaInicio: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
                required
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Fecha de Devolución Prevista"
                type="date"
                value={prestamoData.fechaDevolucionPrevista}
                onChange={(e) =>
                  setPrestamoData({ ...prestamoData, fechaDevolucionPrevista: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
                required
                sx={{ mb: 2 }}
              />

              <Button type="submit" variant="contained" fullWidth>
                Registrar Préstamo
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Proceso 2: Devolver Libro */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ReturnIcon sx={{ mr: 1, color: 'success.main' }} />
              <Typography variant="h6">Devolver Libro</Typography>
            </Box>

            {devolucionMessage.text && (
              <Alert severity={devolucionMessage.type} sx={{ mb: 2 }}>
                {devolucionMessage.text}
              </Alert>
            )}

            <Box component="form" onSubmit={handleDevolucionSubmit}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Préstamo Activo</InputLabel>
                <Select
                  value={devolucionData.prestamoId}
                  label="Préstamo Activo"
                  required
                  onChange={(e) =>
                    setDevolucionData({ ...devolucionData, prestamoId: e.target.value })
                  }
                >
                  {prestamosActivos.map((prestamo) => (
                    <MenuItem key={prestamo.id} value={prestamo.id}>
                      {prestamo.libroTitulo} - {prestamo.socioNombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={devolucionData.estaDañado}
                    onChange={(e) =>
                      setDevolucionData({ ...devolucionData, estaDañado: e.target.checked })
                    }
                  />
                }
                label="¿El libro está dañado?"
                sx={{ mb: 2 }}
              />

              <Button type="submit" variant="contained" color="success" fullWidth>
                Devolver Libro
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Tabla de Préstamos Activos */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Préstamos Activos
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Libro</TableCell>
                    <TableCell>Socio</TableCell>
                    <TableCell>Fecha Inicio</TableCell>
                    <TableCell>Fecha Devolución Prevista</TableCell>
                    <TableCell>Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {prestamosActivos.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No hay préstamos activos
                      </TableCell>
                    </TableRow>
                  ) : (
                    prestamosActivos.map((prestamo) => (
                      <TableRow key={prestamo.id}>
                        <TableCell>{prestamo.id}</TableCell>
                        <TableCell>{prestamo.libroTitulo}</TableCell>
                        <TableCell>{prestamo.socioNombre}</TableCell>
                        <TableCell>{prestamo.fechaInicio}</TableCell>
                        <TableCell>{prestamo.fechaDevolucionPrevista}</TableCell>
                        <TableCell>
                          <Chip label="Activo" color="primary" size="small" />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
