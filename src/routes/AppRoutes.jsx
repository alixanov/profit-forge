import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Main from '../components/Main';
import Footer from '../components/Footer';
import Create from '../components/Create';

// Styled wrapper for the entire app
const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background: #1a1a1a; /* Matches Main.jsx dark theme */
  color: #f5e9cb; /* Primary text color from Main.jsx */
  font-family: 'Press Start 2P', 'Courier New', monospace;

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Slightly smaller base font for tablets */
  }

  @media (max-width: 480px) {
    font-size: 0.85rem; /* Adjust for mobile */
  }
`;

const MainContent = styled.main`
  flex: 1; /* Ensures main content takes remaining space */
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

// NotFound component for 404 pages
const NotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  font-family: 'Press Start 2P', 'Courier New', monospace;
  color: #f5e9cb;
  padding: 2rem;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    text-shadow: 1px 1px 3px rgba(115, 94, 68, 0.3);
  }

  p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  a {
    background: #2a2a2a;
    color: #735e44;
    padding: 0.75rem 1.5rem;
    border: 2px solid #735e44;
    text-transform: uppercase;
    transition: all 0.3s ease;
    min-height: 2.75rem; /* Touch target size */
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #f5e9cb;
      color: #1a1a1a;
      box-shadow: 0 0 10px rgba(115, 94, 68, 0.4);
    }

    &:active {
      transform: scale(0.98);
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.6rem;
    }
    p {
      font-size: 0.9rem;
    }
    a {
      padding: 0.6rem 1.2rem;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.4rem;
    }
    p {
      font-size: 0.85rem;
    }
    a {
      padding: 0.5rem 1rem;
      font-size: 0.85rem;
    }
  }
`;

const AppRoutes = () => {
  return (
    <AppWrapper>
      <MainContent role="main">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="*"
            element={
              <NotFound>
                <h1>404 - Page Not Found</h1>
                <p>Sorry, the page you're looking for doesn't exist.</p>
                <a href="/">Return to Home</a>
              </NotFound>
            }
          />
          <Route path={"/create" } element={<Create/>} />
        </Routes>
      </MainContent>
      <Footer />
    </AppWrapper>
  );
};

export default AppRoutes;