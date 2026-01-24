/**
 * Admin Panel Script
 * Gestión de contenido y analytics
 */

// Configuración
const ADMIN_PASSWORD = 'PaginaM'; // Cambiar en producción
const STORAGE_KEYS = {
    coverage: 'mizrahi_coverage_amount',
    visits: 'mizrahi_visits',
    totalVisits: 'mizrahi_total_visits',
    authenticated: 'mizrahi_admin_auth'
};

// Estado de autenticación
let isAuthenticated = false;

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    checkAuthentication();
    setupEventListeners();
});

// Verificar autenticación
function checkAuthentication() {
    const authSession = sessionStorage.getItem(STORAGE_KEYS.authenticated);

    if (authSession === 'true') {
        isAuthenticated = true;
        showDashboard();
    } else {
        showLogin();
    }
}

// Mostrar pantalla de login
function showLogin() {
    document.getElementById('loginSection').style.display = 'flex';
    document.getElementById('dashboardSection').style.display = 'none';
}

// Mostrar dashboard
function showDashboard() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('dashboardSection').style.display = 'block';
    loadDashboardData();
}

// Configurar event listeners
function setupEventListeners() {
    // Login
    document.getElementById('loginForm').addEventListener('submit', handleLogin);

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    // Actualizar cobertura
    document.getElementById('coverageForm').addEventListener('submit', updateCoverage);

    // Formatear número mientras escribe
    document.getElementById('coverageInput').addEventListener('input', formatCoverageInput);

    // Exportar datos
    document.getElementById('exportBtn').addEventListener('click', exportVisitorData);

    // Limpiar datos
    document.getElementById('clearDataBtn').addEventListener('click', clearVisitorData);
}

// Manejar login
function handleLogin(e) {
    e.preventDefault();
    const password = document.getElementById('passwordInput').value;

    if (password === ADMIN_PASSWORD) {
        isAuthenticated = true;
        sessionStorage.setItem(STORAGE_KEYS.authenticated, 'true');
        showDashboard();
        document.getElementById('passwordInput').value = '';
        showMessage('Acceso concedido', 'success');
    } else {
        showMessage('Contraseña incorrecta', 'error');
        document.getElementById('passwordInput').value = '';
    }
}

// Manejar logout
function handleLogout() {
    isAuthenticated = false;
    sessionStorage.removeItem(STORAGE_KEYS.authenticated);
    showLogin();
    showMessage('Sesión cerrada', 'info');
}

// Cargar datos del dashboard
function loadDashboardData() {
    // Cargar monto de cobertura actual
    const currentAmount = localStorage.getItem(STORAGE_KEYS.coverage) || '$ 3.546.053.924';
    document.getElementById('currentCoverage').textContent = currentAmount;

    // Limpiar el input y poner solo el número sin formato
    const numericValue = currentAmount.replace(/[^0-9]/g, '');
    document.getElementById('coverageInput').value = numericValue;

    // Cargar estadísticas de visitas
    loadVisitorStats();

    // Cargar tabla de visitas
    loadVisitorTable();
}

// Formatear input de cobertura en tiempo real
function formatCoverageInput(e) {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value) {
        // Formatear con separadores de miles
        value = parseInt(value).toLocaleString('es-AR');
        document.getElementById('coveragePreview').textContent = '$ ' + value;
    } else {
        document.getElementById('coveragePreview').textContent = '$ 0';
    }
}

// Actualizar monto de cobertura
function updateCoverage(e) {
    e.preventDefault();

    const input = document.getElementById('coverageInput').value;
    const numericValue = input.replace(/[^0-9]/g, '');

    if (!numericValue || numericValue === '0') {
        showMessage('Por favor ingrese un monto válido', 'error');
        return;
    }

    // Formatear el número
    const formattedAmount = '$ ' + parseInt(numericValue).toLocaleString('es-AR');

    // Guardar en localStorage
    localStorage.setItem(STORAGE_KEYS.coverage, formattedAmount);

    // Actualizar display
    document.getElementById('currentCoverage').textContent = formattedAmount;

    showMessage('Monto actualizado exitosamente', 'success');
}

// Cargar estadísticas de visitantes
function loadVisitorStats() {
    const visits = JSON.parse(localStorage.getItem(STORAGE_KEYS.visits) || '[]');
    const totalVisits = visits.length;

    // Total de visitas
    document.getElementById('totalVisits').textContent = totalVisits;

    // Visitas hoy
    const today = new Date().toDateString();
    const visitsToday = visits.filter(v => {
        const visitDate = new Date(v.timestamp).toDateString();
        return visitDate === today;
    }).length;
    document.getElementById('visitsToday').textContent = visitsToday;

    // Última visita
    if (visits.length > 0) {
        const lastVisit = visits[visits.length - 1];
        const lastVisitDate = new Date(lastVisit.timestamp);
        document.getElementById('lastVisit').textContent = formatDateTime(lastVisitDate);
    } else {
        document.getElementById('lastVisit').textContent = 'Sin visitas';
    }

    // Visitas esta semana
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const visitsThisWeek = visits.filter(v => {
        const visitDate = new Date(v.timestamp);
        return visitDate >= oneWeekAgo;
    }).length;
    document.getElementById('visitsWeek').textContent = visitsThisWeek;
}

// Cargar tabla de visitas
function loadVisitorTable() {
    const visits = JSON.parse(localStorage.getItem(STORAGE_KEYS.visits) || '[]');
    const tbody = document.getElementById('visitorTableBody');

    tbody.innerHTML = '';

    if (visits.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No hay visitas registradas</td></tr>';
        return;
    }

    // Mostrar últimas 50 visitas en orden inverso
    const recentVisits = visits.slice(-50).reverse();

    recentVisits.forEach(visit => {
        const row = document.createElement('tr');

        const timestamp = new Date(visit.timestamp);
        // Use stored device type or fallback to userAgent check for old records
        const deviceType = visit.deviceType || (/Mobile|Android|iPhone/i.test(visit.userAgent) ? 'Móvil' : 'PC');
        const platform = visit.platform || '-';

        row.innerHTML = `
            <td>${formatDateTime(timestamp)}</td>
            <td>${visit.page}</td>
            <td>${visit.referrer}</td>
            <td>
                ${deviceType === 'Móvil' ? '<i class="fas fa-mobile-alt"></i>' : '<i class="fas fa-desktop"></i>'} 
                ${deviceType} <small style="color: grey;">(${platform})</small>
            </td>
            <td>${visit.screenResolution}</td>
        `;

        tbody.appendChild(row);
    });
}

// Exportar datos de visitantes
function exportVisitorData() {
    const visits = JSON.parse(localStorage.getItem(STORAGE_KEYS.visits) || '[]');

    if (visits.length === 0) {
        showMessage('No hay datos para exportar', 'info');
        return;
    }

    // Crear CSV
    let csv = 'Fecha/Hora,Página,Referencia,Dispositivo,Resolución,Idioma\n';

    visits.forEach(visit => {
        const timestamp = new Date(visit.timestamp);
        const deviceType = visit.deviceType || (/Mobile|Android|iPhone/i.test(visit.userAgent) ? 'Móvil' : 'PC');
        const platform = visit.platform || 'Desconocido';

        csv += `"${formatDateTime(timestamp)}","${visit.page}","${visit.referrer}","${deviceType} (${platform})","${visit.screenResolution}","${visit.language}"\n`;
    });

    // Descargar archivo
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `visitas_mizrahi_${Date.now()}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showMessage('Datos exportados exitosamente', 'success');
}

// Limpiar datos de visitantes
function clearVisitorData() {
    if (confirm('¿Está seguro de que desea eliminar todos los datos de visitantes? Esta acción no se puede deshacer.')) {
        localStorage.removeItem(STORAGE_KEYS.visits);
        localStorage.removeItem(STORAGE_KEYS.totalVisits);
        loadDashboardData();
        showMessage('Datos eliminados exitosamente', 'success');
    }
}

// Formatear fecha y hora
function formatDateTime(date) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    return date.toLocaleString('es-AR', options);
}

// Mostrar mensajes
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;

    const container = document.querySelector('.dashboard-container') || document.body;
    container.insertBefore(messageDiv, container.firstChild);

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}
