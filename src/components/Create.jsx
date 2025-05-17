import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
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

// Import Cinzel, Playfair Display, and Press Start 2P fonts
const FontImport = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Playfair+Display:wght@400;700&family=Press+Start+2P&display=swap');
`;

// Enhanced decorative elements
const GuillocheBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 2;
  border: 10px solid transparent;
  box-sizing: border-box;
  background-image: 
    repeating-linear-gradient(45deg, rgba(252, 237, 210, 0.2) 0px, rgba(74, 30, 43, 0.2) 2px, transparent 2px, transparent 8px),
    repeating-linear-gradient(-45deg, rgba(252, 237, 210, 0.2) 0px, rgba(74, 30, 43, 0.2) 2px, transparent 2px, transparent 8px);
  opacity: 0.7;

  @media (max-width: 768px) {
    border: 8px solid transparent;
  }

  @media (max-width: 480px) {
    border: 6px solid transparent;
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
    radial-gradient(circle at 25% 25%, rgba(252, 237, 210, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(74, 30, 43, 0.08) 0%, transparent 50%);
`;

const MicroText = styled.div`
  position: absolute;
  top: 40%;
  right: 5%;
  width: 50%;
  height: 20%;
  pointer-events: none;
  z-index: 3;
  font-family: 'Playfair Display', serif;
  font-size: 0.2rem;
  line-height: 0.3rem;
  color: rgba(42, 42, 42, 0.7);
  overflow: hidden;
  transform: rotate(90deg);
  text-align: justify;

  &:after {
    content: "OFFICIAL CURRENCY SECURE DOCUMENT VERIFIED AUTHENTIC OFFICIAL CURRENCY SECURE DOCUMENT VERIFIED AUTHENTIC";
    display: block;
    white-space: break-spaces;
    word-break: break-all;
    letter-spacing: 0.05rem;
  }

  @media (max-width: 768px) {
    font-size: 0.15rem;
    line-height: 0.25rem;
  }
`;

const WatermarkEffect = styled.div`
  position: absolute;
  width: 20%;
  height: 30%;
  bottom: 20%;
  right: 25%;
  opacity: 0.1;
  background: radial-gradient(circle, rgba(74, 30, 43, 0.6) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 15%;
    height: 25%;
    opacity: 0.08;
  }
`;

// Styled Components
const CreateContainer = styled.div`
  min-height: auto;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url(${bgCreate}) no-repeat center center/cover;
  background-size: cover;
  padding: 2rem;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, transparent, rgba(0, 0, 0, 0.6));
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    max-height: 85vh;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  font-size: 2rem;
  color: #fcedd2;
  text-shadow: 1px 1px 3px rgba(74, 30, 43, 0.3), 0 0 8px rgba(252, 237, 210, 0.5);
  margin-bottom: 2.5rem;
  text-align: center;
  letter-spacing: 0.1rem;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
  }
`;

const NoteWrapper = styled.div`
  width: 30rem;
  height: 20rem;
  position: relative;
  background: rgb(255, 236, 200);
  background-image: 
    radial-gradient(circle, #f5e9cb 1px, transparent 1px),
    repeating-conic-gradient(from 0deg, rgba(252, 237, 210, 0.05) 0deg 10deg, rgba(74, 30, 43, 0.05) 10deg 20deg);
  background-size: 10px 10px, 100px 100px;
  border: 8px solid transparent;
  border-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M0 0 L10 10 L20 0" stroke="%23fcedd2" stroke-width="2" fill="none"/><path d="M0 20 L10 10 L20 20" stroke="%234a1e2b" stroke-width="2" fill="none"/></svg>') 20 stretch;
  box-shadow: 
    inset 0 0 10px rgba(74, 30, 43, 0.4), 
    6px 6px 12px rgba(0, 0, 0, 0.3),
    0 0 30px rgba(252, 237, 210, 0.2);
  overflow: hidden;
  filter: sepia(0.2);
  will-change: transform;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 22rem;
    height: auto;
    aspect-ratio: 3/2;
    border-width: 5px;
    box-shadow: 
      inset 0 0 6px rgba(74, 30, 43, 0.4), 
      4px 4px 8px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 480px) {
    max-width: 95vw;
    border-width: 4px;
  }
`;

const NoteImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const StampImage = styled.img`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  width: 7rem;
  height: 7rem;
  object-fit: contain;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3)) brightness(1.1);
  z-index: 4;

  @media (max-width: 768px) {
    width: 4.5rem;
    height: 4.5rem;
    bottom: 0.3rem;
    right: 0.3rem;
  }

  @media (max-width: 480px) {
    width: 4rem;
    height: 4rem;
  }
`;

// Banknote text styling
const TokenName = styled.p`
  position: absolute;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Cinzel', 'Times New Roman', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a3c34;
  text-shadow: 1px 1px 2px rgba(74, 30, 43, 0.3);
  max-width: 85%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  z-index: 5;

  &:after {
    content: '';
    position: absolute;
    bottom: -0.3rem;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #1a3c34, transparent);
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
    top: 0.8rem;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    top: 0.6rem;
  }
`;

const Description = styled.p`
  position: absolute;
  top: 50%;
  left: 1.2rem;
  transform: translateY(-50%);
  font-family: 'Playfair Display', 'Times New Roman', serif;
  font-size: 1.2rem;
  color: #4a1e2b;
  text-shadow: 1px 1px 1px rgba(26, 60, 52, 0.2);
  max-width: 45%;
  white-space: normal;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  line-height: 1.4;
  z-index: 5;
  text-align: left;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    left: 0.6rem;
    max-width: 45%;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    left: 0.5rem;
  }
`;

const Ticker = styled.p`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  font-family: 'Playfair Display', 'Times New Roman', serif;
  font-size: 1.1rem;
  color: #2a2a2a;
  text-shadow: 1px 1px 1px rgba(74, 30, 43, 0.2);
  max-width: 35%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  z-index: 5;
  background: rgba(255, 255, 255, 0.3);
  padding: 0.3rem 0.5rem;
  border-radius: 0.2rem;
  border: 1px solid rgba(74, 30, 43, 0.2);

  @media (max-width: 768px) {
    font-size: 0.85rem;
    top: 0.6rem;
    right: 0.6rem;
    max-width: 35%;
    padding: 0.2rem 0.4rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    top: 0.5rem;
    right: 0.5rem;
  }
`;

const Supply = styled.p`
  position: absolute;
  bottom: 3rem;
  left: 1.2rem;
  font-family: 'Cinzel', 'Times New Roman', serif;
  font-size: 1.2rem;
  color: #1a3c34;
  text-shadow: 1px 1px 1px rgba(74, 30, 43, 0.2);
  max-width: 45%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 5;
  letter-spacing: 0.05rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    bottom: 2rem;
    left: 0.6rem;
    max-width: 45%;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    bottom: 1.8rem;
    left: 0.5rem;
  }
`;

const Platform = styled.p`
  position: absolute;
  bottom: 1.2rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Playfair Display', 'Times New Roman', serif;
  font-size: 1.1rem;
  color: #4a1e2b;
  text-shadow: 1px 1px 1px rgba(26, 60, 52, 0.2);
  max-width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  z-index: 5;
  border-top: 1px solid rgba(74, 30, 43, 0.3);
  border-bottom: 1px solid rgba(74, 30, 43, 0.3);
  padding: 0.2rem 1rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    bottom: 0.6rem;
    max-width: 60%;
    padding: 0.15rem 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    bottom: 0.5rem;
  }
`;

const SerialNumber = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 1.2rem;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: #4a1e2b;
  letter-spacing: 0.15rem;
  font-weight: bold;
  z-index: 5;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    top: 0.8rem;
    left: 0.6rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    top: 0.6rem;
    left: 0.5rem;
  }
`;

const SwiperWrapper = styled.div`
  width: 30rem;
  margin: 2rem 0;

  .swiper-slide img {
    width: 100%;
    height: 9rem;
    object-fit: cover;
    border: 3px solid #fcedd2;
    box-shadow: 0 0 6px rgba(74, 30, 43, 0.3);
    display: block;
    loading: lazy;
  }

  .swiper-button-prev,
  .swiper-button-next {
    background: #4a1e2b;
    color: #fcedd2;
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid #fcedd2;
    box-shadow: 0 0 8px rgba(252, 237, 210, 0.5), inset 0 0 4px rgba(0, 0, 0, 0.3);
    border-radius: 0;
    transition: all 0.3s ease;
    font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
    --swiper-navigation-size: 0.8rem;

    &:hover {
      background: #292929;
      color: #4a1e2b;
      box-shadow: 0 0 12px rgba(252, 237, 210, 0.7);
    }

    &:active {
      transform: scale(0.98);
    }
  }

  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 0.8rem;
    font-weight: bold;
  }

  .swiper-pagination-bullet {
    background: #4a1e2b;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 0;
    box-shadow: 0 0 4px rgba(74, 30, 43, 0.5);
    opacity: 0.7;
  }

  .swiper-pagination-bullet-active {
    background: #fcedd2;
    box-shadow: 0 0 6px rgba(252, 237, 210, 0.7);
    animation: crtFlicker 0.7s infinite;

    @keyframes crtFlicker {
      0% { opacity: 1; }
      50% { opacity: 0.8; }
      100% { opacity: 1; }
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 22rem;
    margin: 1.5rem 0;

    .swiper-slide img {
      height: 6rem;
      border-width: 2px;
    }

    .swiper-button-prev,
    .swiper-button-next {
      width: 1.5rem;
      height: 1.5rem;
      --swiper-navigation-size: 0.7rem;
      border: 1px solid #fcedd2;
      box-shadow: 0 0 6px rgba(252, 237, 210, 0.5);
    }

    .swiper-button-prev:after,
    .swiper-button-next:after {
      font-size: 0.7rem;
    }

    .swiper-pagination-bullet {
      width: 0.5rem;
      height: 0.5rem;
    }
  }

  @media (max-width: 480px) {
    max-width: 95vw;

    .swiper-slide img {
      height: 5.5rem;
    }

    .swiper-button-prev,
    .swiper-button-next {
      width: 1.2rem;
      height: 1.2rem;
      --swiper-navigation-size: 0.6rem;
    }

    .swiper-button-prev:after,
    .swiper-button-next:after {
      font-size: 0.6rem;
    }
  }
`;

const StampSelector = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
    margin-top: 1.5rem;
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
`;

const StampButton = styled.button`
  background: #4a1e2b;
  color: #fcedd2;
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospaceghhh
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border: 2px solid #fcedd2;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  box-shadow: 0 0 8px rgba(252, 237, 210, 0.5), inset 0 0 4px rgba(0, 0, 0, 0.3);
  background-image: radial-gradient(circle, rgba(252, 237, 210, 0.2), rgba(74, 30, 43, 0.2));
  min-height: 2.75rem;

  &:hover {
    background: #292929;
    color: #4a1e2b;
    box-shadow: 0 0 12px rgba(252, 237, 210, 0.7);
    background-image: radial-gradient(circle, rgba(252, 237, 210, 0.4), rgba(74, 30, 43, 0.4));
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
    border: 1px solid #fcedd2;
    box-shadow: 0 0 6px rgba(252, 237, 210, 0.5);
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
    min-height: 2.5rem;
  }
`;

const DownloadButton = styled(StampButton)`
  &:disabled {
    background: #4a1e2b80;
    color: #fcedd280;
    cursor: not-allowed;
    box-shadow: none;
    border: 1px solid #fcedd280;
  }
`;

const BackButton = styled(StampButton)`
  background: #2a2a2a;
  color: #735e44;
  border: 2px solid #735e44;
  box-shadow: 0 0 8px rgba(115, 94, 68, 0.2);

  &:hover {
    background: #f5e9cb;
    color: #1a1a1a;
    box-shadow: 0 0 12px rgba(115, 94, 68, 0.4);
  }

  @media (max-width: 768px) {
    border: 1px solid #735e44;
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

// Function to generate random serial number
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

const Create = ({ formData, onClose }) => {
  const [selectedBanknote, setSelectedBanknote] = useState(banknotes[0].src);
  const [selectedStamp, setSelectedStamp] = useState(stamps[0].src);
  const [serialNumber] = useState(generateSerialNumber());
  const [isDownloading, setIsDownloading] = useState(false);
  const noteWrapperRef = useRef(null);

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

  return (
    <>
      <FontImport />
      <CreateContainer>
        <Title>Design Your Token</Title>
        <NoteWrapper ref={noteWrapperRef}>
          <NoteImage src={selectedBanknote} alt={`Banknote ${banknotes.find(n => n.src === selectedBanknote).name}`} loading="lazy" />
          <GuillocheBorder />
          <CurvedPattern />
          <MicroText />
          <WatermarkEffect />
          {formData && (
            <>
              <TokenName>{formData.tokenName || 'EXAMPLE TOKEN'}</TokenName>
              <Description>
                {formData.description?.slice(0, 100) || 'Token Description Here'}
              </Description>
              <Ticker>{formData.ticker || 'TKN'}</Ticker>
              <Supply>Supply: {formData.supply || '1,000,000'}</Supply>
              <Platform>{formData.platform || 'ETHEREUM NETWORK'}</Platform>
              <SerialNumber>{serialNumber}</SerialNumber>
            </>
          )}
          <StampImage src={selectedStamp} alt={`Stamp ${stamps.find(s => s.src === selectedStamp).name}`} loading="lazy" />
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
              onClick={() => setSelectedStamp(stamp.src)}
              aria-label={`Select ${stamp.name}`}
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
          <BackButton onClick={onClose} aria-label="Back to Form">
            Back
          </BackButton>
        </StampSelector>
      </CreateContainer>
    </>
  );
};

export default Create;