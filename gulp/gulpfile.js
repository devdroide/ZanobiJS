const gulp = require("gulp");
const del = require("del");
const packages = ["common", "core"]; // Agrega aquí los nombres de tus paquetes

// Tarea para limpiar los archivos compilados en la carpeta src de cada paquete
gulp.task("clean:packages", () => {
  const cleanTasks = packages.map((packageName) => {
    return del([
      `packages/${packageName}/src/*.js`,
      `packages/${packageName}/src/*.js.map`,
      `packages/${packageName}/src/*.d.ts`,
    ]);
  });
  return Promise.all(cleanTasks);
});

// Tarea por defecto para ejecutar la tarea de limpieza
gulp.task("default", gulp.series("clean:packages"));
