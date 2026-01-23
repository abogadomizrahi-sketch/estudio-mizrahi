# GUÍA RÁPIDA - Subir a GitHub

## 📋 Archivos Principales

Estos son TODOS los archivos que necesita para subir a GitHub:

### Archivos HTML:
1. ✅ `index.html` - Página principal
2. ✅ `admin.html` - Panel de administración

### Archivos CSS:
3. ✅ `styles.css` - Estilos página principal  
4. ✅ `admin-styles.css` - Estilos panel admin

### Archivos JavaScript:
5. ✅ `tracking.js` - Sistema de tracking
6. ✅ `admin-script.js` - Lógica del panel admin

### Archivos de Imagen:
7. ✅ `LogoPNG.png` - Logo del estudio
8. ✅ `imagen.png` - Imagen de referencia (opcional)

### Archivos de Documentación:
9. ✅ `README.md` - Documentación del proyecto
10. ✅ `.gitignore` - Configuración Git

---

## 🚀 PASOS PARA SUBIR A GITHUB

### 1. Inicializar Git (en la carpeta del proyecto)

```powershell
cd "d:\OneDrive\IA\Web2"
git init
```

### 2. Agregar todos los archivos

```powershell
git add .
```

### 3. Hacer el primer commit

```powershell
git commit -m "Initial commit: Estudio Mizrahi website"
```

### 4. Crear repositorio en GitHub

1. Ir a https://github.com
2. Clic en "New repository"
3. Nombre: `estudio-mizrahi` (o el que prefiera)
4. Descripción: "Sitio web oficial Estudio Jurídico Mizrahi"
5. Público o Privado (su elección)
6. **NO** marcar "Initialize with README"
7. Clic en "Create repository"

### 5. Conectar y subir

Reemplace `TU_USUARIO` con su nombre de usuario de GitHub:

```powershell
git remote add origin https://github.com/TU_USUARIO/estudio-mizrahi.git
git branch -M main
git push -u origin main
```

### 6. Activar GitHub Pages

1. En GitHub, ir a: **Settings** → **Pages**
2. En "Source", seleccionar: **main** branch
3. Clic en **Save**
4. Esperar 1-2 minutos

### 7. ¡Listo! Su sitio estará en:

```
https://TU_USUARIO.github.io/estudio-mizrahi/
```

---

## 🔗 ACCESO AL PANEL DE ADMINISTRACIÓN

### Opción 1: Desde la página principal
- Ir a su sitio web
- Clic en el ícono de engranaje (⚙️) en el header

### Opción 2: URL directa
```
https://TU_USUARIO.github.io/estudio-mizrahi/admin.html
```

### Credenciales:
- **Contraseña:** `mizrahi2025`

⚠️ **IMPORTANTE:** Cambie la contraseña antes de publicar:
- Editar archivo `admin-script.js`
- Línea 8: `const ADMIN_PASSWORD = 'su_nueva_contraseña';`

---

## 📊 FUNCIONES DEL PANEL ADMIN

✅ **Actualizar monto de cobertura** - Gestión de Cobertura
✅ **Ver estadísticas de visitas** - Total, Hoy, Semana
✅ **Historial de visitantes** - Últimas 50 visitas con detalles
✅ **Exportar datos a CSV** - Para análisis en Excel
✅ **Limpiar historial** - Borrar datos de visitas

---

## 🔧 ACTUALIZACIÓN DEL SITIO

Para actualizar el sitio después de hacer cambios:

```powershell
git add .
git commit -m "Actualización: descripción del cambio"
git push
```

Los cambios aparecerán en el sitio web en 1-2 minutos.

---

## 📞 CONFIGURACIONES IMPORTANTES

### Cambiar Número de WhatsApp
Buscar y reemplazar en `index.html`:
- `541160081077` → su nuevo número

### Cambiar Email
En `index.html` línea 158:
- `danielmizrahi@ymail.com` → su nuevo email

### Cambiar Contraseña Admin
En `admin-script.js` línea 8:
- `mizrahi2025` → su nueva contraseña

---

## ✅ VERIFICACIÓN

Después de subir, verifique:
- ✅ El sitio web se muestra correctamente
- ✅ El logo aparece (120px de altura)
- ✅ El ícono de engranaje lleva al panel admin
- ✅ Puede acceder al admin con la contraseña
- ✅ El tracking de visitas funciona
- ✅ Los botones de WhatsApp funcionan

---

## 🎯 LOGO MÁS GRANDE

El logo ahora tiene:
- **Desktop:** 120px de altura
- **Móvil:** 85px de altura

Si desea hacerlo aún más grande, editar `styles.css`:
- Línea 55: `height: 120px;` → aumentar valor
- Línea 439: `height: 85px;` → aumentar valor (móvil)

---

**¿Necesita ayuda?** Consulte `README.md` para documentación completa.
