# Estudio Mizrahi - Sitio Web Oficial

Sitio web profesional para el Estudio Jurídico Mizrahi, especializado en Amparos de Salud, Discapacidad y Cobertura de Geriátricos en Buenos Aires, Argentina.

## 🌟 Características

- **Diseño Moderno y Responsivo**: Optimizado para PC, tablets y móviles
- **Sección Destacada**: Cobertura de Geriátricos con valor editable
- **Panel de Administración**: Gestión de contenido y analytics
- **Seguimiento de Visitas**: Analytics integrado con localStorage
- **WhatsApp Integration**: Botón flotante para contacto directo
- **Estética Premium**: Colores corporativos azul oscuro y dorado

## 📂 Estructura del Proyecto

```
Web2/
├── index.html           # Página principal
├── styles.css           # Estilos de la página principal
├── tracking.js          # Script de seguimiento de visitas
├── admin.html           # Panel de administración
├── admin-styles.css     # Estilos del panel admin
├── admin-script.js      # Lógica del panel admin
├── LogoPNG.png          # Logo del estudio
├── imagen.png           # Imagen de referencia
└── README.md            # Este archivo
```

## 🚀 Instalación y Uso

### Uso Local

1. **Abrir el sitio web**:
   - Simplemente abra `index.html` en su navegador web
   - No requiere servidor web para funcionar localmente

2. **Acceder al Panel de Administración**:
   - Abra `admin.html` en su navegador
   - **Contraseña predeterminada**: `mizrahi2025`
   - ⚠️ **IMPORTANTE**: Cambie la contraseña en `admin-script.js` antes de publicar

### Despliegue en GitHub Pages

1. **Crear un repositorio en GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Estudio Mizrahi website"
   ```

2. **Subir a GitHub**:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git branch -M main
   git push -u origin main
   ```

3. **Activar GitHub Pages**:
   - Ve a Settings → Pages
   - En "Source", selecciona la rama `main`
   - Haz clic en "Save"
   - Tu sitio estará disponible en: `https://TU_USUARIO.github.io/TU_REPOSITORIO/`

## 🔧 Configuración

### Actualizar Información de Contacto

Edite los siguientes archivos para actualizar la información de contacto:

**En `index.html`**:
```javascript
// Buscar y reemplazar el número de WhatsApp
https://wa.me/541160081077  // Línea 35, 54, 155
```

**En `index.html`** (Email):
```html
<p class="footer-email">danielmizrahi@ymail.com</p>  // Línea 151
```

### Cambiar Contraseña del Admin

**En `admin-script.js`** (línea 8):
```javascript
const ADMIN_PASSWORD = 'mizrahi2025'; // Cambiar aquí
```

### Actualizar Monto de Cobertura

Puede actualizar el monto de dos formas:

1. **Desde el Panel Admin** (Recomendado):
   - Acceda a `admin.html`
   - Inicie sesión con la contraseña
   - Ingrese el nuevo monto en "Gestión de Cobertura"
   - Haga clic en "Actualizar Monto"

2. **Manualmente en el código** (`index.html`, línea 80):
   ```html
   <div class="amount-value" id="coverageAmount">$ 3.546.053.924</div>
   ```

## 📊 Panel de Administración

### Funcionalidades

1. **Gestión de Cobertura**:
   - Actualizar monto de cobertura geriátrica
   - Vista previa en tiempo real
   - Formato automático de números

2. **Analytics de Visitantes**:
   - Total de visitas
   - Visitas hoy
   - Visitas esta semana
   - Última visita registrada
   - Historial detallado con:
     - Fecha/Hora
     - Página visitada
     - Fuente de referencia
     - Tipo de dispositivo (PC/Móvil)
     - Resolución de pantalla

3. **Exportación de Datos**:
   - Exportar historial de visitas a CSV
   - Compatible con Excel y Google Sheets

4. **Gestión de Datos**:
   - Limpiar historial de visitas
   - Mantener datos de cobertura

### Acceso al Panel

- **URL**: `/admin.html`
- **Contraseña**: `mizrahi2025` (por defecto)
- **Almacenamiento**: Los datos se guardan en localStorage del navegador

## 🎨 Personalización

### Colores

Los colores principales están definidos en `styles.css`:

```css
:root {
    --primary-blue: #0f1c3f;      /* Azul principal */
    --secondary-blue: #1a2b57;     /* Azul secundario */
    --accent-gold: #e3b645;        /* Dorado de acento */
    --dark-gold: #d4a73a;          /* Dorado oscuro */
    --whatsapp-green: #25d366;     /* Verde WhatsApp */
}
```

### Tipografía

El sitio utiliza la fuente **Montserrat** de Google Fonts. Para cambiarla, actualice:

```html
<!-- En index.html, línea 12 -->
<link href="https://fonts.googleapis.com/css2?family=TU_FUENTE:wght@400;600;700;800&display=swap" rel="stylesheet">
```

```css
/* En styles.css, línea 14 */
font-family: 'TU_FUENTE', sans-serif;
```

## 📱 Responsividad

El sitio está optimizado para:

- **Móviles**: 320px - 767px
- **Tablets**: 768px - 1023px
- **Desktop**: 1024px+

Los breakpoints se pueden ajustar en `styles.css` (líneas 395-450).

## 🔒 Seguridad

### Consideraciones Importantes

1. **Contraseña del Admin**: 
   - Cambie la contraseña predeterminada antes de publicar
   - Use una contraseña segura y única

2. **Datos de Visitantes**:
   - Los datos se almacenan localmente en el navegador
   - No se comparten con servidores externos
   - Cumplen con privacidad básica (sin datos personales)

3. **Para Producción**:
   - Considere usar un backend real (Firebase, Supabase)
   - Implemente autenticación robusta
   - Use HTTPS siempre

## 🌐 Servicios Destacados

El sitio presenta los siguientes servicios:

1. **Mantener su Obra Social al Jubilarse**
2. **Cuidados domiciliarios**
3. **Medicamentos de alto costo**
4. **Amparos de Salud**
5. **Discapacidad**
6. **Geriátricos**
7. **Afiliaciones**

## 📞 Contacto

- **WhatsApp**: +54 9 11 6008-1077
- **Email**: danielmizrahi@ymail.com
- **Ubicación**: Buenos Aires, Argentina

## 📝 Licencia

© 2025 Estudio Jurídico Mizrahi. Todos los derechos reservados.

## 🆘 Soporte

Para modificaciones o soporte técnico, consulte este README o contacte al desarrollador.

---

**Última actualización**: Enero 2025
