const initialState = {
  books: [],
  readers: [],
  lastUpdate: null,
  statistics: {
    totalBooks: 0,
    availableBooks: 0,
    borrowedBooks: 0,
    booksByDecade: {},
    activeReadersCount: 0,
    mostPopularAuthor: {
      name: "",
      booksCount: 0,
    },
  },
};

const calculateStatistics = (books, readers) => {
  const totalBooks = books.length;

  const availableBooks = books.filter((b) => b.isAvailable).length;

  const borrowedBooks = totalBooks - availableBooks;

  const booksByDecade = {};
  books.forEach((book) => {
    const decade = Math.floor(book.year / 10) * 10;

    if (!booksByDecade[decade]) {
      booksByDecade[decade] = 0;
    }

    booksByDecade[decade]++;
  });

  const activeReadersCount = readers.filter(
    (reader) => reader.borrowedBooks.length > 0,
  ).length;

  const authorCounts = {};
  books.forEach((book) => {
    if (!authorCounts[book.author]) {
      authorCounts[book.author] = 0;
    }
    authorCounts[book.author]++;
  });

  let mostPopularAuthor = { name: "", booksCount: 0 };

  for (let author in authorCounts) {
    if (authorCounts[author] > mostPopularAuthor.booksCount) {
      mostPopularAuthor = {
        name: author,
        booksCount: authorCounts[author],
      };
    }
  }

  return {
    totalBooks,
    availableBooks,
    borrowedBooks,
    booksByDecade,
    activeReadersCount,
    mostPopularAuthor,
  };
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BOOK_ADD": {
      const newBook = {
        id: Date.now() + Math.random(),
        ...action.payload,
        isAvailable: true,
      };

      const updatedBooks = [...state.books, newBook];

      return {
        ...state,
        books: updatedBooks,
        statistics: calculateStatistics(updatedBooks, state.readers),
        lastUpdate: new Date().toISOString(),
      };
    }

    case "BOOK_REMOVE": {
      const bookToRemove = state.books.find(
        (book) => book.id === action.payload.id,
      );

      if (!bookToRemove || !bookToRemove.isAvailable) {
        return state;
      }

      const updatedBooks = state.books.filter(
        (book) => book.id !== action.payload.id,
      );

      return {
        ...state,
        books: updatedBooks,
        statistics: calculateStatistics(updatedBooks, state.readers),
        lastUpdate: new Date().toISOString(),
      };
    }

    case "BOOK_UPDATE_INFO": {
      const updatedBooks = state.books.map((book) =>
        book.id === action.payload.id
          ? {
              ...book,
              title: action.payload.title ?? book.title,
              author: action.payload.author ?? book.author,
              year: action.payload.year ?? book.year,
            }
          : book,
      );

      return {
        ...state,
        books: updatedBooks,
        statistics: calculateStatistics(updatedBooks, state.readers),
        lastUpdate: new Date().toISOString(),
      };
    }

    case "BOOK_TOGGLE_AVAILABILITY": {
      const updatedBooks = state.books.map((book) =>
        book.id === action.payload.id
          ? { ...book, isAvailable: !book.isAvailable }
          : book,
      );

      return {
        ...state,
        books: updatedBooks,
        statistics: calculateStatistics(updatedBooks, state.readers),
        lastUpdate: new Date().toISOString(),
      };
    }

    case "READER_ADD": {
      const newReader = {
        id: Date.now() + Math.random(),
        ...action.payload,
        borrowedBooks: [],
      };

      const updatedReaders = [...state.readers, newReader];

      return {
        ...state,
        readers: updatedReaders,
        statistics: calculateStatistics(state.books, updatedReaders),
      };
    }

    case "READER_REMOVE": {
      const reader = state.readers.find((r) => r.id === action.payload.id);

      if (!reader || reader.borrowedBooks.length > 0) {
        return state;
      }

      const updatedReaders = state.readers.filter(
        (r) => r.id !== action.payload.id,
      );

      return {
        ...state,
        readers: updatedReaders,
        statistics: calculateStatistics(state.books, updatedReaders),
      };
    }

    case "BOOK_LEND_TO_READER": {
      const book = state.books.find((b) => b.id === action.payload.bookId);
      const reader = state.readers.find(
        (r) => r.id === action.payload.readerId,
      );

      if (!book || !reader || !book.isAvailable) {
        return state;
      }

      const updatedBooks = state.books.map((b) =>
        b.id === action.payload.bookId ? { ...b, isAvailable: false } : b,
      );

      const updatedReaders = state.readers.map((r) =>
        r.id === action.payload.readerId
          ? {
              ...r,
              borrowedBooks: [...r.borrowedBooks, action.payload.bookId],
            }
          : r,
      );

      return {
        ...state,
        books: updatedBooks,
        readers: updatedReaders,
        statistics: calculateStatistics(updatedBooks, updatedReaders),
      };
    }

    case "BOOK_RETURN_FROM_READER": {
      const reader = state.readers.find(
        (r) => r.id === action.payload.readerId,
      );

      if (!reader || !reader.borrowedBooks.includes(action.payload.bookId)) {
        return state;
      }

      const updatedBooks = state.books.map((b) =>
        b.id === action.payload.bookId ? { ...b, isAvailable: true } : b,
      );

      const updatedReaders = state.readers.map((r) =>
        r.id === action.payload.readerId
          ? {
              ...r,
              borrowedBooks: r.borrowedBooks.filter(
                (id) => id !== action.payload.bookId,
              ),
            }
          : r,
      );

      return {
        ...state,
        books: updatedBooks,
        readers: updatedReaders,
        statistics: calculateStatistics(updatedBooks, updatedReaders),
      };
    }

    default:
      return state;
  }
};

export default bookReducer;
