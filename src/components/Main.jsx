import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import bg from '../assets/Pump.webp';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import keyboardSound from '../sound/typing-on-keyboard-335502.mp3';
import successSound from '../sound/success-83493.mp3';

// Import fonts
const FontImport = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&display=swap');
`;

// Scanline Overlay for retro CRT effect
const ScanlineOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 2px,
    rgba(0, 0, 0, 0.1) 2px,
    rgba(0, 0, 0, 0.1) 4px
  );
  animation: scanline 0.5s linear infinite;
  opacity: 0.1;
  pointer-events: none;
  z-index: 1;
  will-change: transform;

  @keyframes scanline {
    from { background-position: 0 0; }
    to { background-position: 0 4px; }
  }
`;

// Notification Styles
const Notification = styled.div`
  position: absolute;
  bottom: -1.75rem;
  left: 0;
  right: 0;
  background: rgba(245, 233, 203, 0.95);
  border: 2px dashed #2a2a2a;
  padding: 0.3rem 0.6rem;
  font-family: 'Courier Prime', monospace;
  font-size: 0.7rem;
  color: #2a2a2a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.3rem;
  box-shadow: 0 2px 6px rgba(115, 94, 68, 0.2);
  animation: slideIn 0.3s ease-out;
  z-index: 10;
  filter: sepia(0.2) blur(0.5px);
  max-width: 90%;
  margin: 0 auto;
  transition: opacity 0.3s ease, transform 0.3s ease;

  &.fade-out {
    opacity: 0;
    transform: translateY(0.3rem);
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAG0lEQVQYV2NkYGD4z8DAwMgABXAGNgYwAAD4BAABvfBgtW3MAAAAASUVORK5CYII=') repeat;
    opacity: 0.1;
    pointer-events: none;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(0.3rem); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    font-size: 0.65rem;
    padding: 0.3rem 0.5rem;
    bottom: -1.5rem;
    max-width: 85vw;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
    padding: 0.2rem 0.4rem;
    bottom: -1.25rem;
  }
`;

const NotificationClose = styled.button`
  background: #2a2a2a;
  border: 1px dashed #735e44;
  border-radius: 0;
  width: 0.8rem;
  height: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background: #f5e9cb;
    border-color: #2a2a2a;
    box-shadow: 0 0 3px rgba(115, 94, 68, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: 1px dashed #735e44;
    outline-offset: 1px;
  }

  svg {
    width: 4px;
    height: 4px;
  }

  @media (max-width: 768px) {
    width: 0.7rem;
    height: 0.7rem;
    svg {
      width: 3px;
      height: 3px;
    }
  }
`;

// Custom pixel-art SVG icons
const NameIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="12" height="8" fill="#2a2a2a" />
    <rect x="3" y="5" width="10" height="6" fill="#735e44" />
    <rect x="5" y="7" width="4" height="2" fill="#2a2a2a" />
  </svg>
);

const TickerIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="10" height="6" fill="#2a2a2a" />
    <rect x="4" y="6" width="2" height="4" fill="#735e44" />
    <rect x="7" y="6" width="2" height="4" fill="#735e44" />
    <rect x="10" y="6" width="2" height="4" fill="#735e44" />
  </svg>
);

const SupplyIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="3" width="8" height="10" fill="#2a2a2a" />
    <rect x="5" y="4" width="6" height="2" fill="#735e44" />
    <rect x="5" y="7" width="6" height="2" fill="#735e44" />
    <rect x="5" y="10" width="6" height="2" fill="#735e44" />
  </svg>
);

const LinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="10" height="4" fill="#2a2a2a" />
    <rect x="5" y="5" width="6" height="6" fill="#735e44" />
    <rect x="7" y="7" width="2" height="2" fill="#2a2a2a" />
  </svg>
);

const CloseIcon = () => (
  <svg width="4" height="4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="12" height="2" fill="#735e44" transform="rotate(45 8 8)" />
    <rect x="2" y="2" width="12" height="2" fill="#735e44" transform="rotate(-45 8 8)" />
    <rect x="2" y="2" width="12" height="2" fill="#2a2a2a" transform="rotate(45 8 8)" opacity="0.3" />
    <rect x="2" y="2" width="12" height="2" fill="#2a2a2a" transform="rotate(-45 8 8)" opacity="0.3" />
  </svg>
);

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(41, 41, 41, 0.56) url(${bg}) no-repeat center center/cover;
  background-attachment: fixed;
  background-size: cover;
  position: relative;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;

  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, transparent, rgba(0, 0, 0, 0.73));
    pointer-events: none;
  }

  @media (max-width: 768px) {
    background-size: cover;
    object-fit: cover;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 1.5rem;
  padding: 1rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    min-height: auto;
    padding: 1rem;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const TokenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  background: radial-gradient(circle, rgba(115, 94, 68, 0.2), rgba(0, 0, 0, 0.5));
  padding: 1rem;
  border: 2px dashed #2a2a2a;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.3);
  position: relative;
  will-change: transform;
  width: 100%;
  max-width: 48rem;

  @media (max-width: 768px) {
    max-width: 90vw;
    padding: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    margin-top: 0;
  }
`;

const TokenDisplay = styled.div`
  width: 100%;
  max-width: 46rem;
  height: ${({ dynamicHeight }) => dynamicHeight || 'auto'};
  min-height: 20rem;
  background: #f5e9cb;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAG0lEQVQYV2NkYGD4z8DAwMgABXAGNgYwAAD4BAABvfBgtW3MAAAAASUVORK5CYII=') repeat,
    radial-gradient(circle, rgba(115, 94, 68, 0.1) 1px, transparent 1px);
  background-size: auto, 4px 4px;
  border: 2px solid #2a2a2a;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(115, 94, 68, 0.2);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  padding: 1.5rem;
  font-family: 'Courier Prime', monospace;
  color: #2a2a2a;
  filter: sepia(0.3) blur(0.5px);
  will-change: transform;
  overflow-y: auto;

  &:after {
    content: '';
    position: absolute;
    top: 10%;
    left: 5%;
    width: 20%;
    height: 20%;
    background: radial-gradient(circle, rgba(115, 94, 68, 0.15), transparent);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    max-width: 90vw;
    min-height: 18rem;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    min-height: 16rem;
    padding: 0.75rem;
  }
`;

const IconImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  margin-top: 0.75rem;
  border: 2px dashed #735e44;
  object-fit: contain;
  filter: sepia(0.3);

  @media (max-width: 768px) {
    max-width: 70px;
    max-height: 70px;
  }

  @media (max-width: 480px) {
    max-width: 50px;
    max-height: 50px;
  }
`;

const DataList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 1rem;
  line-height: 1.4;
  letter-spacing: 0.05rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    gap: 0.3rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const DataItem = styled.div`
  max-width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DescriptionItem = styled.div`
  width: 90%;
  height: 6rem;
  white-space: normal;
  word-break: break-word;
  overflow-y: auto;
  padding-right: 0.5rem;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 0.2rem;
  }

  &::-webkit-scrollbar-track {
    background: #f5e9cb;
  }

  &::-webkit-scrollbar-thumb {
    background: #735e44;
    border-radius: 0;
  }

  @media (max-width: 768px) {
    height: 5rem;
  }

  @media (max-width: 480px) {
    height: 4rem;
  }
`;

const LoadingText = styled.div`
  font-family: 'Courier Prime', monospace;
  font-size: 1rem;
  color: #735e44;
  text-shadow: 1px 1px 2px rgba(115, 94, 68, 0.2);
  text-align: center;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.7);
  border: 2px dashed #2a2a2a;
  max-width: 90%;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.4rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.3rem;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ActionButton = styled.button`
  background: #2a2a2a;
  color: ${({ disabled }) => (disabled ? '#1a1a1a' : '#f5e9cb')};
  font-family: 'Courier Prime', monospace;
  font-size: 0.9rem;
  padding: 0.3rem 0.5rem;
  border: 2px solid #735e44;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 5px rgba(115, 94, 68, 0.2);
  text-transform: uppercase;
  width: 8rem;
  text-align: center;
  filter: blur(0.5px);

  &:hover {
    background: #735e44;
    color: #f5e9cb;
    box-shadow: 0 0 8px rgba(115, 94, 68, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 14rem;
    font-size: 0.8rem;
    padding: 0.3rem;
    min-height: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.25rem;
    min-height: 1.6rem;
  }
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 28rem;
  background: radial-gradient(circle, rgba(115, 94, 68, 0.2), rgba(0, 0, 0, 0.5));
  padding: 0.8rem;
  border: 2px dashed #2a2a2a;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.3);
  @media (max-width: 768px) {
    max-width: 90vw;
  }
`;

const FormCard = styled.div`
  background: #f5e9cb;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAG0lEQVQYV2NkYGD4z8DAwMgABXAGNgYwAAD4BAABvfBgtW3MAAAAASUVORK5CYII=') repeat;
  padding: 1rem;
  margin: 0.3rem;
  border: 2px solid #2a2a2a;
  width: 100%;
  max-width: 28rem;
  min-height: auto;

  box-shadow: 0 0 12px rgba(115, 94, 68, 0.15), inset 0 0 6px rgba(0, 0, 0, 0.4);

  position: relative;
  filter: sepia(0.3);
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  color: #2a2a2a;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(115, 94, 68, 0.1), transparent);
    opacity: 0.2;
    pointer-events: none;
    z-index: 1;
  }

  @media (max-width: 768px) {
    max-width: 90vw;
    padding: 0.75rem;
    margin: 0.2rem 0;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const Title = styled.h1`
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  font-size: 1.3rem;
  text-align: center;
  color: #2a2a2a;
  margin-bottom: 0.75rem;
  text-shadow: 1px 1px 2px rgba(115, 94, 68, 0.2);
  overflow: hidden;
  white-space: nowrap;
  letter-spacing: 0.08rem;
  filter: blur(0.5px);

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const FormGroup = styled.div`
  position: relative;
  margin-bottom: ${({ hasNotification }) => (hasNotification ? '1.5rem' : '0.75rem')};

  @media (max-width: 768px) {
    margin-bottom: ${({ hasNotification }) => (hasNotification ? '1.25rem' : '0.5rem')};
  }
`;

const Label = styled.label`
  display: block;
  color: #2a2a2a;
  font-weight: 100;
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  font-size: 0.45rem;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  filter: blur(0.5px);

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }

  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
`;

const Input = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 2px dashed #2a2a2a;
  color: #2a2a2a;
  font-family: 'Courier Prime', monospace;
  font-size: 0.8rem;
  padding: 0.25rem 0.15rem;
  outline: none;
  transition: border-color 0.3s ease;
  min-height: 1.8rem;
  letter-spacing: 0.05rem;
  filter: blur(0.5px);
  position: relative;

  &:focus {
    border-color: #735e44;
    &::after {
      content: '|';
      position: absolute;
      right: 0.2rem;
      top: 50%;
      transform: translateY(-50%);
      color: #2a2a2a;
      font-weight: bold;
      animation: blink 0.6s step-end infinite;
    }
  }

  &::placeholder {
    color: #735e44;
    font-style: normal;
    opacity: 0.7;
  }

  &[type="file"] {
    padding: 0.3rem 0;
    cursor: pointer;
  }

  &[type="file"]::-webkit-file-upload-button {
    background: #2a2a2a;
    color: #f5e9cb;
    border: 1px solid #735e44;
    padding: 0.15rem 0.4rem;
    font-family: 'Courier Prime', monospace;
    font-size: 0.7rem;
    cursor: pointer;
    transition: all 0.3s ease;
    filter: blur(0.5px);

    &:hover {
      background: #735e44;
      color: #f5e9cb;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.15rem;
    min-height: 1.6rem;

    &[type="file"] {
      padding: 0.25rem 0;
    }

    &[type="file"]::-webkit-file-upload-button {
      font-size: 0.65rem;
      padding: 0.1rem 0.3rem;
    }
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.1rem;
    min-height: 1.4rem;

    &[type="file"]::-webkit-file-upload-button {
      font-size: 0.6rem;
    }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 2px dashed #2a2a2a;
  color: #2a2a2a;
  font-family: 'Courier Prime', monospace;
  font-size: 0.8rem;
  padding: 0.25rem 0.15rem;
  outline: none;
  resize: none;
  transition: border-color 0.3s ease;
  min-height: 2.8rem;
  line-height: 1.4;
  letter-spacing: 0.05rem;
  filter: blur(0.5px);
  position: relative;

  &:focus {
    border-color: #735e44;
    &::after {
      content: '|';
      position: absolute;
      right: 0.2rem;
      top: 50%;
      transform: translateY(-50%);
      color: #2a2a2a;
      font-weight: bold;
      animation: blink 0.6s step-end infinite;
    }
  }

  &::placeholder {
    color: #735e44;
    font-style: normal;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.15rem;
    min-height: 2.3rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.1rem;
    min-height: 1.8rem;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectButton = styled.button`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 2px dashed #2a2a2a;
  color: #2a2a2a;
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  padding: 0.25rem 0.15rem;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.3s ease;
  min-height: 1.8rem;
  letter-spacing: 0.05rem;
  filter: blur(0.5px);

  &:focus {
    border-color: #735e44;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.15rem;
    min-height: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.1rem;
    min-height: 1.4rem;
  }
`;

const SelectDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #f5e9cb;
  border: 2px solid #2a2a2a;
  box-shadow: 0 2px 6px rgba(115, 94, 68, 0.2);
  z-index: 20;
  max-height: 7rem;
  overflow-y: auto;
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  filter: sepia(0.3) blur(0.5px);

  @media (max-width: 768px) {
    max-height: 5.5rem;
  }

  @media (max-width: 480px) {
    max-height: 4.5rem;
  }
`;

const SelectOption = styled.div`
  padding: 0.25rem 0.4rem;
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  font-size: 0.55rem;
  color: #2a2a2a;
  cursor: pointer;
  transition: background 0.3s ease;
  letter-spacing: 0.05rem;

  &:hover {
    background: #735e44;
    color: #f5e9cb;
  }

  &.selected {
    background: #735e44;
    color: #f5e9cb;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.2rem 0.3rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.15rem 0.25rem;
  }
`;

const Button = styled.button`
  width: 100%;
  background: #2a2a2a;
  color: #f5e9cb;
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  font-size: 0.6rem;
  padding: 0.3rem;
  border: 2px solid #735e44;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 6px rgba(115, 94, 68, 0.2);
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  min-height: 1.8rem;
  filter: blur(0.5px);

  &:hover {
    background: #735e44;
    color: #f5e9cb;
    box-shadow: 0 0 10px rgba(115, 94, 68, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.3rem;
    min-height: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.25rem;
    min-height: 1.4rem;
  }
`;

const Spinner = styled.div`
  border: 2px solid #735e44;
  border-top: 2px solid #2a2a2a;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 0.3rem;
  top: 1.3rem;

  svg {
    width: 12px;
    height: 12px;
    filter: blur(0.5px);
  }

  @media (max-width: 768px) {
    right: 0.3rem;
    top: 1.2rem;
    svg {
      width: 10px;
      height: 10px;
    }
  }

  @media (max-width: 480px) {
    top: 1.1rem;
    svg {
      width: 8px;
      height: 8px;
    }
  }
`;

// Platform options
const platformOptions = [
  { value: '', label: 'Select Platform' },
  { value: 'Ethereum', label: 'Ethereum' },
  { value: 'Binance', label: 'Binance Smart Chain' },
  { value: 'Solana', label: 'Solana' }
];

const Main = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ticker: '',
    supply: '',
    platform: '',
    icon: null,
    telegramLink: '',
    websiteLink: '',
    twitterLink: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenGenerated, setIsTokenGenerated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [cardHeight, setCardHeight] = useState('auto');
  const tokenDisplayRef = useRef(null);
  const formCardRef = useRef(null);
  const typingAudioRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const successAudioRef = useRef(new Audio(successSound));
  const navigate = useNavigate();

  // Configure audio settings
  useEffect(() => {
    typingAudioRef.current = new Audio(keyboardSound);
    typingAudioRef.current.volume = 0.5;
    successAudioRef.current.volume = 0.7;
    return () => {
      if (typingAudioRef.current) {
        typingAudioRef.current.pause();
        typingAudioRef.current = null;
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      successAudioRef.current.pause();
    };
  }, []);

  // Handle dynamic height matching
  useEffect(() => {
    const updateHeight = () => {
      if (formCardRef.current) {
        const height = formCardRef.current.offsetHeight;
        setCardHeight(`${height}px`);
      }
    };

    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
      };
    };

    const handleResize = debounce(updateHeight, 200);

    updateHeight();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle typing sound on keypress
  const handleKeyPress = () => {
    if (typingAudioRef.current) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingAudioRef.current.pause();
      typingAudioRef.current.currentTime = 0;
      typingAudioRef.current.play().catch((err) => console.error('Audio play error:', err));
      typingTimeoutRef.current = setTimeout(() => {
        if (typingAudioRef.current) {
          typingAudioRef.current.pause();
          typingAudioRef.current.currentTime = 0;
        }
      }, 500);
    }
  };

  // Notification auto-dismiss
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification((prev) => ({ ...prev, isClosing: true }));
        setTimeout(() => setNotification(null), 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'icon' && files[0]) {
      const file = files[0];
      if (!file.type.startsWith('image/')) {
        setNotification({
          message: 'Please upload a valid image file!',
          target: 'icon',
          isClosing: false
        });
        return;
      }
      setFormData({ ...formData, icon: URL.createObjectURL(file) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, platform: value });
    setIsSelectOpen(false);
  };

  const handleGenerateToken = () => {
    if (!formData.platform) {
      setNotification({
        message: 'Please select a platform!',
        target: 'platform',
        isClosing: false
      });
      return;
    }
    setIsLoading(true);
    successAudioRef.current.play().catch((err) => console.error('Audio play error:', err));
    setTimeout(() => {
      setIsLoading(false);
      setIsTokenGenerated(true);
    }, 1500);
  };

  const handleSaveToken = () => {
    if (tokenDisplayRef.current) {
      html2canvas(tokenDisplayRef.current, {
        backgroundColor: '#f5e9cb',
        scale: 2
      })
        .then((canvas) => {
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = `ProfitForgeToken_${formData.ticker || 'TKN'}.png`;
          link.click();
          setSaving(true);
          setTimeout(() => setSaving(false), 1500);
        })
        .catch((err) => {
          console.error('Error generating image:', err);
          setNotification({
            message: 'Failed to download token image.',
            target: 'save',
            isClosing: false
          });
        });
    } else {
      setSaving(true);
      setTimeout(() => setSaving(false), 1500);
    }
    setFormData({
      name: '',
      description: '',
      ticker: '',
      supply: '',
      platform: '',
      icon: null,
      telegramLink: '',
      websiteLink: '',
      twitterLink: ''
    });
    setIsTokenGenerated(false);
  };

  const handleConfirm = () => {
    navigate('/create', { state: { formData } });
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, isClosing: true }));
    setTimeout(() => setNotification(null), 300);
  };

  return (
    <>
      <FontImport />
      <MainContainer id="main-component">
        <ContentWrapper>
          <TokenWrapper>
            <TokenDisplay ref={tokenDisplayRef} dynamicHeight={cardHeight}>
              {isLoading ? (
                <LoadingText>
                  <Spinner />
                  Loading...
                </LoadingText>
              ) : (
                <DataList>
                  <DataItem>Name: {formData.name || 'Enter Name'}</DataItem>
                  <DescriptionItem>Description: {formData.description || 'No description'}</DescriptionItem>
                  <DataItem>Ticker: {formData.ticker || 'e.g., PFGE'}</DataItem>
                  <DataItem>Supply: {formData.supply || 'e.g., 1000000'}</DataItem>
                  <DataItem>Platform: {formData.platform || 'Select Platform'}</DataItem>
                  {formData.icon && <IconImage src={formData.icon} alt="Token Icon" />}
                  <DataItem>Telegram: {formData.telegramLink || 'e.g., https://t.me/example'}</DataItem>
                  <DataItem>Website: {formData.websiteLink || 'e.g., https://example.com'}</DataItem>
                  <DataItem>Twitter/X: {formData.twitterLink || 'e.g., https://x.com/example'}</DataItem>
                </DataList>
              )}
            </TokenDisplay>
            {isTokenGenerated && (
              <ButtonContainer>
                <ActionButton onClick={handleConfirm} aria-label="Confirm Token">
                  Confirm
                </ActionButton>
                <ActionButton onClick={handleSaveToken} disabled={saving} aria-label="Save Token">
                  {saving ? 'Saving...' : 'Save Token'}
                </ActionButton>
                {notification && notification.target === 'save' && (
                  <Notification
                    className={notification.isClosing ? 'fade-out' : ''}
                    role="alert"
                    aria-live="assertive"
                  >
                    <span>{notification.message}</span>
                    <NotificationClose onClick={handleCloseNotification} tabIndex="0">
                      <CloseIcon />
                    </NotificationClose>
                  </Notification>
                )}
              </ButtonContainer>
            )}
          </TokenWrapper>
          <FormContainer>
            <FormCard ref={formCardRef}>
              <ScanlineOverlay />
              <Title>Profit Forge</Title>
              <FormGroup hasNotification={notification && notification.target === 'platform'}>
                <Label>Platform</Label>
                <SelectContainer>
                  <SelectButton
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                    aria-expanded={isSelectOpen}
                    aria-label="Select Platform"
                  >
                    <span>{formData.platform || 'Select Platform'}</span>
                    <span>{isSelectOpen ? '▲' : '▼'}</span>
                  </SelectButton>
                  {isSelectOpen && (
                    <SelectDropdown>
                      {platformOptions.map((option) => (
                        <SelectOption
                          key={option.value}
                          className={formData.platform === option.value ? 'selected' : ''}
                          onClick={() => handleSelectChange(option.value)}
                        >
                          {option.label}
                        </SelectOption>
                      ))}
                    </SelectDropdown>
                  )}
                </SelectContainer>
                {notification && notification.target === 'platform' && (
                  <Notification
                    className={notification.isClosing ? 'fade-out' : ''}
                    role="alert"
                    aria-live="assertive"
                  >
                    <span>{notification.message}</span>
                    <NotificationClose onClick={handleCloseNotification} tabIndex="0">
                      <CloseIcon />
                    </NotificationClose>
                  </Notification>
                )}
              </FormGroup>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter Name"
                />
                <IconWrapper>
                  <NameIcon />
                </IconWrapper>
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  placeholder="Describe Your Token"
                  rows={2}
                />
              </FormGroup>
              <FormGroup>
                <Label>Ticker</Label>
                <Input
                  type="text"
                  name="ticker"
                  value={formData.ticker}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  placeholder="e.g., PFGE"
                />
                <IconWrapper>
                  <TickerIcon />
                </IconWrapper>
              </FormGroup>
              <FormGroup>
                <Label>Total Supply</Label>
                <Input
                  type="number"
                  name="supply"
                  value={formData.supply}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  placeholder="e.g., 1000000"
                />
                <IconWrapper>
                  <SupplyIcon />
                </IconWrapper>
              </FormGroup>
              <FormGroup hasNotification={notification && notification.target === 'icon'}>
                <Label>Icon</Label>
                <Input
                  type="file"
                  name="icon"
                  accept="image/*"
                  onChange={handleChange}
                />
                {notification && notification.target === 'icon' && (
                  <Notification
                    className={notification.isClosing ? 'fade-out' : ''}
                    role="alert"
                    aria-live="assertive"
                  >
                    <span>{notification.message}</span>
                    <NotificationClose onClick={handleCloseNotification} tabIndex="0">
                      <CloseIcon />
                    </NotificationClose>
                  </Notification>
                )}
              </FormGroup>
              <FormGroup>
                <Label>Telegram Link</Label>
                <Input
                  type="url"
                  name="telegramLink"
                  value={formData.telegramLink}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  placeholder="e.g., https://t.me/example"
                />
                <IconWrapper>
                  <LinkIcon />
                </IconWrapper>
              </FormGroup>
              <FormGroup>
                <Label>Website Link</Label>
                <Input
                  type="url"
                  name="websiteLink"
                  value={formData.websiteLink}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  placeholder="e.g., https://example.com"
                />
                <IconWrapper>
                  <LinkIcon />
                </IconWrapper>
              </FormGroup>
              <FormGroup>
                <Label>Twitter/X Link</Label>
                <Input
                  type="url"
                  name="twitterLink"
                  value={formData.twitterLink}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  placeholder="e.g., https://x.com/example"
                />
                <IconWrapper>
                  <LinkIcon />
                </IconWrapper>
              </FormGroup>
              <Button onClick={handleGenerateToken} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner />
                    Loading...
                  </>
                ) : (
                  'Generate Token'
                )}
              </Button>
            </FormCard>
          </FormContainer>
        </ContentWrapper>
      </MainContainer>
    </>
  );
};

export default Main;