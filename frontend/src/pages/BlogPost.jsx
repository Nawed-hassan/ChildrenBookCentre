import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { blogApi } from '../utils/api';
import { formatDate } from '../utils/helpers';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await blogApi.getBySlug(slug);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError('Blog post not found. It may have been removed or the URL is incorrect.');
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <LoadingMessage>Loading blog post...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <BlogPostContainer>
      <BackLink to="/blog">← Back to Blog</BackLink>
      
      <Hero>
        <HeroImage>
          <img src={post.image} alt={post.title} />
        </HeroImage>
      </Hero>
      
      <PostContent>
        <PostMeta>
          <PostDate>{formatDate(post.createdAt)}</PostDate>
          <PostAuthor>By {post.author}</PostAuthor>
        </PostMeta>
        
        <PostTitle>{post.title}</PostTitle>
        
        <PostBody dangerouslySetInnerHTML={{ __html: post.content }} />
        
        {post.tags && post.tags.length > 0 && (
          <TagsSection>
            <TagsTitle>Tags:</TagsTitle>
            <TagsList>
              {post.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </TagsList>
          </TagsSection>
        )}
      </PostContent>
    </BlogPostContainer>
  );
};

const BlogPostContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 2rem;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 2rem;
  color: #3c2415;
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Hero = styled.div`
  margin-bottom: 2rem;
`;

const HeroImage = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const PostContent = styled.article`
  background-color: #fff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const PostDate = styled.div`
  font-size: 1rem;
  color: #666;
  
  @media (min-width: 768px) {
    margin-right: 1.5rem;
    padding-right: 1.5rem;
    border-right: 1px solid #e0d8ca;
  }
`;

const PostAuthor = styled.div`
  font-size: 1rem;
  color: #666;
`;

const PostTitle = styled.h1`
  font-size: 2.5rem;
  color: #3c2415;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PostBody = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  h2, h3, h4 {
    color: #3c2415;
    margin: 2rem 0 1rem;
  }
  
  h2 {
    font-size: 1.8rem;
  }
  
  h3 {
    font-size: 1.5rem;
  }
  
  h4 {
    font-size: 1.3rem;
  }
  
  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  blockquote {
    border-left: 4px solid #3c2415;
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: #666;
  }
  
  img {
    max-width: 100%;
    border-radius: 6px;
    margin: 2rem 0;
  }
`;

const TagsSection = styled.div`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TagsTitle = styled.span`
  font-weight: 600;
  color: #3c2415;
`;

const TagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  display: inline-block;
  background-color: #f4f1ea;
  color: #3c2415;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 5rem 2rem;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 5rem 2rem;
  font-size: 1.2rem;
  color: #e63946;
  max-width: 800px;
  margin: 0 auto;
`;

export default BlogPost;