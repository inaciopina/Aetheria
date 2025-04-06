import React, { useState, useEffect } from 'react';
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

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
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

const ExerciseContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--glass-background);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
`;

const Circle = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
  box-shadow: var(--shadow-md);
`;

const Instruction = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
`;

const patterns = [
  {
    id: '4-7-8',
    name: 'Respiração 4-7-8',
    inhale: 4,
    hold: 7,
    exhale: 8
  },
  {
    id: 'box',
    name: 'Respiração Quadrada',
    inhale: 4,
    hold: 4,
    exhale: 4
  },
  {
    id: 'deep',
    name: 'Respiração Profunda',
    inhale: 5,
    hold: 3,
    exhale: 7
  }
];

const BreathingExercise = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPattern, setCurrentPattern] = useState(patterns[0]);
  const [phase, setPhase] = useState('inhale');
  const [timeLeft, setTimeLeft] = useState(currentPattern.inhale);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (phase === 'inhale') {
              setPhase('hold');
              return currentPattern.hold;
            } else if (phase === 'hold') {
              setPhase('exhale');
              return currentPattern.exhale;
            } else {
              setPhase('inhale');
              return currentPattern.inhale;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, phase, currentPattern]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const changePattern = (pattern) => {
    setCurrentPattern(pattern);
    setPhase('inhale');
    setTimeLeft(pattern.inhale);
    setIsPlaying(false);
  };

  const getCircleScale = () => {
    if (phase === 'inhale') {
      return 1 + (currentPattern.inhale - timeLeft) / currentPattern.inhale;
    } else if (phase === 'hold') {
      return 2;
    } else {
      return 2 - (currentPattern.exhale - timeLeft) / currentPattern.exhale;
    }
  };

  return (
    <Container>
      <Title>Exercícios de Respiração</Title>
      <Controls>
        {patterns.map(pattern => (
          <Button
            key={pattern.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => changePattern(pattern)}
            style={{
              background: currentPattern.id === pattern.id
                ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))'
                : 'var(--glass-background)',
              color: currentPattern.id === pattern.id ? 'white' : 'var(--text-primary)',
              border: currentPattern.id === pattern.id ? 'none' : '1px solid var(--glass-border)'
            }}
          >
            {pattern.name}
          </Button>
        ))}
      </Controls>
      <ExerciseContainer>
        <Circle
          animate={{
            scale: getCircleScale()
          }}
          transition={{
            duration: 1,
            ease: "easeInOut"
          }}
        >
          {timeLeft}s
        </Circle>
        <Instruction>
          {phase === 'inhale' ? 'Inspire' : phase === 'hold' ? 'Segure' : 'Expire'}
        </Instruction>
      </ExerciseContainer>
      <Button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
      >
        {isPlaying ? 'Pausar' : 'Iniciar'}
      </Button>
    </Container>
  );
};

export default BreathingExercise; 