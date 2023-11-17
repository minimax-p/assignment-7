import { ChangeEvent, MouseEvent, useState } from "react";
import { Book, BookList } from "components/organisms/book-list";
import { useFetch } from "hooks/use-fetch";

interface SearchResponse {
  numFound: number;
  docs: Book[];
}

function App() {
  const [bookName, setBookName] = useState("");
  const [fetchUri, setFetchUri] = useState("");
  const { loading, hasData, books, booksCount } =
    useFetch<SearchResponse>(fetchUri);
  console.log(books);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBookName(e.target.value);
  };

  const handleClick = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const encoded = encodeURIComponent(bookName);
    setFetchUri(`https://openlibrary.org/search.json?q=${encoded}`);
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-start gap-4 mt-20 text-center">
      <div>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Book Name"
          required
          value={bookName}
          onChange={handleInputChange}
        />
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Search Books
      </button>
      {loading ? <div>Loading ...</div> : ""}
      {hasData ? <div>Found {booksCount} books</div> : ""}
      <BookList books={books} />
    </div>
  );
}

export default App;
