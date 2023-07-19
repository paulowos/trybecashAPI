const express = require('express');
const peopleDB = require('../db/peopleDB');
const personVerification = require('../middlewares/personVerification');

const people = express.Router();


people.post('/', personVerification, async (req, res) => {
  const person = req.body;
  try {
    const [result] = await peopleDB.insert(person);
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

people.get('/', async (req, res) => {
  try {
    const [result] = await peopleDB.findAll();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.sqlMessage });
  }
});

people.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [[result]] = await peopleDB.findById(id);
    if (!result) return res.status(404).json({ message: 'Pessoa não encontrada' });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.sqlMessage });
  }
});

module.exports = people;
