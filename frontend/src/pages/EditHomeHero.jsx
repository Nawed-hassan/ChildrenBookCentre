import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { uploadFile } from '../utils/api';
import axios from 'axios';

const EditHomeHero = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hero, setHero] = useState({
    title: '',
    subtitle: '',
    backgroundImage: '',
    buttonText: '',
    buttonLink: '',
    isActive: true
  });

  useEffect(() => {
    fetchHeroSection();
  }, []);

  const fetchHeroSection = async () => {
    try {
      const response = await axios.get('/api/hero');
      if (response.data) {
        setHero(response.data);
      }
    } catch (error) {
      toast.error('Error fetching hero section');
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHero(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imagePath = await uploadFile(file);
      setHero(prev => ({ ...prev, backgroundImage: imagePath }));
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
      await axios.post('/api/hero', hero);
      toast.success('Hero section updated successfully');
      navigate('/admin');
    } catch (error) {
      toast.error('Error saving hero section');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <h1>Edit Home Hero Section</h1>
      </Header>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            value={hero.title}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Subtitle</Label>
          <Input
            type="text"
            name="subtitle"
            value={hero.subtitle}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Background Image</Label>
          <ImageUploadContainer>
            {hero.backgroundImage && (
              <PreviewImage src={hero.backgroundImage} alt="Background" />
            )}
            <ImageInput
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </ImageUploadContainer>
        </FormGroup>

        <FormGroup>
          <Label>Button Text</Label>
          <Input
            type="text"
            name="buttonText"
            value={hero.buttonText}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Button Link</Label>
          <Input
            type="text"
            name="buttonLink"
            value={hero.buttonLink}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <CheckboxLabel>
            <input
              type="checkbox"
              name="isActive"
              checked={hero.isActive}
              onChange={handleChange}
            />
            Active
          </CheckboxLabel>
        </FormGroup>

        <ButtonGroup>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </SubmitButton>
          <CancelButton type="button" onClick={() => navigate('/admin')}>
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

const ImageUploadContainer = styled.div`
  margin-top: 0.5rem;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  height: 200px;
  object-fit: cover;
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

export default EditHomeHero;