const initialState = {
  books: [],
  lastUpdate: null,
};
const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BOOK_ADD": {
      const newBook = {
        id: Date.now() + Math.random(),
        ...action.payload,
        isAvailable: true,
      };
      return {
        ...state,
        books: [...state.books, newBook],
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
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload.id),
        lastUpdate: new Date().toISOString(),
      };
    }
    case "BOOK_UPDATE_INFO":
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id
            ? {
                ...book,
                title: action.payload.title ?? book.title,
                author: action.payload.author ?? book.author,
                year: action.payload.year ?? book.year,
              }
            : book,
        ),
        lastUpdate: new Date().toISOString(),
      };
    case "BOOK_TOGGLE_AVAILABILITY":
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id
            ? { ...book, isAvailable: !book.isAvailable }
            : book,
        ),
        lastUpdate: new Date().toISOString(),
      };
    default:
      return state;
  }
};
export default bookReducer;
