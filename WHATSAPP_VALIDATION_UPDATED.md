# WhatsApp Validation System Update

## Cambios Realizados

Se ha actualizado el sistema de validación de WhatsApp en `astrocline/js/carousel.js` para que coincida exactamente con el sistema del `index.html` original.

## Funciones Actualizadas

### 1. `formatWhatsappNumber(number)` - Nueva función
- Implementada exactamente como en el original
- Convierte números al formato internacional argentino: `549XXX`
- Elimina prefijos `+54`, `54`, `0` y `15`
- Retorna string vacío si contiene caracteres no numéricos

### 2. `validateWhatsAppNumber(phone)` - Actualizada
- Ahora usa `formatWhatsappNumber()` interno
- Valida longitud >= 12 caracteres después del formateo
- Retorna objeto con `{ isValid, formattedNumber, message }`

### 3. `sendToWebhook(phoneNumber, action)` - Actualizada
- **Validación**: Envía `{ whatsapp_check: phoneNumber }` al webhook
- **Guardado**: Envía `{ whatsapp: phoneNumber, timestamp, source, url }`
- Usa los mismos endpoints del original:
  - Validación: `https://sswebhookss.odontolab.co/webhook/02eb0643-1b9d-4866-87a7-f892d6a945ea`
  - Guardado: `https://sswebhookss.odontolab.co/webhook/1d018fb5-b798-4218-9c57-b48e3a71c6a7`

### 4. `handleWhatsAppSubmit(event)` - Actualizada
- Eliminada validación del checkbox (fue removido del HTML)
- Implementada lógica del original:
  - Formatea número con `formatWhatsappNumber()`
  - Valida con webhook de validación
  - Espera respuesta `{ exists: true }`
  - Si es válido, guarda en webhook de guardado
  - Actualiza localStorage y campo principal del formulario

### 5. `initializeWhatsAppModal()` - Actualizada
- Simplificada validación de input
- Solo permite dígitos, máximo 10 caracteres
- Eliminado formateo automático complejo

## Flujo de Validación

1. **Input**: Usuario ingresa `1112345678`
2. **Formateo**: `formatWhatsappNumber()` → `5491112345678`
3. **Validación**: Webhook recibe `{ whatsapp_check: "5491112345678" }`
4. **Respuesta**: Webhook retorna `{ exists: true }`
5. **Guardado**: Webhook recibe `{ whatsapp: "5491112345678", ... }`
6. **LocalStorage**: Se guarda el número formateado
7. **Formulario**: Se actualiza campo `#53830725`

## Compatibilidad

✅ Totalmente compatible con el sistema original
✅ Mismos endpoints y formatos de datos
✅ Igual flujo de validación cliente-servidor
✅ Misma experiencia de usuario

## Archivos Modificados

- `astrocline/js/carousel.js` - Lógica de validación actualizada
- `astrocline/index.html` - Formulario simplificado (commit anterior)

El sistema ahora funciona idéntico al embudo original del index.html.