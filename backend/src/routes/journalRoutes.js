const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');

// Listar todas as entradas do diário
router.get('/', journalController.getAllEntries);

// Obter uma entrada específica
router.get('/:id', journalController.getEntryById);

// Criar uma nova entrada
router.post('/', journalController.createEntry);

// Atualizar uma entrada
router.put('/:id', journalController.updateEntry);

// Deletar uma entrada
router.delete('/:id', journalController.deleteEntry);

module.exports = router; 