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
