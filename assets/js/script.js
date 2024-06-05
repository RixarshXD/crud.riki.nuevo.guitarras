import { actualizarGuitarra, eliminarGuitarra, obtenerGuitarras, registrarGuitarra } from "./promesas.js";

window.addEventListener('load',()=>{
    document.getElementById('btnRegistrar').addEventListener('click',registrar);
    traerDatos();
    document.getElementById('btnActualizar').addEventListener('click',actualizar);
});



const traerDatos = () =>{
    obtenerGuitarras().then((guitarras)=>{
        let estructura = '';
        console.log(guitarras);
        guitarras.forEach((g)=>{

            estructura += '</td>';

            estructura += '<td>'+g.modelo+'</td>';
            estructura += '<td>'+g.cuerdas+'</td>';
            estructura += '<td>'+g.color+'</td>';
            estructura += '<td>'+g.puente+'</td>';
            estructura += '<td>'+g.trastes+'</td>';

            estructura += '<td><button id="UPD'+g.id+'">actualizar</button></td>'
            estructura += '<td><button id="DEL'+g.id+'">eliminar</button></td>'

            estructura += '</tr>';
        });
        console.log(estructura);
        document.getElementById('tbGuitarras').innerHTML = estructura;
        guitarras.forEach((g)=>{
            let elemento = document.getElementById('UPD'+g.id);
            elemento.addEventListener('click',()=>{

                document.getElementById('UPDmodelo').value = g.modelo;
                document.getElementById('UPDcuerdas').value = g.cuerdas;
                document.getElementById('UPDcolor').value = g.color;
                document.getElementById('UPDpuente').value = g.puente;
                document.getElementById('UPDtrastes').value = g.trastes;
                document.getElementById('btnActualizar').value = g.id


            });
            let elementoEliminar = document.getElementById('DEL'+g.id);
            elementoEliminar.addEventListener('click',()=>{
                eliminar(g.id);
            });
        });
    }).catch((e)=>{
        console.log(e)
    });
}

const eliminar = (id) => {
    eliminarGuitarra(id).then(()=>{
        alert('se ha eliminado la guitarra con exito');
        traerDatos();
    }).catch((e)=>{
        console.log(e);
    });
};


const registrar = () =>{

    // recuperar los id de los inputs y guardarlos como elementos
    let eModelo = document.getElementById('modelo');
    let eCuerdas = document.getElementById('cuerdas');
    let eColor = document.getElementById('color');
    let ePuente = document.getElementById('puente');
    let eTrastes = document.getElementById('trastes');

    let vModelo = eModelo.value;
    let vCuerdas = eCuerdas.value;
    let vColor = eColor.value;
    let vPuente = ePuente.value;
    let vTrastes = eTrastes.value;

    let objeto = {
        modelo:vModelo,
        cuerdas:vCuerdas,
        color:vColor,
        puente:vPuente,
        trastes:vTrastes
    }
    registrarGuitarra(objeto).then(()=>{
        alert('se ha registrado la guitarra con exito');
        traerDatos();
    }).catch((e)=>{
        console.log(e)
    })
};

const actualizar = () =>{
    let eModelo = document.getElementById('UPDmodelo');
    let eCuerdas = document.getElementById('UPDcuerdas');
    let eColor = document.getElementById('UPDcolor');
    let ePuente = document.getElementById('UPDpuente');
    let eTrastes = document.getElementById('UPDtrastes');

    let vModelo = eModelo.value;
    let vCuerdas = eCuerdas.value;
    let vColor = eColor.value;
    let vPuente = ePuente.value;
    let vTrastes = eTrastes.value;

    let objeto = {
        modelo:vModelo,
        cuerdas:vCuerdas,
        color:vColor,
        puente:vPuente,
        trastes:vTrastes
    }

    let id = document.getElementById('btnActualizar').value;
    actualizarGuitarra(objeto,id).then(()=>{
        alert('se actualizo la guitarra')
        traerDatos();
    }).catch((e)=>{
        console.log(e)
    })
}