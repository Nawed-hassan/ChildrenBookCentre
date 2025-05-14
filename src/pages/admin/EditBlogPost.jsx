import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { blogApi, uploadFile } from '../../utils/api';
import { toast } from 'react-toastify';
import { generateSlug } from '../../utils/helpers';

const EditBlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(id ? true : false);
  const [post, setPost] = useState({
    title: '',
    content: '',
    author: '',
    image: '',
    excerpt: '',
    tags: []
  });

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await blogApi.getById(id);
      setPost(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      toast.error('Failed to fetch blog post');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContentChange = (content) => {
    setPost(prev => ({
      ...prev,
      content
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const filePath = await uploadFile(file);
      setPost(prev => ({
        ...prev,
        image: filePath
      }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        ...post,
        slug: generateSlug(post.title)
      };

      if (id) {
        await blogApi.update(id, postData);
        toast.success('Blog post updated successfully');
      } else {
        await blogApi.create(postData);
        toast.success('Blog post created successfully');
      }

      navigate('/admin/blog');
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast.error('Failed to save blog post');
    }
  };

  if (loading) {
    return <LoadingMessage>Loading blog post...</LoadingMessage>;
  }

  return (
    <Container>
      <Header>
        <h1>{id ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
      </Header>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Author</Label>
          <Input
            type="text"
            name="author"
            value={post.author}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Content</Label>
          <ReactQuill
            value={post.content}
            onChange={handleContentChange}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image'],
                ['clean']
              ]
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Featured Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {post.image && (
            <ImagePreview>
              <img src={post.image} alt="Preview" />
            </ImagePreview>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Excerpt</Label>
          <Textarea
            name="excerpt"
            value={post.excerpt}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Tags (comma-separated)</Label>
          <Input
            type="text"
            name="tags"
            value={Array.isArray(post.tags) ? post.tags.join(', ') : ''}
            onChange={(e) => {
              const tags = e.target.value.split(',').map(tag => tag.trim());
              setPost(prev => ({
                ...prev,
                tags
              }));
            }}
          />
        </FormGroup>

        <ButtonGroup>
          <SubmitButton type="submit">
            {id ? 'Update Post' : 'Create Post'}
          </SubmitButton>
          <CancelButton type="button" onClick={() => navigate('/admin/blog')}>
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
  max-width: 800px;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  .quill {
    margin-bottom: 2rem;
    
    .ql-editor {
      min-height: 200px;
    }
  }
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
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3c2415;
    box-shadow: 0 0 0 2px rgba(60, 36, 21, 0.2);
  }
`;

const ImagePreview = styled.div`
  margin-top: 1rem;
  max-width: 300px;
  border-radius: 4px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: auto;
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
  cursor: pointer;
  transition: all 0.3s ease;
`;

const SubmitButton = styled(Button)`
  background-color: #3c2415;
  color: #fff;
  border: none;
  
  &:hover {
    background-color: #59372a;
  }
`;

const CancelButton = styled(Button)`
  background-color: #f4f1ea;
  color: #3c2415;
  border: 1px solid #3c2415;
  
  &:hover {
    background-color: #e0d8ca;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin: 2rem 0;
`;

export default EditBlogPost;