# objetivofinal.md

## Regla de objetivo final del proyecto

El objetivo final del proyecto es lograr una migración 100% exitosa en la carpeta [`rositaastro/`](rositaastro/:1) de los dos embudos principales del ecommerce, dejando ambos completamente operativos y listos para subir a producción, cumpliendo estrictamente las siguientes condiciones:

1. Migrar íntegramente el embudo de venta con pago anticipado:
   - Punto de inicio: [`index.html`](index.html:1).
   - Incluir todas las páginas, recursos y funcionalidades subsiguientes y dependientes que formen parte de este flujo de venta.
   - Garantizar que el flujo completo funcione en Astro dentro de [`rositaastro/`](rositaastro/:1) sin rupturas, errores ni dependencias faltantes.

2. Migrar íntegramente el embudo de venta contra reembolso:
   - Punto de inicio: [`contrarreembolsonueva.html`](contrarreembolsonueva.html:1).
   - Incluir todas las páginas, recursos y funcionalidades subsiguientes y dependientes que formen parte de este flujo de venta.
   - Garantizar que el flujo completo funcione en Astro dentro de [`rositaastro/`](rositaastro/:1) sin rupturas, errores ni dependencias faltantes.

3. Exclusión estricta:
   - No debe migrarse ningún archivo, imagen, script, estilo, funcionalidad o recurso que no pertenezca directa y funcionalmente a uno de los dos embudos descritos.
   - Cualquier elemento fuera de estos embudos debe ser explícitamente excluido de la migración a [`rositaastro/`](rositaastro/:1).

4. Condición de finalización:
   - El proyecto se considera completado únicamente cuando:
     - Ambos embudos estén completamente migrados a Astro dentro de [`rositaastro/`](rositaastro/:1).
     - Toda la navegación, lógica, seguimiento, formularios, validaciones, estilos, assets y scripts necesarios para cada embudo estén correctamente integrados y probados.
     - No existan referencias rotas, rutas incorrectas ni dependencias innecesarias.
     - Los embudos estén listos para ser desplegados en producción sin requerir cambios estructurales adicionales.
