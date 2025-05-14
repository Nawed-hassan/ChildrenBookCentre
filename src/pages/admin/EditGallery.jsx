import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditGallery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState({
    title: '',
    imageUrl: '',
    description: ''
  });

  useEffect(() => {
    if (id) {
      fetchGalleryItem();
    }
  }, [id]);

  const fetchGalleryItem = async () => {
    try {
      const response = await fetch(`/api/gallery/${id}`);
      if (!response.ok) throw new Error('Failed to fetch image');
      const data = await response.json();
      setImage(data);
    } catch (error) {
      toast.error('Error fetching gallery image');
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = id ? `/api/gallery/${id}` : '/api/gallery';
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(image)
      });

      if (!response.ok) throw new Error('Failed to save image');

      toast.success(`Image ${id ? 'updated' : 'added'} successfully`);
      navigate('/admin/gallery');
    } catch (error) {
      toast.error('Error saving gallery image');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setImage(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {id ? 'Edit Gallery Image' : 'Add New Gallery Image'}
      </h1>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={image.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={image.imageUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={image.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {id ? 'Update Image' : 'Add Image'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/gallery')}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditGallery;
