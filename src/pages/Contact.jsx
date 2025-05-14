import styled from 'styled-components';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <ContactContainer>
      <HeroSection>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you</p>
      </HeroSection>

      <ContentSection>
        <ContactInfo>
          <InfoItem>
            <InfoIcon>
              <FaMapMarkerAlt />
            </InfoIcon>
            <InfoText>
              <h3>Address</h3>
              <p>123 Book St, City, State 12345</p>
            </InfoText>
          </InfoItem>
          
          <InfoItem>
            <InfoIcon>
              <FaPhone />
            </InfoIcon>
            <InfoText>
              <h3>Phone</h3>
              <p>(123) 456-7890</p>
            </InfoText>
          </InfoItem>
          
          <InfoItem>
            <InfoIcon>
              <FaEnvelope />
            </InfoIcon>
            <InfoText>
              <h3>Email</h3>
              <p>info@bookshop.com</p>
            </InfoText>
          </InfoItem>
          
          <InfoItem>
            <InfoIcon>
              <FaClock />
            </InfoIcon>
            <InfoText>
              <h3>Hours</h3>
              <p>Monday - Friday: 9am - 8pm</p>
              <p>Saturday: 10am - 6pm</p>
              <p>Sunday: 12pm - 5pm</p>
            </InfoText>
          </InfoItem>
        </ContactInfo>

        <MapAndFormSection>
          <MapSection>
            <h2>Find Us</h2>
            <MapPlaceholder>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30594994064!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1625105480892!5m2!1sen!2s"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                title="Store location"
              ></iframe>
            </MapPlaceholder>
          </MapSection>
          
          <FormSection>
            <h2>Send Us a Message</h2>
            <ContactForm />
          </FormSection>
        </MapAndFormSection>
      </ContentSection>
    </ContactContainer>
  );
};

const ContactContainer = styled.div``;

const HeroSection = styled.section`
  background-color: #f4f1ea;
  padding: 4rem 2rem;
  text-align: center;
  
  h1 {
    font-size: 2.5rem;
    color: #3c2415;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const InfoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f4f1ea;
  color: #3c2415;
  font-size: 1.5rem;
  margin-right: 1rem;
`;

const InfoText = styled.div`
  h3 {
    font-size: 1.2rem;
    color: #3c2415;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    margin-bottom: 0.3rem;
  }
`;

const MapAndFormSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MapSection = styled.div`
  h2 {
    font-size: 1.5rem;
    color: #3c2415;
    margin-bottom: 1.5rem;
  }
`;

const MapPlaceholder = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f4f1ea;
`;

const FormSection = styled.div`
  h2 {
    font-size: 1.5rem;
    color: #3c2415;
    margin-bottom: 1.5rem;
  }
`;

export default Contact;