const { db } =  require('../routes/firebase.js');

async function createCountry(pais, pib, esperanzaVida, liberdadDecisiones, generosidad, corrupcion) {
    try {

        db.collection('pais').add({pais, pib, esperanzaVida, liberdadDecisiones, generosidad, corrupcion})
            .then((docRef) => {
                // Retornar un mensaje de éxito
                return docRef;
            })
            .catch((error) => {
                throw error;
            });

    } catch (error) {
        throw error; // Lanzar el error para que sea capturado en el catch del enrutador
    }
}

async function getAllCountries() {
    try {
        // Obtener la colección de proyectos en Firestore
        const snapshot = await db.collection('pais').get();
        const countries = snapshot.docs.map(doc => {
            // Agregar el ID del documento a los datos del proyecto
            return { id: doc.id, ...doc.data() };
        });

        // Retornar la lista de proyectos
        return countries;
    } catch (error) {
        throw error; // Lanzar el error para que sea capturado en el catch del enrutador
    }
}

async function getCountry(id) {
    try {
        // Obtener el documento del usuario en Firestore mediante su ID
        const collectionRef = await db.collection('pais');

        const doc = await collectionRef.doc(id).get();
        if (!doc.exists) {
            throw error; // Lanzar el error para que sea capturado en el catch del enrutador
        }

        // Obtener el objeto de datos y agregar el ID del documento
        const data = doc.data();
        data.id = doc.id;

        return data;

    } catch (error) {
        throw error; // Lanzar el error para que sea capturado en el catch del enrutador
    }
}

//Delete project
async function deleteCountry(id) {
    try {
        // Eliminar el documento de Firestore
        await db.collection('pais').doc(id).delete();

        // Retornar un mensaje de éxito
        return true;
    } catch (error) {
        throw error; // Lanzar el error para que sea capturado en el catch del enrutador
    }
}

// //UPDATE
async function updateCountry(id, pais, pib, esperanzaVida, liberdadDecisiones, generosidad, corrupcion) {
    try {
        // Actualizar el documento en Firestore para el usuario con los datos proporcionados
        const result = await db.collection('pais').doc(id).update({pais, pib, esperanzaVida, liberdadDecisiones, generosidad, corrupcion});

        // Retornar un mensaje de éxito
        return result;
    } catch (error) {
        throw error; // Lanzar el error para que sea capturado en el catch del enrutador
    }
}


module.exports =  { createCountry, getAllCountries, getCountry, deleteCountry, updateCountry };