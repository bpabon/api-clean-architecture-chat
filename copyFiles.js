const fs = require('fs');
const path = require('path');

function copyFileSync(source, target) {
    var targetFile = target;

    // Si target es una carpeta, crear un archivo con el mismo nombre en esa carpeta
    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
    var files = [];

    // Comprobar si la carpeta fuente existe
    if (fs.existsSync(source) && fs.lstatSync(source).isDirectory()) {
        // Crear la carpeta destino
        if (!fs.existsSync(target)) {
            fs.mkdirSync(target);
        }

        // Copiar cada archivo de la carpeta fuente a la carpeta destino
        files = fs.readdirSync(source);
        files.forEach(function(file) {
            var curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, path.join(target, file));
            } else {
                copyFileSync(curSource, path.join(target, file));
            }
        });
    }
}

// Directorios de origen y destino
const sourceDir = path.join(__dirname, 'src', 'presentation', 'middlewares', 'schemas', 'json');
const targetDir = path.join(__dirname, 'dist', 'presentation', 'middlewares', 'schemas', 'json');

// Ejecutar copia
copyFolderRecursiveSync(sourceDir, targetDir);
