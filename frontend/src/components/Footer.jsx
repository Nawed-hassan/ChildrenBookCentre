import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaFacebook,  
  FaInstagram, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt 
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <SectionTitle>About Us</SectionTitle>
          <p>
            We are a locally owned independent bookshop with a passion for connecting readers 
            with books they'll love. Visit us to browse our carefully curated collection.
          </p>
          <SocialIcons>
            <SocialIcon href="https://www.facebook.com/share/1FwsorBjA1/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </SocialIcon>
            
            <SocialIcon href="https://www.instagram.com/childrensbook9/profilecard/?igsh=MWo1cm16MGNrazljbw==" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialIcon>
          </SocialIcons>
        </FooterSection>
        
        <FooterSection>
          <SectionTitle>Quick Links</SectionTitle>
          <FooterLinks>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/books">Books</FooterLink>
            <FooterLink to="/gallery">Gallery</FooterLink>
            <FooterLink to="/blog">Blog</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <SectionTitle>Contact Us</SectionTitle>
          <ContactInfo>
            <ContactItem>
              <ContactIcon><FaMapMarkerAlt /></ContactIcon>
              <span>Krishna Apartment, Machhua Toli, Patna, Bihar 800001</span>
            </ContactItem>
            <ContactItem>
              <ContactIcon><FaPhone /></ContactIcon>
              <span>88630 60789</span>
            </ContactItem>
            <ContactItem>
              <ContactIcon><FaEnvelope /></ContactIcon>
              <span>childrens9book@gmail.com</span>
            </ContactItem>
          </ContactInfo>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <p>&copy; {currentYear} Bookshop. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #3c2415;
  color: #f4f1ea;
  padding: 3rem 0 1rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  
  p {
    margin-top: 1rem;
    line-height: 1.6;
    color: #e0d8ca;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: #e0d8ca;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(244, 241, 234, 0.2);
  color: #f4f1ea;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f4f1ea;
    color: #3c2415;
    transform: translateY(-3px);
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FooterLink = styled(Link)`
  color: #e0d8ca;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    color: #f4f1ea;
    margin-left: 5px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #e0d8ca;
`;

const ContactIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(244, 241, 234, 0.2);
  margin-top: 3rem;
  padding-top: 1.5rem;
  text-align: center;
  
  p {
    color: #e0d8ca;
    font-size: 0.9rem;
  }
`;

export default Footer;