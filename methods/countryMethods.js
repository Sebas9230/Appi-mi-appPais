const { db } = require('../routes/firebase.js');

async function createCountry(pais, pib, esperanzaVida, libertadDecisiones, generosidad, corrupcion, poblacionMetroCuadrado, dimensionPais) {
    try {
        console.log("COUNTRY EN METHODS: ", pais, pib, esperanzaVida, libertadDecisiones, generosidad, corrupcion, poblacionMetroCuadrado, dimensionPais);
        db.collection('pais').add({ pais, pib, esperanzaVida, libertadDecisiones, generosidad, corrupcion })
            .then(async (docRef) => {
                // Retornar un mensaje de éxito
                console.log("docRef country created: ", docRef._path.segments[1])
                const paisId = docRef._path.segments[1];

                try {
                    // Obtener una referencia a la colección "pobreza"
                    const pobrezaRef = db.collection('pobreza');

                    // Crear un nuevo documento con los atributos proporcionados
                    const nuevoDocumento = {
                        pais: paisId,
                        dimensionPais: dimensionPais,
                        poblacionMetroCuadrado: poblacionMetroCuadrado,
                    };

                    // Insertar el nuevo documento en la colección "pobreza"
                    await pobrezaRef.add(nuevoDocumento);

                    console.log('Documento insertado correctamente en la colección "pobreza".');
                } catch (error) {
                    console.error('Error al insertar el documento en la colección "pobreza":', error);
                }

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

async function getPoverties() {
    try {
        // Obtener una referencia a la colección "pobreza"
        const pobrezaRef = db.collection('pobreza');

        // Obtener todos los documentos de la colección "pobreza"
        const snapshot = await pobrezaRef.get();

        // Crear un array para almacenar los resultados
        const resultados = [];

        // Recorrer los documentos y agregarlos al array de resultados
        snapshot.forEach((doc) => {
            const documento = {
                id: doc.id,
                ...doc.data()
            };
            resultados.push(documento);
        });

        return resultados;
    } catch (error) {
        console.error('Error al obtener los documentos de la colección "pobreza":', error);
        throw error;
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
async function updateCountry(id, pais, pib, esperanzaVida, libertadDecisiones, generosidad, corrupcion) {
    try {
        // Actualizar el documento en Firestore para el usuario con los datos proporcionados
        const result = await db.collection('pais').doc(id).update({ pais, pib, esperanzaVida, libertadDecisiones, generosidad, corrupcion });

        // Retornar un mensaje de éxito
        return result;
    } catch (error) {
        throw error; // Lanzar el error para que sea capturado en el catch del enrutador
    }
}


module.exports = { createCountry, getAllCountries, getCountry, deleteCountry, updateCountry, getPoverties };