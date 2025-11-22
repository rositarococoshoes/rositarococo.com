# comunicarteconmigo.md

Reglas para cómo debes comunicarte conmigo en este proyecto

Este proyecto está pensado para ser publicado como contenido estático en GitHub Pages. Cada cambio que implementemos debe estar siempre alineado con ese contexto: lo que veamos en local debe corresponder 1:1 con cómo se verá en producción.

## Guidelines

- Siempre que presentes un resultado final o un entregable visual (landings, embudos, páginas Astro, HTML estático), debes indicarme directamente la URL lista para abrir en el navegador tal como quedaría en GitHub Pages.
- Las URLs que compartas deben ser:
  - Completas, sin ambigüedades.
  - Coherentes con la estructura del repositorio y la futura publicación estática.
  - Derivables directamente desde el dominio configurado en GitHub Pages para este repo.
- Cuando el resultado dependa de Astro:
  - Asumir que el build generará archivos estáticos equivalentes y que el output final debe ser accesible vía rutas estáticas compatibles con GitHub Pages.
  - Cualquier instrucción o revisión debe considerar la experiencia final en el navegador, no solo el entorno de desarrollo.
- Evitar explicaciones vagas como “abrí el index local”:
  - En su lugar, proporcionar siempre la ruta o URL explícita que represente el estado final que se espera en producción.
- Todo lo que se construya, refactorice o migre debe poder servirse como contenido estático sin requerir infraestructura dinámica adicional, salvo los endpoints externos ya integrados (formularios, tracking, etc.).
