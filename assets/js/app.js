//**** DESCRIPCIÓN DE ENTREGA ****/
//** En este desafio #6 - Complementario sobre la base del desafio anterior, agregue un array para almacenar los objetos creados en el contructor. A a su vez aplique mediante un boton en el HTML la posibilidad */
//** de eliminar los items mediante delete seleccionando el numero de item. Aplicando un metodo filter sobre el array, logre verificar la existencia del item antes de su borrado.*/

//**** DECLARACION DE VARIABLES GLOBALES ****/
let confirmacion0 = true;
let confirmacion1 = true; // Confirmacion de creación de Nuevo Item.
let confirmacion2 = true; // Confirmacion de Borrado.
let confirmacion3 = true; // Confirmacion de Ordenamiento.
let itemBorrar = 0; // Variable que almacena el numero de item a borrar ingresado por el usuario.
let itemSeleccionar = 0; // Variable que almacena el numero de item a borrar ingresado por el usuario.
let itemOrdenar = 0; // Variable que almacena el numero de item a borrar ingresado por el usuario.
let itemFiltrar = 0; // Variable que almacena el numero de item a borrar ingresado por el usuario.
let repeticion = 0; // Subindice de repeticion item.
let itemGame; //
const btnDelet = document.querySelector("#btnDelet"); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de borrado, y bootstrap.
let videoJuegos = JSON.parse(localStorage.getItem('videoJuegos')) || []; // Array que almacena los items ingresados por el usuario a modo de objetos.
let idItm = 0; // Inicializo el identificador del item, el cual se incrementara con la creacion de cada objeto.
const btnEjec = document.querySelector("#btnEjec"); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de ejecucion, y bootstrap.
const btnOrder = document.querySelector("#btnOrder"); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de ordenamiento, y bootstrap.

//**** FUNCIONES DE FILTRADO ****//
const filtroPorIdtm = (idItm) => videoJuegos.filter(videoJuego => videoJuego.idItm === idItm);  // Se verifica la existencia del item dentro del array de almacenamiento.
const filtroPorTitulo = (titulo )=> videoJuegos.filter(videoJuego => videoJuego.titulo === titulo); // Se verifica la existencia del item dentro del array de almacenamiento.
const filtroPorPlataforma = (plataforma )=> videoJuegos.filter(videoJuego => videoJuego.plataforma === plataforma); // Se verifica la existencia del item dentro del array de almacenamiento.
const filtroPorGenero = (genero )=> videoJuegos.filter(videoJuego => videoJuego.genero === genero); // Se verifica la existencia del item dentro del array de almacenamiento.
const filtroPorAnio = (anio )=> videoJuegos.filter(videoJuego => videoJuego.anio === anio); // Se verifica la existencia del item dentro del array de almacenamiento.

//***FUNCION DE BUSQUEDA POR IDENTIFICADOR ITEM ****//
const busquedaPorIdtm = (idItm) => videoJuegos.find(videoJuego => videoJuego.idItm === idItm); // Se verifica la existencia del item dentro del array de almacenamiento

//**** FUNCIÓN DE SOLICITUD DE INGRESO DE DATOS ****/
const ingresarDatos = () => {
    let titulo = prompt("Ingrese nombre videojuego.", "MORTAL KOMBAT 4"); // Se solicita nombre videojuego, se carga un valor por defecto para facilitar la revisión del desafio.
    if(titulo === null)  { return {} 
    } else {
     titulo = titulo.toUpperCase()}; // Con fines prácticos, en caso de seleccionar la cancelacion del prompt, se cargara un 'SIN NOMBRE' en la variable.

    let plataforma = prompt("Ingrese plataforma videojuego. [PC]-[XBOX]-[PS]...", "PC"); // Se solicita la plataforma, se carga un valor por defecto para facilitar la revisión del desafio.
    if(plataforma === null)  { return {} 
    } else {
     plataforma = plataforma.toUpperCase()}; // Con fines prácticos, en caso de seleccionar la cancelacion del prompt, se cargara un 'SIN PLATAFORMA' en la variable.
    
    const repeticionTitulo = filtroPorTitulo(titulo);
    const repeticionPlataforma = repeticionTitulo.filter(arrayTitulo => arrayTitulo.plataforma === plataforma);
    
    if((repeticionTitulo.length > 0) && (repeticionPlataforma.length > 0)) {
        confirmacion0 = confirm(`El videojuego ${titulo} para la plataforma ${plataforma}, ya fue ingresado.\nEsta seguro de volver a ingresarlo?`);
        if(confirmacion0 !== true) {
            return {};  
        }
    }

    let genero = prompt("Ingrese genero videojuego. [ACCION]-[AVENTURA]-[FPS]...", "ACCION"); // Se solicita genero, se carga un valor por defecto para facilitar la revisión del desafio.
    if(genero === null)  { return {} 
    } else {
     genero = genero.toUpperCase()}; // Con fines prácticos, en caso de seleccionar la cancelacion del prompt, se cargara un 'SIN GENERO' en la variable.

    let anio = parseInt(prompt("Ingrese año videojuego. [1997]-[2001]-[2019]...", 1997)); // Se solicita año, se carga un valor por defecto para facilitar la revisión del desafio.
    if(isNaN(anio)) { return {} }; // Con fines prácticos, en caso de seleccionar la cancelacion del prompt, se cargara un valor de 0 en la variable.

    let stock = parseInt(prompt("Ingrese stock videojuego.", 120)); // Se solicita stock, se carga un valor por defecto para facilitar la revisión del desafio.
    if(isNaN(stock)) { return {} }; // Con fines prácticos, en caso de seleccionar la cancelacion del prompt, se cargara un valor de 0 en la variable.
    
    repeticion = repeticionPlataforma.length + 1;
    let itemDuplicado
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
    printConsole() {
        // Método impresion en consola de las propiedades y datos de los objetos.
        console.log(
            `%cITEM #${this.idItm} - veces ingresado(${repeticion})`,
            "color: black; font-weight: bold; background:#0f0;"
        ); // Se aplica un poco de estilo al encabezado en consola.
        console.log(
            `TÍTULO: ${this.titulo}\nPLATAFORMA: ${this.plataforma}\nGENERO: ${this.genero}\nAÑO: ${this.anio}\nSTOCK: ${this.stock}\n----------------------------\n`
        );
    }
}


btnEjec.addEventListener("click", () => { // Llamado ejecucion del script mediante click del boton en el HTML.

    //**** RAMA PRINCIPAL DE EJECUCIÓN DEL SCRIPT ****/
    do { // Mediante el do.. while se solicita al menos la creación de un objeto, y se pregunta al usuario si desea continuar con la ejecución.
        const { titulo, plataforma, genero, anio, stock, itemDuplicado } = ingresarDatos(); // Se realiza la desestructuración del objeto literal recibido de la funcion ingresarDatos.
        if (titulo === undefined) { // Se controla que el dato del nombre del video juego no este vacio.
            
            break;
        } else {// Caso contrario:
            if(videoJuegos.length > 0) {
                let ultimoObjeto = [...videoJuegos].pop();
                idItm = ultimoObjeto.idItm;
            } else { idItm = 0;}
            
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
            localStorage.setItem('videoJuegos', JSON.stringify(videoJuegos));
            itemGame.printConsole(); // Se llama el método para la impresion en consola del ojeto.
        }

        confirmacion1 = confirm("Desea ingresar un nuevo item?"); // Se pregunta al usuario si desea continuar con la ejecución del script.
    } while (confirmacion1);
    console.log(
        "%cLISTADO DE ITEMS INGRESADOS",
        "color: white; font-size: 16px; font-weight: bold; background: blue;"
    );
    console.table(videoJuegos); // Se muestra listado (array) en consola con los items en modo tabla.
}); // Cierre alcance ejecución boton de ejecucion en el HTML.


btnDelet.addEventListener("click", () => { // Llamado borrado de items mediante click del boton en el HTML.

    //**** BORRADO DE ITEMS SELECCIONADOS POR EL USUARIO ****/
    do {
        itemBorrar = parseInt(prompt("Ingrese el número de item a borrar")); // Se solicita al usuario el numero de item a borrar.
        if (isNaN(itemBorrar)) { // En caso de cancelacion del borrado, se sale del do... while.
            confirmacion2 = false;
        } else if (busquedaPorIdtm(itemBorrar) !== undefined) { // Si se comprueba la existencia del item a borrar, se procede con el borrado. 
            confirmacion2 = confirm(`Desea quitar item #${itemBorrar} del listado?`); // Se confirma si en verdad se desea borrar.
            videoJuegos = JSON.parse(localStorage.getItem('videoJuegos'));
            let indexItemBorrar = videoJuegos.findIndex(videoJuego => videoJuego.idItm === itemBorrar); // Obtengo el numero de posicion en el array del item a borrar.
            videoJuegos.splice(indexItemBorrar, 1); // Ejecuto el borrado.
            localStorage.setItem('videoJuegos', JSON.stringify(videoJuegos));
            console.table(
                "%cLISTADO DE ITEMS INGRESADOS",
                "color: white; font-size: 16px; font-weight: bold; background: blue;"
            );
            console.table(videoJuegos); // Se muestra nuevo listado (array) en consola sin los items eliminados, en modo tabla.
        } else {
            alert(`El item #${itemBorrar} no existe en el listado`); // Se avisa de la inexistencia del item dentro del listado en el array.
        }
    } while (confirmacion2); // Espera confirmacion de cancelacion del borrado.
}); // Cierre alcance ejecución boton de ejecucion en el HTML.


btnOrder.addEventListener("click", () => { // Llamado ordenamiento de items mediante click del boton en el HTML.
    
    //**** MODO VISUALIZACIÓN: ORDENAR Y FILTRAR ITEMS SEGÚN SELECCIÓN DEL USUARIO ****/
    do{
        itemSeleccionar = parseInt(prompt("Desea\n[1]-Ordenar por Campo\n[2]-Filtrar por Campo")); // Se solicita al usuario el numero de item a borrar.
        copiaVideoJuegos = [ ...videoJuegos];    
        if(isNaN(itemSeleccionar)) {
                confirmacion3 = false
                break;
        };
        switch (itemSeleccionar) {
            case 1:
                itemOrdenar = parseInt(prompt("Elegir Campo a Ordenar\n[1]-Item#\n[2]-Titulo\n[3]-Plataforma\n[4]-Genero\n[5]-Año\n[6]-Stock")); // Se solicita al usuario el numero de item a borrar.
                switch (itemOrdenar){
                    case 1:
                        itemOrdenar = parseInt(prompt("Ordenar Campo Item#\n[1]-Ascendente\n[2]-Descendente"));
                        if(itemOrdenar === 1) {
                            copiaVideoJuegos.sort((a,b) => a.idItm - b.idItm);
                            console.table(copiaVideoJuegos);
                        } else if (itemOrdenar === 2) {
                            copiaVideoJuegos.sort((a,b) => b.idItm - a.idItm);
                            console.table(copiaVideoJuegos);
                        } else { 
                            alert("Operador Invalido" );
                        }
                        break;
                    case 2:
                        itemOrdenar = parseInt(prompt("Ordenar Campo Titulo\n[1]-Ascendente\n[2]-Descendente"));
                        if(itemOrdenar === 1) {
                            copiaVideoJuegos.sort((a,b) => (a.titulo).localeCompare(b.titulo));
                            console.table(copiaVideoJuegos);
                        } else if (itemOrdenar === 2) {
                            copiaVideoJuegos.sort((a,b) => (b.titulo).localeCompare(a.titulo));
                            console.table(copiaVideoJuegos);
                        } else { 
                            alert("Operador Invalido" );
                        }
                        break;
                    case 3:
                        itemOrdenar = parseInt(prompt("Ordenar Campo Plataforma\n[1]-Ascendente\n[2]-Descendente"));
                        if(itemOrdenar === 1) {
                            copiaVideoJuegos.sort((a,b) => (a.plataforma).localeCompare(b.plataforma));
                            console.table(copiaVideoJuegos);
                        } else if (itemOrdenar === 2) {
                            copiaVideoJuegos.sort((a,b) => (b.plataforma).localeCompare(a.plataforma));
                            console.table(copiaVideoJuegos);
                        } else { 
                            alert("Operador Invalido" );
                        }
                        break;
                    case 4:
                        itemOrdenar = parseInt(prompt("Ordenar Campo Genero\n[1]-Ascendente\n[2]-Descendente"));
                        if(itemOrdenar === 1) {
                            copiaVideoJuegos.sort((a,b) => (a.genero).localeCompare(b.genero));
                            console.table(copiaVideoJuegos);
                        } else if (itemOrdenar === 2) {
                            copiaVideoJuegos.sort((a,b) => (b.genero).localeCompare(a.genero));
                            console.table(copiaVideoJuegos);
                        } else { 
                            alert("Operador Invalido" );
                        }
                        break;
                    case 5:
                        itemOrdenar = parseInt(prompt("Ordenar Campo Año\n[1]-Ascendente\n[2]-Descendente"));
                        if(itemOrdenar === 1) {
                            copiaVideoJuegos.sort((a,b) => a.anio - b.anio);
                            console.table(copiaVideoJuegos);
                        } else if (itemOrdenar === 2) {
                            copiaVideoJuegos.sort((a,b) => b.anio - a.anio);
                            console.table(copiaVideoJuegos);
                        } else { 
                            alert("Operador Invalido" );
                        }
                        break;
                    case 6:
                        itemOrdenar = parseInt(prompt("Ordenar Campo Stock\n[1]-Ascendente\n[2]-Descendente"));
                        if(itemOrdenar === 1) {
                            copiaVideoJuegos.sort((a,b) => a.stock - b.stock);
                            console.table(copiaVideoJuegos);
                        } else if (itemOrdenar === 2) {
                            copiaVideoJuegos.sort((a,b) => b.stock - a.stock);
                            console.table(copiaVideoJuegos);
                        } else { 
                            alert("Operador Invalido" );
                        }
                        break;
                    default:
                            alert("Operador Invalido" );
                            break;    
                    }
                    break;
            case 2:
                itemFiltrar = parseInt(prompt("Elegir Campo a Filtrar\n[1]-Item#\n[2]-Titulo\n[3]-Plataforma\n[4]-Genero\n[5]-Año")); // Se solicita al usuario el numero de item a borrar.
                switch (itemFiltrar){
                    case 1:
                        itemFiltrar = parseInt(prompt("Ingresar Item#"))
                        console.table(filtroPorIdtm(itemFiltrar));
                        break;
                    case 2:
                        itemFiltrar = prompt("Ingresar Titulo").toUpperCase()
                        console.table(filtroPorTitulo(itemFiltrar));
                        break;
                    case 3:
                        itemFiltrar = prompt("Ingresar Plataforma [PC]-[XBOX]-[PS]...").toUpperCase()
                        console.table(filtroPorPlataforma(itemFiltrar));
                        break;
                    case 4:
                        itemFiltrar = prompt("Ingresar Genero [ACCION]-[AVENTURA]-[FPS]...").toUpperCase()
                        console.table(filtroPorGenero(itemFiltrar));
                        break;
                    case 5:
                        itemFiltrar = parseInt(prompt("Ingresar Año [1997]-[2001]-[2019]..."))
                        console.table(filtroPorAnio(itemFiltrar));
                        break;
                    default:
                        alert("Operador Invalido" );
                        break;    
                }
                    break;
            default:
                alert("Operador Invalido" );
                break;
        }
        
        confirmacion3 = confirm("Desea continuar?");
        
    } while(confirmacion3); // Espera confirmacion de cancelacion del borrado.
}); // Cierre alcance ejecución boton de ejecucion en el HTML.
