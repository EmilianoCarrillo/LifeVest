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


var subirBoton = document.getElementById("Subir");

subirBoton.addEventListener('click', function(){

    //Imagen subida 
    var fotoSubida = document.getElementById('File').files[0];
    var id = uuidv4();
    var path = 'tries/' + id;

    uploadPhoto(fotoSubida, id, path);
});

function comparePhotos(tryImg){
    var photosRef = firebase.database().ref('pacientes/');

    photosRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            var profileImg = childData.img;
          
            var data3 = getFaceAlike(tryImg, profileImg);
            console.log(data3);

            ocultarpaginaprincipal();
            document.getElementById('Out').style.display = "block";

        });
    });
}


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
