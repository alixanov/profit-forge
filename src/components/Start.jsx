import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import bg from '../assets/bg-money.webp';

// Import Press Start 2P font
const FontImport = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
`;

// Styled Components
const StartContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1a1a1a url(${bg}) no-repeat center center/cover;
  background-attachment: fixed;
  background-size: cover;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, transparent, rgba(0, 0, 0, 0.35)); 
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  background: rgba(41, 41, 41, 0.59); /* Solid retro brown, more opaque */
  padding: 2.5rem;
  border: 4px solid #2a2a2a;
  border-image: linear-gradient(#2a2a2a, #2a2a2a) 1; /* Pixelated border */
  max-width: 38rem;
  width: 90%;
  box-shadow: 0 0 10px rgba(217, 166, 109, 0.3); /* Subtle beige glow */
  position: relative;
  animation: scanline 8s linear infinite; /* Slower scanlines */
  text-align: center;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      rgba(217, 166, 109, 0.1) 50.5%,
      transparent 51%
    );
    background-size: 100% 6px; /* Thicker scanlines */
    pointer-events: none;
  }

  @keyframes scanline {
    0% { background-position: 0 0; }
    100% { background-position: 0 100%; }
  }
`;

const Title = styled.h1`
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  font-size: 2rem; /* Slightly smaller for chunkier look */
  color: #e0e0e0;
  text-shadow: 0 0 5px rgba(217, 166, 109, 0.6); /* Single beige glow */
  margin-bottom: 1.8rem;
  overflow: hidden;
  white-space: nowrap;
  animation: typewriter 3s steps(20, end); /* Slower, clunkier typewriter */

  @keyframes typewriter {
    from { width: 0; }
    to { width: 100%; }
  }
`;

const Description = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 1.2rem; /* Slightly smaller for retro feel */
  color: #e0e0e0;
  text-shadow: 0 0 3px rgba(217, 166, 109, 0.5); /* Subtle beige glow */
  margin-bottom: 2.5rem;
  line-height: 1.8; /* More spacing for readability */
  padding: 0 1.5rem;
    font-weight: 600; /* Добавлено: толщина шрифта */

`;

const Char = styled.span`
  display: inline-block;
  opacity: 0;
  transform: scale(0.8);
  animation: typewriterChar 0.3s ease forwards; /* Slower character appearance */
  animation-delay: ${props => props.delay}s;

  @keyframes typewriterChar {
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const StartButton = styled.button`
  display: inline-block;
  background: #2a2a2a;
  color: #d9a66d; /* Beige text */
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  font-size: 0.9rem; /* Smaller for retro chunkiness */
  padding: 0.8rem 1.6rem;
  border: 3px solid #d9a66d;
  border-radius: 0;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease; /* Simpler transition */
  box-shadow: 0 0 5px rgba(217, 166, 109, 0.3);
  text-transform: uppercase;
  text-decoration: none;
  text-shadow: 0 0 3px rgba(217, 166, 109, 0.4);

  &:hover {
    background: #8b0000; /* Muted red hover */
    color: #e0e0e0;
    border-color: #8b0000;
    animation: flicker 0.2s ease; /* Subtle flicker instead of glitch */
  }

  &:active {
    transform: scale(0.95); /* Stronger press effect */
  }

  @keyframes flicker {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
  }
`;

const Start = () => {
  // Simulate typewriter sound effect
  useEffect(() => {
    const handleKeyPress = () => {
      const audio = new Audio('https://www.soundjay.com/mechanical/sounds/typewriter-key-01.mp3');
      audio.play().catch(() => { });
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleStartClick = () => {
    // Find the Main component by its ID and scroll to it
    const mainElement = document.getElementById('main-component');
    if (mainElement) {
      mainElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const descriptionText = "Welcome to Profit Forge, your retro-inspired crypto minting platform. Design and generate unique tokens with a nostalgic 80s-90s vibe. Craft your digital currency on Ethereum, Binance, or Solana with ease!";

  return (
    <>
      <FontImport />
      <StartContainer>
        <ContentWrapper>
          <Title>Profit Forge</Title>
          <Description>
            {descriptionText.split('').map((char, index) => (
              <Char key={index} delay={index * 0.03}>
                {char === ' ' ? '\u00A0' : char}
              </Char>
            ))}
          </Description>
          <StartButton onClick={handleStartClick}>Start Minting</StartButton>
        </ContentWrapper>
      </StartContainer>
    </>
  );
};

export default Start;