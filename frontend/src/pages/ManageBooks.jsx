import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { booksApi } from '../utils/api';
import { formatDate } from '../utils/helpers';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await booksApi.getAll();
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching books');
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    try {
      await booksApi.delete(id);
      toast.success('Book deleted successfully');
      fetchBooks();
    } catch (error) {
      toast.error('Error deleting book');
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <Header>
        <h1>Manage Books</h1>
        <AddButton to="/admin/books/new">
          <FaPlus /> Add New Book
        </AddButton>
      </Header>

      {loading ? (
        <LoadingMessage>Loading books...</LoadingMessage>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>Published Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>${book.price.toFixed(2)}</td>
                <td>{formatDate(book.publishDate)}</td>
                <td>
                  <Actions>
                    <ActionLink to={`/admin/books/edit/${book._id}`}>
                      <FaEdit />
                    </ActionLink>
                    <DeleteButton onClick={() => handleDelete(book._id)}>
                      <FaTrash />
                    </DeleteButton>
                  </Actions>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
    font-size: 2rem;
    color: #3c2415;
  }
`;

const AddButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #3c2415;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #59372a;
  }
`;

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    background-color: #f4f1ea;
    color: #3c2415;
    font-weight: 600;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionLink = styled(Link)`
  color: #3c2415;
  
  &:hover {
    color: #59372a;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #e63946;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    color: #c1121f;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

export default ManageBooks;