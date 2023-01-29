/* 
    Proyecto:   Pre-entrega 2 
                Matías Baldanza - matiasbaldanza@gmail.com
                Twitter: @matiasbaldanza
    Curso:      Javascript
    Comisión:   #34150 - CoderHouse
    Profesor:   Gonzalo Ledesma

    Repo:       https://github.com/matiasbaldanza/coderhouse-js-34150-matiasbaldanza-preentrega-2/
    Sitio:      https://matiasbaldanza.github.io/coderhouse-js-34150-matiasbaldanza-preentrega-2/
*/

const IVA = 0.21;

// elementos del DOM
const prestamoForm = document.querySelector('[prestamo-form]');
console.log(prestamoForm)

// event listeners
prestamoForm.addEventListener('submit', simularPrestamo);


function simularPrestamo(event) {
    event.preventDefault();
    const prestamo = tomarDatosPrestamo();


    
}

function tomarDatosPrestamo() {
    const datosPrestamo = {
        monto:          parseFloat(document.querySelector('#monto').value),
        tasaAnual:      parseFloat(document.querySelector('#interes').value),
        plazoEnMeses:   parseInt(document.querySelector('#plazo').value), 
    }

    return datosPrestamo;
}