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

// event listeners
prestamoForm.addEventListener('submit', simularPrestamo);

// MAIN

function simularPrestamo(event) {
    event.preventDefault();

    montoTotal      =   parseFloat(document.querySelector('#monto').value);
    tasaAnual       =   parseFloat(document.querySelector('#interes').value);
    plazoEnMeses    =   parseInt(document.querySelector('#plazo').value);

    const amortizaciones = calcularCuotas(montoTotal, plazoEnMeses, tasaAnual);

    console.table(amortizaciones);

}

function calcularCuotas(montoTotal, plazoEnMeses, tasaAnual) {
    let tasaInteresMensual = (tasaAnual / 12) / 100;
    let cuotaMensual = montoTotal * (tasaInteresMensual / (1 - Math.pow(1 + tasaInteresMensual, -plazoEnMeses)));
    let amortizaciones = [];
    
    for (let i = 0; i < plazoEnMeses; i++) {
        let interes = montoTotal * tasaInteresMensual;
        let impuestos = interes * IVA;
        let capital = cuotaMensual - interes;
        let saldo = montoTotal - capital;
    
        amortizaciones.push({
        "numero": i + 1,
        "cuota": moneda.format(cuotaMensual),
        "intereses": moneda.format(interes),
        "impuestos": moneda.format(impuestos),
        "capital": moneda.format(capital),
        "saldo": moneda.format(saldo)
        });
    
        montoTotal = saldo;
    }
    
    return amortizaciones;
}