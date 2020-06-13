/* Rifa de participantes*/

let participantes = ['alejandro','tatti', 'paulo', 'stephanie', 'gina', 'juan', 'goku', 'maría'];

let premios = ['cepillo', 'TV', 'Celular', 'Botella', 'USB', 'iWatch'];

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
    
     participantes.splice(participantes.indexOf(ganador),1); 
     premios.splice(premios.indexOf(premio),1); 

     console.log('Participantes restantes', participantes);
     console.log('Premios restantes', premios);
}
