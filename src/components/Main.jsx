import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import bg from '../assets/1.webp';
import Select from 'react-select';
import money1 from '../assets/money1.png';
import money2 from '../assets/money2.png';
import money3 from '../assets/money3.png';

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

const WalletIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="10" height="8" fill="#3a3a3a" />
    <rect x="4" y="5" width="8" height="6" fill="#00cc00" />
    <rect x="10" y="6" width="2" height="4" fill="#3a3a3a" />
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
  overflow-x: hidden;

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
`;

const TokenDisplay = styled.div`
  width: 24rem; /* Smaller width */
  height: 18rem; /* Smaller height, 4:3 aspect ratio */
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
  align-items: center;
  justify-content: center;
  position: relative;
  animation: slideInLeft 1s ease-out, crtFlicker 0.3s 0.7s;

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

  @keyframes slideInLeft {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes crtFlicker {
    0% { filter: brightness(1); }
    50% { filter: brightness(1.2); }
    100% { filter: brightness(1); }
  }
`;

const TokenText = styled.div`
  font-family: 'Press Start 2P', 'IBM Plex Mono', monospace;
  font-size: 0.9rem;
  color: #00cc00;
  text-shadow: 1px 1px 3px rgba(0, 255, 0, 0.2);
  text-align: center;
  padding: 0.8rem;
  background: rgba(0, 0, 0, 0.7);
  border: 2px dashed #2a2a2a;
`;

const LoadingText = styled(TokenText)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s ease;
  transform: ${({ showFundingForm }) => (showFundingForm ? 'translateX(100%)' : 'translateX(0)')};
  animation: slideInRight 1s ease-out, crtFlicker 0.3s 0.7s;

  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes crtFlicker {
    0% { filter: brightness(1); }
    50% { filter: brightness(1.2); }
    100% { filter: brightness(1); }
  }
`;

const FormCard = styled.div`
  background: rgba(120, 84, 43, 0);
  padding: 1.5rem;
  margin: 0.5rem;
  border: 3px solid #2a2a2a;
  max-width: 28rem;
  width: 90%;
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
    color: rgb(86, 86, 86);
    font-style: italic;
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
    color: rgb(86, 86, 86);
    font-style: italic;
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
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 1.8rem;
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
    fontFamily: '"Press Start 2P", "IBM Plex Mono", monospace'
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isSelected ? '#00cc00' : 'rgba(120, 84, 43, 0.85)',
    color: state.isSelected ? '#1a1a1a' : '#222222',
    cursor: 'pointer',
    fontSize: '0.85rem',
    '&:hover': {
      background: '#00cc00',
      color: '#1a1a1a'
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
  const [fundingData, setFundingData] = useState({
    amount: '',
    wallet: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPlatformLoading, setIsPlatformLoading] = useState(false);
  const [showFundingForm, setShowFundingForm] = useState(false);

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

  const handleFundingChange = (e) => {
    setFundingData({ ...fundingData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOption) => {
    setIsPlatformLoading(true);
    setTimeout(() => {
      setIsPlatformLoading(false);
      setFormData({ ...formData, platform: selectedOption ? selectedOption.value : '' });
    }, 1000); // 1-second delay for platform loading
  };

  const handleGenerateToken = () => {
    if (!formData.platform) {
      alert('Please select a platform!');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowFundingForm(true);
    }, 1500); // 1.5-second delay
  };

  const handleFundToken = () => {
    alert('Token Funding Simulated!');
    // Reset forms for demo purposes
    setFormData({ tokenName: '', description: '', ticker: '', supply: '', platform: '' });
    setFundingData({ amount: '', wallet: '' });
    setShowFundingForm(false);
    setIsPlatformLoading(false);
  };

  return (
    <>
      <FontImport />
      <MainContainer>
        <ContentWrapper>
          <TokenDisplay platform={formData.platform}>
            {isPlatformLoading ? (
              <LoadingText>
                <Spinner />
                Loading...
              </LoadingText>
            ) : formData.platform ? (
              <TokenText>
                {formData.tokenName || 'Token'} Ready
                <br />
                on {formData.platform}
              </TokenText>
            ) : (
              <TokenText>Select a Platform</TokenText>
            )}
          </TokenDisplay>
          <FormContainer showFundingForm={showFundingForm}>
            <FormCard>
              {showFundingForm ? (
                <>
                  <Title>Fund Token</Title>
                  <FormGroup>
                    <Label>Funding Amount</Label>
                    <Input
                      type="number"
                      name="amount"
                      value={fundingData.amount}
                      onChange={handleFundingChange}
                      placeholder="e.g., 1000"
                    />
                    <IconWrapper>
                      <CoinIcon />
                    </IconWrapper>
                  </FormGroup>
                  <FormGroup>
                    <Label>Wallet Address</Label>
                    <Input
                      type="text"
                      name="wallet"
                      value={fundingData.wallet}
                      onChange={handleFundingChange}
                      placeholder="e.g., 0x..."
                    />
                    <IconWrapper>
                      <WalletIcon />
                    </IconWrapper>
                  </FormGroup>
                  <Button onClick={handleFundToken}>
                    Fund Token
                  </Button>
                </>
              ) : (
                <>
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
                </>
              )}
            </FormCard>
          </FormContainer>
        </ContentWrapper>
      </MainContainer>
    </>
  );
};

export default Main;