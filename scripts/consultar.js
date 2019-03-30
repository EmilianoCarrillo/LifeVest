var subirBoton = document.getElementById("Subir");

subirBoton.addEventListener('click', function(){

    //Imagen subida 
    var fotoSubida = document.getElementById('File').files[0];
    var id = uuidv4();
    var path = 'tries/' + id;

    uploadPhoto(fotoSubida, id, path);
});

maxConf=-1;
respuesta=$.Deferred();

var comparePhotos = function (tryImg){
    var photosRef = firebase.database().ref('pacientes/');

    photosRef.once('value', function(snapshot) {

        maxConf=-1;
        respuesta=$.Deferred();

        snapshot.forEach(function(childSnapshot) {
          
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            var profileImg = childData.img;
          
            

            getFaceAlike(childKey, tryImg, profileImg, mostrarInfo)
            ocultarpaginaprincipal();
            document.getElementById('Out').style.display = "block";

            

        });
    });
    return respuesta;
}

var mostrarInfo = function(key){

    console.log(key);

    var foto = document.getElementById("FotoOut");
    var nombre = document.getElementById("NombreOut");
    var  edad = document.getElementById("EdadOut");
    var telefono = document.getElementById("TelefonoOut");
    var direccion = document.getElementById("DireccionOut");
    var genero = document.getElementById("GeneroOut");
    var medicamentos = document.getElementById("MedicamentosOut");
    var tipoSangre = document.getElementById("TipoSangreOut");
    var alergias = document.getElementById("AlergiasOut");
    var enfermedades = document.getElementById("EnfermedadesOut");
    var enfermedadesHer = document.getElementById("EnfermedadesHerOut");
    var fechaInicio = document.getElementById("FechaInicioOut");
    var fechaFin = document.getElementById("FechaFinOut");


    var chosenOne = database.ref('/pacientes/' + key);

    chosenOne.once('value').then(function(snapshot) {
        var finalUser = snapshot.val();
        nombre.innerHTML = finalUser.nombre;
        edad.innerHTML = finalUser.fechaNacimiento;
        telefono.innerHTML = finalUser.telefonosEmergencia.t1.telefono;
        direccion.innerHTML = finalUser.direccion;
        genero.innerHTML = finalUser.sexo;
        medicamentos.innerHTML = finalUser.medicamentos.nombre;
        tipoSangre.innerHTML = finalUser.tipoSangre;
        alergias.innerHTML = finalUser.a1;
        enfermedades = finalUser.enfermedadades.e1;
        enfermedadesHer.innerHTML = finalUser.enfermedadHereditaria.e1;
        fechaInicio.innerHTML = finalUser.fechaInicio;
        fechaFin.innerHTML = finalUser.fechaFin;

        // Get image
        var storage = firebase.storage();
        var pathReference = storage.refFromURL('gs://hackpuebla2019.appspot.com/' + key + '/profile');

        pathReference.getDownloadURL().then(function(url) {
            foto.src = url;
            document.getElementById('ContenedorCargar').style.display = "none";
        }).catch(function(error) {
            console.log(error);
        });
    });

}


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }