export function getFecha() {
    // Obtener la fecha actual
    let fechaActual = new Date();

    // Obtener día, mes y año
    let dia = fechaActual.getDate();
    let mes = fechaActual.getMonth() + 1;
    let anio = fechaActual.getFullYear();

    // Formatear para obtener dd/mm/yyyy
    if (dia < 10) {
        dia = '0' + dia;
    }

    if (mes < 10) {
        mes = '0' + mes;
    }

    let fechaFormateada = dia + '/' + mes + '/' + anio;

    return fechaFormateada;
}