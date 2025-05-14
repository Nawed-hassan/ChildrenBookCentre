import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageBooks from './pages/admin/ManageBooks';
import EditBook from './pages/admin/EditBook';
import ManageBlog from './pages/admin/ManageBlog';
import EditBlogPost from './pages/admin/EditBlogPost';
import ManageGallery from './pages/admin/ManageGallery';
import EditGallery from './pages/admin/EditGallery';

// Context
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="books" element={<Books />} />
            <Route path="books/:slug" element={<BookDetail />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="books" element={<ManageBooks />} />
            <Route path="books/edit/:id" element={<EditBook />} />
            <Route path="books/new" element={<EditBook />} />
            <Route path="blog" element={<ManageBlog />} />
            <Route path="blog/edit/:id" element={<EditBlogPost />} />
            <Route path="blog/new" element={<EditBlogPost />} />
            <Route path="gallery" element={<ManageGallery />} />
            <Route path="gallery/edit/:id" element={<EditGallery />} /> 
            <Route path="gallery/new" element={<EditGallery />} />       
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
