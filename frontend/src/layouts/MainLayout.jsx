import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = () => {
  useEffect(() => {
    // Scroll to top on navigation
    window.scrollTo(0, 0);
  }, []);

  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  margin-top: 60px; // Adjust to match your header height
`;

export default MainLayout;