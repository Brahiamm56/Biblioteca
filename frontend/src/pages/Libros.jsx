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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  LibraryAdd as LibraryAddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { librosService } from '../services/api';

export default function Libros() {
  const [libros, setLibros] = useState([]);
  const [formData, setFormData] = useState({
    isbn: '',
    titulo: '',
    autor: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editDialog, setEditDialog] = useState({ open: false, libro: null });

  useEffect(() => {
    loadLibros();
  }, []);

  const loadLibros = async () => {
    try {
      const response = await librosService.getAll();
      setLibros(response.data);
    } catch (error) {
      console.error('Error al cargar libros:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      await librosService.create(formData);
      setMessage({ type: 'success', text: 'Libro creado correctamente' });
      setFormData({ isbn: '', titulo: '', autor: '' });
      loadLibros();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Error al crear libro'
      });
    }
  };

  const handleEdit = (libro) => {
    setEditDialog({ open: true, libro: { ...libro } });
  };

  const handleEditSubmit = async () => {
    try {
      await librosService.update(editDialog.libro.id, {
        isbn: editDialog.libro.isbn,
        titulo: editDialog.libro.titulo,
        autor: editDialog.libro.autor
      });
      setMessage({ type: 'success', text: 'Libro actualizado correctamente' });
      setEditDialog({ open: false, libro: null });
      loadLibros();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Error al actualizar libro'
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este libro?')) {
      try {
        await librosService.delete(id);
        setMessage({ type: 'success', text: 'Libro eliminado correctamente' });
        loadLibros();
      } catch (error) {
        setMessage({
          type: 'error',
          text: error.response?.data?.error || 'Error al eliminar libro'
        });
      }
    }
  };

  const getEstadoChip = (estado) => {
    if (estado === 'disponible') {
      return <Chip label="Disponible" color="success" size="small" />;
    }
    return <Chip label="Prestado" color="warning" size="small" />;
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Gestión de Libros
      </Typography>

      {/* Formulario de Nuevo Libro */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LibraryAddIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">Nuevo Libro</Typography>
        </Box>

        {message.text && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="ISBN"
            value={formData.isbn}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Título"
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Autor"
            value={formData.autor}
            onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
            required
            sx={{ mb: 2 }}
          />

          <Button type="submit" variant="contained" startIcon={<LibraryAddIcon />}>
            Crear Libro
          </Button>
        </Box>
      </Paper>

      {/* Tabla de Libros */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Lista de Libros
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>ISBN</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Autor</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {libros.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No hay libros registrados
                  </TableCell>
                </TableRow>
              ) : (
                libros.map((libro) => (
                  <TableRow key={libro.id}>
                    <TableCell>{libro.id}</TableCell>
                    <TableCell>{libro.isbn}</TableCell>
                    <TableCell>{libro.titulo}</TableCell>
                    <TableCell>{libro.autor}</TableCell>
                    <TableCell>{getEstadoChip(libro.estado)}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(libro)}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(libro.id)}
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
      <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, libro: null })}>
        <DialogTitle>Editar Libro</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="ISBN"
            value={editDialog.libro?.isbn || ''}
            onChange={(e) =>
              setEditDialog({
                ...editDialog,
                libro: { ...editDialog.libro, isbn: e.target.value }
              })
            }
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="Título"
            value={editDialog.libro?.titulo || ''}
            onChange={(e) =>
              setEditDialog({
                ...editDialog,
                libro: { ...editDialog.libro, titulo: e.target.value }
              })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Autor"
            value={editDialog.libro?.autor || ''}
            onChange={(e) =>
              setEditDialog({
                ...editDialog,
                libro: { ...editDialog.libro, autor: e.target.value }
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, libro: null })}>
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
