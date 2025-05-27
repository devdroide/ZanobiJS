# Contribuyendo a ZanobiJS

¡Nos gustaría que contribuyeras y nos ayudaras a mejorar a ZanobiJS como colaborador, estas son las pautas que te recomendamos seguir:

<!--* [Código de Conducta](#coc)-->

- [Problemas y Errores](#issue)
- [Solicitudes de características](#feature)
- [Pull Request](#branches)
- [Pautas para Mensajes de Commit](#commits)
- [NPM Scripts](#scripts)


## <a name="issue"></a> ¿Encontraste un error o incidencia?

Si encuentras un error en el código fuente, puedes ayudarnos enviando un problema a nuestro repositorio de GitHub. Mejor aún, puedes enviar una solicitud de extracción con una solución.

## <a name="feature"></a> ¿Falta una característica?

Puedes solicitar una nueva característica enviando una incidencia al repositorio de GitHub. Si deseas implementar una nueva característica, primero envía una incidencia con una propuesta para tu trabajo, para revisarla y asegurarte de que podamos usarla.

Apenas estamos abriendo el repositorio para aceptar las colaboraciones así que ten un poco de paciencia.

## Guia de presentar un característica o incidencia

### <a name="branches"></a> Creación de ramas

Para crear una rama debe saber cual será su objetivo y debe ser uno de los siguientes:

- **chore** : Actualización de tareas, etc.; sin cambios en el código de producción
- **ci** : Cambios en nuestros archivos de configuración y scripts de CI (github-actions)
- **docs** : Solo cambios en la documentación
- **feat** : Una nueva característica
- **fix** : Corrección de errores
- **refactor** : Un cambio de código que no corrige un error ni agrega una característica
- **style** : Cambios que no afectan el significado del código (espacios en blanco, formato, punto y coma faltantes, etc.)
- **test** : Agregar pruebas faltantes o corregir pruebas existentes
- **sample** : Un cambio en los ejemplos de uso

Adicional trata de generar una idea clara de lo que se puede esperar de esa rama

```bash
# Ejemplo 1
$ git checkout -b feat/obfuscating-logs-for-users

# Ejemplo 2
$ git checkout -b fix/obfuscating-email-logs
```

### <a name="commits"></a>Alcance y commits

Tenemos los siguientes alcances y deben ser tenidos en cuenta para los commits:

- **commons**: para cambios realizados en el directorio `packages/common`
- **core**:  para cambios realizados en el directorio `packages/core`

```bash
# Ejemplo 1 - alcance paquete common
$ git commit -a -m "feat(core): ✨ Added log obfuscation for email and credit cards"

# Ejemplo 2 - alcance paquete core
$ git commit -a -m "fix(core): 🐛 Fixed log obfuscation for 16-character credit card numbers"

# Ejemplo 3 - alcance general
$ git commit -a -m "docs: 📚 Added readme.md for the spanish language"

# Ejemplo 4 - alcance paquete core
$ git commit -a -m "refactor(core): :hammer: The inject was refactored by code smell"

# Ejemplo 5 - alcance paquete core
$ git commit -a -m "test(core): :white_check_mark: New test cases were added for injector coverage"
```

## <a name="CICD"></a>Automatización

Es importante resaltar que tenemos CI/CD en github action por lo tanto es importante que se realice las pruebas de código necesarias, cumpla con el estándar de las ramas y de los commits, ya que de eso depende el cambio en el versionamiento de los paquetes.

## <a name="scripts"></a>NPM scripts comunes

```bash
# Corre todos las pruebas de los paquetes
$ npm run test

# corre formateadores
$ npm run lint:check
$ npm run lint:fix

$ npm run prettier:check
$ npm run prettier:fix

# Construye los paquetes para producción
$ npm run build:prod
```
