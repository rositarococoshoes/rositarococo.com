# Diagnóstico de Miniaturas del Carrusel - Astrocline
## Fecha: 2025-11-18

## Análisis de Problemas Identificados

### 1. **Bordes Incompletos en Miniaturas Seleccionadas** ✅ DIAGNOSTICADO

**Problema**: Los bordes rosados en miniaturas seleccionadas no se muestran completamente en todos los lados.

**Causa Raíz Identificada**:
- El `border-radius: 8px` en combinación con `overflow: hidden` en la miniatura está cortando visualmente los bordes
- El transform `scale(1.1)` está causando que el borde sobresalga del área visible del contenedor
- El viewport del carrusel tiene `overflow: auto hidden` que puede estar recortando los bordes transformados

**Evidencia**:
```css
/* Estilos computados de miniatura seleccionada */
.embla-thumbs__slide--selected {
  width: 64px;
  height: 64px;
  border: 3px solid rgb(236, 72, 153);  /* Borde rosado de 3px */
  border-radius: 8px;
  overflow: hidden;                     /* ← ESTE ESTÁ CORTANDO EL BORDE */
  transform: scale(1.1);               /* ← ESTO AGRANDA MÁS ALLÁ DEL CONTENEDOR */
  box-sizing: border-box;
}

/* Contenedor con overflow limitado */
.embla-thumbs__viewport {
  width: 359px;
  height: 74px;
  overflow: auto hidden;               /* ← ESTO RECORTA EL CONTENIDO TRANSFORMADO */
}
```

### 2. **Posible Deformación de Imágenes** ✅ ANALIZADO

**Problema**: Las imágenes podrían estar deformando su proporción original.

**Análisis**:
- `object-fit: cover` está funcionando correctamente (no deformando, sino recortando para llenar)
- Las dimensiones computadas son consistentes:
  - Miniatura no seleccionada: 54px × 54px
  - Miniatura seleccionada: 52px × 52px (reducida por padding adicional)

**Evidencia**:
```css
.embla-thumbs__slide__img {
  width: 100%;
  height: 100%;
  object-fit: cover;        /* ✓ Correcto - mantiene proporción */
  object-position: 50% 50%; /* ✓ Centrado */
  border-radius: 6px;
}
```

**Conclusión**: No hay deformación, pero sí recorte inherente a `object-fit: cover`.

### 3. **Problemas de Layout Adicionales Identificados**

**Espaciado y Alineación**:
- Gap entre miniaturas: 6px (demasiado grande)
- Margin negativo del contenedor: -4px
- Padding del contenedor: 0px 4px

**Transformaciones**:
- Las miniaturas seleccionadas se escalan 1.1x pero esto puede causar solapamiento

## Soluciones Propuestas

### Solución 1: Ajustar Overflow y Transform
```css
.embla-thumbs__slide--selected {
  overflow: visible;           /* Permitir que el borde sea visible */
  transform: scale(1.05);      /* Reducir escala para evitar corte */
  margin: 2px;                 /* Agregar margen para espacio extra */
}

.embla-thumbs__viewport {
  overflow: visible;           /* Permitir bordes transformados */
}
```

### Solución 2: Usar Outline en lugar de Border
```css
.embla-thumbs__slide--selected {
  outline: 3px solid #ec4899;  /* Outline no afecta layout */
  outline-offset: 2px;
  transform: scale(1.05);      /* Reducir escala */
}
```

### Solución 3: Ajustar Contenedor
```css
.embla-thumbs__viewport {
  padding: 8px 0;             /* Espacio vertical para bordes */
  overflow: visible;          /* Permitir contenido transformado */
}

.embla-thumbs__container {
  gap: 2px;                  /* Reducir espacio entre miniaturas */
}
```

## Recomendación Principal

**Implementar Solución 2 (Outline)** porque:
1. Los outlines no afectan el box model
2. No se cortan con overflow
3. Mantienen el layout consistente
4. Son más performantes

## Próximos Pasos
1. Implementar la solución elegida
2. Probar en diferentes estados (seleccionado, hover, normal)
3. Verificar responsividad
4. Validar accesibilidad (contrast ratio)

---
**Estado**: Diagnóstico completado, esperando aprobación para implementar solución.