import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { sociosService } from '../services/api';

export default function Socios() {
  const [socios, setSocios] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    dni: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editDialog, setEditDialog] = useState({ open: false, socio: null });

  useEffect(() => {
    loadSocios();
  }, []);

  const loadSocios = async () => {
    try {
      const response = await sociosService.getAll();
      setSocios(response.data);
    } catch (error) {
      console.error('Error al cargar socios:', error);
    }
  };

  // Proceso 3: Alta Socio
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      await sociosService.create(formData);
      setMessage({ type: 'success', text: 'Socio creado correctamente' });
      setFormData({ nombre: '', dni: '' });
      loadSocios();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Error al crear socio'
      });
    }
  };

  const handleEdit = (socio) => {
    setEditDialog({ open: true, socio: { ...socio } });
  };

  const handleEditSubmit = async () => {
    try {
      await sociosService.update(editDialog.socio.id, {
        nombre: editDialog.socio.nombre,
        dni: editDialog.socio.dni
      });
      setMessage({ type: 'success', text: 'Socio actualizado correctamente' });
      setEditDialog({ open: false, socio: null });
      loadSocios();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Error al actualizar socio'
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este socio?')) {
      try {
        await sociosService.delete(id);
        setMessage({ type: 'success', text: 'Socio eliminado correctamente' });
        loadSocios();
      } catch (error) {
        setMessage({
          type: 'error',
          text: error.response?.data?.error || 'Error al eliminar socio'
        });
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Gestión de Socios
      </Typography>

      {/* Formulario de Alta Socio */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PersonAddIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">Nuevo Socio</Typography>
        </Box>

        {message.text && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="DNI"
            value={formData.dni}
            onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
            required
            sx={{ mb: 2 }}
          />

          <Button type="submit" variant="contained" startIcon={<PersonAddIcon />}>
            Crear Socio
          </Button>
        </Box>
      </Paper>

      {/* Tabla de Socios */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Lista de Socios
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Número de Socio</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>DNI</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {socios.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No hay socios registrados
                  </TableCell>
                </TableRow>
              ) : (
                socios.map((socio) => (
                  <TableRow key={socio.id}>
                    <TableCell>{socio.id}</TableCell>
                    <TableCell>{socio.numeroSocio}</TableCell>
                    <TableCell>{socio.nombre}</TableCell>
                    <TableCell>{socio.dni}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(socio)}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(socio.id)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Dialog de Edición */}
      <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, socio: null })}>
        <DialogTitle>Editar Socio</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre"
            value={editDialog.socio?.nombre || ''}
            onChange={(e) =>
              setEditDialog({
                ...editDialog,
                socio: { ...editDialog.socio, nombre: e.target.value }
              })
            }
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="DNI"
            value={editDialog.socio?.dni || ''}
            onChange={(e) =>
              setEditDialog({
                ...editDialog,
                socio: { ...editDialog.socio, dni: e.target.value }
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, socio: null })}>
            Cancelar
          </Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
