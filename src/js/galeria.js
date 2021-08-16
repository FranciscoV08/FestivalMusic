document.addEventListener('DOMContentLoaded', function () { //DOMContentLoaded activa cuando el documento HTML inicial se ha cargado y analizado por completo
    crearGaleria();
});

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes'); //Seleccionamos la clase galeria

    for(let i = 1; i <= 12; i++){ //Esto crea la estructura im de html y lo hace 12 veses
        const imagenes = document.createElement('IMG'); //Crea elemento IMG
        imagenes.src = `build/img/thumb/${i}.webp`; //Esto crea como un <img src'' y pone el template String
        imagenes.dataset.imagenesId = i; //Agrega una clase con data, para saber a que imagen dio click

        //Añadir la funcion de mostrat imagen
        imagenes.onclick = mostrarImagen; //LLama la funcion Imagen

        const lista = document.createElement('LI'); //Creamos li lista ordenada
        lista.appendChild(imagenes); //Agregamos a LI imagenes

        galeria.appendChild(lista);
    }
}

function mostrarImagen(e){
    
    const id = parseInt(e.target.dataset.imagenesId); //nos permite convertir un string 
    //Generar la imagen
    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen); //Apenchild agrega el codigo al HTML
    overlay.classList.add('overlay');

    //Cuando se da click cerrar la imagen
    overlay.onclick = function () {
        overlay.remove();
        body.classList.remove('fijar-body')
        
    }
    //Boton para cerrar IMG
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

    //Cuando se preciona cierra la imagen
    cerrarImagen.onclick = function () {
            overlay.remove();
    }

    overlay.appendChild(cerrarImagen);

    //Mostrare en el HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');

}