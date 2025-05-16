import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import bg from '../assets/1.webp';
import Select from 'react-select';
import money1 from '../assets/money1.png';
import money2 from '../assets/money2.png';
import money3 from '../assets/money3.png';
import html2canvas from 'html2canvas';

// Import Press Start 2P font
const FontImport = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
`;

// Custom pixel-art SVG icons for 80s-90s aesthetic
const CoinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="8" height="8" fill="#3a3a3a" />
    <rect x="5" y="5" width="6" height="6" fill="#00cc00" />
    <rect x="7" y="7" width="2" height="2" fill="#3a3a3a" />
  </svg>
);

const TickerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="10" height="6" fill="#3a3a3a" />
    <rect x="4" y="6" width="2" height="4" fill="#00cc00" />
    <rect x="7" y="6" width="2" height="4" fill="#00cc00" />
    <rect x="10" y="6" width="2" height="4" fill="#00cc00" />
  </svg>
);

const SupplyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="3" width="8" height="10" fill="#3a3a3a" />
    <rect x="5" y="4" width="6" height="2" fill="#00cc00" />
    <rect x="5" y="7" width="6" height="2" fill="#00cc00" />
    <rect x="5" y="10" width="6" height="2" fill="#00cc00" />
  </svg>
);

// Styled Components
const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1a1a1a url(${bg}) no-repeat center center/cover;
  background-attachment: fixed;
  background-size: cover;
  position: relative;
  overflow-y: auto;

  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, transparent, rgba(0, 0, 0, 0.5));
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 60rem;
  align-items: center;
  justify-content: space-between;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    min-height: 100vh;
    padding: 1rem;
    align-items: stretch;
    justify-content: flex-start;
    gap: 1rem;
  }
`;

const TokenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

const TokenDisplay = styled.div`
  width: 24rem;
  height: 18rem;
  background: ${({ platform }) =>
    platform === 'Ethereum' ? `url(${money1})` :
      platform === 'Binance' ? `url(${money2})` :
        platform === 'Solana' ? `url(${money3})` :
          'rgba(120, 84, 43, 0.2)'};
  background-size: cover;
  background-position: center;
  border: 3px solid #2a2a2a;
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  position: relative;
  animation: crtFlicker 0.3s 0.7s;
  font-family: 'Times New Roman', serif;
  color: #2a2a2a;
  text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.3);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent, rgba(0, 255, 0, 0.03) 0.5%, transparent);
    pointer-events: none;
  }

  @keyframes crtFlicker {
    0% { filter: brightness(1); }
    50% { filter: brightness(1.2); }
    100% { filter: brightness(1); }
  }

  @media (max-width: 768px) {
    width: 18rem;
    height: 13.5rem;
  }
`;

const TokenHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px dashed #2a2a2a;
`;

const TokenName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  max-width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TokenTicker = styled.div`
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.2rem 0.4rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const TokenBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 0.5rem;
  text-align: center;
`;

const TokenSupply = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const TokenPlatform = styled.div`
  font-size: 0.9rem;
  font-style: italic;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  padding: 0.2rem 1rem;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const TokenFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-top: 1px dashed #2a2a2a;
  font-size: 0.7rem;
  line-height: 1.2;
  color: #4a4a4a;

  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`;

const TokenDescription = styled.div`
  max-height: 2.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (max-width: 768px) {
    max-height: 2rem;
  }
`;

const MicrotextBorder = styled.div`
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
  right: 0.2rem;
  bottom: 0.2rem;
  border: 1px solid #2a2a2a;
  font-size: 0.5rem;
  color: #4a4a4a;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  pointer-events: none;

  &:before, &:after {
    content: 'PROFIT FORGE TOKEN';
    padding: 0.1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.4rem;
  }
`;

const LoadingText = styled.div`
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  font-size: 0.7rem;
  color: #00cc00;
  text-shadow: 1px 1px 3px rgba(0, 255, 0, 0.2);
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
    font-size: 0.6rem;
    padding: 0.6rem;
  }
`;

const SaveButton = styled.button`
  background: #2a2a2a;
  color: ${({ saving }) => (saving ? '#1a1a1a' : '#00cc00')};
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  font-size: 0.7rem;
  padding: 0.4rem 0.8rem;
  border: 2px solid #00cc00;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 6px rgba(0, 255, 0, 0.2);
  text-transform: uppercase;
  width: 8rem;
  text-align: center;

  ${({ saving }) =>
    saving &&
    `
    background: #00cc00;
    animation: crtFlicker 0.3s ease;
    text-shadow: 1px 1px 3px rgba(0, 255, 0, 0.5);
    @keyframes crtFlicker {
      0% { filter: brightness(1); }
      50% { filter: brightness(1.3); }
      100% { filter: brightness(1); }
    }
  `}

  &:hover {
    background: #00cc00;
    color: #1a1a1a;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    width: 6rem;
    font-size: 0.6rem;
    padding: 0.3rem 0.6rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: crtFlicker 0.3s 0.7s;

  @keyframes crtFlicker {
    0% { filter: brightness(1); }
    50% { filter: brightness(1.2); }
    100% { filter: brightness(1); }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FormCard = styled.div`
  background: rgba(120, 84, 43, 0.38);
  padding: 1.5rem;
  margin: 0.5rem;
  border: 3px solid #2a2a2a;
  max-width: 28rem;
  width: 100%;
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.15), inset 0 0 8px rgba(0, 0, 0, 0.4);
  position: relative;
  animation: scanline 6s linear infinite;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent, rgba(0, 255, 0, 0.03) 0.5%, transparent);
    pointer-events: none;
  }

  @keyframes scanline {
    0% { background-position: 0 0; }
    100% { background-position: 0 100%; }
  }

  @media (max-width: 768px) {
    max-width: 20rem;
    padding: 1rem;
    margin: 0.5rem 0;
  }
`;

const Title = styled.h1`
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  font-size: 1.8rem;
  text-align: center;
  color: #222222;
  margin-bottom: 1.5rem;
  text-shadow: 1px 1px 3px rgba(0, 255, 0, 0.2);
  overflow: hidden;
  white-space: nowrap;
  animation: typewriter 2s steps(40, end);
  letter-spacing: 0.1rem;

  @keyframes typewriter {
    from { width: 0; }
    to { width: 100%; }
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
`;

const FormGroup = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  color: #222222;
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  font-size: 0.7rem;
  margin-bottom: 0.3rem;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`;

const Input = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-bottom: 2px dashed #2a2a2a;
  color: #222222;
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  font-size: 0.85rem;
  padding: 0.4rem 0.2rem;
  outline: none;
  transition: border-color 0.3s ease, background 0.3s ease;

  &:focus {
    border-color: #00cc00;
    background: rgba(0, 255, 0, 0.1);
  }

  &::placeholder {
    color: #a0a0a0;
    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.3rem 0.2rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-bottom: 2px dashed #2a2a2a;
  color: #222222;
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  font-size: 0.85rem;
  padding: 0.4rem 0.2rem;
  outline: none;
  resize: none;
  transition: border-color 0.3s ease, background 0.3s ease;

  &:focus {
    border-color: #00cc00;
    background: rgba(0, 255, 0, 0.1);
  }

  &::placeholder {
    color: #a0a0a0;
    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.3rem 0.2rem;
  }
`;

const Button = styled.button`
  width: 100%;
  background: #2a2a2a;
  color: #00cc00;
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  font-size: 0.9rem;
  padding: 0.5rem;
  border: 2px solid #00cc00;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 8px rgba(0, 255, 0, 0.2);
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #00cc00;
    color: #1a1a1a;
    box-shadow: 0 0 12px rgba(0, 255, 0, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.4rem;
  }
`;

const Spinner = styled.div`
  border: 2px solid #00cc00;
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
    width: 14px;
    height: 14px;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 1.8rem;

  @media (max-width: 768px) {
    right: 0.4rem;
    top: 1.6rem;
  }
`;

// Options for react-select
const options = [
  { value: '', label: 'Select Platform' },
  { value: 'Ethereum', label: 'Ethereum' },
  { value: 'Binance', label: 'Binance Smart Chain' },
  { value: 'Solana', label: 'Solana' }
];

// Custom styles for react-select to match retro aesthetic
const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    borderBottom: '2px dashed #2a2a2a',
    color: '#222222',
    fontFamily: '"Press Start 2P", "IBM Plex Mono", monospace',
    fontSize: '0.85rem',
    padding: '0.4rem 0.2rem',
    outline: 'none',
    boxShadow: 'none',
    cursor: 'pointer',
    '&:hover': {
      borderColor: '#2a2a2a'
    },
    '&:focus': {
      borderColor: '#00cc00',
      background: 'rgba(0, 255, 0, 0.1)'
    },
    '@media (max-width: 768px)': {
      fontSize: '0.75rem',
      padding: '0.3rem 0.2rem'
    }
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#222222'
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#a0a0a0',
    fontStyle: 'italic'
  }),
  menu: (provided) => ({
    ...provided,
    background: 'rgba(120, 84, 43, 0.85)',
    border: '2px solid #2a2a2a',
    marginTop: '0',
    fontFamily: '"Press Start 2P", "IBM Plex Mono", monospace',
    '@media (max-width: 768px)': {
      fontSize: '0.75rem'
    }
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isSelected ? '#00cc00' : 'rgba(120, 84, 43, 0.85)',
    color: state.isSelected ? '#1a1a1a' : '#222222',
    cursor: 'pointer',
    fontSize: '0.85rem',
    '&:hover': {
      background: '#00cc00',
      color: '#222222'
    },
    '@media (max-width: 768px)': {
      fontSize: '0.75rem'
    }
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#2a2a2a',
    '&:hover': {
      color: '#00cc00'
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
  const tokenDisplayRef = useRef(null);

  // Simulate typewriter sound effect
  useEffect(() => {
    const handleKeyPress = () => {
      const audio = new Audio('https://www.soundjay.com/mechanical/sounds/typewriter-key-01.mp3');
      audio.play().catch(() => { });
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, platform: selectedOption ? selectedOption.value : '' });
  };

  const handleGenerateToken = () => {
    if (!formData.platform) {
      alert('Please select a platform!');
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
      }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `ProfitForgeToken_${formData.ticker || 'TKN'}.png`;
        link.click();
        setSaving(true);
        setTimeout(() => setSaving(false), 1500);
      }).catch(err => {
        console.error('Error generating image:', err);
        alert('Failed to download token image. Ensure images are accessible.');
      });
    } else {
      setSaving(true);
      setTimeout(() => setSaving(false), 1500);
    }
    setFormData({ tokenName: '', description: '', ticker: '', supply: '', platform: '' });
    setIsTokenGenerated(false);
  };

  return (
    <>
      <FontImport />
      <MainContainer>
        <ContentWrapper>
          <TokenWrapper>
            <TokenDisplay ref={tokenDisplayRef} platform={formData.platform}>
              <MicrotextBorder />
              {isLoading ? (
                <LoadingText>
                  <Spinner />
                  Loading...
                </LoadingText>
              ) : isTokenGenerated ? (
                <>
                  <TokenHeader>
                    <TokenName>{formData.tokenName || 'TOKEN'}</TokenName>
                    <TokenTicker>{formData.ticker || 'TKN'}</TokenTicker>
                  </TokenHeader>
                  <TokenBody>
                    <TokenSupply>{formData.supply || '0'}</TokenSupply>
                    <TokenPlatform>{formData.platform}</TokenPlatform>
                  </TokenBody>
                  <TokenFooter>
                    <TokenDescription>{formData.description || 'No description'}</TokenDescription>
                  </TokenFooter>
                </>
              ) : formData.platform ? (
                <TokenBody>
                  <TokenPlatform>{formData.platform}</TokenPlatform>
                </TokenBody>
              ) : null}
            </TokenDisplay>
            {isTokenGenerated && (
              <ButtonContainer>
                <SaveButton onClick={handleSaveToken} saving={saving}>
                  {saving ? 'Saved!' : 'Save Token'}
                </SaveButton>
              </ButtonContainer>
            )}
          </TokenWrapper>
          <FormContainer>
            <FormCard>
              <Title>Profit Forge</Title>
              <FormGroup>
                <Label>Platform</Label>
                <Select
                  options={options}
                  value={options.find((option) => option.value === formData.platform)}
                  onChange={handleSelectChange}
                  styles={customSelectStyles}
                  placeholder="Select Platform"
                />
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
                  rows="2"
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
    </>
  );
};

export default Main;