import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useLocation, useNavigate } from 'react-router-dom';
import money1 from '../assets/money1.png';
import money2 from '../assets/money2.png';
import money3 from '../assets/money3.png';
import stamp1 from '../assets/stamp1.png';
import stamp2 from '../assets/stamp2.png';
import stamp3 from '../assets/stamp3.png';
import bgCreate from '../assets/2.jpg';
import html2canvas from 'html2canvas';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import Cinzel, Playfair Display, and Courier New fonts
const FontImport = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Playfair+Display:wght@400;700&family=Courier+New&display=swap');
`;

// Decorative elements
const GuillocheBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 2;
  border: 8px solid transparent;
  box-sizing: border-box;
  background-image: 
    repeating-linear-gradient(45deg, rgba(245, 233, 203, 0.3) 0px, rgba(115, 94, 68, 0.3) 2px, transparent 2px, transparent 6px),
    repeating-linear-gradient(-45deg, rgba(245, 233, 203, 0.3) 0px, rgba(115, 94, 68, 0.3) 2px, transparent 2px, transparent 6px),
    linear-gradient(90deg, rgba(74, 94, 115, 0.2) 0%, transparent 50%);
  opacity: 0.8;

  @media (max-width: 768px) {
    border: 6px solid transparent;
  }

  @media (max-width: 480px) {
    border: 4px solid transparent;
  }
`;

const CurvedPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  background-image: 
    radial-gradient(circle at 20% 20%, rgba(245, 233, 203, 0.1) 0%, transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(115, 94, 68, 0.1) 0%, transparent 40%),
    linear-gradient(45deg, rgba(74, 94, 115, 0.05) 0%, transparent 50%);
`;

const MicroText = styled.div`
  position: absolute;
  width: 100%;
  height: 0.3rem;
  pointer-events: none;
  z-index: 3;
  font-family: 'Courier New', monospace;
  font-size: 0.15rem;
  line-height: 0.2rem;
  color: rgba(42, 42, 42, 0.6);
  overflow: hidden;
  text-align: justify;
  letter-spacing: 0.05rem;

  &.top {
    top: 0.2rem;
    left: 0;
  }

  &.bottom {
    bottom: 0.2rem;
    left: 0;
    transform: rotate(180deg);
  }

  &.right {
    top: 40%;
    right: 0.2rem;
    width: 50%;
    height: 0.3rem;
    transform: rotate(90deg);
  }

  &:after {
    content: "SECURE AUTHENTIC VERIFIED DOCUMENT OFFICIAL CURRENCY SECURE AUTHENTIC VERIFIED DOCUMENT";
    display: block;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    font-size: 0.12rem;
    line-height: 0.18rem;
  }

  @media (max-width: 480px) {
    font-size: 0.1rem;
  }
`;

const WatermarkEffect = styled.div`
  position: absolute;
  width: 18%;
  height: 25%;
  bottom: 15%;
  right: 20%;
  opacity: 0.12;
  background: radial-gradient(circle, rgba(115, 94, 68, 0.7) 0%, transparent 60%);
  pointer-events: none;
  z-index: 1;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 15%;
    height: 20%;
    opacity: 0.1;
  }
`;

const CreaseOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
  background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.05) 0%, transparent 50%, rgba(0, 0, 0, 0.05) 100%);
  opacity: 0.1;
`;

// Transaction dates
const TransactionDates = styled.div`
  position: absolute;
  top: 30%;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  z-index: 4;
  font-family: 'Courier New', monospace;
  font-size: 0.7rem;
  color: rgba(42, 42, 42, 0.6);
  text-shadow: 1px 1px 1px rgba(115, 94, 68, 0.1);
  filter: blur(0.5px);
  opacity: 0.7;

  @media (max-width: 768px) {
    font-size: 0.6rem;
    left: 0.6rem;
    gap: 0.3rem;
  }

  @media (max-width: 480px) {
    font-size: 0.55rem;
    left: 0.5rem;
  }
`;

const TransactionDate = styled.p`
  transform: rotate(${() => Math.random() * 2 - 1}deg);
  letter-spacing: 0.05rem;
`;

// Styled Components
const CreateContainer = styled.div`
  min-height: 100vh;
  max-height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(41, 41, 41, 0.56) url(${bgCreate}) no-repeat center center/cover;
  background-attachment: fixed;
  background-size: cover;
  padding: 1.5rem;
  position: relative;
  width: 100%;
  color: #f5e9cb;
  font-family: 'Courier New', monospace;
  overflow-y: auto;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, transparent, rgba(0, 0, 0, 0.73));
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const Title = styled.h1`
  font-family: 'Cinzel', 'Times New Roman', serif;
  font-size: 1.8rem;
  color: #f5e9cb;
  text-shadow: 1px 1px 3px rgba(115, 94, 68, 0.3);
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: 0.08rem;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
  }
`;

const NoteWrapper = styled.div`
  width: 26rem;
  height: 16rem;
  position: relative;
  background: rgb(255, 236, 200);
  background-image: 
    radial-gradient(circle, #f5e9cb 1px, transparent 1px),
    repeating-conic-gradient(from 0deg, rgba(245, 233, 203, 0.05) 0deg 10deg, rgba(115, 94, 68, 0.05) 10deg 20deg),
    url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAF0lEQVQYV2NkYGD4z8DAwMgABXAGNgYwAAAV+AABqSAtAAAAAElFTkSuQmCC');
  background-size: 8px 8px, 80px 80px, auto;
  background-blend-mode: overlay;
  border: 6px solid transparent;
  border-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M0 0 L5 5 L10 0 L15 5 L20 0" stroke="%23f5e9cb" stroke-width="2" fill="none"/><path d="M0 20 L5 15 L10 20 L15 15 L20 20" stroke="%232a2a2a" stroke-width="2" fill="none"/></svg>') 20 stretch;
  box-shadow: 
    inset 0 0 8px rgba(115, 94, 68, 0.4), 
    4px 4px 10px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(245, 233, 203, 0.2);
  overflow: hidden;
  filter: sepia(0.3);
  will-change: transform;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 20rem;
    height: auto;
    aspect-ratio: 3/2;
    border-width: 4px;
    box-shadow: 
      inset 0 0 5px rgba(115, 94, 68, 0.4), 
      3px 3px 6px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 480px) {
    max-width: 95vw;
    border-width: 3px;
  }
`;

const NoteImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  mix-blend-mode: multiply;
  opacity: 0.9;
`;

const StampImage = styled.img`
  position: absolute;
  width: 6rem;
  height: 6rem;
  object-fit: contain;
  filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.3)) brightness(1.1);
  z-index: 4;
  mix-blend-mode: multiply;
  opacity: 0.8;

  &.primary {
    bottom: 0.4rem;
    right: 0.4rem;
    transform: rotate(5deg);
  }

  &.secondary {
    top: 0.4rem;
    left: 0.4rem;
    transform: rotate(-5deg);
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    width: 4rem;
    height: 4rem;
    &.primary {
      bottom: 0.3rem;
      right: 0.3rem;
    }
    &.secondary {
      top: 0.3rem;
      left: 0.3rem;
    }
  }

  @media (max-width: 480px) {
    width: 3.5rem;
    height: 3.5rem;
  }
`;

const Name = styled.p`
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%) rotate(0.5deg);
  font-family: 'Cinzel', 'Times New Roman', serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: #2a2a2a;
  text-shadow: 1px 1px 2px rgba(115, 94, 68, 0.3);
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  letter-spacing: 0.12rem;
  text-transform: uppercase;
  z-index: 5;

  &:after {
    content: '';
    position: absolute;
    bottom: -0.2rem;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #2a2a2a, transparent);
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    top: 0.6rem;
    max-width: 85%;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    top: 0.5rem;
  }
`;

const Description = styled.p`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  font-family: 'Playfair Display', 'Times New Roman', serif;
  font-size: 0.9rem;
  color: #2a2a2a;
  text-shadow: 1px 1px 1px rgba(115, 94, 68, 0.2);
  max-width: 35%;
  white-space: normal;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.3;
  z-index: 5;
  text-align: left;
  font-style: italic;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    left: 0.6rem;
    max-width: 40%;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    left: 0.5rem;
  }
`;

const Ticker = styled.p`
  position: absolute;
  top: 1rem;
  right: 1rem;
  transform: rotate(0.5deg);
  font-family: 'Playfair Display', 'Times New Roman', serif;
  font-size: 1rem;
  color: #2a2a2a;
  text-shadow: 1px 1px 1px rgba(115, 94, 68, 0.2);
  max-width: 30%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  z-index: 5;
  background: rgba(245, 233, 203, 0.3);
  padding: 0.2rem 0.4rem;
  border-radius: 0.1rem;
  border: 1px solid rgba(115, 94, 68, 0.2);

  @media (max-width: 768px) {
    font-size: 0.8rem;
    top: 0.6rem;
    right: 0.6rem;
    max-width: 35%;
    padding: 0.15rem 0.3rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    top: 0.5rem;
    right: 0.5rem;
  }
`;

const Supply = styled.p`
  position: absolute;
  bottom: 2.5rem;
  left: 1rem;
  font-family: 'Cinzel', 'Times New Roman', serif;
  font-size: 1rem;
  color: #2a2a2a;
  text-shadow: 1px 1px 1px rgba(115, 94, 68, 0.2);
  max-width: 40%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 5;
  letter-spacing: 0.1rem;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    bottom: 1.8rem;
    left: 0.6rem;
    max-width: 45%;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    bottom: 1.5rem;
    left: 0.5rem;
  }
`;

const Platform = styled.p`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Playfair Display', 'Times New Roman', serif;
  font-size: 0.9rem;
  color: #2a2a2a;
  text-shadow: 1px 1px 1px rgba(115, 94, 68, 0.2);
  max-width: 55%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  z-index: 5;
  border-top: 1px solid rgba(115, 94, 68, 0.3);
  border-bottom: 1px solid rgba(115, 94, 68, 0.3);
  padding: 0.15rem 0.8rem;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    bottom: 0.6rem;
    max-width: 60%;
    padding: 0.1rem 0.6rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    bottom: 0.5rem;
  }
`;

const IconImage = styled.img`
  position: absolute;
  top: 25%;
  right: 1rem;
  width: 3.5rem;
  height: 3.5rem;
  object-fit: contain;
  border: 2px solid #735e44;
  background: rgba(245, 233, 203, 0.3);
  z-index: 5;
  filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.3));
  opacity: 0.9;

  @media (max-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
    right: 0.6rem;
  }

  @media (max-width: 480px) {
    width: 2rem;
    height: 2rem;
    right: 0.5rem;
  }
`;

const SocialLinks = styled.div`
  position: absolute;
  bottom: 4rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  max-width: 35%;
  z-index: 5;

  @media (max-width: 768px) {
    bottom: 3rem;
    right: 0.6rem;
    gap: 0.15rem;
  }

  @media (max-width: 480px) {
    bottom: 2.5rem;
    right: 0.5rem;
  }
`;

const SocialLink = styled.p`
  font-family: 'Playfair Display', 'Times New Roman', serif;
  font-size: 0.7rem;
  color: #2a2a2a;
  text-shadow: 1px 1px 1px rgba(115, 94, 68, 0.2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: 0.65rem;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

const SerialNumber = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: #2a2a2a;
  letter-spacing: 0.12rem;
  font-weight: bold;
  z-index: 5;
  transform: rotate(-0.5deg);
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    top: 0.6rem;
    left: 0.6rem;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
    top: 0.5rem;
    left: 0.5rem;
  }
`;

const SwiperWrapper = styled.div`
  width: 26rem;
  margin: 1rem 0;

  .swiper-slide img {
    width: 100%;
    height: 7rem;
    object-fit: cover;
    border: 2px solid #f5e9cb;
    box-shadow: 0 0 5px rgba(115, 94, 68, 0.3);
    display: block;
    loading: lazy;
  }

  .swiper-button-prev,
  .swiper-button-next {
    background: #2a2a2a;
    color: #f5e9cb;
    width: 1.2rem;
    height: 1.2rem;
    border: 1px solid #735e44;
    box-shadow: 0 0 6px rgba(115, 94, 68, 0.5), inset 0 0 3px rgba(0, 0, 0, 0.3);
    border-radius: 0;
    transition: all 0.3s ease;
    font-family: 'Courier New', monospace;
    --swiper-navigation-size: 0.7rem;

    &:hover {
      background: #f5e9cb;
      color: #2a2a2a;
      box-shadow: 0 0 10px rgba(115, 94, 68, 0.7);
    }

    &:active {
      transform: scale(0.98);
    }
  }

  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 0.7rem;
    font-weight: bold;
  }

  .swiper-pagination-bullet {
    background: #2a2a2a;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 0;
    box-shadow: 0 0 3px rgba(115, 94, 68, 0.5);
    opacity: 0.7;
  }

  .swiper-pagination-bullet-active {
    background: #f5e9cb;
    box-shadow: 0 0 5px rgba(245, 233, 203, 0.7);
    animation: crtFlicker 0.7s infinite;

    @keyframes crtFlicker {
      0% { opacity: 1; }
      50% { opacity: 0.8; }
      100% { opacity: 1; }
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 20rem;
    margin: 0.75rem 0;

    .swiper-slide img {
      height: 5rem;
      border-width: 1px;
    }

    .swiper-button-prev,
    .swiper-button-next {
      width: 1rem;
      height: 1rem;
      --swiper-navigation-size: 0.6rem;
      border: 1px solid #735e44;
      box-shadow: 0 0 5px rgba(115, 94, 68, 0.5);
    }

    .swiper-button-prev:after,
    .swiper-button-next:after {
      font-size: 0.6rem;
    }

    .swiper-pagination-bullet {
      width: 0.3rem;
      height: 0.3rem;
    }
  }

  @media (max-width: 480px) {
    max-width: 95vw;

    .swiper-slide img {
      height: 4.5rem;
    }

    .swiper-button-prev,
    .swiper-button-next {
      width: 0.8rem;
      height: 0.8rem;
      --swiper-navigation-size: 0.5rem;
    }

    .swiper-button-prev:after,
    .swiper-button-next:after {
      font-size: 0.5rem;
    }
  }
`;

const StampSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0.4rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
    margin-top: 0.75rem;
    padding: 0.3rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
`;

const StampButton = styled.button`
  background: #2a2a2a;
  color: #f5e9cb;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  padding: 0.4rem 0.8rem;
  border: 1px solid #735e44;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  box-shadow: 0 0 6px rgba(115, 94, 68, 0.5), inset 0 0 3px rgba(0, 0, 0, 0.3);
  background-image: radial-gradient(circle, rgba(245, 233, 203, 0.2), rgba(115, 94, 68, 0.2));
  min-height: 2rem;

  &:hover {
    background: #f5e9cb;
    color: #2a2a2a;
    box-shadow: 0 0 10px rgba(115, 94, 68, 0.7);
    background-image: radial-gradient(circle, rgba(245, 233, 203, 0.4), rgba(115, 94, 68, 0.4));
  }

  &:active {
    transform: scale(0.98);
  }

  &.selected {
    background: #735e44;
    color: #f5e9cb;
    box-shadow: 0 0 8px rgba(245, 233, 203, 0.7);
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.3rem 0.6rem;
    min-height: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.3rem 0.5rem;
    min-height: 1.6rem;
  }
`;

const DownloadButton = styled(StampButton)`
  &:disabled {
    background: #2a2a2a80;
    color: #f5e9cb80;
    cursor: not-allowed;
    box-shadow: none;
    border: 1px solid #f5e9cb80;
  }
`;

const BackButton = styled(StampButton)`
  background: #2a2a2a;
  color: #735e44;
  border: 1px solid #735e44;
  box-shadow: 0 0 6px rgba(115, 94, 68, 0.2);

  &:hover {
    background: #f5e9cb;
    color: #1a1a1a;
    box-shadow: 0 0 10px rgba(115, 94, 68, 0.4);
  }
`;

// Banknote and stamp options
const banknotes = [
  { id: 1, src: money1, name: 'Banknote 1' },
  { id: 2, src: money2, name: 'Banknote 2' },
  { id: 3, src: money3, name: 'Banknote 3' },
];

const stamps = [
  { id: 1, src: stamp1, name: 'Stamp 1' },
  { id: 2, src: stamp2, name: 'Stamp 2' },
  { id: 3, src: stamp3, name: 'Stamp 3' },
];

// Generate random transaction dates
const generateTransactionDates = () => {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const dates = [];
  for (let i = 0; i < 5; i++) {
    const day = Math.floor(Math.random() * 28) + 1;
    const month = months[Math.floor(Math.random() * months.length)];
    const year = 1950 + Math.floor(Math.random() * 30);
    dates.push(`${day.toString().padStart(2, '0')} ${month} ${year}`);
  }
  return dates;
};

// Generate random serial number
const generateSerialNumber = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let serial = '';

  // Format: AA 12345678 A
  serial += chars.charAt(Math.floor(Math.random() * chars.length));
  serial += chars.charAt(Math.floor(Math.random() * chars.length));
  serial += ' ';

  for (let i = 0; i < 8; i++) {
    serial += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  serial += ' ';
  serial += chars.charAt(Math.floor(Math.random() * chars.length));

  return serial;
};

const Create = () => {
  const [selectedBanknote, setSelectedBanknote] = useState(banknotes[0].src);
  const [selectedStamps, setSelectedStamps] = useState([stamps[0].src]);
  const [serialNumber] = useState(generateSerialNumber());
  const [transactionDates] = useState(generateTransactionDates());
  const [isDownloading, setIsDownloading] = useState(false);
  const noteWrapperRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData || {};

  const handleStampSelect = (stampSrc) => {
    setSelectedStamps((prev) => {
      if (prev.includes(stampSrc)) {
        return prev.filter((s) => s !== stampSrc);
      }
      if (prev.length >= 2) {
        return [prev[0], stampSrc];
      }
      return [...prev, stampSrc];
    });
  };

  const handleDownload = async () => {
    if (!noteWrapperRef.current) {
      alert('Banknote is not ready. Please try again.');
      return;
    }

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(noteWrapperRef.current, {
        scale: 1.5,
        useCORS: true,
        backgroundColor: null,
      });
      const link = document.createElement('a');
      link.download = `banknote_${serialNumber.replace(/\s/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please ensure images are accessible and try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <>
      <FontImport />
      <CreateContainer role="main">
        <Title>Design Your Token</Title>
        <NoteWrapper ref={noteWrapperRef}>
          <NoteImage src={selectedBanknote} alt={`Banknote ${banknotes.find((n) => n.src === selectedBanknote).name}`} loading="lazy" />
          <GuillocheBorder />
          <CurvedPattern />
          <MicroText className="top" />
          <MicroText className="bottom" />
          <MicroText className="right" />
          <WatermarkEffect />
          <CreaseOverlay />
          <TransactionDates>
            {transactionDates.map((date, index) => (
              <TransactionDate key={index}>{date}</TransactionDate>
            ))}
          </TransactionDates>
          <Name>{formData.name || 'EXAMPLE TOKEN'}</Name>
          <Description>{formData.description?.slice(0, 80) || 'Token Description Here'}</Description>
          <Ticker>{formData.ticker || 'TKN'}</Ticker>
          <Supply>Supply: {formData.supply || '1,000,000'}</Supply>
          <Platform>{formData.platform || 'ETHEREUM NETWORK'}</Platform>
          {formData.icon && <IconImage src={formData.icon} alt="Token Icon" loading="lazy" />}
          <SocialLinks>
            <SocialLink>Telegram: {formData.telegramLink || 't.me/example'}</SocialLink>
            <SocialLink>Website: {formData.websiteLink || 'example.com'}</SocialLink>
            <SocialLink>Twitter/X: {formData.twitterLink || 'x.com/example'}</SocialLink>
          </SocialLinks>
          <SerialNumber>{serialNumber}</SerialNumber>
          {selectedStamps[0] && (
            <StampImage
              className="primary"
              src={selectedStamps[0]}
              alt={`Stamp ${stamps.find((s) => s.src === selectedStamps[0]).name}`}
              loading="lazy"
            />
          )}
          {selectedStamps[1] && (
            <StampImage
              className="secondary"
              src={selectedStamps[1]}
              alt={`Stamp ${stamps.find((s) => s.src === selectedStamps[1]).name}`}
              loading="lazy"
            />
          )}
        </NoteWrapper>
        <SwiperWrapper>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              disabledClass: 'swiper-button-disabled',
            }}
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            grabCursor={true}
            onSlideChange={(swiper) => setSelectedBanknote(banknotes[swiper.activeIndex].src)}
          >
            {banknotes.map((note) => (
              <SwiperSlide key={note.id}>
                <img src={note.src} alt={note.name} />
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperWrapper>
        <StampSelector>
          {stamps.map((stamp) => (
            <StampButton
              key={stamp.id}
              onClick={() => handleStampSelect(stamp.src)}
              aria-label={`Select ${stamp.name}`}
              className={selectedStamps.includes(stamp.src) ? 'selected' : ''}
            >
              Stamp {stamp.id}
            </StampButton>
          ))}
          <DownloadButton
            onClick={handleDownload}
            disabled={isDownloading}
            aria-label={isDownloading ? 'Generating Banknote' : 'Download Banknote'}
          >
            {isDownloading ? 'Generating...' : 'Download Banknote'}
          </DownloadButton>
          <BackButton onClick={handleBack} aria-label="Back to Home">
            Back
          </BackButton>
        </StampSelector>
      </CreateContainer>
    </>
  );
};

export default Create;