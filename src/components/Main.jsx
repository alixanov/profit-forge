import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import bg from '../assets/bg-crypto.webp';
import Select from 'react-select';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import Create from './Create';

// Import Press Start 2P font
const FontImport = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: rgba(245, 233, 203, 0.9);
  border: 3px solid #2a2a2a;
  box-shadow: 0 0 15px rgba(115, 94, 68, 0.3), inset 0 0 8px rgba(0, 0, 0, 0.4);
  width: 96rem;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: crtFlicker 0.3s;
  padding: 1rem;
  scroll-behavior: smooth;

  @keyframes crtFlicker {
    0% { opacity: 0.8; }
    50% { opacity: 0.9; }
    100% { opacity: 1; }
  }

  @media (max-width: 768px) {
    width: 95vw;
    max-width: 95%;
    max-height: 85vh;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

// Notification Styles
const Notification = styled.div`
  position: absolute;
  bottom: -2.5rem;
  left: 0;
  right: 0;
  background: rgba(245, 233, 203, 0.9);
  border: 2px solid #2a2a2a;
  padding: 0.5rem 1rem;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: #2a2a2a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 8px rgba(115, 94, 68, 0.2);
  animation: slideIn 0.3s ease-out, crtFlicker 0.3s;
  z-index: 10;
  filter: sepia(0.1);
  max-width: 90%;
  margin: 0 auto;
  transition: opacity 0.3s ease, transform 0.3s ease;

  &.fade-out {
    opacity: 0;
    transform: translateY(0.5rem);
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, transparent, rgba(115, 94, 68, 0.05));
    pointer-events: none;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(0.5rem); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes crtFlicker {
    0% { opacity: 0.8; }
    50% { opacity: 0.9; }
    100% { opacity: 1; }
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
    bottom: -2.25rem;
    max-width: 85vw;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.75rem;
    bottom: -2rem;
  }
`;

const NotificationClose = styled.button`
  background: #2a2a2a;
  border: 1px solid #735e44;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background: #f5e9cb;
    border-color: #1a1a1a;
    box-shadow: 0 0 6px rgba(115, 94, 68, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: 1px solid #735e44;
    outline-offset: 1px;
  }

  svg {
    width: 6px;
    height: 6px;
  }

  @media (max-width: 768px) {
    width: 1rem;
    height: 1rem;
    svg {
      width: 6px;
      height: 6px;
    }
  }
`;

// Custom pixel-art SVG icons
const CoinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="8" height="8" fill="#3a3a3a" />
    <rect x="5" y="5" width="6" height="6" fill="#735e44" />
    <rect x="7" y="7" width="2" height="2" fill="#3a3a3a" />
  </svg>
);

const TickerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="10" height="6" fill="#3a3a3a" />
    <rect x="4" y="6" width="2" height="4" fill="#735e44" />
    <rect x="7" y="6" width="2" height="4" fill="#735e44" />
    <rect x="10" y="6" width="2" height="4" fill="#735e44" />
  </svg>
);

const SupplyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="3" width="8" height="10" fill="#3a3a3a" />
    <rect x="5" y="4" width="6" height="2" fill="#735e44" />
    <rect x="5" y="7" width="6" height="2" fill="#735e44" />
    <rect x="5" y="10" width="6" height="2" fill="#735e44" />
  </svg>
);

const CloseIcon = () => (
  <svg width="6" height="6" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="12" height="2" fill="#735e44" transform="rotate(45 8 8)" />
    <rect x="2" y="2" width="12" height="2" fill="#735e44" transform="rotate(-45 8 8)" />
    <rect x="2" y="2" width="12" height="2" fill="#2a2a2a" transform="rotate(45 8 8)" opacity="0.3" />
    <rect x="2" y="2" width="12" height="2" fill="#2a2a2a" transform="rotate(-45 8 8)" opacity="0.3" />
  </svg>
);

const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(41, 41, 41, 0.56) url(${bg}) no-repeat center center/cover;
  background-attachment: fixed;
  background-size: cover; /* Растянет фон */
  position: relative;
  overflow-y: auto;

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
  max-width: 72rem;
  align-items: center;
  justify-content: space-between;
  position: relative;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 2rem 1rem;
    align-items: stretch;
    justify-content: flex-start;
    gap: 1.5rem;
  }
`;

const TokenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  background: radial-gradient(circle, rgba(115, 94, 68, 0.2), rgba(0, 0, 0, 0.5));
  padding: 1.5rem;
  border: 2px solid #2a2a2a;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
  will-change: transform;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 90vw;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
        margin-top:10rem;

  }
`;

const TokenDisplay = styled.div`
  width: 34rem;
  min-height: 33rem;
  background: #efe5d2;
  background-image: radial-gradient(circle, rgba(115, 94, 68, 0.1) 1px, transparent 1px);
  background-size: 4px 4px;
  border: 1px solid #2a2a2a;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3), -2px -2px 5px rgba(115, 94, 68, 0.2);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  padding: 2rem;
  animation: crtFlicker 0.3s 0.7s;
  font-family: 'Courier New', monospace;
  color: #3a3a3a;
  filter: sepia(0.2);
  transform: rotate(-1deg);
  will-change: transform;

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

  @keyframes crtFlicker {
    0% { opacity: 0.8; }
    50% { opacity: 0.9; }
    100% { opacity: 1; }
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 90vw;
    min-height: 20rem;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const DataList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: 1rem;
  line-height: 1.3;
  letter-spacing: 0.05rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    gap: 0.5rem;
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
  height: 8rem;
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
    height: 6rem;
  }
`;

const LoadingText = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  color: #735e44;
  text-shadow: 1px 1px 3px rgba(115, 94, 68, 0.2);
  text-align: center;
  padding: 0.8rem;
  background: rgba(0, 0, 0, 0.7);
  border: 2px dashed #2a2a2a;
  max-width: 90%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.6rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
`;

const ActionButton = styled.button`
  background: #2a2a2a;
  color: ${({ disabled }) => (disabled ? '#1a1a1a' : '#735e44')};
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  padding: 0.4rem 0.8rem;
  border: 2px solid #735e44;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 6px rgba(115, 94, 68, 0.2);
  text-transform: uppercase;
  width: 9rem;
  text-align: center;

  &:hover {
    background: #f5e9cb;
    color: #1a1a1a;
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
    width: 100%;
    max-width: 16rem;
    font-size: 0.85rem;
    padding: 0.5rem;
    min-height: 2.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.4rem;
    min-height: 2.5rem;
  }
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: crtFlicker 0.3s 0.7s;

  @keyframes crtFlicker {
    0% { opacity: 0.8; }
    50% { opacity: 0.9; }
    100% { opacity: 1; }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;




const FormCard = styled.div`
  background: rgba(115, 94, 68, 0.55);
  padding: 2rem;
  margin: 0.5rem;
  border: 3px solid #2a2a2a;
  width: 38rem;
  min-height: 36rem;
  box-shadow: 0 0 15px rgba(115, 94, 68, 0.15), inset 0 0 8px rgba(0, 0, 0, 0.4);
  position: relative;
  animation: scanline 6s linear infinite;
  will-change: transform;
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;

  @keyframes scanline {
    0% { background-position: 0 0; }
    100% { background-position: 0 100%; }
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 90vw;
    min-height: auto;
    padding: 1.25rem;
    margin: 0.5rem 0;
    animation: scanline 4s linear infinite;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  font-size: 2rem;
  text-align: center;
  color: #2a2a2a;
  margin-bottom: 1.2rem;
  text-shadow: 1px 1px 3px rgba(115, 94, 68, 0.2);
  overflow: hidden;
  white-space: nowrap;
  animation: typewriter 2s steps(40, end);
  letter-spacing: 0.1rem;

  @keyframes typewriter {
    from { width: 0; }
    to { width: 100%; }
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 1rem;
    animation: typewriter 1.5s steps(40, end);
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const FormGroup = styled.div`
  position: relative;
  margin-bottom: ${({ hasNotification }) => (hasNotification ? '2.5rem' : '1rem')};

  @media (max-width: 768px) {
    margin-bottom: ${({ hasNotification }) => (hasNotification ? '2.25rem' : '1.25rem')};
  }
`;

const Label = styled.label`
  display: block;
  color: #2a2a2a;
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  font-size: 0.7rem;
  margin-bottom: 0.3rem;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const Input = styled.input`
  width: 100%;
  background: rgba(245, 233, 203, 0.2);
  border: none;
  border-bottom: 2px dashed #2a2a2a;
  color: #2a2a2a;
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  font-size: 0.9rem;
  padding: 0.3rem 0.2rem;
  outline: none;
  transition: border-color 0.3s ease, background 0.3s ease;
  min-height: 2.5rem;

  &:focus {
    border-color: #735e44;
    background: rgba(115, 94, 68, 0.1);
  }

  &::placeholder {
    color: #735e44;
    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.4rem 0.3rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.3rem 0.2rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  background: rgba(245, 233, 203, 0.2);
  border: none;
  border-bottom: 2px dashed #2a2a2a;
  color: #2a2a2a;
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  font-size: 0.9rem;
  padding: 0.3rem 0.2rem;
  outline: none;
  resize: none;
  transition: border-color 0.3s ease, background 0.3s ease;
  min-height: 2.5rem;

  &:focus {
    border-color: #735e44;
    background: rgba(115, 94, 68, 0.1);
  }

  &::placeholder {
    color: #735e44;
    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.4rem 0.3rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.3rem 0.2rem;
  }
`;

const Button = styled.button`
  width: 100%;
  background: #2a2a2a;
  color: #735e44;
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  font-size: 0.9rem;
  padding: 0.4rem;
  border: 2px solid #735e44;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 8px rgba(115, 94, 68, 0.2);
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;

  &:hover {
    background: #f5e9cb;
    color: #1a1a1a;
    box-shadow: 0 0 12px rgba(115, 94, 68, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.4rem;
    min-height: 2.5rem;
  }
`;

const Spinner = styled.div`
  border: 2px solid #735e44;
  border-top: 2px solid #2a2a2a;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 1.6rem;

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    right: 0.5rem;
    top: 1.5rem;
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

// Options for react-select
const options = [
  { value: '', label: 'Select Platform' },
  { value: 'Ethereum', label: 'Ethereum' },
  { value: 'Binance', label: 'Binance Smart Chain' },
  { value: 'Solana', label: 'Solana' }
];

// Custom styles for react-select
const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    background: 'rgba(245, 233, 203, 0.2)',
    border: 'none',
    borderBottom: '2px dashed #2a2a2a',
    color: '#2a2a2a',
    fontFamily: '"Press Start 2P", "IBM Plex Mono", monospace',
    fontSize: '0.9rem',
    padding: '0.3rem 0.2rem',
    outline: 'none',
    boxShadow: 'none',
    cursor: 'pointer',
    minHeight: '2.5rem',
    '&:hover': {
      borderColor: '#2a2a2a'
    },
    '&:focus': {
      borderColor: '#735e44',
      background: 'rgba(115, 94, 68, 0.1)'
    },
    '@media (max-width: 768px)': {
      fontSize: '0.85rem',
      padding: '0.4rem 0.3rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '0.8rem',
      padding: '0.3rem 0.2rem'
    }
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#2a2a2a'
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#735e44',
    fontStyle: 'italic'
  }),
  menu: (provided) => ({
    ...provided,
    background: 'rgba(115, 94, 68, 0.85)',
    border: '2px solid #2a2a2a',
    marginTop: '0',
    fontFamily: '"Press Start 2P", "IBM Plex Mono", monospace',
    zIndex: 20,
    '@media (max-width: 768px)': {
      fontSize: '0.85rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '0.8rem'
    }
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isSelected ? '#f5e9cb' : 'rgba(115, 94, 68, 0.85)',
    color: state.isSelected ? '#1a1a1a' : '#2a2a2a',
    cursor: 'pointer',
    fontSize: '0.9rem',
    '&:hover': {
      background: '#f5e9cb',
      color: '#1a1a1a'
    },
    '@media (max-width: 768px)': {
      fontSize: '0.85rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '0.8rem'
    }
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#2a2a2a',
    '&:hover': {
      color: '#735e44'
    }
  }),
  indicatorSeparator: () => ({
    display: 'none'
  })
};

const Main = () => {
  const [formData, setFormData] = useState({
    tokenName: '',
    description: '',
    ticker: '',
    supply: '',
    platform: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenGenerated, setIsTokenGenerated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const tokenDisplayRef = useRef(null);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  // Simulate typewriter sound effect
  useEffect(() => {
    const handleKeyPress = () => {
      const audio = new Audio('https://www.soundjay.com/mechanical/sounds/typewriter-key-01.mp3');
      audio.play().catch(() => { });
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Modal focus trap and Escape key handling
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsModalOpen(false);
        }
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      firstElement.focus();

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isModalOpen]);

  // Notification auto-dismiss
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification((prev) => ({ ...prev, isClosing: true }));
        setTimeout(() => setNotification(null), 300); // Match CSS transition
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, platform: selectedOption ? selectedOption.value : '' });
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
    setTimeout(() => {
      setIsLoading(false);
      setIsTokenGenerated(true);
    }, 1500);
  };

  const handleSaveToken = () => {
    if (tokenDisplayRef.current) {
      html2canvas(tokenDisplayRef.current, {
        backgroundColor: '#ffffff',
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
    setFormData({ tokenName: '', description: '', ticker: '', supply: '', platform: '' });
    setIsTokenGenerated(false);
  };

  const handleConfirm = () => {
    setIsModalOpen(true);
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, isClosing: true }));
    setTimeout(() => setNotification(null), 300); // Match CSS transition
  };

  return (
    <>
      <FontImport />
      <MainContainer id="main-component">
        <ContentWrapper>
          <TokenWrapper>
            <TokenDisplay ref={tokenDisplayRef}>
              {isLoading ? (
                <LoadingText>
                  <Spinner />
                  Loading...
                </LoadingText>
              ) : (
                <DataList>
                  <DataItem>Token Name: {formData.tokenName || 'Enter Token Name'}</DataItem>
                  <DescriptionItem>Description: {formData.description || 'No description'}</DescriptionItem>
                  <DataItem>Ticker: {formData.ticker || 'e.g., PFGE'}</DataItem>
                  <DataItem>Supply: {formData.supply || 'e.g., 1000000'}</DataItem>
                  <DataItem>Platform: {formData.platform || 'Select Platform'}</DataItem>
                </DataList>
              )}
            </TokenDisplay>
            {isTokenGenerated && (
              <ButtonContainer>
                {/* <ActionButton
                  onClick={handleSaveToken}
                  disabled={saving}
                  aria-label={saving ? 'Token Saved' : 'Save Token'}
                >
                  {saving ? 'Saved!' : 'Save Token'}
                </ActionButton> */}
                <ActionButton onClick={handleConfirm} aria-label="Confirm Token">
                  Confirm
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
            <FormCard>
              <Title>Profit Forge</Title>
              <FormGroup hasNotification={notification && notification.target === 'platform'}>
                <Label>Platform</Label>
                <Select
                  options={options}
                  value={options.find((option) => option.value === formData.platform)}
                  onChange={handleSelectChange}
                  styles={customSelectStyles}
                  placeholder="Select Platform"
                />
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
                <Label>Token Name</Label>
                <Input
                  type="text"
                  name="tokenName"
                  value={formData.tokenName}
                  onChange={handleChange}
                  placeholder="Enter Token Name"
                />
                <IconWrapper>
                  <CoinIcon />
                </IconWrapper>
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe Your Token"
                  rows={3}
                />
              </FormGroup>
              <FormGroup>
                <Label>Ticker Symbol</Label>
                <Input
                  type="text"
                  name="ticker"
                  value={formData.ticker}
                  onChange={handleChange}
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
                  placeholder="e.g., 1000000"
                />
                <IconWrapper>
                  <SupplyIcon />
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
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContainer
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <Create formData={formData} onClose={() => setIsModalOpen(false)} />
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};

export default Main;