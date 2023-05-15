const express = require('express');

const app = express();

const cors = require('cors');




// Agregue el middleware de cors antes de definir las rutas

app.use(cors());

//const router = express.Router();




// Importar el enrutador de usuarios

const usersRouter = require('./routes/usersRoute');

app.use(express.json());

// Usar el enrutador para las rutas de usuarios

app.use('/users', usersRouter);




// Importar el enrutador de paises

const countryRouter = require('./routes/countryRoute');

app.use(express.json());

// Usar el enrutador para las rutas de usuarios

app.use('/countries', countryRouter);



app.listen(3001, () => {

    console.log('El servidor está corriendo en el puerto 3001');

});