const express = require('express');
const router = express.Router();
const breathingController = require('../controllers/breathingController');

// Obter todos os padrões de respiração
router.get('/patterns', breathingController.getAllPatterns);

// Obter um padrão específico
router.get('/patterns/:id', breathingController.getPatternById);

// Salvar um progresso de exercício
router.post('/progress', breathingController.saveProgress);

// Obter progresso de exercícios
router.get('/progress/:userId', breathingController.getProgress);

module.exports = router; 