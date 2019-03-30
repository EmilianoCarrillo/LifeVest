$(document).ready(inicio);

//Botones

var btnregistrar = document.getElementById("RegistrarPrincipal");
var btnGuardar = document.getElementById("Guardar");
var btnCancelar = document.getElementById("Cancelar");
var BtnPersonal = document.getElementById("BtnPersonal");
var BtnHistorial = document.getElementById("BtnHistorial");

var flecha = document.getElementById("Regresar");

//Datos del Formulario
var nombre = document.getElementById('NombreIn').value;
var fechaNac = document.getElementById('FechaNacIn').value;
var direccion = document.getElementById('DireccionIn').value;
var foto = document.getElementById('FotoIn');
var sexo = document.getElementById('SexoMIn');
var nombreEm = document.getElementById('NombreEmergenciaIn').value;
var telEmergencia = document.getElementById('TelEmergenciaIn').value;
var parentescoEmergencia = document.getElementById('ParentescoEmergenciaIn').value;
var tipoSangre = document.getElementById('TipoSangreIn').value;
var alergia = document.getElementById('AlergiaIn').value;
var enfermedad = document.getElementById('EnfermedadIn').value;
var enfermedadHereditaria = document.getElementById('EnfermedadHereditariaIn').value;
var medicamento = document.getElementById('MedicamentoIn').value;
var fechaInicio = document.getElementById('FechaInicioIn').value;
var fechaFin = document.getElementById('FechaFinIn').value;



function inicio(){

    var bandera = validar();

    console.log(bandera);
    

    mostrardatospersonales();
    mostrarhistorial();
    regresarflecha();


    btnregistrar.addEventListener('click', () =>{
        ocultarpaginaprincipal();
        mostrarregistro();
    });


    

    btnGuardar.addEventListener('click', ()=>{
        console.log(bandera);
    
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

function mostrardatospersonales(){

    BtnPersonal.addEventListener('click', ()=>{
        $("#PersonalOut").css("display", "block");
        $("#HistorialOut").css("display", "none");

    });
}

function mostrarhistorial(){
    BtnHistorial.addEventListener('click', ()=>{
        $("#PersonalOut").css("display", "none");
        $("#HistorialOut").css("display", "block");

        $("#BtnHistorial").addClass( "seleccionado");
    });
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

function validar(){

    if(nombre==" " || fechaNac==" " || direccion==" " || sexo=="" ||
    nombreEm == " " || telEmergencia == " " || parentescoEmergencia ==" " ||
    tipoSangre==" " || alergia==" " || enfermedad == "", enfermedadHereditaria == " " || 
    medicamento == " " || fechaInicio == " " || fechaFin == ""){
        return false;
    }

    else{
        return true;
    }

}

var masculino;
var femenino;

function genero(cadena){    
    if(cadena=="F"){
        femenino="Femenino";
    }else{
        masculino="Masculino";
    }
}

function regresarflecha(){
    flecha.addEventListener('click', ()=>{
        mostrarinicio();
        $("#Out").css("display", "none");
    });
}

function cargando(){
    PushSubscription.addEventListener("click", ()=>{

    });
}