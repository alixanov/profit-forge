import React from 'react';
import styled from 'styled-components';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';

// Footer Container
const FooterContainer = styled.footer`
  background: #faebd2;
  background-image: radial-gradient(circle, rgba(115, 94, 68, 0.1) 1px, transparent 1px);
  background-size: 4px 4px;
  background-attachment: fixed;
  border-top: 3px solid #2a2a2a;
  padding: 1.7rem;
  width: 100%;
  animation: crtFlicker 0.3s;
  position: relative;
  box-shadow: 0 -2px 15px rgba(115, 94, 68, 0.3);
  z-index: 1;
  filter: sepia(0.1);

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

  @keyframes crtFlicker {
    0% { transform: scale(0.995); opacity: 0.9; }
    50% { transform: scale(1.005); opacity: 0.95; }
    100% { transform: scale(1); opacity: 1; }
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

// Footer Content
const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  box-sizing: border-box;
`;

// Footer Section
const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

// Section Title
const SectionTitle = styled.h3`
  font-family: 'Press Start 2P', monospace;
  font-size: 1.15rem;
  color: #2a2a2a;
  margin: 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #735e44;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

// Section Text
const SectionText = styled.p`
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.8;
  text-shadow: 1px 1px 1px rgba(115, 94, 68, 0.1);

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

// Section List
const SectionList = styled.ul`
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  color: #1a1a1a;
  margin: 0;
  padding-left: 1.25rem;
  list-style: none;
  line-height: 1.8;
  text-shadow: 1px 1px 1px rgba(115, 94, 68, 0.1);

  li {
    margin-bottom: 0.4rem;
    position: relative;
    
    &:before {
      content: '■';
      color: #735e44;
      position: absolute;
      left: -1.25rem;
      font-size: 0.8rem;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

// Code Block for JSON
const CodeBlock = styled.pre`
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
  background: #2a2a2a;
  color: #f5e9cb;
  padding: 0.75rem;
  border: 2px solid #735e44;
  border-radius: 4px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  white-space: pre-wrap;
  text-shadow: 1px 1px 1px rgba(115, 94, 68, 0.1);
  margin: 0;

  .json-key {
    color: #f5e9cb;
  }

  .json-string {
    color: #d4a017;
  }

  .json-number {
    color: #8b5a2b;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.4rem;
  }
`;

// Social Links Container
const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

// Social Links Group
const SocialLinksGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

// Social Link
const SocialLink = styled.a`
  background: #2a2a2a;
  border: 2px solid #735e44;
  border-radius: 50%;
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #f5e9cb;
    border-color: #1a1a1a;
    box-shadow: 0 0 12px rgba(115, 94, 68, 0.4);
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 1.4rem;
    height: 1.4rem;
    fill: #735e44;
  }

  @media (max-width: 768px) {
    width: 2rem;
    height: 2rem;
    svg {
      width: 1.3rem;
      height: 1.3rem;
    }
  }

  @media (max-width: 480px) {
    width: 1.8rem;
    height: 1.8rem;
    svg {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;

// Copyright
const Copyright = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(115, 94, 68, 0.3);
  margin-top: 0.75rem;
`;

// Copyright Text with Typewriter Animation
const CopyrightText = styled.p`
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  font-weight: bold;
  letter-spacing: 0.05rem;
  background: linear-gradient(to bottom, #2a2a2a, #1a1a1a);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4), -1px -1px 1px rgba(115, 94, 68, 0.3);
  background: rgba(245, 233, 203, 0.3);
  padding: 0.3rem 0.6rem;
  border: 2px solid #735e44;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2), inset 0 0 4px rgba(115, 94, 68, 0.2);
  transform: perspective(500px) rotateX(5deg);
  display: inline-block;
  margin: 0;

  .typewriter {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    width: 0;
    animation: typewriter 2s steps(16) 1s forwards;
  }

  .typewriter::after {
    content: '|';
    color: #735e44;
    margin-left: 0.1rem;
    animation: blink 0.6s step-end infinite;
  }

  @keyframes typewriter {
    from { width: 0; }
    to { width: 100%; }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding: 0.25rem 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.2rem 0.4rem;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <SectionTitle id="about-title">About Profit Forge</SectionTitle>
          <SectionText aria-labelledby="about-title">
            Profit Forge is a retro-styled platform for creating custom cryptocurrency tokens with
            unique banknote designs. Mint, trade, and showcase your digital assets with nostalgic
            80s-90s aesthetics.
          </SectionText>
        </FooterSection>

        <FooterSection>
          <SectionTitle id="features-title">Features</SectionTitle>
          <SectionList aria-labelledby="features-title">
            <li>Custom token designer with retro templates</li>
            <li>Multi-chain deployment (Solana, Ethereum, Binance)</li>
            <li>IPFS storage for permanent design hosting</li>
            <li>Community showcase gallery</li>
            <li>Token analytics dashboard</li>
          </SectionList>
        </FooterSection>

        <FooterSection>
          <SectionTitle id="resources-title">Resources</SectionTitle>
          <SectionList aria-labelledby="resources-title">
            <li>Documentation</li>
            <li>API Reference</li>
            <li>Tutorial Videos</li>
            <li>Community Forum</li>
            <li>Token Standards</li>
          </SectionList>
        </FooterSection>

        <FooterSection>
          <SectionTitle id="dev-security-title">Development & Security</SectionTitle>
          <SectionText aria-labelledby="dev-security-title">
            Built with passion and precision, Profit Forge ensures your funds are secure through rigorous development and robust security measures.
          </SectionText>
          <SectionList aria-labelledby="dev-security-title">
            <li>Open-source code on GitHub for transparency</li>
            <li>Smart contracts audited by top-tier firms</li>
            <li>End-to-end encryption for data and transactions</li>
            <li>Secure wallet integrations with multi-sig protocols</li>
            <li>Compliance with ERC-20, SPL, and other standards</li>
          </SectionList>
        </FooterSection>

        <FooterSection>
          <SectionTitle id="api-snapshot-title">API Snapshot</SectionTitle>
          <SectionText aria-labelledby="api-snapshot-title">
            Sample token metadata from our API.
          </SectionText>
          <CodeBlock role="region" aria-label="Sample JSON data">
            {`{
  "token": {
    "name": `}<span className="json-string">"RetroCoin"</span>{`,
    "symbol": `}<span className="json-string">"RTC"</span>{`,
    "chain": `}<span className="json-string">"Ethereum"</span>{`,
    "supply": `}<span className="json-number">1000000</span>{`,
    "creator": `}<span className="json-string">"ProfitForge"</span>{`
  }
}`}
          </CodeBlock>
          <SectionText aria-labelledby="api-snapshot-title">
            Sample transaction log from our API.
          </SectionText>
          <CodeBlock role="region" aria-label="Sample transaction JSON data">
            {`{
  "transaction": {
    "txId": `}<span className="json-string">"0x9f8a2b1c"</span>{`,
    "token": `}<span className="json-string">"RetroCoin"</span>{`,
    "amount": `}<span className="json-number">500</span>{`,
    "from": `}<span className="json-string">"0x1234...abcd"</span>{`,
    "to": `}<span className="json-string">"0x5678...efgh"</span>{`,
    "timestamp": `}<span className="json-string">"2025-05-18T12:00:00Z"</span>{`
  }
}`}
          </CodeBlock>
        </FooterSection>

        <SocialLinks>
          <SectionTitle id="connect-title">Connect With Us</SectionTitle>
          <SocialLinksGroup>
            <SocialLink href="https://github.com" aria-label="GitHub">
              <GitHubIcon />
            </SocialLink>
            <SocialLink href="https://x.com" aria-label="Twitter">
              <XIcon />
            </SocialLink>
            <SocialLink href="https://profitforge.example.com" aria-label="Website">
              <LanguageIcon />
            </SocialLink>
            <SocialLink href="mailto:contact@profitforge.example.com" aria-label="Email">
              <EmailIcon />
            </SocialLink>
            <SocialLink href="#" aria-label="Whitepaper">
              <DescriptionIcon />
            </SocialLink>
          </SocialLinksGroup>
          <SectionText aria-labelledby="connect-title">
            Join our community of retro crypto enthusiasts and start forging your digital assets today!
          </SectionText>
        </SocialLinks>

        <Copyright>
          <CopyrightText aria-label="Copyright 2025 Profit Forge, All Rights Reserved, Terms of Service, Privacy Policy">
            <span className="typewriter">© 2025 Profit Forge</span> | All Rights Reserved | Terms of Service | Privacy Policy
          </CopyrightText>
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;