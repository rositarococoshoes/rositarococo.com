#!/usr/bin/env python3
# Script para insertar el producto Argos en index.html

import os

# Leer el archivo original
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Leer el HTML de Argos ya formateado
with open('argos-product-correcto.html', 'r', encoding='utf-8') as f:
    argos_html = f.read()

# Encontrar dónde insertar (después del último producto BIRK BLANCAS, antes del cierre del grid)
insertion_point = '</div>  </div>  </div> <!-- Navigation -->'
insertion_index = content.find(insertion_point)

if insertion_index == -1:
    print("ERROR: No se encontró el punto de inserción")
    exit(1)

# Insertar el HTML de Argos
new_content = content[:insertion_index] + ' ' + argos_html + content[insertion_index:]

# Escribir el nuevo contenido
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Producto Argos insertado exitosamente")
print(f"Insertado en la posición: {insertion_index}")