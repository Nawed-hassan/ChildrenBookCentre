import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { booksApi } from '../utils/api';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await booksApi.getAll();
        setBooks(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Get current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = Array.isArray(books) ? books.slice(indexOfFirstBook, indexOfLastBook) : [];
  const totalPages = Math.ceil((Array.isArray(books) ? books.length : 0) / booksPerPage);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <BooksContainer>
      <HeroSection>
        <h1>Our Books Collection</h1>
        <p>Browse through our carefully curated selection of books</p>
      </HeroSection>

      <ContentSection>
        {loading ? (
          <LoadingMessage>Loading books...</LoadingMessage>
        ) : (
          <>
            <BooksGrid>
              {currentBooks.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </BooksGrid>

            {books.length > booksPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </ContentSection>
    </BooksContainer>
  );
};

const BooksContainer = styled.div``;

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

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin: 3rem 0;
`;

export default Books;