import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { booksApi } from '../utils/api';
import { formatDate } from '../utils/helpers';

const BookDetail = () => {
  const { slug } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await booksApi.getBySlug(slug);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setError('Book not found. It may have been removed or the URL is incorrect.');
        setLoading(false);
      }
    };

    fetchBook();
  }, [slug]);

  if (loading) {
    return <LoadingMessage>Loading book details...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <BookDetailContainer>
      <BackLink to="/books">← Back to Books</BackLink>
      
      <BookContent>
        <BookImageColumn>
          <BookImage>
            <img src={book.image} alt={book.title} />
          </BookImage>
        </BookImageColumn>
        
        <BookInfoColumn>
          <BookTitle>{book.title}</BookTitle>
          <BookAuthor>by {book.author}</BookAuthor>
          <BookPrice>${book.price.toFixed(2)}</BookPrice>
          <PublishedDate>Published: {formatDate(book.publishedDate)}</PublishedDate>
          
          <Divider />
          
          <Description>
            <h3>Description</h3>
            <p>{book.description}</p>
          </Description>
        </BookInfoColumn>
      </BookContent>
    </BookDetailContainer>
  );
};

const BookDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 2rem;
  color: #3c2415;
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const BookContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BookImageColumn = styled.div``;

const BookImage = styled.div`
  width: 100%;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const BookInfoColumn = styled.div``;

const BookTitle = styled.h1`
  font-size: 2.5rem;
  color: #3c2415;
  margin-bottom: 0.5rem;
`;

const BookAuthor = styled.h2`
  font-size: 1.5rem;
  color: #666;
  font-weight: 400;
  margin-bottom: 1.5rem;
`;

const BookPrice = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  color: #3c2415;
  margin-bottom: 1rem;
`;

const PublishedDate = styled.div`
  font-size: 1rem;
  color: #666;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0d8ca;
  margin: 2rem 0;
`;

const Description = styled.div`
  h3 {
    font-size: 1.3rem;
    color: #3c2415;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 5rem 2rem;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 5rem 2rem;
  font-size: 1.2rem;
  color: #e63946;
  max-width: 800px;
  margin: 0 auto;
`;

export default BookDetail;