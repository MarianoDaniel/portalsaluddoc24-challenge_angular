const fs = require('fs');
const concat = require('concat');
const ncp = require('ncp').ncp;
const sass = require('sass');
const globby = require('globby');

const jsFiles = [
  'node_modules/angular/angular.js',
  'node_modules/angular-ui-router/release/angular-ui-router.js',
  'js/app.js',
];

const pagesSource = 'pages';
const publicDestination = 'public';
const sassSource = 'sass';
const sassDestination = `${publicDestination}/style.css`;
const pagesDestination = `${publicDestination}/pages`;

ncp(pagesSource, pagesDestination, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log(`Copia exitosa de la carpeta ${pagesSource} a ${pagesDestination}`);
compileAndMoveSass();
});

globby(['js/controllers/*.js', 'js/services/*.js']).then(files => {
  jsFiles.push(...files);

  return concat(jsFiles, `${publicDestination}/bundle.js`);
}).then(() => {
  console.log('Unificación exitosa de archivos JS en bundle.js');
}).catch(error => {
  console.error('Error durante la unificación de archivos JS:', error);
});

function compileAndMoveSass() {
  const sassFile = 'main.scss'; // Nombre del archivo Sass principal

  const result = sass.renderSync({
    file: `${sassSource}/${sassFile}`, // Ruta al archivo Sass principal
    outputStyle: 'compressed',
    quietDeps: true,
  });

  fs.writeFileSync(sassDestination, result.css.toString());
  console.log(`Compilación exitosa de ${sassFile} y movimiento a ${sassDestination}`);
}
