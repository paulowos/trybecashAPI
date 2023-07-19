const express = require('express');
const peopleDB = require('../db/peopleDB');

const people = express.Router();

people.post('/', async (req, res) => {
  const person = req.body;
  try {
    const [result] = await peopleDB.insert(person);
    console.log(result);
    res.status(201).json({
      message: `Pessoa cadastrada com sucesso com o id ${result.insertId}`
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: 'Ocorreu um erro ao cadastrar uma pessoa'
    });
  }
});

module.exports = people;
