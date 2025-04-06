// Armazenamento em memória para entradas do diário
let journalEntries = [];

// Controladores
const journalController = {
  // Obter todas as entradas
  getAllEntries: (req, res) => {
    // Ordenar por data, mais recentes primeiro
    const sortedEntries = [...journalEntries].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    res.json(sortedEntries);
  },

  // Obter uma entrada específica
  getEntryById: (req, res) => {
    const entry = journalEntries.find(e => e.id === req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Entrada não encontrada' });
    }
    res.json(entry);
  },

  // Criar uma nova entrada
  createEntry: (req, res) => {
    const { title, content, date } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Título e conteúdo são obrigatórios' });
    }

    const newEntry = {
      id: Date.now().toString(),
      title,
      content,
      date: date || new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    journalEntries.push(newEntry);
    res.status(201).json(newEntry);
  },

  // Atualizar uma entrada
  updateEntry: (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    
    const entryIndex = journalEntries.findIndex(e => e.id === id);
    if (entryIndex === -1) {
      return res.status(404).json({ error: 'Entrada não encontrada' });
    }

    if (!title || !content) {
      return res.status(400).json({ error: 'Título e conteúdo são obrigatórios' });
    }

    const updatedEntry = {
      ...journalEntries[entryIndex],
      title,
      content,
      updatedAt: new Date().toISOString()
    };

    journalEntries[entryIndex] = updatedEntry;
    res.json(updatedEntry);
  },

  // Deletar uma entrada
  deleteEntry: (req, res) => {
    const { id } = req.params;
    const initialLength = journalEntries.length;
    
    journalEntries = journalEntries.filter(entry => entry.id !== id);
    
    if (journalEntries.length === initialLength) {
      return res.status(404).json({ error: 'Entrada não encontrada' });
    }
    
    res.status(204).send();
  }
};

module.exports = journalController; 