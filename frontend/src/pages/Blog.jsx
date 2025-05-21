import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { blogApi } from '../utils/api';
import BlogCard from '../components/BlogCard';
import Pagination from '../components/Pagination';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await blogApi.getAll();
        setPosts(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Array.isArray(posts) ? posts.slice(indexOfFirstPost, indexOfLastPost) : [];
  const totalPages = Math.ceil((Array.isArray(posts) ? posts.length : 0) / postsPerPage);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <BlogContainer>
      <HeroSection>
        <h1>Our Blog</h1>
        <p>Insights, recommendations, and stories from our bookshop</p>
      </HeroSection>

      <ContentSection>
        {loading ? (
          <LoadingMessage>Loading blog posts...</LoadingMessage>
        ) : (
          <>
            <BlogGrid>
              {currentPosts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </BlogGrid>

            {posts.length > postsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </ContentSection>
    </BlogContainer>
  );
};

const BlogContainer = styled.div``;

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

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin: 3rem 0;
`;

export default Blog;