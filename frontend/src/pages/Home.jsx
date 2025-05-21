import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await axios.get('/api/books/featured');
        setFeaturedBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured books:', error);
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

  return (
    <>
      <HeroSection>
        <HeroContent>
          <h1>Welcome to Our Children Book Centre</h1>
          <p>Find Everything Educational Under One Roof</p>
          <BrowseButton to="/books">Browse Books</BrowseButton>
        </HeroContent>
      </HeroSection>

      <Section>
        <SectionTitle>Featured Books</SectionTitle>
        {loading ? (
          <LoadingMessage>Loading featured books...</LoadingMessage>
        ) : (
          <BookGrid>
            {featuredBooks.map((book) => (
              <BookCard key={book._id}>
                <BookCover to={`/books/${book.slug}`}>
                  <img src={book.image} alt={book.title} />
                </BookCover>
                <BookInfo>
                  <BookTitle to={`/books/${book.slug}`}>{book.title}</BookTitle>
                  <BookAuthor>{book.author}</BookAuthor>
                  <BookPrice>${book.price.toFixed(2)}</BookPrice>
                </BookInfo>
              </BookCard>
            ))}
          </BookGrid>
        )}
      </Section>

      <AboutSection>
        <AboutContent>
          <h2>About Our Bookshop</h2>
          <p>
            We are a locally owned independent book store with a passion for connecting readers
            with books they love. Since opening, we have been offering a wide selection of books
            across various genres, fostering a community of book lovers.
          </p>
          <LearnMoreButton to="/about">Learn More</LearnMoreButton>
        </AboutContent>
        <AboutImage>
          <img src="https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Bookshelf" />
        </AboutImage>
      </AboutSection>

      <ContactSection>
        <ContactContent>
          <h2>Get in Touch</h2>
          <p>Have a question? Reach out to us and we will be happy to help.</p>
          <ContactButton to="/contact">Contact Us</ContactButton>
        </ContactContent>
      </ContactSection>
    </>
  );
};

const HeroSection = styled.section`
  height: 80vh;
  background-image: url('https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  color: #fff;
  text-align: center;
  
  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }
  
  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;

const BrowseButton = styled(Link)`
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

const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #3c2415;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: #3c2415;
  }
`;

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const BookCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const BookCover = styled(Link)`
  display: block;
  height: 320px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const BookInfo = styled.div`
  padding: 1.5rem;
`;

const BookTitle = styled(Link)`
  display: block;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #3c2415;
  text-decoration: none;
  
  &:hover {
    color: #59372a;
  }
`;

const BookAuthor = styled.p`
  color: #666;
  margin-bottom: 0.5rem;
`;

const BookPrice = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: #3c2415;
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
`;

const AboutSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 4rem 2rem;
  background-color: #f4f1ea;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #3c2415;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    color: #333;
  }
`;

const LearnMoreButton = styled(Link)`
  display: inline-block;
  background-color: transparent;
  color: #3c2415;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  text-decoration: none;
  border: 2px solid #3c2415;
  border-radius: 4px;
  transition: all 0.3s ease;
  align-self: flex-start;
  
  &:hover {
    background-color: #3c2415;
    color: #f4f1ea;
  }
`;

const AboutImage = styled.div`
  height: 400px;
  overflow: hidden;
  border-radius: 8px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const ContactSection = styled.section`
  background-color: #3c2415;
  padding: 4rem 2rem;
  text-align: center;
`;

const ContactContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  
  h2 {
    font-size: 2rem;
    color: #f4f1ea;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.1rem;
    color: #e0d8ca;
    margin-bottom: 2rem;
  }
`;

const ContactButton = styled(Link)`
  display: inline-block;
  background-color: #f4f1ea;
  color: #3c2415;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #ffffff;
    transform: translateY(-3px);
  }
`;

export default Home;