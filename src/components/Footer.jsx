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
  padding: 2.5rem 1.5rem;
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
    0% { transform: scale(0.99); opacity: 0.9; }
    50% { transform: scale(1.01); opacity: 0.95; }
    100% { transform: scale(1); opacity: 1; }
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

// Footer Content
const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

// Footer Section
const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// Section Title
const SectionTitle = styled.h3`
  font-family: 'Press Start 2P', monospace;
  font-size: 1.2rem;
  color: #2a2a2a;
  margin: 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #735e44;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

// Section Text
const SectionText = styled.p`
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.8;
  text-shadow: 1px 1px 1px rgba(115, 94, 68, 0.1);
`;

// Section List
const SectionList = styled.ul`
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  color: #1a1a1a;
  margin: 0;
  padding-left: 1.5rem;
  list-style: none;
  line-height: 1.8;
  text-shadow: 1px 1px 1px rgba(115, 94, 68, 0.1);

  li {
    margin-bottom: 0.5rem;
    position: relative;
    
    &:before {
      content: '■';
      color: #735e44;
      position: absolute;
      left: -1.5rem;
      font-size: 0.8rem;
    }
  }
`;

// Social Links Container
const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// Social Links Group
const SocialLinksGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

// Social Link
const SocialLink = styled.a`
  background: #2a2a2a;
  border: 2px solid #735e44;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
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
    width: 1.5rem;
    height: 1.5rem;
    fill: #735e44;
  }
`;

// Copyright
const Copyright = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(115, 94, 68, 0.3);
  margin-top: 1rem;

  p {
    font-family: 'Courier New', monospace;
    font-size: 1rem;
    color: #1a1a1a;
    margin: 0;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <SectionTitle>About Profit Forge</SectionTitle>
          <SectionText>
            Profit Forge is a retro-styled platform for creating custom cryptocurrency tokens with
            unique banknote designs. Mint, trade, and showcase your digital assets with nostalgic
            80s-90s aesthetics.
          </SectionText>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Features</SectionTitle>
          <SectionList>
            <li>Custom token designer with retro templates</li>
            <li>Multi-chain deployment (Solana, Ethereum, Binance)</li>
            <li>IPFS storage for permanent design hosting</li>
            <li>Community showcase gallery</li>
            <li>Token analytics dashboard</li>
          </SectionList>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Resources</SectionTitle>
          <SectionList>
            <li>Documentation</li>
            <li>API Reference</li>
            <li>Tutorial Videos</li>
            <li>Community Forum</li>
            <li>Token Standards</li>
          </SectionList>
        </FooterSection>

        <SocialLinks>
          <SectionTitle>Connect With Us</SectionTitle>
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
          <SectionText>
            Join our community of retro crypto enthusiasts and start forging your digital assets today!
          </SectionText>
        </SocialLinks>

        <Copyright>
          <p>© 2025 Profit Forge | All Rights Reserved | Terms of Service | Privacy Policy</p>
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;