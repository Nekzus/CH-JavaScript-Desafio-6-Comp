//**** DESCRIPCIÓN DE ENTREGA ****/
//** En este desafio #6 - Complementario sobre la base del desafio anterior, agregue un módulo de visualización (consulta) en el cual el usuario puede ordenar por los campos del listado de los */
//** items ingresados (método sort), ademas de poder realizarles filtrado (método filter). Aplique a esta entrega del desafio, lo aprendido en la clase 7. Utilice el localStorage junto con JSON para almacenar */
//** el listado de items, el cual se actualiza con el ingreso o borrado de cada item. Para el modo visualización (consulta), el usuario accede a una copia de lo almacenado en el localStorage, para que pueda */
//** manipular loa campos sin afectar ni modificar la base de datos almacenada. Aproveche para optimizar un poco el código que ya tenia cargado. */

//**** DECLARACION DE VARIABLES GLOBALES ****/
let confirmacion0 = true; // Confirmacion de  duplicación de item ingresado, con fines prácticos permito la duplicación. Inicialización.
let confirmacion1 = true; // Confirmacion de creación de Nuevo Item. Inicialización.
let confirmacion2 = true; // Confirmacion de Borrado Item. Inicialización.
let confirmacion3 = true; // Confirmacion continuar Ordenamiento-Filtrado en modo visualización de una copia del listado de Items. Inicialización.
let itemBorrar = 0; // Variable que almacena el numero de item a borrar ingresado por el usuario. Inicialización.
let itemOrdenar = 0; // Variable que guarda campo silicitado al usuario para ordenar campos. Inicialización.
let itemFiltrar = 0; // Variable que guarda campo silicitado al usuario para filtrar campos. Inicialización.
let repeticion = 0; // Subindice de repeticion item. Inicialización.
let itemGame; // Variable que almacena nuevo objeto/item a ingresar en el array de videoJuegos.
const btnDelet = document.querySelector("#btnDelet"); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de borrado, y bootstrap.
let videoJuegos = JSON.parse(localStorage.getItem('videoJuegos')) || []; // Array que almacena los items ingresados por el usuario a modo de objetos. Se realiza lectura del array almacenado en localStorage.
let idItm = 0; // Inicializo el identificador del item, el cual se incrementara con la creacion de cada objeto.
const btnEjec = document.querySelector("#btnEjec"); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de ejecucion, y bootstrap.
const btnOrder = document.querySelector("#btnOrder"); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de ordenamiento - filtrado, y bootstrap.

//**** FUNCIONES DE FILTRADO DATOS ITEMS ****//
const filtroPorIdtm = (idItm) => videoJuegos.filter(videoJuego => videoJuego.idItm === idItm);  // Filtrado sobre objetos del array videoJuegos por el campo identificador del item.
const filtroPorTitulo = (titulo )=> videoJuegos.filter(videoJuego => videoJuego.titulo === titulo); // Filtrado sobre objetos del array videoJuegos por el campo titulo del item.
const filtroPorPlataforma = (plataforma )=> videoJuegos.filter(videoJuego => videoJuego.plataforma === plataforma); // Filtrado sobre objetos del array videoJuegos por el campo plataforma del item.
const filtroPorGenero = (genero )=> videoJuegos.filter(videoJuego => videoJuego.genero === genero); // Filtrado sobre objetos del array videoJuegos por el campo genero del item.
const filtroPorAnio = (anio )=> videoJuegos.filter(videoJuego => videoJuego.anio === anio); // Filtrado sobre objetos del array videoJuegos por el campo año del item.

//*** FUNCION DE BUSQUEDA POR IDENTIFICADOR ITEM ****//
const busquedaPorIdtm = (idItm) => videoJuegos.find(videoJuego => videoJuego.idItm === idItm); // Se verifica la existencia del item dentro del array videoJuegos almacenado.

//**** FUNCIÓN DE SOLICITUD DE INGRESO DE DATOS ****/
const ingresarDatos = () => {
    let titulo = prompt("Ingrese nombre videojuego.", "MORTAL KOMBAT 4"); // Se solicita nombre videojuego, se carga un valor por defecto para facilitar la revisión del desafio.
    if(titulo === null)  { return {} // En caso de cancelar el ingreso se retorna funcion.
    } else {
     titulo = titulo.toUpperCase()}; // Caso contrario continua ingreso de titulo.

    let plataforma = prompt("Ingrese plataforma videojuego. [PC]-[XBOX]-[PS]...", "PC"); // Se solicita la plataforma, se carga un valor por defecto para facilitar la revisión del desafio.
    if(plataforma === null)  { return {} // En caso de cancelar el ingreso se retorna funcion.
    } else {
     plataforma = plataforma.toUpperCase()}; // Caso contrario continua ingreso de plataforma.
    
    const repeticionTitulo = filtroPorTitulo(titulo); // Se filtra en array con el titulo ingresado, se guarda nuevo array en repeticionTitulo.
    const repeticionPlataforma = repeticionTitulo.filter(arrayTitulo => arrayTitulo.plataforma === plataforma); // Se filtra en nuevo array con la plataforma ingresada, se guarda nuevo array en repeticionPlataforma.
    
    if(repeticionPlataforma.length > 0) { // Si se verifica igualdad de titulo y plataforma en el array almacenado, el item ya fue ingresado.
        confirmacion0 = confirm(`El videojuego ${titulo} para la plataforma ${plataforma}, ya fue ingresado.\nEsta seguro de volver a ingresarlo?`); // Confirmacion de  duplicación de item ingresado, con fines prácticos permito la duplicación.
        if(confirmacion0 !== true) { // Si se cancela confirmación, retorna función.
            return {};  
        }
    }

    let genero = prompt("Ingrese genero videojuego. [ACCION]-[AVENTURA]-[FPS]...", "ACCION"); // Se solicita genero, se carga un valor por defecto para facilitar la revisión del desafio.
    if(genero === null)  { return {} // En caso de cancelar el ingreso se retorna funcion.
    } else {
     genero = genero.toUpperCase()}; // Caso contrario continua ingreso de genero.

    let anio = parseInt(prompt("Ingrese año videojuego. [1997]-[2001]-[2019]...", 1997)); // Se solicita año, se carga un valor por defecto para facilitar la revisión del desafio.
    if(isNaN(anio)) { return {} }; // En caso de cancelar el ingreso se retorna funcion.

    let stock = parseInt(prompt("Ingrese stock videojuego.", 120)); // Se solicita stock, se carga un valor por defecto para facilitar la revisión del desafio.
    if(isNaN(stock)) { return {} }; // En caso de cancelar el ingreso se retorna funcion.
    
    repeticion = repeticionPlataforma.length + 1; // Contabilizo la cantidad de repeticiones de un item (aplicable al contador de productos de un carrito, al repetir producto). 
    let itemDuplicado // Creo una variable para guardar como propiedad de los objetos en el array almacenable, el cual indicara si el item es duplicado.
    repeticion >= 2 ? itemDuplicado = true : itemDuplicado= false;

    return { titulo, plataforma, genero, anio, stock, itemDuplicado }; // Retorna mediante un objeto literal los datos ingresados.
};

//**** OBJECT CONSTRUCTOR ****/
class VideoJuego {
    constructor(idItm, titulo, plataforma, genero, anio, stock, itemDuplicado) { // Recibe los datos ingresados por prompts.
        this.idItm = idItm;
        this.titulo = titulo;
        this.plataforma = plataforma;
        this.genero = genero;
        this.anio = anio;
        this.stock = stock;
        this.duplicado = itemDuplicado;
    }
    printConsole() { // Método impresion en consola de las propiedades y datos de los objetos.
        console.log(
            `%cITEM #${this.idItm} - veces ingresado(${repeticion})`,
            "color: black; font-weight: bold; background:#e17b2a;"); // Se aplica un poco de estilo al encabezado en consola.
        console.log(
            `TÍTULO: ${this.titulo}\nPLATAFORMA: ${this.plataforma}\nGENERO: ${this.genero}\nAÑO: ${this.anio}\nSTOCK: ${this.stock}\n----------------------------\n`
        );
    }
}


btnEjec.addEventListener("click", () => { // Llamado ingreso de items mediante click del boton en el HTML.

    //**** MODO MODIFICACIÓN: INGRESO DE ITEMS ****//
    do { // Mediante el do.. while se solicita al menos la creación de un objeto, y se pregunta al usuario si desea continuar con la ejecución.
        const { titulo, plataforma, genero, anio, stock, itemDuplicado } = ingresarDatos(); // Se realiza la desestructuración del objeto literal recibido de la funcion ingresarDatos.
        if (titulo === undefined) { // Ante posible cancelación ingreso de titulo, se verifica si se recibe undefined.     
            break; // Se sale.
        } else {// Caso contrario:
            if(videoJuegos.length > 0) { // Se verifica que el array almacenado no este vacio.
                let ultimoObjeto = [...videoJuegos].pop(); // Se crea copia de array almacenado para extraer ultimo objeto-item.
                idItm = ultimoObjeto.idItm; // Se obtiene el identificador del ultimo item almacenado.
            } else { idItm = 0;} // caso contrario se inicializa con 0 el identificador del nuevo item a ingresar.
            
            idItm++ // ... se incrementa el identificador del item (declarado en forma global), y se envia junto con los demas datos al constructor.
            itemGame = new VideoJuego(
                idItm,
                titulo,
                plataforma,
                genero,
                anio,
                stock,
                itemDuplicado
            ); // Nuevo objeto creado.
            videoJuegos.push(itemGame);
            localStorage.setItem('videoJuegos', JSON.stringify(videoJuegos)); // Se almacena en el localStorage el nuevo objeto-item creado.
            itemGame.printConsole(); // Se llama el método para la impresion en consola del ojeto.
        }

        confirmacion1 = confirm("Desea ingresar un nuevo item?"); // Confirmacion de creación de Nuevo Item.
    } while (confirmacion1); 
    console.log( // En caso de cancelar confirmación de Nuevo Item se imprime en consola el listado de los items almacenados.
        "%cLISTADO DE ITEMS INGRESADOS",
        "color: white; font-size: 16px; font-weight: bold; background: blue;"
    );
    console.table(videoJuegos); // Se muestra listado (array) en consola con los items en modo tabla.
}); // Cierre alcance ejecución boton de ejecucion en el HTML.


btnDelet.addEventListener("click", () => { // Llamado borrado de items mediante click del boton en el HTML.

    //**** MODO MODIFICACIÓN: BORRADO DE ITEMS SELECCIONADOS POR EL USUARIO ****/
    do {
        itemBorrar = parseInt(prompt("Ingrese el número de item a borrar")); // Se solicita al usuario el numero de item a borrar.
        if (isNaN(itemBorrar)) { // En caso de cancelacion del borrado, se sale del do... while.
            confirmacion2 = false;
        } else if (busquedaPorIdtm(itemBorrar) !== undefined) { // Si se comprueba la existencia del item a borrar, se procede con el borrado. 
            confirmacion2 = confirm(`Desea quitar item #${itemBorrar} del listado?`); // Se confirma si en verdad se desea borrar el item.
            videoJuegos = JSON.parse(localStorage.getItem('videoJuegos')); // Se lee el array almacenado en el localStorage.
            let indexItemBorrar = videoJuegos.findIndex(videoJuego => videoJuego.idItm === itemBorrar); // Se obtiene el numero de posicion en el array del item a borrar.
            videoJuegos.splice(indexItemBorrar, 1); // Se ejecuta el borrado.
            localStorage.setItem('videoJuegos', JSON.stringify(videoJuegos)); // Se almacena el array con el item borrado.
            console.table( // Se imprime en consola el array actualizado con los items eliminados.
                "%cLISTADO DE ITEMS INGRESADOS",
                "color: white; font-size: 16px; font-weight: bold; background: blue;"
            );
            console.table(videoJuegos); // Se muestra nuevo listado (array) en consola sin los items eliminados, en modo tabla.
        } else {
            alert(`El item #${itemBorrar} no existe en el listado`); // si el item a borrar no existe, se avisa de la inexistencia del item dentro del listado en el array.
        }
    } while (confirmacion2); // Espera confirmacion de cancelacion del borrado.
}); // Cierre alcance ejecución boton de ejecucion en el HTML.


btnOrder.addEventListener("click", () => { // Llamado ordenamiento de items mediante click del boton en el HTML.
    
    //**** MODO VISUALIZACIÓN: ORDENAR Y FILTRAR ITEMS SEGÚN SELECCIÓN DEL USUARIO ****/
    do{
        itemOrdenar = parseInt(prompt("Desea\n[1]-Ordenar por Campo\n[2]-Filtrar por Campo")); // Se solicita al usuario seleccione ordenar o filtar campos.
        copiaVideoJuegos = [ ...videoJuegos]; // Se realiza una copia del array almacenado, para manipular los datos sin afectar el array original. 
        if(isNaN(itemOrdenar)) { // Si se cancela ingreso.
                confirmacion3 = false // Se sale del do... while.
                break;
        };
        switch (itemOrdenar) {
            case 1:     // Se elige Ordenar por Campo
                itemOrdenar = parseInt(prompt("Elegir Campo a Ordenar\n[1]-Item#\n[2]-Titulo\n[3]-Plataforma\n[4]-Genero\n[5]-Año\n[6]-Stock")); // Se solicita al usuario el campo a ordenar.
                switch (itemOrdenar){
                    case 1:     // Se elige Item#.
                        itemOrdenar = parseInt(prompt("Ordenar Campo Item#\n[1]-Ascendente\n[2]-Descendente")); // Se solicita al usuario el tipo de orden.
                        if(itemOrdenar === 1) { // Si selecciono [1] orden ascendente.
                            copiaVideoJuegos.sort((a,b) => a.idItm - b.idItm); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden ascendente en la consola.
                        } else if (itemOrdenar === 2) { // Si selecciono [2] orden descendente.
                            copiaVideoJuegos.sort((a,b) => b.idItm - a.idItm); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden descendente en la consola. 
                        } else { 
                            alert("Operador Invalido" ); // Alerta en caso de ingresar una selección no valida.
                        }
                        break;
                    case 2:      // Se elige Titulo.
                        itemOrdenar = parseInt(prompt("Ordenar Campo Titulo\n[1]-Ascendente\n[2]-Descendente")); // Se solicita al usuario el tipo de orden.
                        if(itemOrdenar === 1) { // Si selecciono [1] orden ascendente.
                            copiaVideoJuegos.sort((a,b) => (a.titulo).localeCompare(b.titulo)); // Aplico método sort. 
                            console.table(copiaVideoJuegos); // Se imprime orden ascendente en la consola.
                        } else if (itemOrdenar === 2) { // Si selecciono [2] orden descendente.
                            copiaVideoJuegos.sort((a,b) => (b.titulo).localeCompare(a.titulo)); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden descendente en la consola.
                        } else { 
                            alert("Operador Invalido" ); // Alerta en caso de ingresar una selección no valida.
                        }
                        break;
                    case 3:      // Se elige Plataforma.
                        itemOrdenar = parseInt(prompt("Ordenar Campo Plataforma\n[1]-Ascendente\n[2]-Descendente")); // Se solicita al usuario el tipo de orden.
                        if(itemOrdenar === 1) { // Si selecciono [1] orden ascendente.
                            copiaVideoJuegos.sort((a,b) => (a.plataforma).localeCompare(b.plataforma)); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden ascendente en la consola.
                        } else if (itemOrdenar === 2) { // Si selecciono [2] orden descendente.
                            copiaVideoJuegos.sort((a,b) => (b.plataforma).localeCompare(a.plataforma)); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden descendente en la consola.
                        } else { 
                            alert("Operador Invalido" ); // Alerta en caso de ingresar una selección no valida.
                        }
                        break;
                    case 4:      // Se elige Genero.
                        itemOrdenar = parseInt(prompt("Ordenar Campo Genero\n[1]-Ascendente\n[2]-Descendente")); // Se solicita al usuario el tipo de orden.
                        if(itemOrdenar === 1) { // Si selecciono [1] orden ascendente.
                            copiaVideoJuegos.sort((a,b) => (a.genero).localeCompare(b.genero)); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden ascendente en la consola.
                        } else if (itemOrdenar === 2) { // Si selecciono [2] orden descendente.
                            copiaVideoJuegos.sort((a,b) => (b.genero).localeCompare(a.genero)); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden descendente en la consola.
                        } else { 
                            alert("Operador Invalido" ); // Alerta en caso de ingresar una selección no valida.
                        }
                        break;
                    case 5:      // Se elige Año.
                        itemOrdenar = parseInt(prompt("Ordenar Campo Año\n[1]-Ascendente\n[2]-Descendente")); // Se solicita al usuario el tipo de orden.
                        if(itemOrdenar === 1) { // Si selecciono [1] orden ascendente.
                            copiaVideoJuegos.sort((a,b) => a.anio - b.anio); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden ascendente en la consola.
                        } else if (itemOrdenar === 2) { // Si selecciono [2] orden descendente.
                            copiaVideoJuegos.sort((a,b) => b.anio - a.anio); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden descendente en la consola.
                        } else { 
                            alert("Operador Invalido" ); // Alerta en caso de ingresar una selección no valida.
                        }
                        break;
                    case 6:       // Se elige Stock.
                        itemOrdenar = parseInt(prompt("Ordenar Campo Stock\n[1]-Ascendente\n[2]-Descendente")); // Se solicita al usuario el tipo de orden.
                        if(itemOrdenar === 1) { // Si selecciono [1] orden ascendente.
                            copiaVideoJuegos.sort((a,b) => a.stock - b.stock); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden ascendente en la consola.
                        } else if (itemOrdenar === 2) { // Si selecciono [2] orden descendente.
                            copiaVideoJuegos.sort((a,b) => b.stock - a.stock); // Aplico método sort.
                            console.table(copiaVideoJuegos); // Se imprime orden descendente en la consola.
                        } else { 
                            alert("Operador Invalido" ); // Alerta en caso de ingresar una selección no valida.
                        }
                        break;
                    default:
                            alert("Operador Invalido" ); // Alerta en caso de ingresar una selección no valida.
                            break;    
                    }
                    break;
            case 2:     // Se elige Filtrar por Campo
                itemFiltrar = parseInt(prompt("Elegir Campo a Filtrar\n[1]-Item#\n[2]-Titulo\n[3]-Plataforma\n[4]-Genero\n[5]-Año")); // Se solicita al usuario el campo a filtrar.
                switch (itemFiltrar){
                    case 1:       // Se elige Item#.
                        itemFiltrar = parseInt(prompt("Ingresar Item#")); // Se solicita a usuario ingrese número de identificador.
                        console.table(filtroPorIdtm(itemFiltrar)); // Se ejecuta la funcion filtrar por identificador de item.
                        break;
                    case 2:       // Se elige Titulo.
                        itemFiltrar = prompt("Ingresar Titulo").toUpperCase(); // Se solicita a usuario ingrese titulo.
                        console.table(filtroPorTitulo(itemFiltrar)); // Se ejecuta la funcion filtrar por titulo.
                        break;
                    case 3:       // Se elige Plataforma.
                        itemFiltrar = prompt("Ingresar Plataforma [PC]-[XBOX]-[PS]...").toUpperCase(); // Se solicita a usuario ingrese plataforma.
                        console.table(filtroPorPlataforma(itemFiltrar)); // Se ejecuta la funcion filtrar por plataforma.
                        break;
                    case 4:       // Se elige Genero
                        itemFiltrar = prompt("Ingresar Genero [ACCION]-[AVENTURA]-[FPS]...").toUpperCase(); // Se solicita a usuario ingrese genero.
                        console.table(filtroPorGenero(itemFiltrar)); // Se ejecuta la funcion filtrar por genero.
                        break;
                    case 5:       // Se elige Año.
                        itemFiltrar = parseInt(prompt("Ingresar Año [1997]-[2001]-[2019]...")); // Se solicita a usuario ingrese año.
                        console.table(filtroPorAnio(itemFiltrar)); // Se ejecuta la funcion filtrar por año.
                        break;
                    default:
                        alert("Operador Invalido" ); // Alerta en caso de ingresar una selección no valida.
                        break;    
                }
                    break;
            default:
                alert("Operador Invalido" ); // Alerta en caso de ingresar una selección no valida.
                break;
        }
        
        confirmacion3 = confirm("Desea continuar?"); // Confirmacion continuar Ordenamiento-Filtrado en modo visualización.
        
    } while(confirmacion3); // Espera confirmacion de cancelacion del modo visualización.
}); // Cierre alcance ejecución boton de ejecucion en el HTML.
