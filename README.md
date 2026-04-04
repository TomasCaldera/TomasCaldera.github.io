# Tomas Caldera

Landing personal de Tomas Caldera, Product Manager enfocado en growth, experimentation, behavioral design y fintech.

El sitio esta construido como una web estatica simple para publicarse en GitHub Pages.

## Estructura

- `index.html`: landing principal
- `brand.html`: pagina secundaria con el sistema de marca del sitio
- `styles.css`: estilos globales de la landing y de la pagina de marca
- `script.js`: interacciones livianas del sitio
- `assets/`: recursos visuales del proyecto
- `contenido_v1.md`: base editorial y de contenido usada para construir la landing

## Stack

- HTML
- CSS
- JavaScript
- GitHub Pages para deploy
- Playwright como dependencia auxiliar para auditoria visual local

## Desarrollo local

Para abrir el sitio localmente alcanza con abrir `index.html` en el navegador.

Si queres servirlo por HTTP local:

```bash
python3 -m http.server 4173
```

Luego abrir:

```text
http://127.0.0.1:4173
```

## GitHub Pages

El sitio esta pensado para publicarse desde la raiz del branch `main`.

Configuracion recomendada en GitHub:

1. Ir a `Settings > Pages`
2. En `Build and deployment`, elegir `Deploy from a branch`
3. Seleccionar el branch `main`
4. Seleccionar la carpeta `/ (root)`
5. Guardar y esperar la publicacion

URL esperada:

```text
https://tomascaldera.github.io
```

## Notas de mantenimiento

- El proyecto usa rutas relativas para funcionar correctamente en GitHub Pages.
- `node_modules/` no se versiona.
- `package.json` y `package-lock.json` quedan en el repo solo para conservar la configuracion local de herramientas como Playwright.

## Estado actual

- Landing principal con direccion visual dark, sobria y tech
- Hero y espaciados ajustados para una lectura mas compacta
- Pagina de marca enlazada desde la home
