# PowerShell Script para capturar screenshots del sitio Astro
# Este script documenta el proceso manual para capturar las screenshots necesarias

Write-Host "=== CAPTURA DE SCREENSHOTS - VALIDACIÓN ASTRO ===" -ForegroundColor Green
Write-Host ""

Write-Host "URL del sitio: http://localhost:4323/" -ForegroundColor Yellow
Write-Host ""

Write-Host "SCREENSHOTS REQUERIDOS DESKTOP (1920x1080):" -ForegroundColor Cyan
Write-Host "1. Full page: evidence/screenshots/v2-astro-implementation-desktop-full.png"
Write-Host "2. Header completo: evidence/screenshots/v2-header-desktop.png"
Write-Host "3. Hero section: evidence/screenshots/v2-hero-desktop.png"
Write-Host "4. Products section: evidence/screenshots/v2-products-desktop.png"
Write-Host "5. Footer: evidence/screenshots/v2-footer-desktop.png"
Write-Host ""

Write-Host "SCREENSHOTS REQUERIDOS MOBILE (375x667):" -ForegroundColor Cyan
Write-Host "1. Full page: evidence/screenshots/v2-astro-mobile-full.png"
Write-Host "2. Header mobile: evidence/screenshots/v2-header-mobile.png"
Write-Host "3. Products mobile: evidence/screenshots/v2-products-mobile.png"
Write-Host ""

Write-Host "HERRAMIENTAS DE DESARROLLADOR - CHROME:" -ForegroundColor Cyan
Write-Host "1. Abrir http://localhost:4323/ en Chrome"
Write-Host "2. F12 para abrir DevTools"
Write-Host "3. Console: evidence/logs/v2-console-logs.txt"
Write-Host "4. Network: evidence/network/v2-network-requests.har"
Write-Host "5. Performance: evidence/reports/v2-performance-metrics.json"
Write-Host "6. Lighthouse: evidence/reports/v2-lighthouse-report.html"
Write-Host ""

Write-Host "ELEMENTOS INTERACTIVOS A PROBAR:" -ForegroundColor Cyan
Write-Host "- Navegación del header"
Write-Host "- Botones de 'Agregar al Carrito'"
Write-Host "- Selector de talles"
Write-Host -" Formulario de contacto"
Write-Host "- Responsive design (mobile vs desktop)"
Write-Host "- Animaciones y transiciones"
Write-Host ""

Write-Host "PASOS MANUALES PARA CAPTURA:" -ForegroundColor Yellow
Write-Host "1. Configurar Chrome DevTools:"
Write-Host "   - Device: Desktop (1920x1080)"
Write-Host "   - Capturar full page screenshot"
Write-Host "   - Capturar secciones individuales"
Write-Host "2. Cambiar a Mobile (375x667)"
Write-Host "   - Capturar mobile screenshots"
Write-Host "3. Exportar datos:"
Write-Host "   - Console logs (copiar y guardar)"
Write-Host "   - Network requests (exportar como HAR)"
Write-Host "   - Performance metrics (exportar JSON)"
Write-Host "   - Lighthouse audit (exportar HTML)"
Write-Host ""

Write-Host "EJECUTANDO VERIFICACIÓN BÁSICA..." -ForegroundColor Green
try {
    $response = Invoke-WebRequest -Uri "http://localhost:4323/" -UseBasicParsing
    Write-Host "✅ Sitio responde correctamente" -ForegroundColor Green
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor White
    Write-Host "Content Type: $($response.Headers['Content-Type'])" -ForegroundColor White
    Write-Host "Content Length: $($response.Headers['Content-Length']) bytes" -ForegroundColor White
} catch {
    Write-Host "❌ Error al conectar con el sitio" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Write-Host "=== PROCEDIMIENTO COMPLETADO ===" -ForegroundColor Green
Write-Host "Por favor, captura manualmente los screenshots según las instrucciones above" -ForegroundColor Yellow