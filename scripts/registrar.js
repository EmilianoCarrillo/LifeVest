var formulario = document.getElementById('FormDatosPaciente');

function registrarPaciente() {

    //Current Date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    // Form Variables
    var nombre = document.getElementById('NombreIn').value;
    var fechaNac = document.getElementById('FechaNacIn').value;
    var direccion = document.getElementById('DireccionIn').value;
    var foto = document.getElementById('FotoIn').files[0];
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


    // Push to Database
    var newPatientRef =   database.ref('pacientes/').push();
    var path = newPatientRef.key + '/profile';
    uploadPhoto(foto, newPatientRef.key, path, 1);

    newPatientRef.set({
      nombre: nombre,
      fechaNacimiento: fechaNac,
      direccion: direccion,
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

    mostrarinicio();
    ocultarregistro();
  }


function uploadPhoto(file, key, path, type){

    var storageRef = firebase.storage().ref();

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child(path).put(file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
    }, function(error) {

    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
        case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;

        case 'storage/canceled':
        // User canceled the upload
        break;

        case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
    }, function() {
    // Upload completed successfully, now we can get the download URL
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        if(type == 1){
            database.ref('pacientes/' + key + '/img').set(downloadURL);
        }
        else{
            comparePhotos(downloadURL);
        }
    });
    });
  }