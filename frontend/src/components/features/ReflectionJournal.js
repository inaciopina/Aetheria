import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background: var(--glass-background);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
`;

const Form = styled.form`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--glass-border);
  background: var(--glass-background);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: var(--shadow-sm);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--glass-border);
  background: var(--glass-background);
  color: var(--text-primary);
  font-size: 1rem;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: var(--shadow-sm);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  border-radius: var(--radius-sm);
  border: none;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
`;

const EntriesList = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Entry = styled(motion.div)`
  padding: 1.5rem;
  border-radius: var(--radius-md);
  background: var(--glass-background);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const EntryTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`;

const EntryDate = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  display: block;
`;

const EntryContent = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-primary);
`;

const ReflectionJournal = () => {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newEntry = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      date: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    setTitle('');
    setContent('');
  };

  return (
    <Container>
      <Title>Diário de Reflexão</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Título da sua reflexão"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="Escreva sua reflexão aqui..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
        >
          Salvar Reflexão
        </Button>
      </Form>
      <EntriesList>
        <AnimatePresence>
          {entries.map(entry => (
            <Entry
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <EntryTitle>{entry.title}</EntryTitle>
              <EntryDate>{entry.date}</EntryDate>
              <EntryContent>{entry.content}</EntryContent>
            </Entry>
          ))}
        </AnimatePresence>
      </EntriesList>
    </Container>
  );
};

export default ReflectionJournal; 