import React, { useState, useRef } from 'react';
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
  min-height: 500px;
  position: relative;
  overflow: hidden;
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
  z-index: 1;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  z-index: 1;
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-sm);
  border: none;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: var(--radius-md);
`;

const RelaxingVisualizer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef(null);

  // ID do vídeo do YouTube (você pode alterar para qualquer vídeo relaxante)
  const videoId = "KJwYBJMSbPI"; // Link fornecido: https://youtu.be/KJwYBJMSbPI

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Container>
      <Title>Visualização Relaxante</Title>
      <Controls>
        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
        >
          {isPlaying ? 'Pausar' : 'Iniciar'} Vídeo
        </Button>
      </Controls>
      <VideoContainer>
        <Iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1&showinfo=0`}
          title="Vídeo Relaxante"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </VideoContainer>
    </Container>
  );
};

export default RelaxingVisualizer; 