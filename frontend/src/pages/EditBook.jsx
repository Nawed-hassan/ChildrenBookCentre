import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { booksApi, uploadFile } from '../utils/api';
import { generateSlug } from '../utils/helpers';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    image: '',
    isbn: '',
    publishDate: '',
    featured: false
  });

  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await booksApi.getById(id);
      const bookData = response.data;
      setBook({
        ...bookData,
        publishDate: bookData.publishDate.split('T')[0]
      });
    } catch (error) {
      toast.error('Error fetching book details');
      console.error('Error:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }
      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setBook(prev => ({ ...prev, image: previewUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = book.image;

      // Upload image if a new file is selected
      if (imageFile) {
        const uploadResponse = await uploadFile(imageFile);
        imageUrl = uploadResponse;
      }

      const bookData = {
        ...book,
        image: imageUrl,
        slug: generateSlug(book.title)
      };

      if (id) {
        await booksApi.update(id, bookData);
        toast.success('Book updated successfully');
      } else {
        await booksApi.create(bookData);
        toast.success('Book created successfully');
      }

      navigate('/admin/books');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving book');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <Container>
      <Header>
        <h1>{id ? 'Edit Book' : 'Add New Book'}</h1>
      </Header>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="author">Author</Label>
          <Input
            type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={book.description}
            onChange={handleChange}
            rows="6"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            id="price"
            name="price"
            value={book.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="image">Book Cover Image</Label>
          <ImageUploadContainer>
            {book.image && (
              <ImagePreview>
                <img src={book.image} alt="Book cover preview" />
              </ImagePreview>
            )}
            <FileInput
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </ImageUploadContainer>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            type="text"
            id="isbn"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="publishDate">Publish Date</Label>
          <Input
            type="date"
            id="publishDate"
            name="publishDate"
            value={book.publishDate}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <CheckboxLabel>
            <input
              type="checkbox"
              name="featured"
              checked={book.featured}
              onChange={handleChange}
            />
            Featured Book
          </CheckboxLabel>
        </FormGroup>

        <ButtonGroup>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Saving...' : id ? 'Update Book' : 'Create Book'}
          </SubmitButton>
          <CancelButton type="button" onClick={() => navigate('/admin/books')}>
            Cancel
          </CancelButton>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
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
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
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
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3c2415;
    box-shadow: 0 0 0 2px rgba(60, 36, 21, 0.2);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3c2415;
    box-shadow: 0 0 0 2px rgba(60, 36, 21, 0.2);
  }
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ImagePreview = styled.div`
  width: 200px;
  height: 300px;
  border-radius: 4px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FileInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3c2415;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  input[type="checkbox"] {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
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
  color: #3c2415;
  border: 1px solid #3c2415;
  
  &:hover {
    background-color: #f4f1ea;
  }
`;

export default EditBook;