export const bookAdd = (title, author, year) => {
  return {
    type: "BOOK_ADD",
    payload: {
      title,
      author,
      year,
    },
  };
};
export const bookRemove = (id) => {
  return {
    type: "BOOK_REMOVE",
    payload: {
      id,
    },
  };
};
export const bookUpdateInfo = (id, title, author, year) => {
  return {
    type: "BOOK_UPDATE_INFO",
    payload: {
      id,
      title,
      author,
      year,
    },
  };
};
export const bookToggleAvailAbility = (id) => {
  return {
    type: "BOOK_TOGGLE_AVAILABILITY",
    payload: {
      id,
    },
  };
};
export const readerAdd = (name, email) => {
  return {
    type: "READER_ADD",
    payload: {
      name,
      email,
    },
  };
};
export const readersRemove = (id) => {
  return {
    type: "READER_REMOVE",
    payload: { id },
  };
};
export const bookLendToReader = (bookId, readerId) => {
  return {
    type: "BOOK_LEND_TO_READER",
    payload: {
      bookId,
      readerId,
    },
  };
};
export const bookReturnFromReader = (bookId, readerId) => {
  return {
    type: "BOOK_RETURN_FROM_READER",
    payload: {
      bookId,
      readerId,
    },
  };
};
