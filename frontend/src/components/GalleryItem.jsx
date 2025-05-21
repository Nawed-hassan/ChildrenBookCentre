import styled from 'styled-components';
import { useState } from 'react';

const GalleryItem = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <GalleryCard onClick={openModal}>
        <GalleryImage>
          <img src={item.image} alt={item.title} />
        </GalleryImage>
        <GalleryOverlay>
          <GalleryTitle>{item.title}</GalleryTitle>
        </GalleryOverlay>
      </GalleryCard>

      {isModalOpen && (
        <Modal onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <ModalImage>
              <img src={item.image} alt={item.title} />
            </ModalImage>
            <ModalInfo>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </ModalInfo>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

const GalleryCard = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  height: 280px;
`;

const GalleryImage = styled.div`
  width: 100%;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${GalleryCard}:hover & img {
    transform: scale(1.05);
  }
`;

const GalleryOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 1.5rem;
  transition: all 0.3s ease;
  
  ${GalleryCard}:hover & {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  }
`;

const GalleryTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  margin: 0;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  padding: 2rem;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
`;

const ModalImage = styled.div`
  width: 100%;
  max-height: 60vh;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ModalInfo = styled.div`
  padding: 1.5rem;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #3c2415;
  }
  
  p {
    color: #666;
    line-height: 1.6;
  }
`;

export default GalleryItem;