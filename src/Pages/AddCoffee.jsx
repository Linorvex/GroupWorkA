import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000/api/v1';
const API_KEY = 'YXBpS2V5U2VjcmV0';

const AddCoffee = () => {
  const navigate = useNavigate();
  const [coffee, setCoffee] = useState({
    name: '',
    country: '',
    description: '',
    imageUrl: '',
    price: '',
    caffeine: ''
  });
  const [previewImage, setPreviewImage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoffee({ ...coffee, [name]: value });
    if (name === 'imageUrl') setPreviewImage(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/resource/coffees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-bypass-token': API_KEY,
        },
        body: JSON.stringify({ 
          data: [{
            ...coffee,
            price: Number(coffee.price),
            caffeine: Number(coffee.caffeine)
          }]
        })
      });
      
      if (!response.ok) throw new Error('Failed to add coffee');
      
      navigate('/');
    } catch (error) {
      console.error('Error:', error.message);
      alert('Failed to add coffee. Please check console for details.');
    }
  };

  return (
    <div className="mainContent">
      <div className="form-container">
        <div className="form-header">
          <h2>Add New Coffee</h2>
          <button 
            onClick={() => navigate('/')} 
            className="back-button"
          >
            Back To Dashboard
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-section">
          <div className="form-group">
            <label>Coffee Name</label>
            <input
              type="text"
              name="name"
              value={coffee.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Country of Origin</label>
            <input
              type="text"
              name="country"
              value={coffee.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={coffee.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={coffee.imageUrl}
              onChange={handleChange}
              required
            />
            {previewImage && (
              <div className="image-preview">
                <img src={previewImage} alt="Coffee preview" />
              </div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price ($)</label>
              <input
                type="number"
                name="price"
                value={coffee.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label>Caffeine (mg)</label>
              <input
                type="number"
                name="caffeine"
                value={coffee.caffeine}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            Add Coffee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoffee;