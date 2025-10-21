import { createTheme } from '@mui/material/styles';

/**
 * Sistema de Diseño - Biblioteca Académica
 * 
 * Paleta de Colores: Tonos verdes naturales que evocan conocimiento y tranquilidad
 * Inspiración: Bibliotecas clásicas, espacios de lectura, jardines botánicos
 * 
 * GUÍA DE USO:
 * 
 * PRIMARY (Verde Bosque): 
 *   - AppBar, navegación principal
 *   - Títulos importantes
 *   - Iconos destacados
 * 
 * SECONDARY (Verde Salvia):
 *   - Botones de acción principal
 *   - Enlaces interactivos
 *   - Estados activos
 * 
 * SUCCESS (Verde Confirmación):
 *   - Estados "Disponible"
 *   - Operaciones exitosas
 *   - Indicadores positivos
 * 
 * WARNING (Dorado Suave):
 *   - Alertas que requieren atención
 *   - Préstamos próximos a vencer
 * 
 * ERROR (Terracota):
 *   - Validaciones fallidas
 *   - Acciones destructivas
 *   - Estados críticos
 * 
 * NEUTRALES:
 *   - Fondos: Blancos verdosos para reducir fatiga visual
 *   - Textos: Grises cálidos para legibilidad óptima
 */

const theme = createTheme({
  // ==========================================
  // PALETA DE COLORES
  // ==========================================
  palette: {
    // Verde Bosque - Color principal para navegación y elementos destacados
    primary: {
      main: '#2D5F4F',      // Verde bosque principal
      light: '#48826B',     // Verde salvia medio
      dark: '#1A4035',      // Verde oscuro profundo
      contrastText: '#FFFFFF',
    },
    
    // Verde Salvia - Color para acciones interactivas
    secondary: {
      main: '#48826B',      // Verde salvia medio
      light: '#7BA591',     // Verde menta suave
      dark: '#2D5F4F',      // Verde bosque
      contrastText: '#FFFFFF',
    },
    
    // Verde Éxito - Confirmaciones y estados positivos
    success: {
      main: '#4A7C59',      // Verde confirmación
      light: '#6B9A77',
      dark: '#355A41',
      contrastText: '#FFFFFF',
    },
    
    // Dorado Suave - Advertencias
    warning: {
      main: '#C9A86A',      // Dorado suave
      light: '#D9BD8B',
      dark: '#A38B56',
      contrastText: '#2C3426',
    },
    
    // Terracota - Errores y alertas
    error: {
      main: '#8B4845',      // Rojo terracota
      light: '#A66663',
      dark: '#6A3533',
      contrastText: '#FFFFFF',
    },
    
    // Azul Verdoso - Información
    info: {
      main: '#5B7C8D',      // Azul verdoso
      light: '#7A98A7',
      dark: '#425C69',
      contrastText: '#FFFFFF',
    },
    
    // Fondos neutros con tinte verdoso
    background: {
      default: '#F8FAF7',   // Blanco verdoso muy suave
      paper: '#FDFFFE',     // Blanco puro para tarjetas
    },
    
    // Textos en grises cálidos
    text: {
      primary: '#2C3426',   // Gris verdoso oscuro (contraste 12:1)
      secondary: '#6B7563', // Gris medio (contraste 5.5:1)
      disabled: '#A8ADA3',  // Gris claro
    },
    
    // Divisores y bordes
    divider: '#E8EBE7',     // Gris cálido claro
    
    // Estados de acción
    action: {
      active: '#48826B',
      hover: 'rgba(72, 130, 107, 0.08)',
      selected: 'rgba(72, 130, 107, 0.12)',
      disabled: '#A8ADA3',
      disabledBackground: '#E8EBE7',
      focus: 'rgba(72, 130, 107, 0.16)',
    },
  },

  // ==========================================
  // TIPOGRAFÍA
  // ==========================================
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      'Source Sans Pro',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
    
    // Familia para títulos especiales (opcional)
    fontFamilySerif: [
      'Merriweather',
      'Lora',
      'Georgia',
      'serif',
    ].join(','),
    
    // Escala tipográfica
    h1: {
      fontSize: '2.5rem',      // 40px
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: '#2C3426',
    },
    h2: {
      fontSize: '2rem',        // 32px
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      color: '#2C3426',
    },
    h3: {
      fontSize: '1.5rem',      // 24px
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#2C3426',
    },
    h4: {
      fontSize: '1.25rem',     // 20px
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#2C3426',
    },
    h5: {
      fontSize: '1.125rem',    // 18px
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#2C3426',
    },
    h6: {
      fontSize: '1rem',        // 16px
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#2C3426',
    },
    body1: {
      fontSize: '1rem',        // 16px
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#2C3426',
    },
    body2: {
      fontSize: '0.875rem',    // 14px
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#6B7563',
    },
    button: {
      fontSize: '0.9375rem',   // 15px
      fontWeight: 500,
      lineHeight: 1.5,
      textTransform: 'none',   // Mantener capitalización original
      letterSpacing: '0.02em',
    },
    caption: {
      fontSize: '0.75rem',     // 12px
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6B7563',
    },
    overline: {
      fontSize: '0.75rem',     // 12px
      fontWeight: 600,
      lineHeight: 2,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: '#6B7563',
    },
  },

  // ==========================================
  // ESPACIADO Y FORMAS
  // ==========================================
  spacing: 8, // Base: múltiplos de 8px
  
  shape: {
    borderRadius: 8,         // Estándar para la mayoría de componentes
  },

  // ==========================================
  // BREAKPOINTS RESPONSIVE
  // ==========================================
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },

  // ==========================================
  // SOMBRAS PERSONALIZADAS
  // ==========================================
  shadows: [
    'none',
    '0 2px 4px rgba(45, 95, 79, 0.06)',    // 1: Sombra muy sutil
    '0 2px 8px rgba(45, 95, 79, 0.08)',    // 2: Sombra suave (cards)
    '0 4px 12px rgba(45, 95, 79, 0.10)',   // 3: Elevación media
    '0 4px 16px rgba(45, 95, 79, 0.12)',   // 4: Elevación destacada
    '0 8px 24px rgba(45, 95, 79, 0.14)',   // 5: Modales y menús
    '0 12px 32px rgba(45, 95, 79, 0.16)',  // 6: Elementos flotantes
    '0 2px 4px rgba(45, 95, 79, 0.06)',
    '0 2px 8px rgba(45, 95, 79, 0.08)',
    '0 4px 12px rgba(45, 95, 79, 0.10)',
    '0 4px 16px rgba(45, 95, 79, 0.12)',
    '0 8px 24px rgba(45, 95, 79, 0.14)',
    '0 12px 32px rgba(45, 95, 79, 0.16)',
    '0 2px 4px rgba(45, 95, 79, 0.06)',
    '0 2px 8px rgba(45, 95, 79, 0.08)',
    '0 4px 12px rgba(45, 95, 79, 0.10)',
    '0 4px 16px rgba(45, 95, 79, 0.12)',
    '0 8px 24px rgba(45, 95, 79, 0.14)',
    '0 12px 32px rgba(45, 95, 79, 0.16)',
    '0 2px 4px rgba(45, 95, 79, 0.06)',
    '0 2px 8px rgba(45, 95, 79, 0.08)',
    '0 4px 12px rgba(45, 95, 79, 0.10)',
    '0 4px 16px rgba(45, 95, 79, 0.12)',
    '0 8px 24px rgba(45, 95, 79, 0.14)',
  ],

  // ==========================================
  // COMPONENTES PERSONALIZADOS
  // ==========================================
  components: {
    // AppBar - Navegación principal
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(45, 95, 79, 0.12)',
          backgroundImage: 'none',
        },
        colorPrimary: {
          backgroundColor: '#2D5F4F',
        },
      },
    },

    // Botones
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '0.9375rem',
          fontWeight: 500,
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(45, 95, 79, 0.16)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 16px rgba(45, 95, 79, 0.20)',
          },
        },
        containedPrimary: {
          backgroundColor: '#48826B',
          '&:hover': {
            backgroundColor: '#3A6B58',
          },
        },
        outlined: {
          borderColor: '#48826B',
          color: '#48826B',
          '&:hover': {
            borderColor: '#2D5F4F',
            backgroundColor: 'rgba(72, 130, 107, 0.08)',
          },
        },
        text: {
          color: '#2D5F4F',
          '&:hover': {
            backgroundColor: 'rgba(72, 130, 107, 0.08)',
          },
        },
      },
    },

    // Cards - Tarjetas de contenido
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #E8EBE7',
          boxShadow: '0 2px 8px rgba(45, 95, 79, 0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(45, 95, 79, 0.12)',
            borderColor: '#A8D5BA',
            transform: 'translateY(-2px)',
          },
        },
      },
    },

    // Paper - Superficies elevadas
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(45, 95, 79, 0.08)',
        },
        elevation2: {
          boxShadow: '0 4px 12px rgba(45, 95, 79, 0.10)',
        },
        elevation3: {
          boxShadow: '0 4px 16px rgba(45, 95, 79, 0.12)',
        },
      },
    },

    // TextField - Campos de formulario
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: '#E8EBE7',
              transition: 'all 0.3s ease',
            },
            '&:hover fieldset': {
              borderColor: '#A8D5BA',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#48826B',
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#48826B',
          },
        },
      },
    },

    // Tablas
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#A8D5BA',
          '& .MuiTableCell-head': {
            fontWeight: 600,
            color: '#1A4035',
            borderBottom: '2px solid #7BA591',
          },
        },
      },
    },
    
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: '#F8FAF7',
          },
          '&:hover': {
            backgroundColor: 'rgba(168, 213, 186, 0.15)',
            transition: 'background-color 0.3s ease',
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #E8EBE7',
        },
      },
    },

    // Chips - Etiquetas de estado
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          fontSize: '0.8125rem',
        },
        colorSuccess: {
          backgroundColor: '#4A7C59',
          color: '#FFFFFF',
        },
        colorPrimary: {
          backgroundColor: '#48826B',
          color: '#FFFFFF',
        },
        colorError: {
          backgroundColor: '#8B4845',
          color: '#FFFFFF',
        },
      },
    },

    // Drawer - Menú lateral
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid #E8EBE7',
          backgroundColor: '#FDFFFE',
        },
      },
    },

    // ListItemButton - Elementos de menú
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(72, 130, 107, 0.08)',
          },
          '&.Mui-selected': {
            backgroundColor: '#48826B',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#3A6B58',
            },
            '& .MuiListItemIcon-root': {
              color: '#FFFFFF',
            },
            '& .MuiListItemText-primary': {
              fontWeight: 600,
            },
          },
        },
      },
    },

    // Alert - Alertas y mensajes
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        standardSuccess: {
          backgroundColor: 'rgba(74, 124, 89, 0.1)',
          color: '#355A41',
          '& .MuiAlert-icon': {
            color: '#4A7C59',
          },
        },
        standardError: {
          backgroundColor: 'rgba(139, 72, 69, 0.1)',
          color: '#6A3533',
          '& .MuiAlert-icon': {
            color: '#8B4845',
          },
        },
        standardWarning: {
          backgroundColor: 'rgba(201, 168, 106, 0.1)',
          color: '#A38B56',
          '& .MuiAlert-icon': {
            color: '#C9A86A',
          },
        },
        standardInfo: {
          backgroundColor: 'rgba(91, 124, 141, 0.1)',
          color: '#425C69',
          '& .MuiAlert-icon': {
            color: '#5B7C8D',
          },
        },
      },
    },

    // Dialog - Modales
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: '0 12px 32px rgba(45, 95, 79, 0.16)',
        },
      },
    },
  },

  // ==========================================
  // MIXINS PERSONALIZADOS
  // ==========================================
  mixins: {
    toolbar: {
      minHeight: 64,
    },
  },
});

/**
 * ANTI-PATRONES A EVITAR:
 * 
 * ❌ NO usar colores brillantes o saturados
 * ❌ NO mezclar verde con azul brillante
 * ❌ NO usar sombras excesivas (>24px)
 * ❌ NO animar todo (solo interacciones clave)
 * ❌ NO usar más de 3 fuentes diferentes
 * ❌ NO ignorar el contraste de accesibilidad
 * 
 * COMBINACIONES CORRECTAS:
 * 
 * ✓ Verde Bosque + Blanco (AppBar)
 * ✓ Verde Salvia + Blanco (Botones)
 * ✓ Gris verdoso + Fondo claro (Texto)
 * ✓ Verde claro + Verde oscuro (Hover states)
 * ✓ Terracota + Fondo blanco (Errores)
 */

export default theme;
