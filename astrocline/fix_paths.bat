@echo off
echo Corrigiendo rutas de imágenes en archivos HTML...

REM Corregir logo
powershell -Command "(Get-Content 'index.html') -replace '/rosita-form.webp', '/astrocline/rosita-form.webp' | Set-Content 'index.html'"

REM Corregir guillerminafotos
powershell -Command "Get-ChildItem -Path . -Filter '*.html' | ForEach-Object { (Get-Content $_.FullName) -replace '/guillerminafotos/', '/astrocline/guillerminafotos/' | Set-Content $_.FullName }"

echo ¡Rutas corregidas!
pause
