// Lista de sons disponíveis
const sounds = [
  {
    id: 'rain',
    name: 'Chuva',
    description: 'Som suave de chuva caindo',
    file: '/sounds/rain.mp3',
    category: 'nature',
    duration: 300,
    tags: ['relaxante', 'natureza', 'chuva']
  },
  {
    id: 'waves',
    name: 'Ondas',
    description: 'Som das ondas do mar',
    file: '/sounds/waves.mp3',
    category: 'nature',
    duration: 300,
    tags: ['relaxante', 'natureza', 'mar']
  },
  {
    id: 'wind',
    name: 'Vento',
    description: 'Som suave do vento',
    file: '/sounds/wind.mp3',
    category: 'nature',
    duration: 300,
    tags: ['relaxante', 'natureza', 'vento']
  },
  {
    id: 'forest',
    name: 'Floresta',
    description: 'Sons da floresta',
    file: '/sounds/forest.mp3',
    category: 'nature',
    duration: 300,
    tags: ['relaxante', 'natureza', 'floresta']
  },
  {
    id: 'fire',
    name: 'Fogueira',
    description: 'Som de fogueira crepitando',
    file: '/sounds/fire.mp3',
    category: 'nature',
    duration: 300,
    tags: ['relaxante', 'natureza', 'fogo']
  }
];

// Armazenamento em memória para combinações favoritas
let favoriteMixes = [];

// Controladores
const soundController = {
  // Obter todos os sons
  getAllSounds: (req, res) => {
    res.json(sounds);
  },

  // Obter um som específico
  getSoundById: (req, res) => {
    const sound = sounds.find(s => s.id === req.params.id);
    if (!sound) {
      return res.status(404).json({ error: 'Som não encontrado' });
    }
    res.json(sound);
  },

  // Criar uma nova combinação de sons
  createSoundMix: (req, res) => {
    const { sounds: mixSounds, name, description } = req.body;
    
    // Validar sons
    const validSounds = mixSounds.every(s => 
      sounds.find(availableSound => availableSound.id === s.id)
    );

    if (!validSounds) {
      return res.status(400).json({ error: 'Um ou mais sons inválidos' });
    }

    const newMix = {
      id: Date.now().toString(),
      name,
      description,
      sounds: mixSounds,
      createdAt: new Date()
    };

    res.status(201).json(newMix);
  },

  // Salvar uma combinação favorita
  saveFavoriteMix: (req, res) => {
    const { userId, mix } = req.body;
    
    const newFavorite = {
      id: Date.now().toString(),
      userId,
      mix,
      createdAt: new Date()
    };

    favoriteMixes.push(newFavorite);
    res.status(201).json(newFavorite);
  },

  // Obter combinações favoritas
  getFavoriteMixes: (req, res) => {
    const { userId } = req.params;
    const userFavorites = favoriteMixes.filter(fav => fav.userId === userId);
    res.json(userFavorites);
  },

  // Deletar uma combinação favorita
  deleteFavoriteMix: (req, res) => {
    const { id } = req.params;
    const initialLength = favoriteMixes.length;
    favoriteMixes = favoriteMixes.filter(fav => fav.id !== id);
    
    if (favoriteMixes.length === initialLength) {
      return res.status(404).json({ error: 'Combinação favorita não encontrada' });
    }
    
    res.status(204).send();
  }
};

module.exports = soundController; 