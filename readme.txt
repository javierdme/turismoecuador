Proyecto: Sitio Web de Fotografía Personal y Turismo en Ecuador
Entrega: Semana 4 - Diseño Responsive y Estilos

Integrante:
- Javier Mantilla

Descripción:
1. Flexbox se está usando principalmente para alinear y distribuir elementos en una sola dirección (ya sea en fila o en columna). 
Se lo aplica en:

El menú de navegación (nav ul y .submenu-regiones ul): Centra los enlaces (Inicio, Nosotros, Contacto) de forma horizontal y los separa de manera equitativa usando gap. En celulares, cambia a modo columna.

El banner interactivo del inicio (.banner-collage): En el index.html, Flexbox permite tener el efecto dinámico. Permite que las 4 imágenes ocupen el mismo ancho al inicio (flex: 1) y que, al pasar el ratón, una crezca (flex: 2) empujando a las demás suavemente.

Las tarjetas de servicios (.grid-servicios): la configuración con Flexbox (display: flex; flex-wrap: wrap;) permite que las tarjetas de "Tips" y "Documentación" se mantengan centradas y bajen automáticamente a la siguiente línea si la pantalla es muy pequeña.

El perfil en Nosotros (.contenido-perfil): Se coloca tu foto a la izquierda y el bloque de texto a la derecha. Con Flexbox, en la vista de celular con flex-direction: column; y automáticamente la foto se pone arriba del texto.

El formulario de Contacto (.formulario): Se usa Flexbox en modo columna para apilar perfectamente las etiquetas, los campos de texto y el botón de enviar.

2. CSS Grid (display: grid;)
CSS Grid se utiliza para crear cuadrículas estrictas de dos dimensiones (filas y columnas al mismo tiempo). En el proyecto se aplica como la herramienta para las fotografías:

En las galerías de las regiones (.grid-fotos): En el style.css, está la regla grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));. Esta regla controla la exhibición de fotos en las páginas costa.html, sierra.html, oriente.html y galapagos.html.
