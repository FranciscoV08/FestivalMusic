 
//Extrae series de Gulp, series es 
//series; ejecutar las funciones
//parallell; ejecutar las funciones juntas y termina la mas rrapida
//src: es la carpeta de destino donde se guardarán los archivos. QUIEN
//dest: es la carpeta de destino donde se guardarán los archivos. DONDE

const {series, src, dest,watch}= require('gulp'); // Trae Gulp para usar sus funciones. Lo que tengas instalado de dependencia lo Trae
const sass = require('gulp-sass')(require('sass')); //Este importa la unica funcion mientras que el de arriba importa 1 de muchas
const imagemin = require('gulp-imagemin'); 
const notify = require('gulp-notify'); 
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//Utilidades CSS
 const autoPrefixer = require('autoprefixer'); //Permite agregar prefijos
 const postcss = require('gulp-postcss'); //nos agrega cireto procesamiento a nuestro css
 const cssnano = require('cssnano');
 const sourcemaps = require('gulp-sourcemaps');

 //Utilidades JS
 const terser = require('gulp-terser-js')
 const rename = require('gulp-rename')


const paths = {
   imagenes: 'src/img/**/*',
   scss: 'src/scss/**/*.scss',
   js: 'src/js/**/*.js' //Todo los archivos con esa extencion
}
// funcion que compila sass
function css () { // done es dar por terminado la funcion, se llama una vez terminado la funcion
    return src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe( sass() )
    .pipe(postcss( [autoPrefixer(), cssnano()] ) )
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./build/css'))
}

function minificarcss() { //Esta function lo que hace es minificar el css mas ligero, pero no lo usamos todabia
    return src(paths.scss)
    .pipe( sass({
        outputStyle: 'compressed' 
    }) )
    .pipe(dest('./build/css'))
}

function javascript() {
    return src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(rename({suffix: '.min'}))
    .pipe( dest('./build/js'))
}

function imagenes() {
    return src(paths.imagenes) //Lo que hace es entrar a carpeta img y leerlas todas
    .pipe( imagemin()) //Minifica 
    .pipe( dest('./build/img')) //Pone en su destino 
    .pipe(notify({ message: 'Imagen Minificada'}) );
}

function versionWebp() {
    return src(paths.imagenes) //Le damos la direccion de las img
    .pipe(webp()) //Ejecuta la funcion de Webp
    .pipe(dest('./build/img')) //Y lo guarda en buil/img
    .pipe(notify({ message: 'Version Webp Lista'})) //Mensjae de notify al ejecutar
}

function watchArchivos() {
    watch(paths.scss, css ) //escucha el cambio, ejecuta la funcion CSS - * = La carpeta actual- ** = todos los archivos
    watch(paths.js, javascript )
}


exports.css = css; // hay que instalar el compilador del nuevo sass 5
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;
exports.default = series( css, javascript, imagenes, versionWebp, watchArchivos);