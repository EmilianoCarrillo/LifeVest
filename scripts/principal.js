$(document).ready(inicio);

var btnregistrar = document.getElementById("RegistrarPrincipal");
var btnGuardar = document.getElementById("Guardar");
var btnCancelar = document.getElementById("Cancelar");


function inicio(){

    btnregistrar.addEventListener('click', () =>{
        ocultarpaginaprincipal();
        mostrarregistro();
    });

    btnGuardar.addEventListener('click', ()=>{
        validarcampos();

        

    });

    btnCancelar.addEventListener('click', ()=>{
        mostrarinicio();
        ocultarregistro();

    });


}

function ocultarpaginaprincipal(){

    $("#Principal").css("display", "none");
    $("#ContenidoPrincipal").css("display", "none");
    $("#RegistrarPrincipal").css("display", "none");

    
}

function mostrarregistro(){
    $("#FormDatosPaciente").css("display", "block");
}

function mostrarinicio(){

    $("#Principal").css("display", "block");
    $("#ContenidoPrincipal").css("display", "block");
    $("#RegistrarPrincipal").css("display", "block");

}

function ocultarregistro(){
    $("#FormDatosPaciente").css("display", "none");
}

function validarcampos(){
    $("#FormDatosPaciente").validate({

        rules:{
            nombre: 'required',
            fechanac:{
                requerided: true,
                date: true
            },
            direccion:{
                requerided: true,
                minlenght:10,
                maxlenght:100
            },

        },
        messages:{
            nombre:{
                requerided: "Campo obligatorio",
            },
            fechanac:{
                requerided: "Campo obligatorio",
                date: "Ingrese una fecha valida"
            },
            direccion:{
                requerided: "Campo Obligatorio",
                minlenght: "Ingrese una direccion valida",
                maxlenght: "Ingrese menos caracteres"
            },

        }

    });
}
