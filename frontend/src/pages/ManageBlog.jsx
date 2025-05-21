import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { blogApi } from '../utils/api';
import { toast } from 'react-toastify';

const ManageBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await blogApi.getAll();
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast.error('Failed to fetch blog posts');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await blogApi.delete(id);
      toast.success('Blog post deleted successfully');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast.error('Failed to delete blog post');
    }
  };

  return (
    <Container>
      <Header>
        <h1>Manage Blog Posts</h1>
        <AddButton to="/admin/blog/new">Add New Post</AddButton>
      </Header>

      {loading ? (
        <LoadingMessage>Loading blog posts...</LoadingMessage>
      ) : (
        <PostsGrid>
          {posts.map((post) => (
            <PostCard key={post._id}>
              <PostImage>
                <img src={post.image} alt={post.title} />
              </PostImage>
              <PostInfo>
                <PostTitle>{post.title}</PostTitle>
                <PostMeta>
                  <span>Author {post.author}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </PostMeta>
                <Actions>
                  <EditButton to={`/admin/blog/edit/${post._id}`}>
                    Edit
                  </EditButton>
                  <DeleteButton onClick={() => handleDelete(post._id)}>
                    Delete
                  </DeleteButton>
                </Actions>
              </PostInfo>
            </PostCard>
          ))}
        </PostsGrid>
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
    margin: 0;
    font-size: 2rem;
    color: #3c2415;
  }
`;

const AddButton = styled(Link)`
  background-color: #3c2415;
  color: #fff;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #59372a;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin: 2rem 0;
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const PostCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const PostImage = styled.div`
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PostInfo = styled.div`
  padding: 1.5rem;
`;

const PostTitle = styled.h3`
  margin: 0 0 1rem;
  font-size: 1.2rem;
  color: #3c2415;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

const EditButton = styled(Link)`
  flex: 1;
  text-align: center;
  padding: 0.5rem;
  background-color: #f4f1ea;
  color: #3c2415;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #e0d8ca;
  }
`;

const DeleteButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  background-color: #e63946;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #c1121f;
  }
`;

export default ManageBlog;