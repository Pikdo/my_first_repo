/* Rifa de participantes*/
/**
 * modRifa modulo creado para realizar rifas de una lista de premios y participantes.
 */
var modRifa = (function(){
    let participantes, premios = [];   
    let txtPremios, txtParticipantes;
    let btnRifar = document.getElementById("btnRifar");
    let btnReiniciar = document.getElementById("btnReiniciar");
    let outGanadores = document.getElementById('outGanadores');
    let isIniciado = false;

    /**
     * Función para iniciar el módulo
     */
    function iniciar(){
        cargarEventos();
    }
    /**
     * Función para reiniciar la rifa
     */
    function reiniciar(){
        txtPremios.value = "";
        txtParticipantes.value = "";
        outGanadores.value = "";
        btnRifar.disabled = false;
        btnReiniciar.disabled = true;
    }
    /**
     * Función para cargar la información de los premios y participantes
     */
    async function cargarInfo(){

        return new Promise(function(success, error){
            txtPremios = document.getElementById('txtPremios');
            txtParticipantes = document.getElementById('txtParticipantes');

            premios = (txtPremios.value != "")?txtPremios.value.split(','):[];
            participantes = (txtParticipantes.value != "")? txtParticipantes.value.split(','):[];
            success();
        });
        
    }
    /**
     * Función para cargar los eventos
     */
    function cargarEventos(){       
        btnRifar.addEventListener('click',a=>{rifa()});
        btnReiniciar.addEventListener('click', b=>{reiniciar()});
    }

    /**
     * Función para validar los elementos de la rifa
     */
    function validarRifa(){

        if(isIniciado == false){
            if(txtPremios.value == 0){
                throw new Error("Defina los premios, separados por coma");                
            }else if (participantes.length == 0){
                throw new Error("Defina los participantes, separados por coma");                
            }
            else {
                isIniciado = true;
                btnReiniciar.disabled = false;
            }
        }else{
            if(premios.length == 0){
                btnRifar.disabled = true;
                throw new Error('Sorteo finalizado, premios agotados,\n !..:.: FELICIDAES A LOS GANADORES :.:..!');
            }
        }
    }
    /**
     * Función para generar un color aleatorio
     */
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    /**
     * Función que genera la animación de la rifa
     */
    async function animacionRifa(){
        let intervalo = setInterval(function(){
            let numero = Math.round(Math.random() * (participantes.length - 1));            
            btnRifar.value = participantes[numero];
            btnRifar.style.backgroundColor = getRandomColor();
        }, 100);

        return new Promise(function(success, error){
            setTimeout(function(){
                clearInterval(intervalo);
                success();
             }, 3000);
        });        
    }

    /**
     * Función para sacar un elemento aleatorio de una lista
     * @param lista 
     * @param txtInput
     */
    function sacarElemento(lista, txtInput){     
        // Obtiene Numero random según lista (array)
        let numero = Math.round(Math.random() * (lista.length - 1)); 
        
        let elegido = lista[numero];
        if(elegido == 'undefined'){
            throw new Error('Ya no hay elementos para seleccionar en' || lista.constructor.name);
        }

        lista.splice(lista.indexOf(elegido),1);
       
        txtInput.value = lista;
        return elegido;
    }
    /**
     * Función para realizar una rifa
     */
    async function rifa(){
        let randomPremio, randomGanador;
        try {            
            await cargarInfo();
    
            validarRifa();

            await animacionRifa().then(function(){ btnRifar.value = "Rifar"; });

            let premio = sacarElemento(premios, txtPremios);
            let ganador = sacarElemento(participantes, txtParticipantes);
                                 
            outGanadores.innerText += ganador + ' ha ganado: ' + premio + '\n';         
            
        } catch (error) {
            alert(error.message);
        }        

    }

    return {
        iniciar
    };

})();

modRifa.iniciar();