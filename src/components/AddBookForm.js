import React, { useState } from "react";

function AddBookForm({ onBookAdded }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationYear, setPublicationYear] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('publicationYear:', publicationYear);

    const newBook = {
      title,
      author,
      genre,
      publicationYear: Number(publicationYear),
    };

    try {
      const response = await fetch("http://localhost:8080/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        throw new Error("Failed to add book");
      }

      const savedBook = await response.json();
      onBookAdded(savedBook);

      // Clear the form
      setTitle("");
      setAuthor("");
      setGenre("");
      setPublicationYear("");
    } catch (error) {
      console.error(error);
      alert("Error adding book");
    }
  };

  return (
    <form className="mt-4 p-4 border rounded shadow-sm bg-light" onSubmit={handleSubmit}>
      <h3 className="mb-3">Add a New Book</h3>
      <div className="mb-3">
        <label className="form-label">Title:</label><br />
        <input
          className="form-control"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Author:</label><br />
        <input
          className="form-control"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Genre:</label><br />
        <input
          className="form-control"
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Publication Year:</label><br />
        <input
          className="form-control"
          type="number"
          value={publicationYear}
          onChange={(e) => setPublicationYear(e.target.value)}
          required
        />
      </div>
      <button className="btn btn-success" type="submit">Add Book</button>
    </form>
  );
}

export default AddBookForm;
