# Tomás Caldera

Sitio personal de Tomás Caldera, Product Manager enfocado en growth, experimentación, diseño conductual y fintech.

La web está pensada como una presencia personal publicable en GitHub Pages y, al mismo tiempo, como un proyecto vivo
de experimentación. Además de la landing principal, el sitio documenta su propio proceso de construcción mientras
explora herramientas de vibecoding, decisiones editoriales y evolución visual.

## Estructura

- `index.html`: landing principal con posicionamiento, enfoque, capacidades e información de contacto.
- `brand.html`: página secundaria con el sistema de marca y las decisiones visuales del sitio.
- `bitacora.html`: documento vivo del proyecto con una narrativa paso a paso sobre su creación y evolución.
- `styles.css`: estilos globales compartidos por la landing, la página de marca y la bitácora.
- `script.js`: interacciones livianas del sitio, incluyendo el texto dinámico del hero y el efecto parallax.
- `assets/`: recursos visuales del proyecto.
- `contenido_v1.md`: base editorial inicial usada para construir la landing.

## Enfoque del proyecto

El sitio cumple dos funciones al mismo tiempo:

- presentar una identidad profesional clara;
- servir como laboratorio para probar ideas de contenido, interfaz y flujo de trabajo;
- registrar aprendizajes reales sobre cómo construir con asistencia y criterio.

La página `bitacora.html` existe para hacer visible ese proceso. La intención es seguir ampliándola a medida que el
sitio sume nuevas versiones, decisiones y experimentos.

## Stack

- HTML
- CSS
- JavaScript
- GitHub Pages para deploy
- GitHub Actions para CI/CD
- Playwright como dependencia auxiliar para auditoría visual local

## Desarrollo local

Para abrir el sitio localmente alcanza con abrir `index.html` en el navegador.

Si querés servirlo por HTTP local:

```bash
python3 -m http.server 4173
```

Luego abrir:

```text
http://127.0.0.1:4173
```

## CI/CD

El proyecto usa GitHub Actions como pipeline de validación y publicación.

### CI

Workflow: `.github/workflows/ci.yml`

Valida en cada push y pull request:

- que existan los archivos base del sitio;
- que `index.html`, `brand.html` y las páginas vinculadas mantengan referencias locales correctas;
- que la landing pueda servirse localmente;
- que las páginas principales respondan correctamente por HTTP.

### Deploy

Workflow: `.github/workflows/deploy-pages.yml`

Publica automáticamente a GitHub Pages cuando hay cambios en `main`.

Configuración recomendada en GitHub:

1. Ir a `Settings > Pages`.
2. En `Build and deployment`, elegir `GitHub Actions`.
3. Guardar.

## GitHub Pages

El deploy productivo sale desde GitHub Actions sobre `main`.

URL esperada:

```text
https://tomascaldera.github.io
```

## Mantenimiento editorial

- Mantener una voz clara, sobria y consistente en español.
- Usar el inglés solo cuando aporte precisión y no rompa la lectura.
- Actualizar `bitacora.html` cuando el proyecto incorpore hitos, herramientas o aprendizajes nuevos.
- Revisar el README cuando cambie la estructura del sitio o se agreguen nuevas páginas.

## Notas de mantenimiento

- El proyecto usa rutas relativas para funcionar correctamente en GitHub Pages.
- `node_modules/` no se versiona.
- `package.json` y `package-lock.json` quedan en el repo solo para conservar la configuración local de herramientas como Playwright.
- Para publicar con el flujo actual, GitHub Pages debe estar configurado en modo `GitHub Actions`.

## Estado actual

- Landing principal con dirección visual dark, sobria y precisa.
- Página de marca enlazada desde la home.
- Bitácora viva dentro del sitio para documentar el proceso de creación.
- Hero con texto dinámico y microinteracciones livianas.
