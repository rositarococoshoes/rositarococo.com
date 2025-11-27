# 🧪 **MANUAL DE TESTING - APLICACIÓN ECOMMERCE**

## 🚀 **INICIO RÁPIDO**

### **Opción 1: Servidor Actual**
```bash
# Desde la terminal en C:\github\rositarococo.com\astro-ecommerce
node serve-test.cjs
```

### **Opción 2: Navegador Manual**
1. Abrir navegador (Chrome, Firefox, Edge)
2. Navegar a: `http://localhost:3000`
3. Abrir herramientas de desarrollador (F12)
4. Revisar pestaña "Console" en busca de errores

## ✅ **CHECKLIST DE TESTING**

### **1. Carga Inicial**
- [ ] La página carga correctamente
- [ ] No hay errores 404 de imágenes
- [ ] El layout es responsivo
- [ ] Los 3 productos se muestran correctamente

### **2. Funcionalidad del Carrito**
- [ ] Botón flotante aparece con contador "0"
- [ ] Al hacer clic en "Agregar al Carrito" → se muestra notificación
- [ ] El contador del botón se actualiza
- [ ] Al hacer clic en el botón → se abre el mini-carrito
- [ ] El producto agregado aparece en el mini-carrito
- [ ] Los precios se calculan correctamente

### **3. Lógica de Descuentos**
- [ ] 1 producto → muestra precio $60.000
- [ ] 2 productos → muestra precio $95.000 (descuento $25.000)
- [ ] Mensaje de oferta contextual aparece correctamente

### **4. Validaciones**
- [ ] No se puede agregar producto sin seleccionar talle
- [ ] Mensaje de error aparece si falta talle
- [ ] El selector de talle se resetea después de agregar

### **5. Console sin Errores**
- [ ] No hay errores JavaScript en consola
- [ ] No hay warnings críticos
- [ ] Todos los recursos cargan correctamente

## 📱 **TESTING RESPONSIVO**

### **Desktop (>1024px)**
- [ ] Grid de 3 columnas funciona
- [ ] Mini-carrito se posiciona correctamente
- [ ] Hover en productos funciona

### **Tablet (768px - 1024px)**
- [ ] Grid de 2 columnas se adapta
- [ ] Botones son touch-friendly
- [ ] Todo el contenido es legible

### **Mobile (<768px)**
- [ ] Grid de 1 columna funciona
- [ ] Botón flotante no obstaculiza contenido
- [ ] Mini-carrito ocupa toda el ancho
- [ ] Texto legible sin zoom

## 🛒 **FLUJO DE COMPRA COMPLETO**

1. **Selección de Productos**
   - [ ] Seleccionar talle para Guillerminas Negras
   - [ ] Agregar al carrito → notificación success
   - [ ] Seleccionar talle para Guillerminas Camel  
   - [ ] Agregar al carrito → descuento aplicado
   - [ ] Verificar total $95.000

2. **Gestión del Carrito**
   - [ ] Abrir mini-carrito
   - [ ] Ver 2 productos listados
   - [ ] Incrementar cantidad de un producto
   - [ ] Eliminar un producto → vuelve a $60.000
   - [ ] Cerrar y re-abrir carrito

3. **Interacciones de UI**
   - [ ] Hover en imágenes → efecto zoom
   - [ ] Click en talles → menú desplegable
   - [ ] Animación de agregar al carrito
   - [ ] Transiciones suaves en todas partes

## 🔧 **SOLUCIÓN DE PROBLEMAS**

### **Si Playwright MCP no funciona:**
1. Abrir manualmente: `http://localhost:3000`
2. Usar DevTools del navegador para testing
3. Revisar la configuración del MCP en Factory
4. Considerar usar testing manual con checklist

### **Si hay errores de conexión:**
1. Verificar que el puerto 3000 esté libre
2. Revisar firewall de Windows
3. Probar con diferente navegador
4. Reiniciar el servidor con `node serve-test.cjs`

## 📊 **RESULTADOS ESPERADOS**

- ✅ **Sin errores en consola**
- ✅ **Carrito funcional** con descuentos
- ✅ **Diseño 100% responsivo**
- ✅ **Performance aceptable** (< 3s carga)
- ✅ **SEO básico** implementado

---

## 🎯 **URL DE ACCESO**

**Producción Local**: `http://localhost:3000`

**Archivos clave**:
- `serve-test.cjs` - Servidor de desarrollo
- `src/pages/home.astro` - Página principal  
- `src/components/cart-button.js` - Botón carrito
- `src/components/mini-cart.js` - Mini-carrito
- `src/components/product-form.js` - Lógica del carrito
