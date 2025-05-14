import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BookCard = ({ book }) => {
  return (
    <Card>
      <BookCover to={`/books/${book.slug}`}>
        <img src={book.image} alt={book.title} />
      </BookCover>
      <BookInfo>
        <BookTitle to={`/books/${book.slug}`}>{book.title}</BookTitle>
        <BookAuthor>{book.author}</BookAuthor>
        <BookPrice>${book.price.toFixed(2)}</BookPrice>
      </BookInfo>
    </Card>
  );
};

const Card = styled.div`
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

export default BookCard;