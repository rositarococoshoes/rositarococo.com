# Plan de Subida a GitHub Pages - Rosita Rococo Astro Ecommerce

## Resumen

Este documento detalla los pasos exactos para desplegar el embudo de ecommerce migrado a Astro + Tailwind en GitHub Pages.

---

## Prerequisitos

1. Node.js >= 18.x instalado
2. Acceso al repositorio `rositarococo.com` en GitHub
3. GitHub Pages habilitado en el repositorio

---

## Opcion 1: Subir a subdirectorio /astro-ecommerce (Recomendado)

Esta opcion mantiene el sitio actual y agrega el nuevo embudo en una ruta separada.

### Paso 1: Build del proyecto

```bash
cd astro-ecommerce
npm install
npm run build
```

Esto genera la carpeta `dist/` con todos los archivos estaticos.

### Paso 2: Copiar archivos al repositorio

Los archivos generados en `dist/` deben copiarse a una carpeta `astro-ecommerce/` en la raiz del repositorio:

```bash
# Desde la raiz del proyecto
mkdir -p astro-ecommerce-deploy
cp -r astro-ecommerce/dist/* astro-ecommerce-deploy/
```

### Paso 3: Estructura final

```
rositarococo.com/
├── index.html          # Sitio actual
├── astro-ecommerce/    # Nuevo embudo Astro
│   ├── index.html
│   ├── gracias-1par/
│   ├── gracias-2pares/
│   ├── gracias-1par-c/
│   ├── gracias-2pares-c/
│   ├── _assets/
│   ├── guillerminafotos/
│   ├── birknegras/
│   ├── birkcamel/
│   ├── birkblancas/
│   ├── argos/
│   ├── comentarios/
│   └── ...
```

### Paso 4: Commit y Push

```bash
git add astro-ecommerce/
git commit -m "Agregar nuevo embudo Astro + Tailwind"
git push origin master
```

### Paso 5: Acceso

El nuevo embudo estara disponible en:
- https://rositarococo.com/astro-ecommerce/

---

## Opcion 2: Reemplazar sitio actual completamente

Si deseas reemplazar completamente el sitio actual con el nuevo embudo Astro:

### Paso 1: Modificar astro.config.mjs

Cambiar la configuracion base:

```javascript
export default defineConfig({
  site: 'https://rositarococo.com',
  base: '/',  // Cambiar de '/astro-ecommerce' a '/'
  // ... resto igual
});
```

### Paso 2: Build

```bash
cd astro-ecommerce
npm run build
```

### Paso 3: Backup y reemplazo

```bash
# Hacer backup del sitio actual
mkdir backup-sitio-anterior
mv index.html contrareembolso.html *.css *.js backup-sitio-anterior/

# Copiar nuevos archivos
cp -r astro-ecommerce/dist/* .
```

### Paso 4: Commit y Push

```bash
git add .
git commit -m "Migrar sitio completo a Astro + Tailwind"
git push origin master
```

---

## Archivos Importantes Generados

Despues del build, la carpeta `dist/` contendra:

| Archivo/Carpeta | Descripcion |
|-----------------|-------------|
| `index.html` | Pagina principal del embudo |
| `gracias-1par/index.html` | Pagina de agradecimiento 1 par |
| `gracias-2pares/index.html` | Pagina de agradecimiento 2 pares |
| `gracias-1par-c/index.html` | Agradecimiento contrareembolso 1 par |
| `gracias-2pares-c/index.html` | Agradecimiento contrareembolso 2 pares |
| `_assets/` | CSS y JS compilados |
| `guillerminafotos/` | Imagenes de productos |
| `birknegras/`, `birkcamel/`, `birkblancas/` | Imagenes Birk |
| `argos/` | Imagenes Argos |
| `comentarios/` | Testimoniales |
| `rosita-form.webp` | Logo |
| `favicon.svg` | Favicon |

---

## Configuracion de GitHub Pages

1. Ir a **Settings** > **Pages** en el repositorio
2. En **Source**, seleccionar:
   - Branch: `master` (o `main`)
   - Folder: `/ (root)`
3. Guardar cambios
4. Esperar 2-5 minutos para el deploy

---

## Verificacion Post-Deploy

1. Visitar https://rositarococo.com/astro-ecommerce/ (o la URL base configurada)
2. Verificar:
   - [ ] Carga de imagenes de productos
   - [ ] Carrusel funciona correctamente
   - [ ] Modal de WhatsApp aparece al agregar primer producto
   - [ ] Flujo de carrito completo
   - [ ] Formulario de checkout
   - [ ] Paginas de agradecimiento
   - [ ] Responsividad en mobile/tablet/desktop

---

## Troubleshooting

### Problema: Imagenes no cargan
**Solucion**: Verificar que las carpetas de imagenes (guillerminafotos, birk*, argos, comentarios) esten copiadas correctamente.

### Problema: CSS/JS no carga
**Solucion**: Verificar que la carpeta `_assets/` este presente y que las rutas en el HTML sean correctas.

### Problema: 404 en rutas
**Solucion**: GitHub Pages usa archivos estaticos. Asegurarse de que cada ruta tenga su carpeta con `index.html`.

### Problema: Base path incorrecto
**Solucion**: Verificar `base` en `astro.config.mjs` coincida con la ubicacion final del sitio.

---

## Comandos Rapidos

```bash
# Desarrollo local
cd astro-ecommerce
npm run dev

# Build para produccion
npm run build

# Preview del build
npm run preview
```

---

## Contacto y Soporte

Para dudas sobre la migracion, revisar:
- README.md en /astro-ecommerce
- Documentacion de Astro: https://docs.astro.build
- Documentacion de Tailwind: https://tailwindcss.com/docs
