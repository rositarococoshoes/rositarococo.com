# Plan de Migración - Páginas de Gracias a Astro

## 📋 Análisis Completado

### Páginas Identificadas:
- `2gracias-1par.html` - Con formulario MercadoPago completo
- `3gracias-1par.html` - Versión simplificada con botón de pago
- `4gracias-1par.html` - Por analizar
- `5gracias-1par.html` - Por analizar

### Patrones Detectados:
1. **Estructura base común**: GTM, estilos similares, layout responsive
2. **Parámetros URL**: `entry.1471599855` para talles elegidos
3. **Precios variables**: $9.950 por 1 par en los ejemplos
4. **Métodos de pago**: MercadoPago + Transferencia bancaria
5. **Datos bancarios fijos**: Cuentas Santander

## 🎯 Plan de Implementación

### Fase 1: Componentes Base
- [ ] Crear `ThankYouLayout.astro` - Layout base para páginas de gracias
- [ ] Crear `PaymentForm.astro` - Formulario MercadoPago completo  
- [ ] Crear `SimplePaymentButton.astro` - Botón de pago simplificado
- [ ] Crear `OrderSummary.astro` - Resumen del pedido
- [ ] Crear `BankTransferInfo.astro` - Datos bancarios
- [ ] Crear `WhatsAppContact.astro` - Contacto WhatsApp

### Fase 2: Páginas de Gracias
- [ ] Migrar `gracias-1par.astro` (versión con formulario completo)
- [ ] Migrar `gracias-1par-simple.astro` (versión con botón simple)
- [ ] Migrar `gracias-2pares.astro` (2 pares)
- [ ] Migrar `gracias-3pares.astro` (3+ pares)
- [ ] Migrar versiones contrareembolso (`-c.astro`)

### Fase 3: Lógica y Routing
- [ ] Implementar lógica de parámetros URL
- [ ] Adaptar carrito principal para redirección
- [ ] Configurar routing dinámico según cantidad de pares
- [ ] Integrar tracking y analytics

### Fase 4: Testing y Validación
- [ ] Probar cada flujo de pago
- [ ] Validar integración MercadoPago
- [ ] Testing responsive en mobile/desktop
- [ ] Verificar tracking Facebook Pixel

## 🚀 Implementación Inmediata

Comenzando con Fase 1 - Componentes Base
