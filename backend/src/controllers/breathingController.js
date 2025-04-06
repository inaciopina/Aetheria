// Padrões de respiração disponíveis
const breathingPatterns = {
  relaxante: {
    id: 'relaxante',
    name: 'Respiração 4-7-8',
    description: 'Inspire por 4s, segure por 7s, expire por 8s',
    inhale: 4,
    hold: 7,
    exhale: 8,
    category: 'relaxamento'
  },
  energizante: {
    id: 'energizante',
    name: 'Respiração Quadrada',
    description: 'Inspire, segure, expire e segure por 4s cada',
    inhale: 4,
    hold: 4,
    exhale: 4,
    category: 'energia'
  },
  calmante: {
    id: 'calmante',
    name: 'Respiração Profunda',
    description: 'Inspire e expire lentamente por 6s cada',
    inhale: 6,
    hold: 0,
    exhale: 6,
    category: 'calma'
  }
};

// Armazenamento em memória para progresso de exercícios
let breathingProgress = [];

// Controladores
const breathingController = {
  // Obter todos os padrões de respiração
  getAllPatterns: (req, res) => {
    res.json(Object.values(breathingPatterns));
  },

  // Obter um padrão específico
  getPatternById: (req, res) => {
    const pattern = breathingPatterns[req.params.id];
    if (!pattern) {
      return res.status(404).json({ error: 'Padrão não encontrado' });
    }
    res.json(pattern);
  },

  // Salvar progresso de exercício
  saveProgress: (req, res) => {
    const { userId, patternId, duration, date } = req.body;
    
    if (!userId || !patternId || !duration) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    if (!breathingPatterns[patternId]) {
      return res.status(400).json({ error: 'Padrão de respiração inválido' });
    }

    const newProgress = {
      id: Date.now().toString(),
      userId,
      patternId,
      duration,
      date: date || new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    breathingProgress.push(newProgress);
    res.status(201).json(newProgress);
  },

  // Obter progresso de exercícios
  getProgress: (req, res) => {
    const { userId } = req.params;
    const userProgress = breathingProgress.filter(p => p.userId === userId);
    
    // Ordenar por data, mais recentes primeiro
    const sortedProgress = [...userProgress].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    res.json(sortedProgress);
  }
};

module.exports = breathingController; 