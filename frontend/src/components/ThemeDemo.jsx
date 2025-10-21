import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Alert,
  Badge,
  Divider,
} from '@mui/material';
import {
  MenuBook as BookIcon,
  Person as PersonIcon,
  AssignmentReturn as ReturnIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

/**
 * Componente de Demostración del Tema
 * 
 * Muestra todos los componentes principales con el sistema de diseño aplicado.
 * Útil para desarrollo y documentación visual.
 */
export default function ThemeDemo() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      {/* ============================================
          APPBAR - NAVEGACIÓN PRINCIPAL
          ============================================ */}
      <AppBar position="static">
        <Toolbar>
          <BookIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema de Gestión de Biblioteca
          </Typography>
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <Badge badgeContent={3} color="warning">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* ============================================
            TÍTULO Y DESCRIPCIÓN
            ============================================ */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h2" gutterBottom color="primary">
            Demostración del Sistema de Diseño
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Paleta verde natural inspirada en bibliotecas académicas y espacios de conocimiento
          </Typography>
        </Box>

        {/* ============================================
            ALERTAS Y NOTIFICACIONES
            ============================================ */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Alertas y Estados
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Alert severity="success">
                Préstamo registrado exitosamente
              </Alert>
            </Grid>
            <Grid item xs={12} md={6}>
              <Alert severity="error">
                Ya existe un socio con ese DNI
              </Alert>
            </Grid>
            <Grid item xs={12} md={6}>
              <Alert severity="warning">
                El libro debe devolverse en 3 días
              </Alert>
            </Grid>
            <Grid item xs={12} md={6}>
              <Alert severity="info">
                Hay 5 libros disponibles de este autor
              </Alert>
            </Grid>
          </Grid>
        </Box>

        {/* ============================================
            TARJETAS DE INFORMACIÓN
            ============================================ */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Tarjetas de Contenido
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h5" component="div" color="primary.main">
                      Cien años de soledad
                    </Typography>
                    <Chip label="Disponible" color="success" size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Gabriel García Márquez
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    ISBN: 978-0-06-112008-4
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" color="secondary">
                    Prestar Libro
                  </Button>
                  <Button size="small" variant="outlined">
                    Detalles
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h5" component="div" color="primary.main">
                      Don Quijote
                    </Typography>
                    <Chip label="Prestado" color="primary" size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Miguel de Cervantes
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    ISBN: 978-0-06-093546-7
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" disabled>
                    No Disponible
                  </Button>
                  <Button size="small" variant="outlined">
                    Detalles
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        backgroundColor: 'secondary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                      }}
                    >
                      <PersonIcon sx={{ color: 'white', fontSize: 28 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" color="primary.main">
                        Juan Pérez
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Socio No. SOC-0001
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    DNI: 12345678A
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Préstamos activos: 2
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* ============================================
            FORMULARIO DE BÚSQUEDA
            ============================================ */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Formularios
          </Typography>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Buscar Libro
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Título, Autor o ISBN"
                  placeholder="Ej: García Márquez"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ height: '56px' }}
                  startIcon={<SearchIcon />}
                >
                  Buscar
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* ============================================
            TABLA DE PRÉSTAMOS
            ============================================ */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Tabla de Datos
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Libro</TableCell>
                  <TableCell>Socio</TableCell>
                  <TableCell>Fecha Inicio</TableCell>
                  <TableCell>Fecha Devolución</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      1984
                    </Typography>
                  </TableCell>
                  <TableCell>Juan Pérez</TableCell>
                  <TableCell>2024-01-15</TableCell>
                  <TableCell>2024-01-29</TableCell>
                  <TableCell>
                    <Chip label="Activo" color="primary" size="small" />
                  </TableCell>
                  <TableCell align="right">
                    <Button size="small" startIcon={<ReturnIcon />}>
                      Devolver
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      Don Quijote
                    </Typography>
                  </TableCell>
                  <TableCell>María González</TableCell>
                  <TableCell>2024-01-10</TableCell>
                  <TableCell>2024-01-24</TableCell>
                  <TableCell>
                    <Chip label="Activo" color="primary" size="small" />
                  </TableCell>
                  <TableCell align="right">
                    <Button size="small" startIcon={<ReturnIcon />}>
                      Devolver
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3</TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      El código Da Vinci
                    </Typography>
                  </TableCell>
                  <TableCell>Carlos Rodríguez</TableCell>
                  <TableCell>2024-01-05</TableCell>
                  <TableCell>2024-01-19</TableCell>
                  <TableCell>
                    <Chip label="Devuelto" color="success" size="small" />
                  </TableCell>
                  <TableCell align="right">
                    <Button size="small" disabled>
                      Completado
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* ============================================
            BOTONES Y ESTADOS
            ============================================ */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Botones
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="contained" color="secondary">
                Acción Principal
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="secondary">
                Acción Secundaria
              </Button>
            </Grid>
            <Grid item>
              <Button variant="text" color="primary">
                Acción Terciaria
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" disabled>
                Deshabilitado
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="success">
                Confirmar
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="error">
                Eliminar
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* ============================================
            CHIPS Y BADGES
            ============================================ */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Chips y Badges
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Chip label="Disponible" color="success" />
            </Grid>
            <Grid item>
              <Chip label="Prestado" color="primary" />
            </Grid>
            <Grid item>
              <Chip label="Atrasado" color="error" />
            </Grid>
            <Grid item>
              <Chip label="Reservado" color="warning" />
            </Grid>
            <Grid item>
              <Badge badgeContent={5} color="success">
                <BookIcon />
              </Badge>
            </Grid>
            <Grid item>
              <Badge badgeContent={12} color="primary">
                <PersonIcon />
              </Badge>
            </Grid>
          </Grid>
        </Box>

        {/* ============================================
            PALETA DE COLORES
            ============================================ */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Paleta de Colores
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 2, backgroundColor: 'primary.main', color: 'white' }}>
                <Typography variant="body2" fontWeight={600}>Primary Main</Typography>
                <Typography variant="caption">#2D5F4F</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 2, backgroundColor: 'secondary.main', color: 'white' }}>
                <Typography variant="body2" fontWeight={600}>Secondary Main</Typography>
                <Typography variant="caption">#48826B</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 2, backgroundColor: 'success.main', color: 'white' }}>
                <Typography variant="body2" fontWeight={600}>Success</Typography>
                <Typography variant="caption">#4A7C59</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 2, backgroundColor: 'error.main', color: 'white' }}>
                <Typography variant="body2" fontWeight={600}>Error</Typography>
                <Typography variant="caption">#8B4845</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
