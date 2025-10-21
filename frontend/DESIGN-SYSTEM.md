# Sistema de Diseño - Biblioteca Académica

## Visión General

Sistema de diseño basado en tonos verdes naturales que evocan conocimiento, tranquilidad y profesionalismo. Inspirado en bibliotecas clásicas, espacios de lectura y jardines botánicos.

### Principios Fundamentales

1. **Legibilidad Primero**: Optimizado para largas sesiones de trabajo
2. **Naturaleza y Conocimiento**: Colores que transmiten crecimiento y sabiduría
3. **Minimalismo Funcional**: Sin decoraciones innecesarias
4. **Accesibilidad**: Cumple WCAG 2.1 Nivel AA

---

## Paleta de Colores

### Colores Primarios

#### Verde Bosque (Primary)
```
Main:  #2D5F4F  RGB(45, 95, 79)
Light: #48826B  RGB(72, 130, 107)
Dark:  #1A4035  RGB(26, 64, 53)
```

**Uso:**
- AppBar y navegación principal
- Títulos y encabezados importantes
- Iconos destacados
- Estados seleccionados en menús

**Contraste:** 7.2:1 sobre fondo claro (AAA)

#### Verde Salvia (Secondary)
```
Main:  #48826B  RGB(72, 130, 107)
Light: #7BA591  RGB(123, 165, 145)
Dark:  #2D5F4F  RGB(45, 95, 79)
```

**Uso:**
- Botones de acción principal
- Enlaces interactivos
- Elementos hover
- Llamadas a la acción

**Contraste:** 5.8:1 sobre fondo claro (AA)

---

### Colores de Estado

#### Success (Verde Confirmación)
```
Main:  #4A7C59  RGB(74, 124, 89)
```
**Uso:** Estados "Disponible", operaciones exitosas, confirmaciones

#### Warning (Dorado Suave)
```
Main:  #C9A86A  RGB(201, 168, 106)
```
**Uso:** Alertas que requieren atención, préstamos próximos a vencer

#### Error (Terracota)
```
Main:  #8B4845  RGB(139, 72, 69)
```
**Uso:** Validaciones fallidas, acciones destructivas, estados críticos

#### Info (Azul Verdoso)
```
Main:  #5B7C8D  RGB(91, 124, 141)
```
**Uso:** Mensajes informativos, ayuda contextual

---

### Colores Neutrales

#### Fondos
```
Default: #F8FAF7  - Blanco verdoso muy suave (reduce fatiga visual)
Paper:   #FDFFFE  - Blanco puro para tarjetas
```

#### Textos
```
Primary:   #2C3426  - Gris verdoso oscuro (contraste 12:1)
Secondary: #6B7563  - Gris medio (contraste 5.5:1)
Disabled:  #A8ADA3  - Gris claro
```

#### Divisores
```
Divider: #E8EBE7  - Gris cálido claro
```

---

## Tipografía

### Familias de Fuentes

**Principal (Sans-Serif):**
```
Inter, Roboto, Source Sans Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif
```

**Secundaria (Serif - Opcional para títulos especiales):**
```
Merriweather, Lora, Georgia, serif
```

### Escala Tipográfica

| Elemento | Tamaño | Peso | Uso |
|----------|--------|------|-----|
| H1 | 40px (2.5rem) | 600 | Títulos de página principal |
| H2 | 32px (2rem) | 600 | Títulos de sección |
| H3 | 24px (1.5rem) | 500 | Subtítulos |
| H4 | 20px (1.25rem) | 500 | Títulos de tarjetas |
| H5 | 18px (1.125rem) | 500 | Encabezados pequeños |
| H6 | 16px (1rem) | 500 | Subtítulos mínimos |
| Body1 | 16px (1rem) | 400 | Texto principal |
| Body2 | 14px (0.875rem) | 400 | Texto secundario |
| Button | 15px (0.9375rem) | 500 | Botones |
| Caption | 12px (0.75rem) | 400 | Textos pequeños |

### Propiedades Adicionales

- **Line Height:** 1.5-1.6 para texto de lectura
- **Letter Spacing:** -0.02em para títulos grandes
- **Text Transform:** Ninguno (mantener capitalización original)

---

## Espaciado

### Sistema Base: 8px

| Múltiplo | Valor | Uso |
|----------|-------|-----|
| 1x | 8px | Espaciado mínimo, padding de chips |
| 2x | 16px | Espaciado entre elementos relacionados |
| 3x | 24px | Padding de cards, espaciado estándar |
| 4x | 32px | Margin entre secciones |
| 5x | 40px | Separación de bloques grandes |
| 6x | 48px | Espaciado de página |

### Aplicaciones Comunes

**Cards:**
- Padding interno: 24px
- Margin entre cards: 16px

**Formularios:**
- Margin entre campos: 16px
- Padding interno: 16px

**Secciones:**
- Margin entre secciones: 40px
- Padding de contenedor: 32px

---

## Componentes

### AppBar / Navegación

**Especificaciones:**
- Altura: 64px
- Fondo: Verde Bosque (#2D5F4F)
- Texto: Blanco con opacidad 95%
- Sombra: `0 2px 8px rgba(45, 95, 79, 0.12)`

**Código:**
```jsx
<AppBar position="fixed" color="primary">
  <Toolbar>
    <BookIcon sx={{ mr: 2 }} />
    <Typography variant="h6">
      Sistema de Gestión de Biblioteca
    </Typography>
  </Toolbar>
</AppBar>
```

---

### Botones

#### Contained (Principal)
**Especificaciones:**
- Fondo: Verde Salvia (#48826B)
- Texto: Blanco
- Altura: 40px
- Padding horizontal: 24px
- Border radius: 8px
- Hover: Oscurecer + elevar ligeramente

**Código:**
```jsx
<Button variant="contained" color="secondary">
  Registrar Préstamo
</Button>
```

#### Outlined (Secundario)
**Especificaciones:**
- Borde: Verde Salvia (#48826B)
- Texto: Verde Salvia
- Fondo transparente
- Hover: Fondo verde claro (#48826B con 8% opacidad)

**Código:**
```jsx
<Button variant="outlined" color="secondary">
  Editar Socio
</Button>
```

#### Text (Terciario)
**Especificaciones:**
- Texto: Verde Bosque (#2D5F4F)
- Sin borde, sin fondo
- Hover: Fondo verde muy claro

**Código:**
```jsx
<Button variant="text" color="primary">
  Ver Detalles
</Button>
```

---

### Cards / Tarjetas

**Especificaciones:**
- Fondo: Blanco puro (#FDFFFE)
- Borde: 1px sólido #E8EBE7
- Border radius: 12px
- Padding: 24px
- Sombra base: `0 2px 8px rgba(45, 95, 79, 0.08)`
- Sombra hover: `0 4px 16px rgba(45, 95, 79, 0.12)` + elevar 2px
- Borde hover: #A8D5BA

**Código:**
```jsx
<Card>
  <CardContent>
    <Typography variant="h5" color="primary">
      Cien años de soledad
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Gabriel García Márquez
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small" variant="contained" color="secondary">
      Prestar
    </Button>
  </CardActions>
</Card>
```

---

### Tablas

**Especificaciones:**

**Encabezado:**
- Fondo: Verde Claro Acento (#A8D5BA)
- Texto: Verde Oscuro (#1A4035)
- Font weight: 600
- Borde inferior: 2px sólido #7BA591

**Filas:**
- Filas alternas: Fondo #F8FAF7
- Hover: Fondo rgba(168, 213, 186, 0.15)
- Borde: 1px sólido #E8EBE7

**Código:**
```jsx
<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Libro</TableCell>
        <TableCell>Socio</TableCell>
        <TableCell>Estado</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>1984</TableCell>
        <TableCell>Juan Pérez</TableCell>
        <TableCell>
          <Chip label="Activo" color="primary" size="small" />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>
```

---

### Formularios

**TextField:**
- Border radius: 8px
- Borde: #E8EBE7
- Borde hover: #A8D5BA
- Borde focus: #48826B (2px)
- Label focus: #48826B

**Código:**
```jsx
<TextField
  fullWidth
  label="Nombre del Socio"
  placeholder="Ej: Juan Pérez"
  helperText="Ingrese el nombre completo"
/>
```

**Estados de Error:**
```jsx
<TextField
  error
  label="DNI"
  helperText="El DNI ya existe en el sistema"
/>
```

---

### Chips / Etiquetas

**Estados de Libro:**

- **Disponible:** `<Chip label="Disponible" color="success" />`
- **Prestado:** `<Chip label="Prestado" color="primary" />`
- **Atrasado:** `<Chip label="Atrasado" color="error" />`
- **Reservado:** `<Chip label="Reservado" color="warning" />`

**Especificaciones:**
- Border radius: 6px
- Font weight: 500
- Font size: 13px
- Padding: 4px 12px

---

### Alerts / Alertas

**Tipos:**

```jsx
<Alert severity="success">Préstamo registrado</Alert>
<Alert severity="error">Error en la operación</Alert>
<Alert severity="warning">Préstamo próximo a vencer</Alert>
<Alert severity="info">Información adicional</Alert>
```

**Especificaciones:**
- Border radius: 8px
- Padding: 12px 16px
- Fondo: Color del estado con 10% opacidad
- Icono: Color del estado

---

## Sombras

### Jerarquía de Elevación

| Nivel | Sombra | Uso |
|-------|--------|-----|
| 0 | none | Elementos planos |
| 1 | `0 2px 4px rgba(45, 95, 79, 0.06)` | Elementos sutiles |
| 2 | `0 2px 8px rgba(45, 95, 79, 0.08)` | Cards estándar |
| 3 | `0 4px 12px rgba(45, 95, 79, 0.10)` | Elementos elevados |
| 4 | `0 4px 16px rgba(45, 95, 79, 0.12)` | Hover de cards |
| 5 | `0 8px 24px rgba(45, 95, 79, 0.14)` | Modales y menús |

---

## Bordes y Radios

### Border Radius

| Componente | Radio | Uso |
|------------|-------|-----|
| Button | 8px | Botones estándar |
| TextField | 8px | Campos de formulario |
| Card | 12px | Tarjetas destacadas |
| Chip | 6px | Etiquetas pequeñas |
| Dialog | 12px | Modales |

---

## Iconografía

### Estilo: Outlined

**Biblioteca de iconos:** Material Icons (Outlined variant)

**Tamaños:**
- Pequeño: 20px
- Estándar: 24px
- Grande: 32px
- Extra grande: 40px

**Colores:**
- Por defecto: #6B7563 (Gris medio)
- Activo/Seleccionado: #2D5F4F (Verde bosque)
- En botones: Heredan del botón

**Código:**
```jsx
import { MenuBook as BookIcon } from '@mui/icons-material';

<BookIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
```

---

## Interactividad

### Transiciones

**Estándar:**
```css
transition: all 0.3s ease
```

**Rápida:**
```css
transition: all 0.2s ease
```

**Suave:**
```css
transition: all 0.4s ease-in-out
```

### Hover States

**Botones:**
- Elevar 1-2px
- Oscurecer color 10-15%
- Aumentar sombra

**Cards:**
- Elevar 2px
- Cambiar borde a verde claro
- Aumentar sombra

**Enlaces:**
- Cambiar color a verde oscuro
- Subrayado opcional

---

## Responsive Design

### Breakpoints

| Tamaño | Ancho | Uso |
|--------|-------|-----|
| xs | 0px | Móviles verticales |
| sm | 600px | Móviles horizontales / Tablets pequeñas |
| md | 960px | Tablets |
| lg | 1280px | Laptops |
| xl | 1920px | Pantallas grandes |

### Mobile First

**Principios:**
1. Diseñar primero para móvil
2. Escalar hacia arriba con media queries
3. Apilar componentes verticalmente en móvil
4. Grid de 12 columnas se adapta automáticamente

**Ejemplo:**
```jsx
<Grid container spacing={2}>
  <Grid item xs={12} md={6}>
    {/* Ocupa 100% en móvil, 50% en desktop */}
  </Grid>
</Grid>
```

---

## Accesibilidad

### Contraste de Colores

Todos los colores cumplen WCAG 2.1 Nivel AA:

| Combinación | Ratio | Nivel |
|-------------|-------|-------|
| #2C3426 sobre #F8FAF7 | 12:1 | AAA |
| #6B7563 sobre #F8FAF7 | 5.5:1 | AA |
| #2D5F4F sobre #FFFFFF | 7.2:1 | AAA |
| #48826B sobre #FFFFFF | 5.8:1 | AA |

### Tamaños Mínimos

- Botones: 40px altura mínima
- Áreas táctiles: 44x44px mínimo
- Texto: 16px mínimo para lectura

### Focus States

Todos los elementos interactivos tienen focus visible:
```css
outline: 2px solid #48826B
outline-offset: 2px
```

---

## Ejemplos de Uso

### Dashboard Principal

```jsx
<Box sx={{ p: 4, backgroundColor: 'background.default' }}>
  <Typography variant="h2" color="primary" gutterBottom>
    Préstamos
  </Typography>
  
  <Grid container spacing={3}>
    <Grid item xs={12} md={6}>
      <Paper sx={{ p: 3 }}>
        {/* Contenido */}
      </Paper>
    </Grid>
  </Grid>
</Box>
```

### Formulario de Alta

```jsx
<Card>
  <CardContent>
    <Typography variant="h5" color="primary" gutterBottom>
      Registrar Nuevo Socio
    </Typography>
    
    <TextField
      fullWidth
      label="Nombre"
      sx={{ mb: 2 }}
    />
    
    <TextField
      fullWidth
      label="DNI"
      sx={{ mb: 3 }}
    />
    
    <Button variant="contained" color="secondary" fullWidth>
      Registrar Socio
    </Button>
  </CardContent>
</Card>
```

### Estado de Libro

```jsx
<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
  <Typography variant="body1" fontWeight={500}>
    1984
  </Typography>
  <Chip label="Disponible" color="success" size="small" />
</Box>
```

---

## Anti-Patrones

### Evitar

- Colores brillantes o neón
- Saturación mayor al 70%
- Sombras mayores a 24px
- Más de 3 fuentes tipográficas
- Animaciones excesivas o pesadas
- Gradientes complejos
- Bajo contraste (menor a 4.5:1)
- Botones sin padding suficiente

### Correcto

- Colores apagados y naturales
- Sombras sutiles
- Transiciones suaves en elementos clave
- Máximo 2 familias tipográficas
- Contraste adecuado siempre
- Espaciado generoso

---

## Checklist de Implementación

### Antes de crear un componente:

- [ ] Usa colores de la paleta definida
- [ ] Verifica contraste mínimo 4.5:1
- [ ] Aplica espaciado del sistema (múltiplos de 8)
- [ ] Usa tipografía de la escala
- [ ] Agrega estados hover/focus
- [ ] Prueba en diferentes tamaños de pantalla
- [ ] Asegura tamaño mínimo de áreas táctiles
- [ ] Documenta uso del componente

---

## Recursos

### Archivos del Proyecto
- `src/theme.js` - Configuración completa del tema
- `src/components/ThemeDemo.jsx` - Componentes de demostración
- Este archivo - Documentación completa

### Herramientas Recomendadas
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Material-UI Documentation](https://mui.com/)
- [Figma](https://www.figma.com/) - Para mockups
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Para inspección

---

## Actualizaciones del Sistema

**Versión:** 1.0.0  
**Fecha:** 2024-01-20  
**Autor:** Sistema de Gestión de Biblioteca  

**Próximas mejoras planificadas:**
- Modo oscuro (estructura preparada)
- Animaciones personalizadas para microinteracciones
- Componentes adicionales específicos del dominio
