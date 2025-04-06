import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/globalStyles';
import { theme } from './styles/theme';
import Home from './pages/Home';
import AmbientSoundMixer from './components/features/AmbientSoundMixer';
import RelaxingVisualizer from './components/features/RelaxingVisualizer';
import BreathingExercise from './components/features/BreathingExercise';
import ReflectionJournal from './components/features/ReflectionJournal';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
`;

const Header = styled.header`
  max-width: var(--container-width);
  margin: 0 auto 2rem;
  padding: 1rem;
  background: var(--glass-background);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const NavLink = styled(Link)`
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-sm);
  background: var(--glass-background);
  color: var(--text-primary);
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
    background: var(--glass-hover);
  }

  &.active {
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    color: white;
    border: none;
  }
`;

const Main = styled.main`
  max-width: var(--container-width);
  margin: 0 auto;
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyles />
        <AppContainer>
          <Header>
            <Title>Aetheria - Santuário Digital</Title>
            <Nav>
              <NavLink to="/">Início</NavLink>
              <NavLink to="/sons">Sons</NavLink>
              <NavLink to="/visualizacoes">Visualizações</NavLink>
              <NavLink to="/respiração">Respiração</NavLink>
              <NavLink to="/diario">Diário</NavLink>
            </Nav>
          </Header>
          <Main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sons" element={<AmbientSoundMixer />} />
              <Route path="/visualizacoes" element={<RelaxingVisualizer />} />
              <Route path="/respiração" element={<BreathingExercise />} />
              <Route path="/diario" element={<ReflectionJournal />} />
            </Routes>
          </Main>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
};

export default App; 