import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <HeaderContainer isScrolled={isScrolled}>
      <HeaderContent>
        <Logo>
          <Link to="/">Children Book Centre</Link>
        </Logo>
        
        <NavToggle onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </NavToggle>
        
        <NavMenu isOpen={isMenuOpen}>
          <NavItem isActive={location.pathname === '/'}>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem isActive={location.pathname === '/about'}>
            <Link to="/about">About</Link>
          </NavItem>
          <NavItem isActive={location.pathname === '/books' || location.pathname.startsWith('/books/')}>
            <Link to="/books">Books</Link>
          </NavItem>
          <NavItem isActive={location.pathname === '/gallery'}>
            <Link to="/gallery">Gallery</Link>
          </NavItem>
          <NavItem isActive={location.pathname === '/blog' || location.pathname.startsWith('/blog/')}>
            <Link to="/blog">Blog</Link>
          </NavItem>
          <NavItem isActive={location.pathname === '/contact'}>
            <Link to="/contact">Contact</Link>
          </NavItem>
        </NavMenu>
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: ${props => props.isScrolled ? '#f4f1ea' : 'rgba(244, 241, 234, 0.95)'};
  transition: all 0.3s ease;
  box-shadow: ${props => props.isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 1px;
  
  a {
    text-decoration: none;
    color: #3c2415;
  }
`;

const NavToggle = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #3c2415;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    position: fixed;
    flex-direction: column;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #f4f1ea;
    padding: 1rem 0;
    transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-100%)'};
    opacity: ${props => props.isOpen ? 1 : 0};
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 999;
    gap: 0;
  }
`;

const NavItem = styled.div`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 2px;
    background-color: #3c2415;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
  
  a {
    text-decoration: none;
    color: #3c2415;
    font-size: 1rem;
    font-weight: ${props => props.isActive ? '600' : '400'};
    transition: all 0.3s ease;
  }
  
  @media (max-width: 768px) {
    padding: 1rem 2rem;
    
    &::after {
      display: none;
    }
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
`;

export default Header;