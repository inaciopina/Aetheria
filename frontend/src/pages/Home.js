import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPrayingHands, FaHeadphones, FaBook, FaMoon, FaGithub, FaLinkedin } from 'react-icons/fa';

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.background};
`;

const HeroSection = styled.section`
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(46, 204, 113, 0.1));
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 1;
  padding: 2rem;
  max-width: 800px;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1.5rem;
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const IntroductionSection = styled.section`
  padding: 4rem 2rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.colors.primary};
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto 2rem;
  }

  ul {
    list-style: none;
    padding: 0;
    max-width: 600px;
    margin: 0 auto;
    text-align: left;

    li {
      margin: 1rem 0;
      padding-left: 2rem;
      position: relative;
      font-size: 1.1rem;

      &:before {
        content: "•";
        color: ${props => props.theme.colors.primary};
        position: absolute;
        left: 0;
      }
    }
  }
`;

const BenefitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem auto;
  max-width: 1200px;
`;

const BenefitCard = styled.div`
  background: ${props => props.theme.colors.surface};
  padding: 2rem;
  border-radius: ${props => props.theme.radius.md};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  svg {
    font-size: 2.5rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }

  h3 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    margin: 0;
  }
`;

const DeveloperSection = styled.div`
  margin: 4rem auto;
  max-width: 800px;
  padding: 2rem;
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.radius.md};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const DeveloperInfo = styled.div`
  text-align: center;

  h3 {
    color: ${props => props.theme.colors.primary};
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SocialButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: transform 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.theme.colors.primaryDark};
  }

  svg {
    font-size: 1.2rem;
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.05), rgba(46, 204, 113, 0.05));
`;

const Home = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Bem-vindo ao Aetheria
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Sua jornada para o bem-estar mental começa aqui
          </motion.p>
        </HeroContent>
      </HeroSection>

      <IntroductionSection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2>O que é o Aetheria?</h2>
          <p>
            O Aetheria é uma plataforma completa desenvolvida para promover seu bem-estar mental e emocional. 
            Combinando técnicas de meditação, sons relaxantes, visualizações tranquilizantes e recursos de 
            autoconhecimento, criamos um ambiente seguro e acolhedor para sua jornada de desenvolvimento pessoal.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2>Como o Aetheria pode ajudar você?</h2>
          <BenefitGrid>
            <BenefitCard>
              <FaPrayingHands />
              <h3>Meditação Guiada</h3>
              <p>Aprenda técnicas de meditação com exercícios guiados para reduzir o estresse e melhorar o foco.</p>
            </BenefitCard>
            <BenefitCard>
              <FaHeadphones />
              <h3>Sons Relaxantes</h3>
              <p>Misture diferentes sons ambientais para criar seu próprio ambiente de relaxamento personalizado.</p>
            </BenefitCard>
            <BenefitCard>
              <FaBook />
              <h3>Diário Pessoal</h3>
              <p>Registre seus pensamentos, emoções e progresso em um espaço seguro e privado.</p>
            </BenefitCard>
            <BenefitCard>
              <FaMoon />
              <h3>Visualizações Relaxantes</h3>
              <p>Desfrute de visualizações tranquilizantes que ajudam a acalmar a mente e reduzir a ansiedade.</p>
            </BenefitCard>
          </BenefitGrid>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2>Por que escolher o Aetheria?</h2>
          <ul>
            <li>Interface intuitiva e fácil de usar</li>
            <li>Recursos personalizáveis para suas necessidades</li>
            <li>Ambiente seguro e privado para seu desenvolvimento pessoal</li>
            <li>Ferramentas científicas para promoção do bem-estar mental</li>
            <li>Acompanhamento do seu progresso ao longo do tempo</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2>Sobre o Desenvolvedor</h2>
          <DeveloperSection>
            <DeveloperInfo>
              <h3>Inácio Pina</h3>
              <p>
                Desenvolvedor apaixonado por criar soluções que impactam positivamente a vida das pessoas.
                O Aetheria foi desenvolvido com o objetivo de proporcionar uma ferramenta acessível e eficaz
                para o bem-estar mental, combinando tecnologia e práticas de mindfulness.
              </p>
              <SocialLinks>
                <SocialButton
                  href="https://github.com/inaciopina"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub />
                  GitHub
                </SocialButton>
                <SocialButton
                  href="https://www.linkedin.com/in/inaciopina"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                  LinkedIn
                </SocialButton>
              </SocialLinks>
            </DeveloperInfo>
          </DeveloperSection>
        </motion.div>
      </IntroductionSection>

      <FeaturesSection>
        {/* Conteúdo da seção de recursos */}
      </FeaturesSection>
    </HomeContainer>
  );
};

export default Home; 