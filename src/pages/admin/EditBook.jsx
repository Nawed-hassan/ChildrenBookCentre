import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    description: '',
    coverImage: '',
    price: '',
    publishDate: '',
    isbn: ''
  });

  useEffect(() => {
    if (id) {
      // Fetch existing book data if we're editing
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await fetch(`/api/books/${id}`);
      if (!response.ok) throw new Error('Failed to fetch book');
      const data = await response.json();
      setBook(data);
    } catch (error) {
      toast.error('Error fetching book details');
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = id ? `/api/books/${id}` : '/api/books';
      const method = id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      });

      if (!response.ok) throw new Error('Failed to save book');
      
      toast.success(`Book ${id ? 'updated' : 'created'} successfully`);
      navigate('/admin/books');
    } catch (error) {
      toast.error('Error saving book');
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {id ? 'Edit Book' : 'Add New Book'}
      </h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            value={book.coverImage}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={book.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            step="0.01"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Publish Date</label>
          <input
            type="date"
            name="publishDate"
            value={book.publishDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">ISBN</label>
          <input
            type="text"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {id ? 'Update Book' : 'Create Book'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/books')}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;