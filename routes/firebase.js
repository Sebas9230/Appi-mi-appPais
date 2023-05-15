const admin = require('firebase-admin');




// Ruta al archivo de configuración de Firebase (descargado desde la consola de Firebase)

const rutaArchivoCredenciales = "../ingenieriaweb-8a680-firebase-adminsdk-d5d1c-53abd34b18.json";




// Configurar las credenciales de Firebase

const credenciales = require(rutaArchivoCredenciales);




admin.initializeApp({

    credential: admin.credential.cert(credenciales),

    //Acceso a variable de entorno
    databaseURL: `${process.env.ACCOUNT_SERVICE_URL}`

});




// Ahora puedes usar el paquete firebase-admin para interactuar con Firebase en tu aplicación

// Por ejemplo:

const db = admin.firestore(); // Obtener una instancia de Firestore

//Solo para imagenes storage
//const storage = admin.storage(); // Obtener una instancia de Cloud Storage

// Realizar operaciones con Firestore y Cloud Storage




const auth = admin.auth();




module.exports = { auth, db };