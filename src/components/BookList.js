import React from 'react';

const BookList = ({ books, onEditClick, onDeleteClick }) => {
  return (
    <div className='container mt-4'>
      <h2>Books in Catalog</h2>
      {books.length === 0 ? (
        <p className="text-muted">No books found.</p>
      ) : (
        <ul className='list-group'>
          {books.map(book => (
            <li key={book.id} className='list-group-item d-flex justify-content-between align-items-center'>
              <strong>{book.title}</strong> by {book.author} ({book.publicationYear})
              <div>
                <button className="btn btn-sm btn-primary me-2" 
                onClick={() => onEditClick(book)}>Edit
                </button>
                <button className='btn btn-sm btn-danger'
                onClick={() => {if(window.confirm(`Are you sure you want to delete "${book.title}"?` )) {
                  onDeleteClick(book.id);
                }
                }
                  }>Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
