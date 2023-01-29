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

// GLOBALS

const IVA = 0.21;
const moneda = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
});

// elementos del DOM
const prestamoForm = document.querySelector('[prestamo-form]');
const amortizacionesSection = document.querySelector('[amortizaciones-section]');

// event listeners
prestamoForm.addEventListener('submit', simularPrestamo);

// MAIN

function simularPrestamo(event) {
    event.preventDefault();

    montoTotal      =   parseFloat(document.querySelector('#monto').value);
    tasaAnual       =   parseFloat(document.querySelector('#interes').value);
    plazoEnMeses    =   parseInt(document.querySelector('#plazo').value);

    const amortizacion = calcularCuotas(montoTotal, plazoEnMeses, tasaAnual);

    mostrarCuotas(amortizacion);

}

function calcularCuotas(montoTotal, plazoEnMeses, tasaAnual) {
    let tasaInteresMensual = (tasaAnual / 12) / 100;
    let cuotaMensual = montoTotal * (tasaInteresMensual / (1 - Math.pow(1 + tasaInteresMensual, -plazoEnMeses)));
    let amortizacion = [];
    
    for (let i = 0; i < plazoEnMeses; i++) {
        let interes = montoTotal * tasaInteresMensual;
        let impuestos = interes * IVA;
        let capital = cuotaMensual - interes;
        let saldo = montoTotal - capital;
    
        amortizacion.push({
        "Número": i + 1,
        "Cuota": moneda.format(cuotaMensual),
        "Intereses": moneda.format(interes),
        "Impuestos": moneda.format(impuestos),
        "Capital": moneda.format(capital),
        "Saldo": moneda.format(saldo)
        });
    
        montoTotal = saldo;
    }
    
    return amortizacion;
}

function mostrarCuotas(amortizacion) {
    columnas = Object.keys(amortizacion[0]);

    const tabla             =   document.createElement('table');
    const cabeceraTabla     =   document.createElement('thead');
    const cuerpoTabla       =   document.createElement('tbody');
    const pieTabla          =   document.createElement('tfoot');
    let fila                =   document.createElement('tr');  

    // Construir encabezado de la tabla

    fila = crearFila(columnas);
    cabeceraTabla.appendChild(fila);

    // Construir el cuerpo de la tabla

    for (cuota of amortizacion) {
        fila = crearFila(Object.values(cuota));
        cuerpoTabla.appendChild(fila);
    }


    tabla.append(cabeceraTabla, cuerpoTabla);

    amortizacionesSection.appendChild(tabla);
}

function crearFila(columnas) {
    let fila =  document.createElement('tr');  
    
    for (columna of columnas) {
        let celda = document.createElement('td');
        let texto = columna;
        let textoCelda = document.createTextNode(texto);

        celda.appendChild(textoCelda);
        fila.appendChild(celda);
    }
    return fila;
}



