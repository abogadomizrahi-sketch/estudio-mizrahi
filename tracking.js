/**
 * Sistema de Tracking de Visitantes
 * Registra visitas a la página en localStorage
 */

(function () {
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
                // Simple device detection
                deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Móvil' : 'PC',
                platform: navigator.platform,
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
