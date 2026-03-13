import { connect } from "react-redux";
import { useState } from "react";
import UpdateForm from "../updateForm";
import {
  bookRemove,
  bookUpdateInfo,
  bookToggleAvailAbility,
} from "../../redux/actions";
function Book({ book, bookRemove, bookUpdateInfo, bookToggleAvailAbility }) {
  const [isEditing, setIsEditing] = useState(false);
  const handleSave = (newTitle, newAuthor, newYear) => {
    bookUpdateInfo(book.id, newTitle, newAuthor, newYear);
    setIsEditing(false);
  };
  return isEditing ? (
    <UpdateForm
      initialTitle={book.title}
      initialAuthor={book.author}
      initialYear={book.year}
      onSave={handleSave}
      onCancel={() => setIsEditing(false)}
    />
  ) : (
    <>
      <li>
        <p>Title: {book.title}</p>
        <p>Author: {book.author}</p>
        <p>Year: {book.year}</p>
        <p>Status: {book.isAvailable ? "Available" : "Borrowed"}</p>

        <button onClick={() => bookRemove(book.id)}>Delete</button>
        <button onClick={() => bookToggleAvailAbility(book.id)}>
          Toggle Availability
        </button>
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </li>
    </>
  );
}
const mapStateToProps = (state) => {
  return { books: state.books };
};
const mapDispatchToProps = {
  bookRemove,
  bookToggleAvailAbility,
  bookUpdateInfo,
};
export default connect(mapStateToProps, mapDispatchToProps)(Book);
