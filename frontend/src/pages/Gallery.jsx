import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { galleryApi } from '../utils/api';
import GalleryItem from '../components/GalleryItem';
import Pagination from '../components/Pagination';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await galleryApi.getAll();
        setGalleryItems(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching gallery items:', error);
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(galleryItems) ? galleryItems.slice(indexOfFirstItem, indexOfLastItem) : [];
  const totalPages = Math.ceil((Array.isArray(galleryItems) ? galleryItems.length : 0) / itemsPerPage);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <GalleryContainer>
      <HeroSection>
        <h1>Our Gallery</h1>
        <p>Take a visual tour of our bookshop and events.</p>
      </HeroSection>

      <ContentSection>
        {loading ? (
          <LoadingMessage>Loading gallery...</LoadingMessage>
        ) : (
          <>
            <GalleryGrid>
              {currentItems.map((item) => (
                <GalleryItem key={item._id} item={item} />
              ))}
            </GalleryGrid>

            {galleryItems.length > itemsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </ContentSection>
    </GalleryContainer>
  );
};

const GalleryContainer = styled.div``;

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

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin: 3rem 0;
`;

export default Gallery;