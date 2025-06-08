import React, { useEffect, useState } from "react";
import BookList from './components/BookList';
import AddBookForm from "./components/AddBookForm";
import EditBookForm from "./components/EditBookForm";

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await fetch("http://localhost:8080/api/books");
    const data = await response.json();
    setBooks(data);
  };

  const handleBookAdded = (newBook) => {
    setBooks([...books, newBook]);
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
  };

  const handleDeleteClick = async (id) => {
    try{
      const response = await fetch(`http://localhost:8080/api/books/${id}`,
        {method: "DELETE"});
    
    if(response.ok){
      setBooks(books.filter(book => book.id !== id));
    } else {
      console.error("Failed to delete book");
    }
    }
    catch (error) {
      console.error("Error deleteing book:", error);
    }

  };

  return (
    <div className="container my-4">
      <h1>My Book Catalog</h1>
      {selectedBook && (
        <EditBookForm
        book={selectedBook}
        onBookUpdated={(updatedBook) => {
          setBooks(books.map(b => b.id === updatedBook.id ? updatedBook : b));
          setSelectedBook(null);
        }}
        onCancel={() => setSelectedBook(null)} 
      />
      )}
      <AddBookForm onBookAdded={handleBookAdded} />
      <BookList books={books} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick}/>
    </div>
  );
}

export default App;

