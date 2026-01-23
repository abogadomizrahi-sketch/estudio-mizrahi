# Aplicación de Seguimiento y Administración - Código Completo

Este documento contiene todo el código necesario para la aplicación de seguimiento de visitantes y el panel de administración.

---

## 1. TRACKING.JS - Sistema de Seguimiento de Visitas

```javascript
/**
 * Sistema de Tracking de Visitantes
 * Registra visitas a la página en localStorage
 */

(function() {
    'use strict';
    
    const STORAGE_KEY = 'mizrahi_visits';
    
    function logVisit() {
        try {
            // Obtener visitas existentes
            let visits = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            
            // Agregar nueva visita
            const visit = {
                timestamp: new Date().toISOString(),
                page: window.location.pathname,
                referrer: document.referrer || 'direct',
                userAgent: navigator.userAgent,
                screenResolution: `${window.screen.width}x${window.screen.height}`,
                language: navigator.language
            };
            
            visits.push(visit);
            
            // Guardar en localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(visits));
            
            // Actualizar contador total
            const totalVisits = visits.length;
            localStorage.setItem('mizrahi_total_visits', totalVisits.toString());
            
            console.log('Visita registrada:', visit);
            
        } catch (error) {
            console.error('Error al registrar visita:', error);
        }
    }
    
    // Registrar visita al cargar la página
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', logVisit);
    } else {
        logVisit();
    }
    
})();
```

**Ubicación:** Guardar como `tracking.js` en la raíz del proyecto

**Funcionalidad:**
- Registra automáticamente cada visita a la página
- Captura: fecha/hora, página, referrer, dispositivo, resolución, idioma
- Almacena datos en localStorage del navegador
- No requiere configuración adicional

---

## 2. ADMIN.HTML - Panel de Administración

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administración - Estudio Mizrahi</title>
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <!-- Admin Styles -->
    <link rel="stylesheet" href="admin-styles.css">
</head>
<body>
    <!-- Login Section -->
    <section id="loginSection" class="login-section">
        <div class="login-box">
            <h1 class="login-title">
                <i class="fas fa-shield-alt"></i> Admin Panel
            </h1>
            <p class="login-subtitle">Estudio Mizrahi</p>
            
            <form id="loginForm">
                <div class="form-group">
                    <label for="passwordInput" class="form-label">Contraseña</label>
                    <input 
                        type="password" 
                        id="passwordInput" 
                        class="form-input" 
                        placeholder="Ingrese su contraseña"
                        required
                        autocomplete="current-password"
                    >
                </div>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-sign-in-alt"></i> Acceder
                </button>
            </form>
        </div>
    </section>

    <!-- Dashboard Section -->
    <section id="dashboardSection" class="dashboard-section">
        <!-- Header -->
        <div class="dashboard-header">
            <h1 class="dashboard-title">
                <i class="fas fa-tachometer-alt"></i> Panel de Control
            </h1>
            <button id="logoutBtn" class="btn btn-secondary">
                <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
            </button>
        </div>

        <!-- Stats Grid -->
        <div class="stats-grid">
            <div class="stat-card">
                <i class="fas fa-eye stat-icon"></i>
                <div class="stat-label">Total de Visitas</div>
                <div class="stat-value" id="totalVisits">0</div>
            </div>
            
            <div class="stat-card">
                <i class="fas fa-calendar-day stat-icon"></i>
                <div class="stat-label">Visitas Hoy</div>
                <div class="stat-value" id="visitsToday">0</div>
            </div>
            
            <div class="stat-card">
                <i class="fas fa-calendar-week stat-icon"></i>
                <div class="stat-label">Esta Semana</div>
                <div class="stat-value" id="visitsWeek">0</div>
            </div>
            
            <div class="stat-card">
                <i class="fas fa-clock stat-icon"></i>
                <div class="stat-label">Última Visita</div>
                <div class="stat-value" id="lastVisit" style="font-size: 1rem;">-</div>
            </div>
        </div>

        <!-- Content Grid -->
        <div class="content-grid">
            <!-- Coverage Management Panel -->
            <div class="panel">
                <h2 class="panel-title">
                    <i class="fas fa-money-bill-wave"></i>
                    Gestión de Cobertura
                </h2>
                
                <div class="current-value">
                    <div class="current-value-label">Monto Actual Publicado</div>
                    <div class="current-value-amount" id="currentCoverage">$ 3.546.053.924</div>
                </div>
                
                <form id="coverageForm">
                    <div class="form-group">
                        <label for="coverageInput" class="form-label">
                            Nuevo Monto de Cobertura Geriátrica
                        </label>
                        <input 
                            type="text" 
                            id="coverageInput" 
                            class="form-input" 
                            placeholder="Ej: 3546053924"
                            required
                        >
                        <small style="color: var(--text-muted); display: block; margin-top: 0.5rem;">
                            Ingrese solo números, sin puntos ni símbolos
                        </small>
                    </div>
                    
                    <div class="preview-box">
                        <div class="preview-label">Vista Previa</div>
                        <div class="preview-value" id="coveragePreview">$ 0</div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="margin-top: 1.5rem;">
                        <i class="fas fa-save"></i> Actualizar Monto
                    </button>
                </form>
            </div>

            <!-- Analytics Panel -->
            <div class="panel">
                <h2 class="panel-title">
                    <i class="fas fa-chart-line"></i>
                    Analytics de Visitantes
                </h2>
                
                <p style="color: var(--text-muted); margin-bottom: 1.5rem;">
                    Seguimiento de visitas a la página principal
                </p>
                
                <div class="action-buttons">
                    <button id="exportBtn" class="btn btn-secondary">
                        <i class="fas fa-download"></i> Exportar CSV
                    </button>
                    <button id="clearDataBtn" class="btn btn-danger">
                        <i class="fas fa-trash"></i> Limpiar Datos
                    </button>
                </div>
            </div>
        </div>

        <!-- Visitor Table -->
        <div class="panel">
            <h2 class="panel-title">
                <i class="fas fa-users"></i>
                Historial de Visitas (Últimas 50)
            </h2>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Fecha/Hora</th>
                            <th>Página</th>
                            <th>Referencia</th>
                            <th>Dispositivo</th>
                            <th>Resolución</th>
                        </tr>
                    </thead>
                    <tbody id="visitorTableBody">
                        <tr>
                            <td colspan="5" style="text-align: center;">Cargando datos...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <!-- Admin Script -->
    <script src="admin-script.js"></script>
</body>
</html>
```

**Ubicación:** Guardar como `admin.html` en la raíz del proyecto

**Acceso:** 
- URL: abrir `admin.html` o hacer clic en el ícono de engranaje en el header de index.html
- Contraseña por defecto: `mizrahi2025`

---

## INSTRUCCIONES DE USO

### Para Subir a GitHub:

1. **Crear repositorio en GitHub**
2. **Copiar archivos:**
   - `tracking.js` (código arriba)
   - `admin.html` (código arriba)  
   - `admin-styles.css` (incluido en archivos existentes)
   - `admin-script.js` (incluido en archivos existentes)

3. **Acceso directo al admin:**
   - Desde `index.html`: Clic en ícono de engranaje (⚙️) en header
   - URL directa: `https://tu-usuario.github.io/tu-repo/admin.html`

### Cambiar Contraseña:

Editar `admin-script.js` línea 8:
```javascript
const ADMIN_PASSWORD = 'tu_nueva_contraseña';
```

### Características del Panel Admin:

✅ **Gestión de Cobertura:**
- Actualizar monto de cobertura geriátrica
- Vista previa en tiempo real con formato
- Cambios se reflejan automáticamente en index.html

✅ **Analytics:**
- Total de visitas acumuladas
- Visitas de hoy
- Visitas de esta semana  
- Última visita registrada
- Historial detallado (últimas 50)

✅ **Exportación:**
- Exportar datos a CSV para Excel
- Limpiar historial de visitas

### Datos Almacenados:

Todos los datos se guardan en **localStorage** del navegador:
- `mizrahi_coverage_amount` - Monto de cobertura
- `mizrahi_visits` - Array de visitas
- `mizrahi_total_visits` - Contador total
- `mizrahi_admin_auth` - Sesión admin (temporal)
