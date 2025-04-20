# Requerimientos para modificaciones en index.html

## Barra superior y elementos de beneficios
- Implementar una barra muy fina en la parte superior con "3 CUOTAS SIN INTERÉS | ENVÍO GRATIS A TODO EL PAÍS"
- No usar emojis en esta barra
- Remover estos elementos del inicio de la página (donde están actualmente)
- Aumentar el contraste de la barra superior para mejorar la legibilidad
- Eliminar la sección de beneficios destacados que aparece debajo del encabezado (ya que esta información está en la barra superior)

## Encabezado y títulos
- Remover el texto actual "Colección Otoño-Invierno 2025" y el subtítulo "Diseños exclusivos que abrazan tus pasos con estilo y confort"
- Reemplazar por etiquetas cortas que solo digan "Colección Otoño-Invierno 2025"
- Eliminar la sección "NUESTROS MODELOS"
- Usar una tipografía diferente para el título "Colección Otoño-Invierno 2025" para diferenciarlo de los títulos de los modelos
- Reducir el tamaño de fuente de los títulos de cada modelo para que sean más compactos
- Aumentar el ancho máximo del logo de Rosita Rococó en celulares a 320px para que se vea más grande

## Precios y promociones
- Quitar la sección de precios que aparece en la parte superior de la página
- Mantener los precios solo junto a los botones de "Agregar al carrito"
- Eliminar la mención del 10% de descuento por pago por transferencia de la parte superior
- Mejorar la tipografía y contraste de los precios para que se vean mejor

## Tarjetas de productos y carruseles
- Usar tipografía más sutil para los nombres de los modelos
- No usar todo mayúsculas en los nombres de modelos (se ven muy grandes)
- Reorganizar la información de "Material", "Suela" y "Altura" para que no aparezcan uno debajo del otro (ocupan mucho espacio)
- Mostrar "3 cuotas sin interés" y "Envío gratis" como etiquetas destacables sin emojis en las tarjetas de modelos
- Optimizar el espacio vertical para reducir la necesidad de scroll en celulares entre el carrusel y su botón de "Agregar al carrito"
- Reducir la altura de la sección de beneficios dentro de cada producto (3 cuotas sin interés y envío gratis)
- Eliminar el emoji de check (✓) en los beneficios de cada producto para ahorrar espacio vertical
- Mostrar los beneficios como etiquetas destacadas pero más compactas

## Comportamiento del formulario y carrito
- Cuando se agrega al menos un producto al carrito, hacer visible automáticamente el formulario de envío (sin necesidad de hacer clic en "Continuar al envío")
- Permitir que los usuarios vean el formulario al hacer scroll sin tener que tocar el botón
- Mantener el comportamiento actual donde el botón "Continuar al envío" desaparece cuando se está viendo el formulario
- Corregir la visibilidad del botón "Continuar al envío" para que se muestre correctamente cuando hay productos en el carrito
- Mantener solo el botón original de "Continuar al envío" y eliminar el botón de emergencia
- No forzar el foco automático al formulario cuando se agrega un producto, solo hacerlo visible
- Asegurar que el formulario de envío sea visible en la página cuando haya al menos un producto agregado al carrito, sin necesidad de hacer clic en "Continuar al envío"
- El botón "Continuar al envío" debe ser invisible cuando no hay productos en el carrito o cuando hay productos pero el formulario de envío ya está completamente visible en pantalla
- Corregir el problema donde el botón "Continuar al envío" desaparece prematuramente al comenzar a hacer scroll
- Corregir el error JavaScript: "Uncaught ReferenceError: showEmergencyButton is not defined"

## Optimización general
- Reducir la cantidad de scroll necesario en dispositivos móviles
- Mejorar la legibilidad y contraste de elementos importantes
- Hacer el diseño más compacto y eficiente en el uso del espacio
