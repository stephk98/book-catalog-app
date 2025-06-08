import React, { useState, useEffect } from 'react';

const EditBookForm = ({ book, onBookUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationYear: ''
  });


  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        publicationYear: book.publicationYear
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;

   
    setFormData({
      ...formData,
      [name]: name === 'publicationYear' ? Number(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:8080/api/books/${book.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const updatedBook = await response.json();
      onBookUpdated(updatedBook); 
    } else {
      console.error('Failed to update book');
    }
  };

  return (
    <div>
      <h3 className="mb-3">Edit Book</h3>
      <form className="mt-4 p-4 border rounded shadow-sm bg-warning-subtle" onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        /><br />

        <input
          className="form-control"  
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        /><br />

        <input
          className="form-control"
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          required
        /><br />

        <input
          className="form-control"
          type="number"
          name="publicationYear"
          placeholder="Publication Year"
          value={formData.publicationYear}
          onChange={handleChange}
          required
        /><br />

        <button type="submit" className="btn btn-primary">Save Changes</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EditBookForm;
