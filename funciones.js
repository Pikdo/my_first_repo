/* Rifa de participantes*/

let participantes = [];
let premios = [];
let txtPremios = document.getElementById('txtPremios');
let txtParticipantes = document.getElementById('txtParticipantes');

function cargarInfo(){
    premios = txtPremios.value.split(',');
    participantes = txtParticipantes.value.split(',');
}

function cargarEventos(){
    let btnRifar = document.getElementById("btnRifar");
    btnRifar.addEventListener('click',a=>{
        rifa();
    });
}



function rifa(){
    if(premios.length === 0){
        console.log('Sorteo finalizado, premios agotados :(');
        return;
    }

    randomPremio = Math.round(Math.random() * (premios.length - 1));
    randomGanador = Math.round(Math.random() * (participantes.length - 1));
    
    var premio = premios[randomPremio];
    var ganador = participantes[randomGanador];
    
    console.log(ganador + ' se ha ganado el premio: ' + premio);

    const outGanadores = document.getElementById('outGanadores');
    outGanadores.innerText += ganador + ' ha ganado: ' + premio + '\n';
    
    participantes.splice(participantes.indexOf(ganador),1); 
    premios.splice(premios.indexOf(premio),1); 

    txtPremios.value = premios;
    txtParticipantes.value = participantes;
     
    console.log('Participantes restantes', participantes);
    console.log('Premios restantes', premios);

}

cargarInfo();
cargarEventos();