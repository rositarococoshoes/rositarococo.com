# Servidor de Desarrollo Local - Astrocline

## 🚀 Propósito

Este servidor de desarrollo local permite trabajar en el sitio `/astrocline` de forma segura, replicando exactamente cómo se verá en producción **SIN MODIFICAR LOS ARCHIVOS ORIGINALES**.

## ✅ Características Principales

- **No modifica archivos originales**: Los archivos en `/astrocline` permanecen exactamente como están para producción
- **Reemplazo dinámico**: Cambia el CDN de Tailwind CSS por una versión local solo en memoria
- **Misma estructura**: Sirve exactamente los mismos recursos que en producción
- **Desarrollo seguro**: Puedes hacer cambios locales sin afectar el repositorio

## 📋 Requisitos Previos

1. **Node.js instalado** (versión 14 o superior)
2. **Dependencias del proyecto**: Asegúrate que Express está instalado

```bash
# Instalar dependencias si es necesario
npm install
```

## 🔧 Configuración Inicial

El servidor utiliza archivos específicos para desarrollo:

### Archivos de desarrollo (no afectan producción):
- `server-local.js` - Servidor principal de desarrollo
- `astrocline/css/tailwind-local.css` - Versión local de Tailwind CSS

### Archivos de producción (no se modifican):
- `astrocline/index.html` - HTML original con referencias al CDN
- `astrocline/css/unified.css` - Estilos personalizados
- `astrocline/js/` - Funcionalidad JavaScript
- `guillerminafotos/` - Imágenes de productos

## 🚀 Cómo Levantar el Servidor

### Opción 1: Usando el servidor principal (recomendado)

```bash
# Navegar al directorio del proyecto
cd C:\Users\sflic\Documents\GitHub\rositarococo.com

# Iniciar el servidor de desarrollo
node server-local.js
```

### Opción 2: Si tienes un servidor específico

```bash
# Si existe un archivo server-final.js
node server-final.js
```

## 🌐 Acceso al Sitio

Una vez iniciado el servidor, acceder a:

- **Sitio principal**: http://localhost:3000
- **Astrocline**: http://localhost:3000/astrocline

## ⚙️ Cómo Funciona

### 1. **Reemplazo Dinámico en Memoria**
- El servidor lee el HTML original de `astrocline/index.html`
- Reemplaza `<script src="https://cdn.tailwindcss.com"></script>` por `<link rel="stylesheet" href="/astrocline/css/tailwind-local.css">` solo en memoria
- **NO MODIFICA EL ARCHIVO ORIGINAL**

### 2. **Servicio de Recursos**
- Sirve todos los archivos estáticos desde sus ubicaciones originales
- Las imágenes se sirven desde `/guillerminafotos/`
- CSS personalizados desde `/astrocline/css/unified.css`
- JavaScript desde `/astrocline/js/`

### 3. **Tailwind CSS Local**
- Evita problemas de bloqueo ORB del navegador
- Utiliza una versión local compilada de Tailwind CSS
- Mantiene todas las clases y utilidades de Tailwind

## 🔍 Verificación de Funcionamiento

Para verificar que todo funciona correctamente:

1. **Acceder al sitio**: http://localhost:3000/astrocline
2. **Verificar estilos**: El sitio debe verse correctamente con todos los estilos aplicados
3. **Verificar recursos**: Abrir DevTools > Network y confirmar que:
   - `tailwind-local.css` carga con status 200
   - Todas las imágenes cargan correctamente
   - No hay errores de CSS o JavaScript

## 🛠️ Funcionalidades Verificadas

- ✅ **Layout y diseño**: Grid system, flexbox, espaciado
- ✅ **Tipografía**: Fuentes, tamaños, pesos
- ✅ **Colores**: Tema rosa, grises, colores de estado
- ✅ **Carruseles**: Embla carousel completamente funcional
- ✅ **Navegación**: Touch, botones, thumbnails
- ✅ **Formularios**: Estilos de inputs y botones
- ✅ **Responsive**: Mobile, tablet, desktop

## 📂 Estructura de Archivos

```
rositarococo.com/
├── server-local.js                 # Servidor de desarrollo (no va a producción)
├── astrocline/
│   ├── index.html                  # HTML original (sin modificar)
│   ├── css/
│   │   ├── unified.css             # Estilos personalizados
│   │   └── tailwind-local.css      # Tailwind local (solo desarrollo)
│   ├── js/
│   │   ├── carousel.js             # Funcionalidad carrusel
│   │   └── carousel-fix.js         # Fixes adicionales
│   └── favicon.svg                 # Icono
├── guillerminafotos/               # Imágenes de productos
├── rosita-form.webp               # Logo principal
└── otros recursos estáticos...
```

## ⚠️ Archivos que NO se deben modificar

Para mantener el entorno de producción intacto, **NO MODIFICAR**:

- `astrocline/index.html` - HTML original
- `astrocline/css/unified.css` - CSS de producción
- `astrocline/js/` - JavaScript de producción
- Cualquier archivo que exista en producción

## 🔄 Flujo de Trabajo

### Para desarrollo local:

1. **Iniciar servidor**: `node server-local.js`
2. **Trabajar localmente**: Hacer pruebas en http://localhost:3000/astrocline
3. **NO MODIFICAR** archivos de producción directamente
4. Si necesitas cambios, documentarlos y aplicarlos manualmente antes del push

### Para producción:

1. **Los archivos originales permanecen intactos**
2. **Hacer cambios directamente** en los archivos cuando sea necesario
3. **Hacer commit y push** a GitHub
4. **Verificar en producción**: https://rositarococo.com/astrocline

## 🛑 Cómo Detener el Servidor

Presiona `Ctrl+C` en la terminal donde se está ejecutando el servidor.

## 🔧 Personalización

### Cambiar el puerto:

Edita la línea en `server-local.js`:
```javascript
const PORT = process.env.PORT || 3000; // Cambiar 3000 por el puerto deseado
```

### Agregar nuevos recursos estáticos:

```javascript
// En server-local.js, agregar:
app.use('/nueva-carpeta', express.static(path.join(__dirname, 'nueva-carpeta')));
```

## 📝 Notas Importantes

- **Solo desarrollo**: Este servidor es SOLO para desarrollo local
- **Archivos temporales**: `tailwind-local.css` y `server-local.js` no deben subirse a producción
- **Git ignore**: Considerar agregar `server-local.js` a `.gitignore` si no quieres que se suba
- **Consistencia**: El servidor mantiene la misma estructura que producción para asegurar consistencia

## 🆘 Solución de Problemas

### Problema: El sitio se ve "roto" o sin estilos
**Solución**: Verificar que `tailwind-local.css` exista en `astrocline/css/`

### Problema: Error "Address already in use"
**Solución**: Cambiar el puerto o cerrar otros procesos usando el puerto 3000

### Problema: Imágenes no cargan
**Solución**: Verificar que las rutas en el HTML coincidan con la estructura de carpetas

### Problema: Carrusel no funciona
**Solución**: Verificar que los archivos JavaScript carguen correctamente en DevTools > Consola

## 📞 Soporte

Si encuentras problemas, revisa:
1. La consola del servidor para errores
2. DevTools del navegador para errores de red
3. Que todos los archivos necesarios existan en sus rutas correspondientes

---

**Última actualización**: 18/11/2025
**Versión**: 1.0
**Compatibilidad**: Node.js 14+, Express 4.x+