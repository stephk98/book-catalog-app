import React, {useState} from "react";

const SearchBook = ({onBookSelected}) =>{
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
    if (!query) return;

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5`
      );
      const data = await response.json();
      if (data.items) {
        setResults(data.items);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching from Google Books API:", error);
      setResults([]);
    }
    };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search for books"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="form-control mb-2"
      />
      <button className="btn btn-primary mb-3" onClick={handleSearch}>
        Search
      </button>

      {results.length > 0 && (
        <ul className="list-group">
          {results.map((item) => {
            const book = item.volumeInfo;
            return (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{book.title}</strong>
                  {book.authors && ` by ${book.authors.join(", ")}`}
                </div>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() =>
                    onBookSelected({
                      title: book.title || "",
                      author: book.authors ? book.authors.join(", ") : "",
                      genre: book.categories ? book.categories[0] : "",
                      publicationYear: book.publishedDate
                        ? parseInt(book.publishedDate.substring(0, 4))
                        : new Date().getFullYear(),
                    })
                  }
                >
                  Add
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default SearchBook;