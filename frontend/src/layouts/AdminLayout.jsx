import { Outlet, Navigate, useLocation, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import { 
  FaHome, 
  FaBook, 
  FaImages, 
  FaNewspaper, 
  FaEnvelope, 
  FaFileAlt,
  FaSignOutAlt,
  FaBars
} from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const AdminLayout = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  if (loading) {
    return <LoadingScreen>Loading...</LoadingScreen>;
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <AdminContainer>
      <Sidebar isOpen={sidebarOpen}>
        <SidebarHeader>
          <h2>Admin Panel</h2>
        </SidebarHeader>
        
        <SidebarNav>
          <NavItem isActive={location.pathname === '/admin'}>
            <Link to="/admin">
              <FaHome /> <span>Dashboard</span>
            </Link>
          </NavItem>
          <NavItem isActive={location.pathname.startsWith('/admin/books')}>
            <Link to="/admin/books">
              <FaBook /> <span>Books</span>
            </Link>
          </NavItem>
          <NavItem isActive={location.pathname.startsWith('/admin/blog')}>
            <Link to="/admin/blog">
              <FaNewspaper /> <span>Blog</span>
            </Link>
          </NavItem>
          <NavItem isActive={location.pathname.startsWith('/admin/gallery')}>
            <Link to="/admin/gallery">
              <FaImages /> <span>Gallery</span>
            </Link>
          </NavItem>
          <NavItem isActive={location.pathname.startsWith('/admin/contact')}>
            <Link to="/admin/contact">
              <FaEnvelope /> <span>Messages</span>
            </Link>
          </NavItem>
          <NavItem isActive={location.pathname.startsWith('/admin/pages')}>
            <Link to="/admin/pages">
              <FaFileAlt /> <span>Pages</span>
            </Link>
          </NavItem>
        </SidebarNav>
        
        <SidebarFooter>
          <LogoutButton onClick={logout}>
            <FaSignOutAlt /> <span>Logout</span>
          </LogoutButton>
        </SidebarFooter>
      </Sidebar>
      
      <MainContent isSidebarOpen={sidebarOpen}>
        <AdminHeader>
          <MenuToggle onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars />
          </MenuToggle>
          <div>
            <UserName>Welcome, {user.username}</UserName>
            <ViewSite href="/" target="_blank" rel="noopener noreferrer">View Site</ViewSite>
          </div>
        </AdminHeader>
        
        <ContentArea>
          <Outlet />
        </ContentArea>
      </MainContent>
    </AdminContainer>
  );
};

const AdminContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.aside`
  width: 260px;
  background-color: #3c2415;
  color: #f4f1ea;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 100;
  
  @media (max-width: 768px) {
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    width: 240px;
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  
  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const SidebarNav = styled.nav`
  flex: 1;
  padding: 1rem 0;
`;

const NavItem = styled.div`
  a {
    display: flex;
    align-items: center;
    padding: 0.8rem 1.5rem;
    text-decoration: none;
    color: #e0d8ca;
    transition: all 0.2s ease;
    background-color: ${props => props.isActive ? 'rgba(244, 241, 234, 0.1)' : 'transparent'};
    border-left: 4px solid ${props => props.isActive ? '#f4f1ea' : 'transparent'};
    
    span {
      margin-left: 0.8rem;
    }
    
    &:hover {
      background-color: rgba(244, 241, 234, 0.1);
    }
  }
`;

const SidebarFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid rgba(244, 241, 234, 0.1);
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #e0d8ca;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  padding: 0.5rem 0;
  transition: all 0.2s ease;
  
  span {
    margin-left: 0.8rem;
  }
  
  &:hover {
    color: #f4f1ea;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: ${props => props.isSidebarOpen ? '260px' : '0'};
  transition: all 0.3s ease;
  width: ${props => props.isSidebarOpen ? 'calc(100% - 260px)' : '100%'};
  
  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

const AdminHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f4f1ea;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
`;

const MenuToggle = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #3c2415;
  cursor: pointer;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const UserName = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #3c2415;
`;

const ViewSite = styled.a`
  font-size: 0.8rem;
  color: #3c2415;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ContentArea = styled.main`
  padding: 2rem;
  background-color: #f8f5f1;
  min-height: calc(100vh - 72px);
`;

const LoadingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.2rem;
  background-color: #f8f5f1;
`;

export default AdminLayout;