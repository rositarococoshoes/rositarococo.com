# PrePagoForm Component - Documentación Completa

## 🎯 Descripción General

El componente `PrePagoForm` es un formulario multi-paso diseñado para el proceso de checkout de Rosita Rococó. Proporciona una experiencia de usuario optimizada con validación en tiempo real, indicadores de progreso y una arquitectura modular que facilita su mantenimiento y extensibilidad.

## 📋 Características Principales

### ✅ Funcionalidades Implementadas
- **Formulario multi-paso**: 3 pasos organizados lógicamente (Contacto → Envío → Revisión y Pago)
- **Validación en tiempo real**: Feedback inmediato al usuario
- **Indicador de progreso visual**: Muestra el progreso actual del formulario
- **Integración con carrito**: Sincronización automática con el carrito de compras
- **Accesibilidad WCAG 2.1 AA**: Cumple con estándares de accesibilidad
- **Responsive Design**: Optimizado para dispositivos móviles y desktop
- **Tracking y Analytics**: Integración con Facebook Pixel y Google Analytics
- **Manejo de errores**: Mensajes claros y específicos
- **Persistencia de datos**: Guardado automático en localStorage

### 🛠 Arquitectura Modular
- **Componentes reutilizables**: CampoForm, MensajeError, ResumenPedido
- **State management centralizado**: FormState y CartState
- **Lógica de validación separada**: validaciones.ts
- **Procesamiento de pagos modular**: pagos.ts
- **Configuración externa**: formConfig.ts

## 🏗 Estructura de Archivos

```
src/
├── components/
│   ├── PrePagoForm.astro           # Componente principal
│   ├── CampoForm.astro           # Subcomponente para campos
│   ├── MensajeError.astro        # Subcomponente para errores
│   └── ResumenPedido.astro       # Subcomponente para resumen
├── lib/
│   ├── formState.ts              # Gestión del estado
│   ├── validaciones.ts           # Lógica de validación
│   └── pagos.ts                  # Procesamiento de pagos
├── types/
│   └── form.ts                   # Tipos TypeScript
├── data/
│   └── formConfig.ts             # Configuración del formulario
└── pages/
    ├── pre-pago.astro            # Página de checkout
    └── test-formulario.astro     # Página de prueba
```

## 🚀 Uso Básico

### 1. Importar el componente
```astro
---
import PrePagoForm from '../components/PrePagoForm.astro';
---
```

### 2. Usar en una página
```astro
<PrePagoForm client:load />
```

### 3. Configurar con carrito existente
```astro
---
import { getCartState } from '../lib/formState';

const cartState = getCartState();
---

<PrePagoForm client:load />
```

## 🔧 Configuración Avanzada

### Personalización de Campos

El formulario utiliza el archivo `formConfig.ts` para configurar los campos:

```typescript
export const formConfig = {
  campos: {
    email: {
      label: 'Email',
      type: 'email',
      placeholder: 'tuemail@ejemplo.com',
      required: true,
      autocomplete: 'email'
    },
    // ... más campos
  },
  provincias: [
    { value: 'Buenos Aires', label: 'Buenos Aires' },
    // ... más provincias
  ],
  metodosPago: [
    { value: 'tarjeta', label: '💳 Tarjeta de Crédito/Débito' },
    // ... más métodos
  ]
};
```

### Personalización de Validaciones

En `validaciones.ts` puedes personalizar las reglas de validación:

```typescript
export const validarEmail = (email: string): string | null => {
  if (!email) return 'El email es requerido';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'El formato del email no es válido';
  }

  return null;
};
```

### Configuración de Pagos

En `pagos.ts` puedes configurar los endpoints y procesadores de pago:

```typescript
const ENDPOINTS = {
  GUARDAR_PEDIDO: 'https://sswebhookss.odontolab.co/webhook/...',
  GENERAR_PAGO_MP: 'https://sswebhookss.odontolab.co/webhook/...'
};
```

## 📊 Flujo de Datos

### 1. Inicialización
```
Usuario carga página → formState.initialize() → Suscribirse a cambios del carrito
```

### 2. Interacción del Usuario
```
Usuario completa campo → handleFieldChange() → Validación → Actualizar estado
```

### 3. Navegación entre Pasos
```
Usuario hace clic en "Continuar" → validarPaso() → nextStep() → Actualizar UI
```

### 4. Envío del Formulario
```
Usuario confirma → handleSubmit() → Validar formulario → procesarPago() → Redirección
```

## 🎨 Estilos y Personalización

### Temas

El componente utiliza CSS variables para facilitar la personalización:

```css
:root {
  --form-primary-color: #a05941;
  --form-secondary-color: #8b6f47;
  --form-error-color: #e74c3c;
  --form-success-color: #27ae60;
  --form-background-color: #ffffff;
  --form-text-color: #2c1810;
}
```

### Breakpoints Responsivos

- **Desktop (> 768px)**: Layout en 2 columnas, contenedor máximo 800px
- **Mobile (≤ 768px)**: Layout en 1 columna, contenedor completo
- **High contrast**: Estilos adaptados para modo de alto contraste
- **Reduced motion**: Animaciones desactivadas si el usuario las prefiere

## 🔐 Seguridad

### Validaciones Implementadas
- **Validación de formato de email**: Regex y validación de estructura
- **Validación de WhatsApp**: Formato numérico y verificación con API externa
- **Validación de DNI**: 7-8 dígitos numéricos
- **Validación de código postal**: 4-5 dígitos numéricos
- **Sanitización de datos**: Prevención de XSS y inyección de código

### Medidas de Seguridad
- **HTTPS obligatorio**: Todos los endpoints usan HTTPS
- **CORS configurado**: Restricción de dominios permitidos
- **Rate limiting**: Límite de intentos de validación
- **No almacenamiento de datos sensibles**: Las contraseñas nunca se guardan

## 📱 Accesibilidad

### Atributos ARIA
- `aria-label`: Etiquetas descriptivas para lectores de pantalla
- `aria-required`: Indica campos obligatorios
- `aria-invalid`: Indica errores de validación
- `aria-describedby`: Conecta campos con sus descripciones
- `role="alert"`: Para mensajes de error importantes

### Navegación por Teclado
- **Tab order lógico**: Navegación secuencial natural
- **Foco visible**: Indicadores claros del elemento enfocado
- **Atajos de teclado**: Escape para cerrar modales, Enter para enviar

### Contraste y Legibilidad
- **Ratios WCAG AA**: Cumplimiento con estándares de contraste
- **Tamaños de fuente legibles**: Mínimo 16px para campos de formulario
- **Espaciado adecuado**: Separación clara entre elementos

## 📈 Performance

### Optimizaciones Implementadas
- **Lazy loading**: Componentes cargados bajo demanda
- **Debouncing de validaciones**: Reducción de llamadas API
- **Memoización de cálculos**: Cache de resultados costosos
- **Minificación de CSS/JS**: Reducción del tamaño de archivos
- **Optimización de imágenes**: Formatos WebP y lazy loading

### Métricas
- **Time to Interactive**: < 3 segundos
- **First Contentful Paint**: < 1.5 segundos
- **Largest Contentful Paint**: < 2.5 segundos
- **Cumulative Layout Shift**: < 0.1

## 🧪 Testing y Debug

### Página de Pruebas
URL: `/test-formulario`

La página de pruebas incluye:
- **Controles manuales**: Botones para agregar productos, vaciar carrito, etc.
- **Debug en tiempo real**: Visualización del estado del formulario y carrito
- **Log de eventos**: Registro de todas las interacciones
- **Datos de prueba**: Precarga automática de productos de prueba

### Herramientas de Debug
```javascript
// Acceso al estado del formulario
const formState = window.getFormState();

// Acceso al estado del carrito
const cartState = window.getCartState();

// Forzar actualización del carrito
window.updateCart();

// Resetear formulario
window.resetForm();
```

## 🔌 Extensibilidad

### Agregar Nuevos Campos

1. **Actualizar tipos** en `types/form.ts`:
```typescript
export interface FormData {
  // ... campos existentes
  nuevoCampo: string;
}
```

2. **Agregar al config** en `formConfig.ts`:
```typescript
campos: {
  // ... campos existentes
  nuevoCampo: {
    label: 'Nuevo Campo',
    type: 'text',
    required: false,
    // ... más configuración
  }
}
```

3. **Agregar validación** en `validaciones.ts`:
```typescript
export const validarNuevoCampo = (valor: string): string | null => {
  // Lógica de validación
};
```

### Agregar Nuevos Métodos de Pago

1. **Actualizar configuración** en `formConfig.ts`:
```typescript
metodosPago: [
  // ... métodos existentes
  { value: 'criptomoneda', label: '🪙 Criptomoneda' }
]
```

2. **Implementar procesador** en `pagos.ts`:
```typescript
case 'criptomoneda':
  return await procesarCriptomoneda(formData, cartItems);
```

## 🐛 Troubleshooting

### Problemas Comunes

#### 1. Formulario no envía
**Síntomas**: Botón deshabilitado, errores de validación
**Causas**: Campos requeridos incompletos, errores de red
**Solución**: Revisar console.log para errores específicos

#### 2. WhatsApp no valida
**Síntomas**: Error de validación de formato
**Causas**: Formato incorrecto, problemas con API externa
**Solución**: Verificar formato (sin 0 ni 15), probar con número válido

#### 3. Carrito no sincroniza
**Síntomas**: Productos no aparecen en el resumen
**Causas**: Estado no inicializado, problemas con localStorage
**Solución**: Revisar consola, limpiar localStorage, reinicializar estado

#### 4. Redirección falla
**Síntomas**: No redirige después del pago
**Causas**: Error en API, respuesta incorrecta
**Solución**: Revisar respuesta del servidor, verificar URL de redirección

### Debug Mode

Para activar el modo de debug:
```javascript
// En consola del navegador
localStorage.setItem('rosita-debug', 'true');
location.reload();
```

### Logs Útiles
```javascript
// Ver estado actual
console.log('Form State:', window.getFormState());
console.log('Cart State:', window.getCartState());

// Ver errores de validación
console.log('Validation Errors:', formState.errors);

// Ver eventos recientes
console.log('Recent Events:', events);
```

## 📚 Referencias

### Documentación Relacionada
- [Documentación de Astro](https://docs.astro.build/)
- [Guía de Accesibilidad WCAG](https://www.w3.org/WAI/WCAG21/quickref/)
- [Facebook Pixel Documentation](https://developers.facebook.com/docs/meta-pixel/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### Herramientas Utilizadas
- **Astro**: Framework de componentes
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Utilidades CSS
- **Facebook Pixel**: Analytics y tracking
- **localStorage**: Persistencia de datos

## 🚀 Despliegue

### Variables de Entorno
```env
# API Endpoints
MERCADOPAGO_API_URL=https://sswebhookss.odontolab.co/webhook/...
WHATSAPP_VALIDATION_URL=https://sswebhookss.odontolab.co/webhook/...

# Configuración
DEBUG_MODE=false
SENTRY_DSN=tu_sentry_dsn
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

### Build y Deploy
```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📞 Soporte

Para preguntas o reportar problemas:

1. **Revisar este documento** para soluciones comunes
2. **Usar la página de prueba** en `/test-formulario`
3. **Revisar la consola** del navegador para errores específicos
4. **Contactar al equipo de desarrollo** con información detallada del problema

---

**Versión**: 2.0.0
**Última Actualización**: Noviembre 2024
**Autores**: Equipo de Desarrollo Rosita Rococó