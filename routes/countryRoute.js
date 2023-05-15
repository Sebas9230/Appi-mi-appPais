
// Definir rutas para países
const express = require('express');
const router = express.Router();

//User methods
const { createCountry, getAllCountries, getCountry, deleteCountry, updateCountry } = require('../methods/countryMethods.js');


router.post('/create', async (req, res) => {
  try {
    const { pais, pib, esperanzaVida, liberdadDecisiones, generosidad, corrupcion } = req.body;

    const country = await createCountry(pais, pib, esperanzaVida, liberdadDecisiones, generosidad, corrupcion);
    res.status(201).json(country);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating country: ', error});
  }
});

router.get('/', async (req, res) => {
  try {
    const countries = await getAllCountries();
    console.log("Countries: ", countries);
    res.status(201).json(countries);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting all countries');
  }
});


router.get('/country/:id', async (req, res) => {
  try {
    const country = await getCountry(req.params.id);

    res.status(201).json(country);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error getting country with ID: ${req.params.id} `);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await deleteCountry(id);
    if(resp == true){
      res.status(200).send(`Country with id ${id} has been deleted.`);
    }else{
      res.status(400).send("Unknow error.");
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error deleting country: ${error}`);
  }
});

router.put('/update', async (req, res) => {
  try {
    const { id, pais, pib, esperanzaVida, liberdadDecisiones, generosidad, corrupcion } = req.body;

    const result = await updateCountry(id, pais, pib, esperanzaVida, liberdadDecisiones, generosidad, corrupcion);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating country.' });
  }
});

module.exports = router;
