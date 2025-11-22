# Análisis y Diseño Arquitectónico del Formulario de Pre-pago

## 1. Análisis del Formulario Existente en index.html

### 1.1 Estructura HTML Completa

El formulario de pre-pago en `index.html` se encuentra dentro del elemento `<form id="bootstrapForm">` (líneas 1059-2299) y contiene las siguientes secciones principales:

#### Campos Ocultos para Google Forms
```html
<textarea id="1209868979" name="entry.1209868979" class="hidden"></textarea>
<input name="fvv" type="hidden" value="1" />
<input name="fbzx" type="hidden" value="5661184097173102736" />
<input type="hidden" name="entry.978809450" id="link-mercadopago">
<input name="pageHistory" type="hidden" value="0" />
<input type="hidden" id="1471599855" value="" />
```

#### Sección de Resumen del Pedido (líneas 2178-2185)
```html
<fieldset>
    <legend>Resumen de tu Pedido</legend>
    <div class="form-group">
        <label for="286442883">Modelos y Talles Seleccionados:</label>
        <input class="form-control" id="286442883" name="entry.286442883" readonly="readonly" type="text" placeholder="Aquí verás tu selección..." />
        <p class="help-block">Confirma que sean los correctos antes de seguir.</p>
    </div>
</fieldset>
```

#### Sección de Información de Contacto (líneas 2187-2206)
```html
<fieldset>
    <legend>Información de Contacto</legend>
    <div class="form-group">
        <label for="1465946249">Email <span style="color:red">*</span></label>
        <input class="form-control" id="1465946249" name="entry.1465946249" placeholder="tuemail@ejemplo.com" required type="email" />
        <p class="help-block">Para enviarte la confirmación y el seguimiento de tu pedido.</p>
    </div>
    <div class="form-group">
        <label for="1460904554">Nombre y Apellido <span style="color:red">*</span></label>
        <input class="form-control" id="1460904554" name="entry.1460904554" placeholder="Quien recibe el pedido" required type="text" />
    </div>
    <div class="form-group">
        <label for="53830725">WhatsApp <span style="color:red">*</span></label>
        <input class="form-control" id="53830725" name="entry.53830725" placeholder="Ej: 1156457057 (sin 0 ni 15)" required type="tel" onblur="validateWhatsAppInline()" />
        <div class="error-message" data-target="53830725"></div>
        <p class="help-block" style="font-size: 0.8em; color: #666;">El formato de WhatsApp debe ser sin 0 ni 15.</p>
        <p class="help-block">Fundamental para coordinar el envío si es necesario.</p>
    </div>
</fieldset>
```

#### Sección de Dirección de Envío (líneas 2208-2260)
```html
<fieldset>
    <legend>Dirección de Envío <span style="color:red">*</span></legend>
    <p class="help-block" style="margin-bottom: 20px;">¡Asegúrate que sea correcta para recibir tu paquete sin problemas!</p>
    <div class="form-group">
        <label for="951592426">Calle y Número (Piso/Dpto)</label>
        <input class="form-control" id="951592426" name="entry.951592426" placeholder="Ej: Av. Siempreviva 742, 3B" required type="text"/>
    </div>
    <div class="form-group">
        <label for="1005165410">Código Postal</label>
        <input class="form-control" id="1005165410" name="entry.1005165410" placeholder="Ej: 1425" required type="text" />
    </div>
    <div class="form-group">
        <label for="1743418466">Localidad</label>
        <input class="form-control" id="1743418466" name="entry.1743418466" placeholder="Ej: Palermo" required type="text" />
    </div>
    <div class="form-group">
        <label for="59648134">Provincia</label>
        <select class="form-control" id="59648134" name="entry.59648134" required title="Provincia">
            <option value="">-- Selecciona tu Provincia --</option>
            <option value="Buenos Aires">Buenos Aires</option>
            <option value="Capital Federal">CABA</option>
            <option value="Buenos Aires">Gran Buenos Aires</option>
            <!-- Otras opciones de provincias -->
        </select>
    </div>
    <div class="form-group">
        <label for="541001873">DNI</label>
        <input class="form-control" id="541001873" name="entry.541001873" placeholder="Del titular de la tarjeta o quien recibe" required type="text" />
        <p class="help-block">Necesario para el envío y/o verificación de pago.</p>
    </div>
</fieldset>
```

#### Sección de Forma de Pago (líneas 2262-2274)
```html
<fieldset id="payment-section">
    <legend>Forma de Pago</legend>
    <div class="form-group">
        <label for="comoabona">¿Cómo prefieres abonar? <span style="color:red">*</span></label>
        <select class="form-control" id="comoabona" name="comoabona" required>
            <option value="">-- Selecciona una opción --</option>
            <option value="tarjeta">💳 Tarjeta de Crédito/Débito (¡3 Cuotas sin interés!)</option>
            <option value="mercadopago">💲 Saldo en cuenta MercadoPago</option>
            <option value="cbu">🏦 Transferencia Bancaria (¡Con 10% OFF adicional!)</option>
        </select>
        <p class="help-block">Te redirigiremos a la plataforma de pago segura.</p>
    </div>
</fieldset>
```

#### Sección de Revisión y Confirmación (líneas 2276-2291)
```html
<div id="confirma-pedido" class="review-section">
    <h3>Revisa tu Pedido y Datos</h3>
    <p><strong>Selección:</strong> <span id="review-modelostallesseleccionados">-</span></p>
    <p><strong>Nombre:</strong> <span id="help-nombre">-</span></p>
    <p><strong>WhatsApp:</strong> <span id="help-wapp">-</span></p>
    <p><strong>Email:</strong> <span id="help-email">-</span></p>
    <p><strong>Dirección:</strong> <span id="help-calleyaltura">-</span>, <span id="help-localidad">-</span> (<span id="help-cp">-</span>), <span id="help-provincia">-</span></p>
    <p><strong>DNI:</strong> <span id="help-dni">-</span></p>
    <p id="preciototal">Elige modelos y talles para ver el total</p>
    <p class="help-block" style="font-size: 0.9em; margin-top: 15px;">
        <strong style="color:#a05941; display:inline; min-width:auto;">¡Importante!</strong> Tu pedido es un compromiso de pago. Verifica que todo sea correcto.<br>
        A partir de los 7 días hábiles lo recibirás (producimos a pedido) y te enviaremos el seguimiento por email.
    </p>
</div>
```

### 1.2 Campos Identificados

| Campo | ID | Tipo | Requerido | Validación |
|--------|----|------|------------|-------------|
| Email | 1465946249 | email | Sí | HTML5 (type="email") |
| Nombre y Apellido | 1460904554 | text | Sí | HTML5 (required) |
| WhatsApp | 53830725 | tel | Sí | Validación personalizada (validateWhatsAppInline) |
| Calle y Número | 951592426 | text | Sí | HTML5 (required) |
| Código Postal | 1005165410 | text | Sí | HTML5 (required) |
| Localidad | 1743418466 | text | Sí | HTML5 (required) |
| Provincia | 59648134 | select | Sí | HTML5 (required) |
| DNI | 541001873 | text | Sí | HTML5 (required) |
| Forma de Pago | comoabona | select | Sí | HTML5 (required) |
| Resumen de Productos | 286442883 | text | No | Solo lectura (readonly) |

### 1.3 Atributos Clave y Estilos

- **Clases CSS principales**: `form-control`, `form-group`, `help-block`, `error-message`
- **Atributos de validación**: `required`, `type`, `placeholder`
- **Eventos JavaScript**: `onblur="validateWhatsAppInline()"`
- **Estilos inline**: Se utilizan estilos CSS externos principalmente

### 1.4 Scripts y Lógica JS Asociada

#### Validación de WhatsApp (líneas 3000-3123 en index.html)
```javascript
window.validateWhatsAppInline = async function() {
    // Formateo y validación del número de WhatsApp
    // Verificación con endpoint externo
    // Actualización visual de errores/éxito
};
```

#### Manejo del Formulario (form-handler.js)
- **Envío del formulario**: Líneas 132-1012
- **Validaciones**: Verificación de campos obligatorios, validación de WhatsApp
- **Procesamiento de pagos**: Diferentes flujos para tarjeta, MercadoPago, CBU y contrareembolso
- **Tracking de Facebook**: Eventos InitiateCheckout para cada método de pago
- **Redirección**: A diferentes páginas según el método de pago seleccionado

#### Gestión del Carrito (otono-elegante2.js)
- **Actualización del carrito**: Líneas 277-359
- **Sincronización de campos**: Líneas 214-235
- **Manejo de productos**: Líneas 622-659
- **Actualización de resúmenes**: Líneas 661-710

### 1.5 Lógica de Negocio Identificada

1. **Flujo de productos**: Los usuarios seleccionan productos y talles, que se agregan al carrito
2. **Validación de WhatsApp**: Se valida el formato y existencia del número de WhatsApp
3. **Procesamiento de pagos**: Diferentes flujos según el método seleccionado:
   - **Tarjeta/MercadoPago**: Redirección a MercadoPago
   - **CBU**: Redirección a página de transferencia bancaria
   - **Contrareembolso**: Procesamiento especial con redirección a páginas de gracias
4. **Tracking**: Eventos de Facebook Pixel para cada paso del proceso
5. **Confirmación**: Almacenamiento de datos del pedido y redirección

### 1.6 Flujo de Usuario

1. **Selección de productos**: Usuario elige modelos y talles
2. **Revisión del carrito**: Sistema muestra productos seleccionados y totales
3. **Continuación al envío**: Usuario hace clic en "Continuar al Envío"
4. **Completado de formulario**: Usuario completa datos personales y de envío
5. **Selección de pago**: Usuario elige método de pago
6. **Confirmación**: Usuario revisa datos y confirma pedido
7. **Procesamiento**: Sistema procesa según método de pago y redirige

### 1.7 Dependencias Externas

- **jQuery**: Utilizado para manipulación del DOM y manejo de eventos
- **Facebook Pixel**: Para tracking de conversiones
- **Endpoints externos**: Para validación de WhatsApp y procesamiento de pagos
- **Google Forms**: Como destino final de los datos del formulario

## 2. Identificación de Puntos de Mejora

### 2.1 Performance

#### Problemas Actuales:
1. **Múltiples librerías jQuery**: Se cargan jQuery, jQuery Form y jQuery UI
2. **Scripts bloqueantes**: Varios scripts se cargan en el head del documento
3. **Consultas DOM frecuentes**: Múltiples selecciones del mismo elemento sin caché
4. **Event listeners no optimizados**: Algunos eventos se agregan múltiples veces
5. **Imágenes sin optimización**: No se utilizan formatos modernos de imagen de forma consistente

#### Mejoras Propuestas:
1. **Eliminación de dependencias innecesarias**: Reemplazar jQuery con JavaScript vanilla
2. **Lazy loading de recursos**: Cargar scripts no críticos bajo demanda
3. **Optimización de consultas DOM**: Cachear elementos DOM utilizados frecuentemente
4. **Delegación de eventos**: Utilizar event delegation para manejar eventos dinámicos
5. **Optimización de imágenes**: Usar formatos WebP y lazy loading

### 2.2 UX (Experiencia de Usuario)

#### Problemas Actuales:
1. **Validación poco clara**: Los mensajes de error no siempre son específicos
2. **Falta de feedback inmediato**: Algunas acciones no tienen retroalimentación visual
3. **Formulario largo**: Todos los campos se muestran sin agrupación lógica
4. **Navegación confusa**: No hay indicadores claros de progreso
5. **Falta de autocompletado**: No se aprovecha el autocompletado del navegador

#### Mejoras Propuestas:
1. **Validación en tiempo real**: Feedback inmediato al completar campos
2. **Agrupación lógica**: Dividir el formulario en pasos con progreso claro
3. **Autocompletado**: Utilizar atributos HTML5 para autocompletar campos
4. **Indicadores visuales**: Estados claros para cada campo (válido, inválido, enfocado)
5. **Diseño mobile-first**: Optimizar para dispositivos móviles

### 2.3 Mantenibilidad

#### Problemas Actuales:
1. **Código "spaghetti"**: Lógica mezclada entre diferentes archivos
2. **Dependencias acopladas**: Cambios en un archivo afectan a otros
3. **Falta de modularidad**: No hay separación clara de responsabilidades
4. **Duplicación de código**: Lógica similar repetida en múltiples lugares
5. **Nombres inconsistentes**: Variables y funciones con nombres poco descriptivos

#### Mejoras Propuestas:
1. **Arquitectura modular**: Separar claramente responsabilidades
2. **Patrones de diseño**: Implementar patrones como Observer, Strategy
3. **Consistencia**: Nomenclatura consistente para variables y funciones
4. **Documentación**: Código bien documentado con ejemplos de uso
5. **Testing**: Unit tests para validar funcionalidad

## 3. Diseño de Arquitectura Modular para el Componente Astro

### 3.1 Estructura de Archivos Propuesta

```
src/
├── components/
│   ├── forms/
│   │   ├── PrePagoForm.astro          # Componente principal del formulario
│   │   ├── CampoForm.astro            # Subcomponente para campos individuales
│   │   ├── MensajeError.astro         # Subcomponente para mensajes de error
│   │   ├── ResumenPedido.astro        # Subcomponente para resumen del pedido
│   │   └── ProgresoFormulario.astro   # Subcomponente para indicadores de progreso
│   ├── cart/
│   │   ├── MiniCart.astro             # Componente del carrito (existente)
│   │   └── CartItem.astro            # Componente para items del carrito
│   └── ui/
│       ├── Button.astro                # Componente de botón reutilizable
│       ├── Input.astro                 # Componente de input reutilizable
│       └── Select.astro                # Componente de select reutilizable
├── lib/
│   ├── validaciones.ts                 # Lógica de validación
│   ├── formulario.ts                  # Gestión del estado del formulario
│   ├── pagos.ts                      # Lógica de procesamiento de pagos
│   └── tracking.ts                    # Lógica de tracking y analytics
├── types/
│   ├── form.ts                        # Tipos para el formulario
│   ├── cart.ts                        # Tipos para el carrito
│   └── api.ts                         # Tipos para respuestas de API
└── data/
    └── provincias.ts                  # Datos de provincias argentinas
```

### 3.2 Componente Principal: PrePagoForm.astro

```astro
---
// PrePagoForm.astro
import { useState, useEffect } from 'astro';
import CampoForm from './CampoForm.astro';
import MensajeError from './MensajeError.astro';
import ResumenPedido from './ResumenPedido.astro';
import ProgresoFormulario from './ProgresoFormulario.astro';
import { validarFormulario, procesarPago } from '../lib/formulario.ts';
import type { FormData, FormErrors, FormStep } from '../types/form.ts';

interface Props {
  carritoItems: CartItem[];
  onFormSubmit: (data: FormData) => Promise<void>;
}

const { carritoItems, onFormSubmit } = Astro.props;

// Estado del formulario
const [formData, setFormData] = useState<FormData>({
  email: '',
  nombre: '',
  whatsapp: '',
  direccion: '',
  codigoPostal: '',
  localidad: '',
  provincia: '',
  dni: '',
  formaPago: ''
});

const [formErrors, setFormErrors] = useState<FormErrors>({});
const [currentStep, setCurrentStep] = useState<FormStep>(1);
const [isSubmitting, setIsSubmitting] = useState(false);

// Manejo de cambios en los campos
const handleFieldChange = (field: string, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
  
  // Validar campo en tiempo real
  const fieldErrors = validarCampo(field, value);
  setFormErrors(prev => ({ ...prev, [field]: fieldErrors }));
};

// Manejo del envío del formulario
const handleSubmit = async (e: Event) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    // Validar formulario completo
    const errors = validarFormulario(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }
    
    // Procesar pago
    await onFormSubmit(formData);
  } catch (error) {
    console.error('Error al procesar formulario:', error);
    setFormErrors({ general: 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.' });
  } finally {
    setIsSubmitting(false);
  }
};

// Avanzar al siguiente paso
const nextStep = () => {
  const errors = validarPaso(currentStep, formData);
  if (Object.keys(errors).length === 0) {
    setCurrentStep(prev => prev + 1);
  } else {
    setFormErrors(errors);
  }
};

// Retroceder al paso anterior
const prevStep = () => {
  setCurrentStep(prev => Math.max(1, prev - 1));
};
---

<section class="pre-pago-form">
  <ProgresoFormulario currentStep={currentStep} totalSteps={3} />
  
  <form onSubmit={handleSubmit} novalidate>
    {currentStep === 1 && (
      <div class="form-step">
        <h2>Información de Contacto</h2>
        
        <CampoForm
          id="email"
          label="Email"
          type="email"
          placeholder="tuemail@ejemplo.com"
          value={formData.email}
          onChange={(value) => handleFieldChange('email', value)}
          error={formErrors.email}
          required
        />
        
        <CampoForm
          id="nombre"
          label="Nombre y Apellido"
          type="text"
          placeholder="Quien recibe el pedido"
          value={formData.nombre}
          onChange={(value) => handleFieldChange('nombre', value)}
          error={formErrors.nombre}
          required
        />
        
        <CampoForm
          id="whatsapp"
          label="WhatsApp"
          type="tel"
          placeholder="Ej: 1156457057 (sin 0 ni 15)"
          value={formData.whatsapp}
          onChange={(value) => handleFieldChange('whatsapp', value)}
          error={formErrors.whatsapp}
          required
          validation="whatsapp"
        />
        
        <div class="form-actions">
          <Button type="button" onClick={nextStep} disabled={!isStepValid(currentStep, formData)}>
            Continuar
          </Button>
        </div>
      </div>
    )}
    
    {currentStep === 2 && (
      <div class="form-step">
        <h2>Dirección de Envío</h2>
        
        <CampoForm
          id="direccion"
          label="Calle y Número (Piso/Dpto)"
          type="text"
          placeholder="Ej: Av. Siempreviva 742, 3B"
          value={formData.direccion}
          onChange={(value) => handleFieldChange('direccion', value)}
          error={formErrors.direccion}
          required
        />
        
        <CampoForm
          id="codigoPostal"
          label="Código Postal"
          type="text"
          placeholder="Ej: 1425"
          value={formData.codigoPostal}
          onChange={(value) => handleFieldChange('codigoPostal', value)}
          error={formErrors.codigoPostal}
          required
        />
        
        <CampoForm
          id="localidad"
          label="Localidad"
          type="text"
          placeholder="Ej: Palermo"
          value={formData.localidad}
          onChange={(value) => handleFieldChange('localidad', value)}
          error={formErrors.localidad}
          required
        />
        
        <CampoForm
          id="provincia"
          label="Provincia"
          type="select"
          value={formData.provincia}
          onChange={(value) => handleFieldChange('provincia', value)}
          error={formErrors.provincia}
          required
          options={provinciasArgentina}
        />
        
        <CampoForm
          id="dni"
          label="DNI"
          type="text"
          placeholder="Del titular de la tarjeta o quien recibe"
          value={formData.dni}
          onChange={(value) => handleFieldChange('dni', value)}
          error={formErrors.dni}
          required
        />
        
        <div class="form-actions">
          <Button type="button" variant="secondary" onClick={prevStep}>
            Anterior
          </Button>
          <Button type="button" onClick={nextStep} disabled={!isStepValid(currentStep, formData)}>
            Continuar
          </Button>
        </div>
      </div>
    )}
    
    {currentStep === 3 && (
      <div class="form-step">
        <h2>Revisa tu Pedido y Datos</h2>
        
        <ResumenPedido
          carritoItems={carritoItems}
          formData={formData}
        />
        
        <CampoForm
          id="formaPago"
          label="¿Cómo prefieres abonar?"
          type="select"
          value={formData.formaPago}
          onChange={(value) => handleFieldChange('formaPago', value)}
          error={formErrors.formaPago}
          required
          options={[
            { value: 'tarjeta', label: '💳 Tarjeta de Crédito/Débito (¡3 Cuotas sin interés!)' },
            { value: 'mercadopago', label: '💲 Saldo en cuenta MercadoPago' },
            { value: 'cbu', label: '🏦 Transferencia Bancaria (¡Con 10% OFF adicional!)' }
          ]}
        />
        
        <MensajeError error={formErrors.general} />
        
        <div class="form-actions">
          <Button type="button" variant="secondary" onClick={prevStep}>
            Anterior
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Procesando...' : 'Confirmar y Pagar 🛒'}
          </Button>
        </div>
      </div>
    )}
  </form>
</section>

<style>
  .pre-pago-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .form-step {
    margin-bottom: 2rem;
  }
  
  .form-step h2 {
    margin-bottom: 1.5rem;
    color: #2c1810;
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    gap: 1rem;
  }
  
  @media (max-width: 768px) {
    .pre-pago-form {
      padding: 1rem;
    }
    
    .form-actions {
      flex-direction: column;
    }
  }
</style>
```

### 3.3 Subcomponentes

#### CampoForm.astro
```astro
---
// CampoForm.astro
import MensajeError from './MensajeError.astro';

interface Props {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  validation?: string;
  options?: Array<{ value: string; label: string }>;
}

const { id, label, type, placeholder, value, onChange, error, required, validation, options } = Astro.props;

const handleInputChange = (e: Event) => {
  const target = e.target as HTMLInputElement | HTMLSelectElement;
  onChange?.(target.value);
};
---

<div class="form-group {error ? 'has-error' : ''}">
  <label for={id}>
    {label}
    {required && <span class="required">*</span>}
  </label>
  
  {type === 'select' ? (
    <select
      id={id}
      name={id}
      value={value}
      onChange={handleInputChange}
      required={required}
      class="form-control"
    >
      <option value="">-- Selecciona una opción --</option>
      {options?.map(option => (
        <option value={option.value}>{option.label}</option>
      ))}
    </select>
  ) : (
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleInputChange}
      required={required}
      class="form-control"
      autocomplete={getAutocompleteType(id)}
    />
  )}
  
  <MensajeError error={error} />
  
  {validation === 'whatsapp' && (
    <p class="help-block">El formato de WhatsApp debe ser sin 0 ni 15.</p>
  )}
</div>

<style>
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #2c1810;
  }
  
  .form-control {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }
  
  .form-control:focus {
    outline: none;
    border-color: #a05941;
    box-shadow: 0 0 0 2px rgba(160, 89, 65, 0.2);
  }
  
  .has-error .form-control {
    border-color: #e74c3c;
  }
  
  .required {
    color: #e74c3c;
  }
  
  .help-block {
    font-size: 0.8rem;
    color: #666;
    margin-top: 0.25rem;
  }
</style>
```

#### MensajeError.astro
```astro
---
// MensajeError.astro
interface Props {
  error?: string;
}

const { error } = Astro.props;
---

{error && (
  <div class="error-message">
    {error}
  </div>
)}

<style>
  .error-message {
    color: #e74c3c;
    font-size: 0.85rem;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
  }
  
  .error-message::before {
    content: "⚠️";
    margin-right: 0.5rem;
  }
</style>
```

### 3.4 State Management

#### formulario.ts
```typescript
// src/lib/formulario.ts
import type { FormData, FormErrors, FormStep } from '../types/form.ts';
import { validarCampo, validarFormulario, validarPaso } from './validaciones.ts';
import { procesarPagoTarjeta, procesarPagoCBU, procesarPagoMercadoPago } from './pagos.ts';
import { trackFormStep, trackFormSubmit } from './tracking.ts';

// Estado global del formulario
let formState: {
  data: FormData;
  errors: FormErrors;
  currentStep: FormStep;
  isSubmitting: boolean;
} = {
  data: {
    email: '',
    nombre: '',
    whatsapp: '',
    direccion: '',
    codigoPostal: '',
    localidad: '',
    provincia: '',
    dni: '',
    formaPago: ''
  },
  errors: {},
  currentStep: 1,
  isSubmitting: false
};

// Observadores del estado
const observers: Array<(state: typeof formState) => void> = [];

// Función para actualizar el estado
export const updateFormState = (updates: Partial<typeof formState>) => {
  formState = { ...formState, ...updates };
  
  // Notificar a todos los observadores
  observers.forEach(observer => observer(formState));
  
  // Tracking de cambios
  if (updates.currentStep) {
    trackFormStep(updates.currentStep);
  }
};

// Función para obtener el estado actual
export const getFormState = () => formState;

// Función para suscribirse a cambios en el estado
export const subscribeToFormState = (observer: (state: typeof formState) => void) => {
  observers.push(observer);
  
  // Devolver función para cancelar suscripción
  return () => {
    const index = observers.indexOf(observer);
    if (index > -1) {
      observers.splice(index, 1);
    }
  };
};

// Función para actualizar un campo específico
export const updateFormField = (field: keyof FormData, value: string) => {
  const newData = { ...formState.data, [field]: value };
  const fieldErrors = validarCampo(field, value);
  const newErrors = { ...formState.errors, [field]: fieldErrors };
  
  updateFormState({
    data: newData,
    errors: newErrors
  });
};

// Función para validar el paso actual
export const validateCurrentStep = () => {
  const errors = validarPaso(formState.currentStep, formState.data);
  updateFormState({ errors });
  
  return Object.keys(errors).length === 0;
};

// Función para avanzar al siguiente paso
export const nextStep = () => {
  if (validateCurrentStep()) {
    const nextStepValue = Math.min(formState.currentStep + 1, 3);
    updateFormState({ currentStep: nextStepValue });
  }
};

// Función para retroceder al paso anterior
export const prevStep = () => {
  const prevStepValue = Math.max(1, formState.currentStep - 1);
  updateFormState({ currentStep: prevStepValue });
};

// Función para enviar el formulario
export const submitForm = async (carritoItems: CartItem[]) => {
  updateFormState({ isSubmitting: true });
  
  try {
    // Validar formulario completo
    const errors = validarFormulario(formState.data);
    if (Object.keys(errors).length > 0) {
      updateFormState({ errors, isSubmitting: false });
      return { success: false, errors };
    }
    
    // Tracking del envío
    trackFormSubmit(formState.data, carritoItems);
    
    // Procesar según método de pago
    let result;
    switch (formState.data.formaPago) {
      case 'tarjeta':
      case 'mercadopago':
        result = await procesarPagoTarjeta(formState.data, carritoItems);
        break;
      case 'cbu':
        result = await procesarPagoCBU(formState.data, carritoItems);
        break;
      default:
        throw new Error('Método de pago no válido');
    }
    
    return result;
  } catch (error) {
    console.error('Error al enviar formulario:', error);
    updateFormState({ 
      errors: { general: 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.' },
      isSubmitting: false 
    });
    
    return { success: false, errors: { general: 'Ocurrió un error inesperado.' } };
  }
};
```

### 3.5 Validaciones

#### validaciones.ts
```typescript
// src/lib/validaciones.ts
import type { FormData, FormErrors, FormStep } from '../types/form.ts';

// Validación de email
export const validarEmail = (email: string): string | null => {
  if (!email) return 'El email es requerido';
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'El formato del email no es válido';
  }
  
  return null;
};

// Validación de WhatsApp
export const validarWhatsApp = async (whatsapp: string): Promise<string | null> => {
  if (!whatsapp) return 'El WhatsApp es requerido';
  
  // Formatear número
  let formattedNumber = whatsapp.replace(/[\s\-()]/g, '');
  if (formattedNumber.startsWith('+54')) formattedNumber = formattedNumber.substring(3);
  if (formattedNumber.startsWith('54')) formattedNumber = formattedNumber.substring(2);
  if (formattedNumber.startsWith('0')) formattedNumber = formattedNumber.substring(1);
  if (formattedNumber.length > 2 && formattedNumber.substring(2, 4) === '15') {
    formattedNumber = formattedNumber.substring(0, 2) + formattedNumber.substring(4);
  }
  
  if (!/^\d+$/.test(formattedNumber)) {
    return 'El WhatsApp debe contener solo números';
  }
  
  if (formattedNumber.length < 10) {
    return 'El WhatsApp debe tener al menos 10 dígitos';
  }
  
  // Verificar con API externa
  try {
    const response = await fetch('https://sswebhookss.odontolab.co/webhook/02eb0643-1b9d-4866-87a7-f892d6a945ea', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ whatsapp_check: '549' + formattedNumber })
    });
    
    const data = await response.json();
    
    if (!data.exists) {
      return 'El número de WhatsApp no es válido';
    }
    
    return null;
  } catch (error) {
    console.error('Error validando WhatsApp:', error);
    return 'No se pudo validar el WhatsApp. Intenta nuevamente.';
  }
};

// Validación de campos requeridos
export const validarCampoRequerido = (valor: string, nombreCampo: string): string | null => {
  if (!valor || valor.trim() === '') {
    return `El campo ${nombreCampo} es requerido`;
  }
  
  return null;
};

// Validación de un campo específico
export const validarCampo = async (campo: keyof FormData, valor: string): Promise<string> => {
  switch (campo) {
    case 'email':
      return validarEmail(valor) || '';
    case 'whatsapp':
      return await validarWhatsApp(valor) || '';
    case 'nombre':
    case 'direccion':
    case 'localidad':
    case 'dni':
      return validarCampoRequerido(valor, campo) || '';
    case 'codigoPostal':
      return validarCampoRequerido(valor, 'código postal') || '';
    case 'provincia':
      return validarCampoRequerido(valor, 'provincia') || '';
    case 'formaPago':
      return validarCampoRequerido(valor, 'forma de pago') || '';
    default:
      return '';
  }
};

// Validación de un paso completo
export const validarPaso = async (paso: FormStep, data: FormData): Promise<FormErrors> => {
  const errors: FormErrors = {};
  
  switch (paso) {
    case 1:
      // Validar campos de contacto
      errors.email = await validarCampo('email', data.email);
      errors.nombre = await validarCampo('nombre', data.nombre);
      errors.whatsapp = await validarCampo('whatsapp', data.whatsapp);
      break;
    case 2:
      // Validar campos de envío
      errors.direccion = await validarCampo('direccion', data.direccion);
      errors.codigoPostal = await validarCampo('codigoPostal', data.codigoPostal);
      errors.localidad = await validarCampo('localidad', data.localidad);
      errors.provincia = await validarCampo('provincia', data.provincia);
      errors.dni = await validarCampo('dni', data.dni);
      break;
    case 3:
      // Validar forma de pago
      errors.formaPago = await validarCampo('formaPago', data.formaPago);
      break;
  }
  
  // Filtrar errores vacíos
  return Object.fromEntries(
    Object.entries(errors).filter(([_, value]) => value !== '')
  ) as FormErrors;
};

// Validación del formulario completo
export const validarFormulario = async (data: FormData): Promise<FormErrors> => {
  const errors: FormErrors = {};
  
  // Validar todos los campos
  for (const campo in data) {
    const error = await validarCampo(campo as keyof FormData, data[campo as keyof FormData]);
    if (error) {
      errors[campo as keyof FormData] = error;
    }
  }
  
  return errors;
};
```

### 3.6 Estilado

#### Estrategia con Tailwind CSS
```css
/* src/styles/components/form.css */
.form-container {
  @apply max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg;
}

.form-group {
  @apply mb-6;
}

.form-label {
  @apply block mb-2 font-semibold text-gray-800;
}

.form-input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}

.form-input.error {
  @apply border-red-500 focus:ring-red-500;
}

.form-error {
  @apply mt-1 text-sm text-red-600 flex items-center;
}

.form-error::before {
  content: "⚠️";
  @apply mr-2;
}

.form-button {
  @apply px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}

.form-button:disabled {
  @apply bg-gray-400 cursor-not-allowed;
}

.form-button.secondary {
  @apply bg-gray-200 text-gray-800 hover:bg-gray-300;
}

.progress-step {
  @apply flex items-center;
}

.progress-step.active .step-number {
  @apply bg-blue-600 text-white;
}

.progress-step.completed .step-number {
  @apply bg-green-600 text-white;
}

.step-number {
  @apply w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-semibold mr-2;
}

@media (max-width: 768px) {
  .form-container {
    @apply p-4;
  }
  
  .form-actions {
    @apply flex-col gap-2;
  }
}
```

### 3.7 Performance

#### Optimizaciones Implementadas
1. **Lazy loading de componentes**: Cargar componentes solo cuando se necesitan
2. **Memoización de validaciones**: Cachear resultados de validaciones costosas
3. **Delegación de eventos**: Reducir el número de event listeners
4. **Optimización de imágenes**: Usar formato WebP y lazy loading
5. **Minificación de CSS/JS**: Reducir tamaño de archivos

#### Ejemplo de optimización con lazy loading
```astro
---
// PrePagoForm.astro
import { lazy } from 'astro';

// Cargar componentes pesados solo cuando se necesitan
const ResumenPedido = lazy(() => import('./ResumenPedido.astro'));
const ProgresoFormulario = lazy(() => import('./ProgresoFormulario.astro'));
---

<section class="pre-pago-form">
  <ProgresoFormulario client:load currentStep={currentStep} totalSteps={3} />
  
  <form onSubmit={handleSubmit} novalidate>
    {/* Campos del formulario */}
    
    {currentStep === 3 && (
      <ResumenPedido client:load 
        carritoItems={carritoItems} 
        formData={formData} 
      />
    )}
  </form>
</section>
```

### 3.8 Accesibilidad (WCAG 2.1 AA)

#### Mejoras Implementadas
1. **Etiquetas semánticas**: Uso correcto de `<label>`, `<fieldset>`, `<legend>`
2. **Atributos ARIA**: `aria-describedby`, `aria-invalid`, `aria-live`
3. **Navegación por teclado**: Tab order lógico y foco visible
4. **Contraste de colores**: Cumplimiento con ratios WCAG
5. **Notificaciones de error**: No solo por color, sino también por texto e iconos

#### Ejemplo de campo accesible
```astro
<div class="form-group">
  <label for="email" id="email-label">
    Email
    <span class="required" aria-label="requerido">*</span>
  </label>
  
  <input
    id="email"
    name="email"
    type="email"
    placeholder="tuemail@ejemplo.com"
    required
    aria-required="true"
    aria-describedby="email-help email-error"
    aria-invalid={!!errors.email}
    class="form-control"
  />
  
  <div id="email-help" class="help-text">
    Para enviarte la confirmación y el seguimiento de tu pedido.
  </div>
  
  {errors.email && (
    <div id="email-error" class="error-message" role="alert" aria-live="polite">
      {errors.email}
    </div>
  )}
</div>
```

## 4. Estrategia de Integración con el Embudo de Pago

### 4.1 Comunicación con el Carrito

#### Estrategia de State Management
```typescript
// src/lib/carrito.ts
import type { CartItem, CartState } from '../types/cart.ts';

// Estado del carrito
let cartState: CartState = {
  items: [],
  total: 0,
  isOpen: false
};

// Observadores del estado del carrito
const cartObservers: Array<(state: CartState) => void> = [];

// Función para actualizar el estado del carrito
export const updateCartState = (updates: Partial<CartState>) => {
  cartState = { ...cartState, ...updates };
  
  // Notificar a todos los observadores
  cartObservers.forEach(observer => observer(cartState));
  
  // Guardar en localStorage para persistencia
  localStorage.setItem('cart', JSON.stringify(cartState));
};

// Función para obtener el estado actual del carrito
export const getCartState = () => cartState;

// Función para suscribirse a cambios en el carrito
export const subscribeToCart = (observer: (state: CartState) => void) => {
  cartObservers.push(observer);
  
  // Devolver función para cancelar suscripción
  return () => {
    const index = cartObservers.indexOf(observer);
    if (index > -1) {
      cartObservers.splice(index, 1);
    }
  };
};

// Función para agregar un item al carrito
export const addToCart = (item: CartItem) => {
  const newItems = [...cartState.items, item];
  const newTotal = calculateTotal(newItems);
  
  updateCartState({
    items: newItems,
    total: newTotal
  });
  
  // Tracking
  trackAddToCart(item);
};

// Función para remover un item del carrito
export const removeFromCart = (itemId: string) => {
  const newItems = cartState.items.filter(item => item.id !== itemId);
  const newTotal = calculateTotal(newItems);
  
  updateCartState({
    items: newItems,
    total: newTotal
  });
  
  // Tracking
  trackRemoveFromCart(itemId);
};

// Función para calcular el total del carrito
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price, 0);
};
```

#### Integración con el Formulario
```astro
---
// PrePagoForm.astro
import { useState, useEffect } from 'astro';
import { getCartState, subscribeToCart } from '../lib/carrito.ts';

// Estado del carrito
const [cartState, setCartState] = useState(getCartState());

// Suscribirse a cambios en el carrito
useEffect(() => {
  const unsubscribe = subscribeToCart(setCartState);
  
  return unsubscribe;
}, []);
---

<section class="pre-pago-form">
  <ResumenPedido
    carritoItems={cartState.items}
    total={cartState.total}
  />
  
  {/* Resto del formulario */}
</section>
```

### 4.2 Flujo de Datos entre Componentes

#### Event-driven Architecture
```typescript
// src/lib/eventBus.ts
type EventHandler = (data: any) => void;

class EventBus {
  private events: Record<string, EventHandler[]> = {};
  
  // Suscribirse a un evento
  on(eventName: string, handler: EventHandler) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    
    this.events[eventName].push(handler);
  }
  
  // Cancelar suscripción a un evento
  off(eventName: string, handler: EventHandler) {
    if (!this.events[eventName]) return;
    
    const index = this.events[eventName].indexOf(handler);
    if (index > -1) {
      this.events[eventName].splice(index, 1);
    }
  }
  
  // Emitir un evento
  emit(eventName: string, data?: any) {
    if (!this.events[eventName]) return;
    
    this.events[eventName].forEach(handler => {
      handler(data);
    });
  }
}

// Instancia global del bus de eventos
export const eventBus = new EventBus();
```

#### Uso del EventBus para comunicación
```typescript
// En el componente del carrito
import { eventBus } from '../lib/eventBus.ts';

// Al agregar un item al carrito
const handleAddToCart = (item: CartItem) => {
  addToCart(item);
  
  // Emitir evento de actualización del carrito
  eventBus.emit('cart:updated', getCartState());
};

// En el componente del formulario
import { eventBus } from '../lib/eventBus.ts';

// Suscribirse a cambios en el carrito
eventBus.on('cart:updated', (cartState: CartState) => {
  // Actualizar el resumen del pedido
  updateOrderSummary(cartState);
});
```

### 4.3 Estrategia de Pago

#### Arquitectura de Pagos
```typescript
// src/lib/pagos.ts
import type { FormData, CartItem, PaymentResult } from '../types/form.ts';

// Procesador de pagos
export class PaymentProcessor {
  // Procesar pago con tarjeta/MercadoPago
  static async procesarTarjeta(formData: FormData, cartItems: CartItem[]): Promise<PaymentResult> {
    try {
      // Tracking
      trackInitiateCheckout('tarjeta', formData, cartItems);
      
      // Generar link de pago
      const paymentLink = await generarLinkMercadoPago(formData, cartItems);
      
      // Guardar datos del pedido
      await guardarDatosPedido(formData, cartItems, 'tarjeta');
      
      return {
        success: true,
        redirectUrl: paymentLink
      };
    } catch (error) {
      console.error('Error procesando pago con tarjeta:', error);
      return {
        success: false,
        error: 'No se pudo procesar el pago. Por favor, inténtalo nuevamente.'
      };
    }
  }
  
  // Procesar pago con transferencia bancaria
  static async procesarCBU(formData: FormData, cartItems: CartItem[]): Promise<PaymentResult> {
    try {
      // Tracking
      trackInitiateCheckout('cbu', formData, cartItems);
      
      // Guardar datos del pedido
      await guardarDatosPedido(formData, cartItems, 'cbu');
      
      return {
        success: true,
        redirectUrl: '/transferencia-cbu'
      };
    } catch (error) {
      console.error('Error procesando pago con CBU:', error);
      return {
        success: false,
        error: 'No se pudo procesar el pago. Por favor, inténtalo nuevamente.'
      };
    }
  }
}

// Generar link de pago de MercadoPago
const generarLinkMercadoPago = async (formData: FormData, cartItems: CartItem[]): Promise<string> => {
  const total = calcularTotal(cartItems);
  
  const response = await fetch('https://sswebhookss.odontolab.co/webhook/addaa0c8-96b1-4d63-b2c0-991d6be3de30', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      comprador: formData.nombre,
      monto: total,
      fbp: getCookie('_fbp')
    })
  });
  
  const data = await response.json();
  return data.linkpersonalizadomp;
};

// Guardar datos del pedido
const guardarDatosPedido = async (formData: FormData, cartItems: CartItem[], metodoPago: string): Promise<void> => {
  const pedidoData = {
    ...formData,
    items: cartItems,
    metodoPago,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    ip: await getClientIP()
  };
  
  await fetch('https://sswebhookss.odontolab.co/webhook/a5dcd3c9-48a3-46a1-a781-475737a634ca', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pedidoData)
  });
};
```

### 4.4 Manejo de Errores y Estados de Carga

#### Estrategia de Manejo de Errores
```typescript
// src/lib/errores.ts
export class ErrorHandler {
  // Manejar errores de formulario
  static handleFormError(error: Error, context: string): void {
    console.error(`Error en formulario [${context}]:`, error);
    
    // Tracking de errores
    trackFormError(error, context);
    
    // Mostrar mensaje al usuario
    showNotification('Ocurrió un error inesperado. Por favor, inténtalo nuevamente.', 'error');
  }
  
  // Manejar errores de pago
  static handlePaymentError(error: Error, metodoPago: string): void {
    console.error(`Error en pago [${metodoPago}]:`, error);
    
    // Tracking de errores
    trackPaymentError(error, metodoPago);
    
    // Mostrar mensaje específico según el método de pago
    let errorMessage = 'Ocurrió un error al procesar el pago.';
    
    if (metodoPago === 'tarjeta' || metodoPago === 'mercadopago') {
      errorMessage += ' Por favor, verifica tus datos e inténtalo nuevamente.';
    } else if (metodoPago === 'cbu') {
      errorMessage += ' Por favor, verifica los datos de transferencia e inténtalo nuevamente.';
    }
    
    showNotification(errorMessage, 'error');
  }
  
  // Manejar errores de red
  static handleNetworkError(error: Error, context: string): void {
    console.error(`Error de red [${context}]:`, error);
    
    // Tracking de errores
    trackNetworkError(error, context);
    
    // Mostrar mensaje al usuario
    showNotification('Error de conexión. Por favor, verifica tu conexión a internet e inténtalo nuevamente.', 'error');
  }
}
```

#### Estados de Carga
```typescript
// src/lib/estadosCarga.ts
export class LoadingManager {
  private static loadingStates: Record<string, boolean> = {};
  
  // Iniciar estado de carga
  static startLoading(context: string): void {
    LoadingManager.loadingStates[context] = true;
    
    // Mostrar indicador de carga
    showLoadingIndicator(context);
    
    // Deshabilitar botones relevantes
    disableButtons(context);
  }
  
  // Finalizar estado de carga
  static stopLoading(context: string): void {
    LoadingManager.loadingStates[context] = false;
    
    // Ocultar indicador de carga
    hideLoadingIndicator(context);
    
    // Habilitar botones relevantes
    enableButtons(context);
  }
  
  // Verificar si hay una carga en progreso
  static isLoading(context?: string): boolean {
    if (context) {
      return LoadingManager.loadingStates[context] || false;
    }
    
    return Object.values(LoadingManager.loadingStates).some(state => state);
  }
}

// Mostrar indicador de carga
const showLoadingIndicator = (context: string): void => {
  const indicator = document.getElementById(`loading-${context}`);
  if (indicator) {
    indicator.style.display = 'block';
  }
};

// Ocultar indicador de carga
const hideLoadingIndicator = (context: string): void => {
  const indicator = document.getElementById(`loading-${context}`);
  if (indicator) {
    indicator.style.display = 'none';
  }
};

// Deshabilitar botones
const disableButtons = (context: string): void => {
  const buttons = document.querySelectorAll(`[data-loading-context="${context}"]`);
  buttons.forEach(button => {
    (button as HTMLButtonElement).disabled = true;
  });
};

// Habilitar botones
const enableButtons = (context: string): void => {
  const buttons = document.querySelectorAll(`[data-loading-context="${context}"]`);
  buttons.forEach(button => {
    (button as HTMLButtonElement).disabled = false;
  });
};
```

## 5. Plan de Documentación y Extensibilidad

### 5.1 Documentación Propuesta

#### Estructura de Documentación
```
docs/
├── components/
│   ├── PrePagoForm.md              # Documentación del componente principal
│   ├── CampoForm.md               # Documentación del subcomponente de campos
│   ├── ResumenPedido.md           # Documentación del subcomponente de resumen
│   └── ProgresoFormulario.md      # Documentación del subcomponente de progreso
├── lib/
│   ├── validaciones.md             # Documentación de validaciones
│   ├── formulario.md               # Documentación de gestión del formulario
│   ├── pagos.md                  # Documentación de procesamiento de pagos
│   └── tracking.md                # Documentación de tracking y analytics
├── guides/
│   ├── integracion-formulario.md   # Guía de integración del formulario
│   ├── personalizacion-campos.md   # Guía de personalización de campos
│   ├── metodos-pago.md           # Guía de métodos de pago
│   └── testing.md                 # Guía de testing del formulario
└── examples/
    ├── formulario-basico.md       # Ejemplo de formulario básico
    ├── formulario-avanzado.md     # Ejemplo de formulario avanzado
    └── integracion-carrito.md     # Ejemplo de integración con carrito
```

#### Contenido de la Documentación
```markdown
# PrePagoForm Component

## Descripción
El componente `PrePagoForm` es un formulario multi-paso para la recolección de datos de contacto, envío y pago en el proceso de checkout de Rosita Rococó.

## Propiedades
| Propiedad | Tipo | Descripción | Valor por Defecto |
|-----------|------|-------------|-------------------|
| carritoItems | `CartItem[]` | Array de items del carrito | `[]` |
| onFormSubmit | `(data: FormData) => Promise<void>` | Función callback para el envío del formulario | `() => {}` |
| initialStep | `number` | Paso inicial del formulario | `1` |
| showProgress | `boolean` | Mostrar indicador de progreso | `true` |

## Eventos
| Evento | Descripción | Payload |
|--------|-------------|---------|
| stepChange | Se dispara cuando cambia el paso del formulario | `{ from: number, to: number }` |
| fieldChange | Se dispara cuando cambia el valor de un campo | `{ field: string, value: string }` |
| validationError | Se dispara cuando hay un error de validación | `{ field: string, error: string }` |

## Ejemplo de Uso
```astro
---
import PrePagoForm from '../components/forms/PrePagoForm.astro';
import { submitForm } from '../lib/formulario.ts';

const handleSubmit = async (formData) => {
  const result = await submitForm(formData, cartItems);
  
  if (result.success) {
    // Redirigir a página de éxito
    window.location.href = result.redirectUrl;
  } else {
    // Mostrar error
    showNotification(result.error, 'error');
  }
};
---

<PrePagoForm 
  carritoItems={cartItems} 
  onFormSubmit={handleSubmit} 
/>
```

## Personalización
El componente puede ser personalizado mediante las siguientes propiedades:

### Tema
```astro
<PrePagoForm 
  carritoItems={cartItems} 
  onFormSubmit={handleSubmit}
  theme="dark" 
/>
```

### Campos Personalizados
```astro
<PrePagoForm 
  carritoItems={cartItems} 
  onFormSubmit={handleSubmit}
  customFields={[
    {
      id: 'referido',
      label: 'Código de Referido',
      type: 'text',
      placeholder: 'Opcional',
      required: false
    }
  ]}
/>
```

## Accesibilidad
El componente cumple con los estándares WCAG 2.1 AA:
- Uso correcto de etiquetas semánticas
- Navegación por teclado completa
- Contraste de colores adecuado
- Lectores de pantalla compatibles

## Testing
Para probar el componente, ejecuta:
```bash
npm run test:components PrePagoForm
```

## Troubleshooting
### Problemas Comunes
1. **Validación de WhatsApp no funciona**: Verificar que el endpoint de validación esté accesible
2. **El formulario no envía**: Verificar que todos los campos requeridos estén completos
3. **Error de red**: Verificar la conexión a internet y el estado de los endpoints

### Debug Mode
Para activar el modo de debug:
```astro
<PrePagoForm 
  carritoItems={cartItems} 
  onFormSubmit={handleSubmit}
  debug={true} 
/>
```
```

### 5.2 Puntos de Extensibilidad

#### Arquitectura de Plugins
```typescript
// src/lib/plugins.ts
export interface FormPlugin {
  name: string;
  version: string;
  init: (form: HTMLElement) => void;
  destroy: () => void;
}

export class PluginManager {
  private plugins: FormPlugin[] = [];
  
  // Registrar un plugin
  static register(plugin: FormPlugin): void {
    this.plugins.push(plugin);
    
    // Inicializar el plugin
    const form = document.getElementById('pre-pago-form');
    if (form) {
      plugin.init(form);
    }
  }
  
  // Desregistrar un plugin
  static unregister(pluginName: string): void {
    const index = this.plugins.findIndex(p => p.name === pluginName);
    if (index > -1) {
      const plugin = this.plugins[index];
      
      // Destruir el plugin
      plugin.destroy();
      
      // Remover de la lista
      this.plugins.splice(index, 1);
    }
  }
  
  // Obtener plugins registrados
  static getPlugins(): FormPlugin[] {
    return [...this.plugins];
  }
}
```

#### Ejemplo de Plugin: Validador de CUIT
```typescript
// src/plugins/cuitValidator.ts
import { FormPlugin } from '../lib/plugins';

export class CUITValidatorPlugin implements FormPlugin {
  name = 'cuit-validator';
  version = '1.0.0';
  
  init(form: HTMLElement): void {
    // Agregar campo de CUIT al formulario
    const cuitField = document.createElement('input');
    cuitField.id = 'cuit';
    cuitField.name = 'cuit';
    cuitField.type = 'text';
    cuitField.placeholder = 'CUIT (opcional)';
    cuitField.className = 'form-control';
    
    // Agregar después del campo de DNI
    const dniField = document.getElementById('dni');
    if (dniField && dniField.parentNode) {
      dniField.parentNode.insertBefore(cuitField, dniField.nextSibling);
    }
    
    // Agregar validación
    cuitField.addEventListener('blur', this.validateCUIT.bind(this));
  }
  
  destroy(): void {
    // Remover campo de CUIT
    const cuitField = document.getElementById('cuit');
    if (cuitField && cuitField.parentNode) {
      cuitField.parentNode.removeChild(cuitField);
    }
  }
  
  private validateCUIT(event: Event): void {
    const target = event.target as HTMLInputElement;
    const cuit = target.value;
    
    // Validar formato de CUIT
    const cuitRegex = /^\d{2}-\d{8}-\d{1}$/;
    if (cuit && !cuitRegex.test(cuit)) {
      target.setCustomValidity('El formato del CUIT no es válido (XX-XXXXXXXX-X)');
    } else {
      target.setCustomValidity('');
    }
    
    // Reportar validez
    target.reportValidity();
  }
}

// Registrar el plugin
PluginManager.register(new CUITValidatorPlugin());
```

#### Sistema de Temas
```typescript
// src/lib/themes.ts
export interface FormTheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    error: string;
    success: string;
    background: string;
    text: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
}

export class ThemeManager {
  private static currentTheme: FormTheme;
  
  // Establecer tema
  static setTheme(theme: FormTheme): void {
    this.currentTheme = theme;
    
    // Aplicar variables CSS personalizadas
    this.applyCSSVariables(theme);
    
    // Guardar en localStorage
    localStorage.setItem('form-theme', JSON.stringify(theme));
  }
  
  // Obtener tema actual
  static getCurrentTheme(): FormTheme {
    return this.currentTheme;
  }
  
  // Aplicar variables CSS
  private static applyCSSVariables(theme: FormTheme): void {
    const root = document.documentElement;
    
    root.style.setProperty('--form-primary-color', theme.colors.primary);
    root.style.setProperty('--form-secondary-color', theme.colors.secondary);
    root.style.setProperty('--form-error-color', theme.colors.error);
    root.style.setProperty('--form-success-color', theme.colors.success);
    root.style.setProperty('--form-background-color', theme.colors.background);
    root.style.setProperty('--form-text-color', theme.colors.text);
    
    root.style.setProperty('--form-primary-font', theme.fonts.primary);
    root.style.setProperty('--form-secondary-font', theme.fonts.secondary);
    
    root.style.setProperty('--form-spacing-small', theme.spacing.small);
    root.style.setProperty('--form-spacing-medium', theme.spacing.medium);
    root.style.setProperty('--form-spacing-large', theme.spacing.large);
  }
  
  // Cargar tema desde localStorage
  static loadTheme(): void {
    const themeData = localStorage.getItem('form-theme');
    
    if (themeData) {
      try {
        const theme = JSON.parse(themeData);
        this.setTheme(theme);
      } catch (error) {
        console.error('Error loading theme:', error);
        this.setTheme(this.getDefaultTheme());
      }
    } else {
      this.setTheme(this.getDefaultTheme());
    }
  }
  
  // Obtener tema por defecto
  static getDefaultTheme(): FormTheme {
    return {
      name: 'default',
      colors: {
        primary: '#a05941',
        secondary: '#8b6f47',
        error: '#e74c3c',
        success: '#27ae60',
        background: '#ffffff',
        text: '#2c1810'
      },
      fonts: {
        primary: "'Playfair Display', serif",
        secondary: "'Lato', sans-serif"
      },
      spacing: {
        small: '0.5rem',
        medium: '1rem',
        large: '1.5rem'
      }
    };
  }
}

// Cargar tema al iniciar
ThemeManager.loadTheme();
```

#### Uso del Sistema de Temas
```astro
---
// PrePagoForm.astro
import { ThemeManager } from '../lib/themes';

// Cambiar a tema oscuro
const darkTheme: FormTheme = {
  name: 'dark',
  colors: {
    primary: '#4a90e2',
    secondary: '#357abd',
    error: '#e74c3c',
    success: '#27ae60',
    background: '#2c3e50',
    text: '#ecf0f1'
  },
  fonts: {
    primary: "'Playfair Display', serif",
    secondary: "'Lato', sans-serif"
  },
  spacing: {
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem'
  }
};

ThemeManager.setTheme(darkTheme);
---

<section class="pre-pago-form" data-theme={ThemeManager.getCurrentTheme().name}>
  {/* Contenido del formulario */}
</section>

<style>
  .pre-pago-form {
    background-color: var(--form-background-color);
    color: var(--form-text-color);
    font-family: var(--form-primary-font);
  }
  
  .form-control {
    border-color: var(--form-secondary-color);
    color: var(--form-text-color);
  }
  
  .form-control:focus {
    border-color: var(--form-primary-color);
    box-shadow: 0 0 0 2px var(--form-primary-color);
  }
  
  .error-message {
    color: var(--form-error-color);
  }
  
  .success-message {
    color: var(--form-success-color);
  }
</style>
```

## 6. Conclusiones y Recomendaciones

### 6.1 Resumen del Análisis

El formulario de pre-pago actual en `index.html` presenta una funcionalidad completa pero con varias oportunidades de mejora en términos de performance, UX y mantenibilidad. El análisis ha identificado:

1. **Estructura compleja**: El formulario está implementado con múltiples archivos JavaScript que interactúan de manera poco estructurada
2. **Dependencias pesadas**: Se utilizan jQuery y múltiples librerías que podrían ser reemplazadas por JavaScript vanilla
3. **Validaciones inconsistentes**: Algunas validaciones se realizan en el cliente y otras en el servidor, sin una estrategia unificada
4. **UX mejorable**: El formulario no proporciona feedback claro ni indicadores de progreso
5. **Código poco mantenible**: La lógica está distribuida en múltiples archivos sin una arquitectura clara

### 6.2 Recomendaciones Principales

1. **Adoptar una arquitectura modular**: Separar claramente las responsabilidades en componentes y librerías
2. **Implementar un sistema de state management unificado**: Centralizar el estado del formulario y del carrito
3. **Optimizar el rendimiento**: Eliminar dependencias innecesarias y optimizar las consultas DOM
4. **Mejorar la UX**: Implementar validaciones en tiempo real, indicadores de progreso y feedback claro
5. **Asegurar la accesibilidad**: Cumplir con los estándares WCAG 2.1 AA
6. **Facilitar la extensibilidad**: Implementar un sistema de plugins y temas para personalización

### 6.3 Próximos Pasos

1. **Implementar el componente principal**: Crear `PrePagoForm.astro` con la estructura propuesta
2. **Desarrollar los subcomponentes**: Implementar `CampoForm.astro`, `MensajeError.astro`, etc.
3. **Crear las librerías de soporte**: Implementar `validaciones.ts`, `formulario.ts`, `pagos.ts`, etc.
4. **Integrar con el carrito existente**: Conectar el nuevo formulario con el sistema de carrito
5. **Realizar pruebas exhaustivas**: Validar la funcionalidad, accesibilidad y rendimiento
6. **Documentar el componente**: Crear documentación completa para desarrolladores

### 6.4 Beneficios Esperados

La implementación de esta arquitectura modular proporcionará los siguientes beneficios:

1. **Mejor rendimiento**: Reducción del tamaño de los scripts y optimización de las consultas DOM
2. **Mayor mantenibilidad**: Código más organizado y fácil de entender
3. **Mejor UX**: Formulario más intuitivo con feedback claro y validaciones en tiempo real
4. **Mayor accesibilidad**: Cumplimiento con estándares WCAG y compatibilidad con lectores de pantalla
5. **Mayor extensibilidad**: Sistema de plugins y temas para personalización fácil
6. **Testing más sencillo**: Componentes aislados que pueden ser probados individualmente

Esta arquitectura sentará las bases para un formulario de pre-pago robusto, eficiente y fácil de mantener, que podrá evolucionar con las necesidades futuras del negocio.