import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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

const SoundGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

const SoundCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.isActive ? 'var(--accent-primary)' : 'transparent'};
  box-shadow: ${props => props.isActive ? 'var(--shadow-md)' : 'none'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }
`;

const SoundTitle = styled.h3`
  font-size: 1.2rem;
  color: var(--text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const VolumeSlider = styled.input`
  flex: 1;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--accent-primary);
    cursor: pointer;
    box-shadow: var(--shadow-sm);
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--accent-primary);
    cursor: pointer;
    box-shadow: var(--shadow-sm);
  }

  &:hover {
    opacity: 1;
  }
`;

const VolumeValue = styled.span`
  min-width: 40px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const ToggleButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  border: none;
  background: ${props => props.isActive ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.isActive ? 'white' : 'var(--text-primary)'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.isActive ? 'var(--shadow-sm)' : 'none'};

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }
`;

const StopAllButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-sm);
  border: none;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
  margin-top: 1rem;

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
`;

const ErrorMessage = styled.div`
  color: var(--error);
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
`;

const Icon = styled.span`
  font-size: 1.2rem;
`;

const sounds = [
  { id: 'chuva', name: 'Chuva', file: '/sounds/chuva.mp3', icon: '🌧️' },
  { id: 'ondas', name: 'Ondas do Mar', file: '/sounds/ondas.mp3', icon: '🌊' },
  { id: 'floresta', name: 'Floresta', file: '/sounds/floresta.mp3', icon: '🌲' },
  { id: 'vento', name: 'Vento', file: '/sounds/vento.mp3', icon: '🍃' },
  { id: 'fogo', name: 'Fogo', file: '/sounds/fogo.mp3', icon: '🔥' }
];

const AmbientSoundMixer = () => {
  const [activeSounds, setActiveSounds] = useState({});
  const [volumes, setVolumes] = useState({});
  const [errors, setErrors] = useState({});
  const audioRefs = useRef({});

  // Inicializar volumes
  useEffect(() => {
    const initialVolumes = {};
    sounds.forEach(sound => {
      initialVolumes[sound.id] = 0.5; // Volume inicial de 50%
    });
    setVolumes(initialVolumes);
  }, []);

  // Limpar referências de áudio ao desmontar
  useEffect(() => {
    return () => {
      // Parar todos os sons ao desmontar o componente
      stopAllSounds();
    };
  }, []);

  // Função para parar um som específico
  const stopSound = (soundId) => {
    if (audioRefs.current[soundId]) {
      const audio = audioRefs.current[soundId];
      
      // Parar o áudio
      audio.pause();
      audio.currentTime = 0;
      
      // Remover todos os event listeners
      audio.oncanplaythrough = null;
      audio.onplay = null;
      audio.onpause = null;
      audio.onended = null;
      
      // Limpar a fonte
      audio.src = '';
      audio.load();
      
      // Remover a referência
      delete audioRefs.current[soundId];
      
      // Atualizar o estado
      setActiveSounds(prev => {
        const newState = { ...prev };
        delete newState[soundId];
        return newState;
      });
      
      // Limpar erros
      setErrors(prev => ({ ...prev, [soundId]: null }));
    }
  };

  // Função para parar todos os sons
  const stopAllSounds = () => {
    // Obter uma cópia das chaves para evitar problemas de modificação durante a iteração
    const soundIds = Object.keys(audioRefs.current);
    
    // Parar cada som individualmente
    soundIds.forEach(soundId => {
      stopSound(soundId);
    });
    
    // Garantir que o estado esteja limpo
    setActiveSounds({});
  };

  // Função para iniciar um som
  const startSound = (soundId) => {
    const sound = sounds.find(s => s.id === soundId);
    if (!sound) return;
    
    // Criar uma nova instância de áudio
    const audio = new Audio();
    
    // Configurar o áudio
    audio.src = sound.file;
    audio.loop = true;
    audio.volume = volumes[soundId] || 0.5;
    
    // Adicionar manipuladores de eventos
    audio.oncanplaythrough = () => {
      audio.play().catch(error => {
        console.error(`Erro ao tocar ${sound.name}:`, error);
        setErrors(prev => ({ ...prev, [soundId]: `Erro ao reproduzir: ${error.message}` }));
      });
    };
    
    // Carregar o áudio
    audio.load();
    
    // Armazenar referência
    audioRefs.current[soundId] = audio;
    
    // Atualizar o estado
    setActiveSounds(prev => ({ ...prev, [soundId]: true }));
    
    // Limpar erros
    setErrors(prev => ({ ...prev, [soundId]: null }));
  };

  // Função para alternar um som (ligar/desligar)
  const toggleSound = (soundId) => {
    if (activeSounds[soundId]) {
      // Se o som estiver ativo, parar
      stopSound(soundId);
    } else {
      // Se o som estiver inativo, iniciar
      startSound(soundId);
    }
  };

  // Função para alterar o volume
  const handleVolumeChange = (soundId, value) => {
    // Atualizar o estado do volume
    setVolumes(prev => ({ ...prev, [soundId]: value }));
    
    // Atualizar o volume do áudio se estiver ativo
    if (audioRefs.current[soundId]) {
      audioRefs.current[soundId].volume = value;
    }
  };

  return (
    <Container>
      <Title>Mixer de Sons Ambientais</Title>
      <SoundGrid>
        {sounds.map(sound => (
          <SoundCard 
            key={sound.id}
            isActive={activeSounds[sound.id]}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SoundTitle>
              <Icon>{sound.icon}</Icon>
              {sound.name}
            </SoundTitle>
            <VolumeControl>
              <VolumeSlider
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volumes[sound.id] || 0.5}
                onChange={(e) => handleVolumeChange(sound.id, parseFloat(e.target.value))}
              />
              <VolumeValue>{Math.round((volumes[sound.id] || 0.5) * 100)}%</VolumeValue>
            </VolumeControl>
            <ToggleButton
              isActive={activeSounds[sound.id]}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleSound(sound.id)}
            >
              {activeSounds[sound.id] ? 'Desativar' : 'Ativar'}
            </ToggleButton>
            {errors[sound.id] && <ErrorMessage>{errors[sound.id]}</ErrorMessage>}
          </SoundCard>
        ))}
      </SoundGrid>
      <StopAllButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={stopAllSounds}
      >
        Parar Todos os Sons
      </StopAllButton>
    </Container>
  );
};

export default AmbientSoundMixer; 