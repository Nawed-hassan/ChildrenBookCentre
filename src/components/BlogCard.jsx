import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BlogCard = ({ post }) => {
  // Format date
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card>
      <BlogImage to={`/blog/${post.slug}`}>
        <img src={post.image} alt={post.title} />
      </BlogImage>
      <BlogContent>
        <BlogDate>{formattedDate}</BlogDate>
        <BlogTitle to={`/blog/${post.slug}`}>{post.title}</BlogTitle>
        <BlogExcerpt>{post.excerpt}</BlogExcerpt>
        <ReadMoreLink to={`/blog/${post.slug}`}>Read More</ReadMoreLink>
      </BlogContent>
    </Card>
  );
};

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const BlogImage = styled(Link)`
  display: block;
  height: 240px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const BlogContent = styled.div`
  padding: 1.5rem;
`;

const BlogDate = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const BlogTitle = styled(Link)`
  display: block;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #3c2415;
  text-decoration: none;
  
  &:hover {
    color: #59372a;
  }
`;

const BlogExcerpt = styled.p`
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const ReadMoreLink = styled(Link)`
  display: inline-block;
  color: #3c2415;
  font-weight: 500;
  text-decoration: none;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #3c2415;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

export default BlogCard;