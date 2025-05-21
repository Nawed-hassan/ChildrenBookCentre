import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { galleryApi } from '../utils/api';

const ManageGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await galleryApi.getAll();
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching gallery items');
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await galleryApi.delete(id);
      toast.success('Gallery item deleted successfully');
      fetchGalleryItems();
    } catch (error) {
      toast.error('Error deleting gallery item');
      console.error('Error:', error);
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      await galleryApi.update(id, { isActive: !currentStatus });
      toast.success('Status updated successfully');
      fetchGalleryItems();
    } catch (error) {
      toast.error('Error updating status');
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <Header>
        <h1>Manage Gallery</h1>
        <AddButton to="/admin/gallery/new">
          <FaPlus /> Add New Item
        </AddButton>
      </Header>

      {loading ? (
        <LoadingMessage>Loading gallery items...</LoadingMessage>
      ) : (
        <GalleryGrid>
          {items.map(item => (
            <GalleryCard key={item._id}>
              <ImageContainer>
                <img src={item.image} alt={item.altText} />
              </ImageContainer>
              <ItemInfo>
                <Title>{item.title}</Title>
                <Description>{item.description}</Description>
                <Order>Order: {item.order}</Order>
              </ItemInfo>
              <Actions>
                <ActionButton
                  onClick={() => toggleActive(item._id, item.isActive)}
                  title={item.isActive ? 'Deactivate' : 'Activate'}
                >
                  {item.isActive ? <FaEye /> : <FaEyeSlash />}
                </ActionButton>
                <ActionLink to={`/admin/gallery/edit/${item._id}`}>
                  <FaEdit />
                </ActionLink>
                <ActionButton onClick={() => handleDelete(item._id)}>
                  <FaTrash />
                </ActionButton>
              </Actions>
            </GalleryCard>
          ))}
        </GalleryGrid>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    color: #3c2415;
  }
`;

const AddButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #3c2415;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #59372a;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const GalleryCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemInfo = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  color: #3c2415;
`;

const Description = styled.p`
  margin: 0 0 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const Order = styled.p`
  margin: 0;
  color: #999;
  font-size: 0.8rem;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  border-top: 1px solid #eee;
  gap: 1rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #3c2415;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    color: #59372a;
  }
`;

const ActionLink = styled(Link)`
  color: #3c2415;
  
  &:hover {
    color: #59372a;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

export default ManageGallery;