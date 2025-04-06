const express = require('express');
const router = express.Router();
const soundController = require('../controllers/soundController');

// Listar todos os sons disponíveis
router.get('/', soundController.getAllSounds);

// Obter um som específico
router.get('/:id', soundController.getSoundById);

// Criar uma nova combinação de sons
router.post('/mix', soundController.createSoundMix);

// Salvar uma combinação de sons favorita
router.post('/favorites', soundController.saveFavoriteMix);

// Obter combinações favoritas
router.get('/favorites/:userId', soundController.getFavoriteMixes);

// Deletar uma combinação favorita
router.delete('/favorites/:id', soundController.deleteFavoriteMix);

module.exports = router; 