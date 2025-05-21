import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { galleryApi, uploadFile } from '../utils/api';

const EditGallery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({
    title: '',
    description: '',
    image: '',
    altText: '',
    order: 0,
    isActive: true
  });

  useEffect(() => {
    if (id) {
      fetchGalleryItem();
    }
  }, [id]);

  const fetchGalleryItem = async () => {
    try {
      const response = await galleryApi.getById(id);
      setItem(response.data);
    } catch (error) {
      toast.error('Error fetching gallery item');
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setItem(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imagePath = await uploadFile(file);
      setItem(prev => ({ ...prev, image: imagePath }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Error uploading image');
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await galleryApi.update(id, item);
        toast.success('Gallery item updated successfully');
      } else {
        await galleryApi.create(item);
        toast.success('Gallery item created successfully');
      }

      navigate('/admin/gallery');
    } catch (error) {
      toast.error('Error saving gallery item');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <h1>{id ? 'Edit Gallery Item' : 'Add New Gallery Item'}</h1>
      </Header>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            value={item.title}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Description</Label>
          <Textarea
            name="description"
            value={item.description}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Image</Label>
          <ImageUploadContainer>
            {item.image && (
              <PreviewImage src={item.image} alt={item.title} />
            )}
            <ImageInput
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              required={!id}
            />
          </ImageUploadContainer>
        </FormGroup>

        <FormGroup>
          <Label>Alt Text</Label>
          <Input
            type="text"
            name="altText"
            value={item.altText}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Display Order</Label>
          <Input
            type="number"
            name="order"
            value={item.order}
            onChange={handleChange}
            min="0"
          />
        </FormGroup>

        <FormGroup>
          <CheckboxLabel>
            <input
              type="checkbox"
              name="isActive"
              checked={item.isActive}
              onChange={handleChange}
            />
            Active
          </CheckboxLabel>
        </FormGroup>

        <ButtonGroup>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Saving...' : (id ? 'Update Item' : 'Create Item')}
          </SubmitButton>
          <CancelButton type="button" onClick={() => navigate('/admin/gallery')}>
            Cancel
          </CancelButton>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    color: #3c2415;
  }
`;

const Form = styled.form`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #3c2415;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: #3c2415;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3c2415;
  }
`;

const ImageUploadContainer = styled.div`
  margin-top: 0.5rem;
`;

const PreviewImage = styled.img`
  max-width: 200px;
  margin-bottom: 1rem;
  border-radius: 4px;
`;

const ImageInput = styled.input`
  width: 100%;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const SubmitButton = styled(Button)`
  background-color: #3c2415;
  color: #fff;
  border: none;
  
  &:hover:not(:disabled) {
    background-color: #59372a;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  border: 1px solid #3c2415;
  color: #3c2415;
  
  &:hover {
    background-color: #f4f1ea;
  }
`;

export default EditGallery;