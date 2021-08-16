document.addEventListener('DOMContentLoaded', function () {
    scrollNav();

    navegacionFija();

})

function navegacionFija() {

    const barra = document.querySelector('.header')

    //Registrar el Intersection Observar
    const observer  = new IntersectionObserver( function (entries) {
        if (entries[0].isIntersecting) {
            barra.classList.remove('fijo'); //remueve la clase
        }else{
            barra.classList.add('fijo');
        }
        
    })


    //Elemento Observar
    observer.observe(document.querySelector('.sobre-festival'))
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a')

    
    enlaces.forEach(function (enlaces) {         //CUando tengas muchos elementos no puedo ponerle un evento, necesito iterar y registratlo para despues ponerle el evento
        enlaces.addEventListener('click', function(e) {
            e.preventDefault();
            const seccion = document.querySelector(e.target.attributes.href.value)

            seccion.scrollIntoView({
                behavior: 'smooth',
            });
        })
    })
}
