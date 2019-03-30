// firebase.database().ref('/pacientes/p1/nombre').once('value').then(function(snapshot) {
//     document.getElementById('title').innerHTML = snapshot.val();
// });



// // Get image
// var storage = firebase.storage();
// var pathReference = storage.ref('Emiliano Carrillo Moncayo/profile.jpg');
// var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/hackpuebla2019.appspot.com/o/Emiliano%20Carrillo%20Moncayo%2Fprofile.jpg?alt=media&token=1125b6e4-cbbf-44b6-9e38-661f89f85255');


// httpsReference.getDownloadURL().then(function(url) {
//     var img = document.getElementById('myImg');
//     img.src = url;
//   }).catch(function(error) {
//     console.log(error);
//   });




var formulario = document.getElementById('FormDatosPaciente');

function registrarPaciente() {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;

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

    console.log(sexo == true);

    database.ref('pacientes/' + 'p2').set({
      nombre: nombre,
      fechaNacimiento: fechaNac,
      direccion: direccion,
      img: foto,
      sexo: sexo,
      telefonosEmergencia: {
        t1:{
            nombre: nombreEm,
            parentesco: parentescoEmergencia,
            telefono: telEmergencia
        }
      },
      tipoSangre: tipoSangre,
      alergias:{
          a1: alergia
      },
      enfermedadades:{
          e1: enfermedad
      },
      enfermedadHereditaria:{
          e1: enfermedadHereditaria
      },
      medicamentos:{
          m1: medicamento
      },
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      fechaActualizacion: today
    });
  }