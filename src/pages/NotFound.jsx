import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundContent>
        <ErrorCode>404</ErrorCode>
        <Title>Page Not Found</Title>
        <Message>
          The page you are looking for doesnt exist or has been moved.
        </Message>
        <HomeButton to="/">Back to Home</HomeButton>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 300px);
  padding: 2rem;
`;

const NotFoundContent = styled.div`
  text-align: center;
  max-width: 600px;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 700;
  color: #3c2415;
  margin: 0;
  line-height: 1;
  opacity: 0.3;
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #3c2415;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
`;

const HomeButton = styled(Link)`
  display: inline-block;
  background-color: #3c2415;
  color: #f4f1ea;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #59372a;
    transform: translateY(-3px);
  }
`;

export default NotFound;