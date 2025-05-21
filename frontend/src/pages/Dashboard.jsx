import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { FaBook, FaNewspaper, FaImages, FaEnvelope } from 'react-icons/fa';
import { FaFileAlt } from 'react-icons/fa';


const Dashboard = () => {
  const [stats, setStats] = useState({
    books: 0,
    blogPosts: 0,
    galleryItems: 0,
    unreadMessages: 0,
    pages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const [books, blogPosts, galleryItems, contact, page] = await Promise.all([
        axios.get('/api/books', config),
        axios.get('/api/blog', config),
        axios.get('/api/gallery', config),
        axios.get('/api/contact', config),
        axios.get('/api/page', config)
      ]);

      setStats({
        books: books.data.length,
        blogPosts: blogPosts.data.length,
        galleryItems: galleryItems.data.length,
        unreadMessages: contact.data.filter(msg => !msg.isRead).length,
        pages: page.data.length // optional: or fixed as 1 if only hero section
      });

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setLoading(false);
    }
  };

  fetchStats();
}, []);

  return (
    <DashboardContainer>
      <DashboardHeader>
        <h1>Dashboard</h1>
        <p>Welcome to Children Book Centre admin panel</p>
      </DashboardHeader>

      {loading ? (
        <LoadingMessage>Loading dashboard statistics...</LoadingMessage>
      ) : (
        <StatsGrid>
          <StatCard to="/admin/books">
            <StatIcon>
              <FaBook />
            </StatIcon>
            <StatInfo>
              <StatCount>{stats.books}</StatCount>
              <StatLabel>Books</StatLabel>
            </StatInfo>
          </StatCard>

          <StatCard to="/admin/blog">
            <StatIcon>
              <FaNewspaper />
            </StatIcon>
            <StatInfo>
              <StatCount>{stats.blogPosts}</StatCount>
              <StatLabel>Blog Posts</StatLabel>
            </StatInfo>
          </StatCard>

          <StatCard to="/admin/gallery">
            <StatIcon>
              <FaImages />
            </StatIcon>
            <StatInfo>
              <StatCount>{stats.galleryItems}</StatCount>
              <StatLabel>Gallery Items</StatLabel>
            </StatInfo>
          </StatCard>

          <StatCard to="/admin/contact">
            <StatIcon>
              <FaEnvelope />
            </StatIcon>
            <StatInfo>
              <StatCount>{stats.unreadMessages}</StatCount>
              <StatLabel>Unread Messages</StatLabel>
              {stats.unreadMessages > 0 && <UnreadBadge>{stats.unreadMessages}</UnreadBadge>}
            </StatInfo>
          </StatCard>
          <StatCard to="/admin/page">
            <StatIcon>
            <FaFileAlt />
          </StatIcon>
         <StatInfo>
          <StatCount>1</StatCount>
          <StatLabel>Hero Section</StatLabel>
        </StatInfo>
        </StatCard>

        </StatsGrid>
          
      )}

      <QuickLinksSection>
        <h2>Quick Actions</h2>
        <QuickLinksGrid>
          <QuickLink to="/admin/books/new">Add New Book</QuickLink>
          <QuickLink to="/admin/blog/new">Create Blog Post</QuickLink>
          <QuickLink to="/admin/gallery">Manage Gallery</QuickLink>
          <QuickLink to="/admin/contact">Check Messages</QuickLink>
        </QuickLinksGrid>
      </QuickLinksSection>

      <RecentUpdatesSection>
        <h2>Recent Updates</h2>
        <p>Welcome to your website! Start by adding content to your website.</p>
        <p>Use the admin panel to manage your books, blog posts, gallery, and more.</p>
      </RecentUpdatesSection>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div``;

const DashboardHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    color: #3c2415;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin: 2rem 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled(Link)`
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background-color: #f4f1ea;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3c2415;
  font-size: 1.5rem;
  margin-right: 1rem;
`;

const StatInfo = styled.div`
  position: relative;
`;

const StatCount = styled.h3`
  font-size: 1.8rem;
  color: #3c2415;
  margin: 0;
`;

const StatLabel = styled.p`
  color: #666;
  margin: 0;
`;

const UnreadBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -15px;
  background-color: #e63946;
  color: white;
  font-size: 0.75rem;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuickLinksSection = styled.section`
  margin-bottom: 3rem;
  
  h2 {
    font-size: 1.5rem;
    color: #3c2415;
    margin-bottom: 1.5rem;
  }
`;

const QuickLinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const QuickLink = styled(Link)`
  display: block;
  background-color: #3c2415;
  color: #f4f1ea;
  padding: 1rem;
  text-align: center;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #59372a;
    transform: translateY(-3px);
  }
`;

const RecentUpdatesSection = styled.section`
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  
  h2 {
    font-size: 1.5rem;
    color: #3c2415;
    margin-bottom: 1rem;
  }
  
  p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 0.5rem;
  }
`;

export default Dashboard;