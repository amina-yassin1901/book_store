import { connect } from "react-redux";
import { useState } from "react";
import UpdateForm from "../updateForm";
import styles from "./style.module.css";
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
      <li className={styles.book}>
        <p>Title: {book.title}</p>
        <p>Author: {book.author}</p>
        <p>Year: {book.year}</p>
        <p>Status: {book.isAvailable ? "Available" : "Borrowed"}</p>
        <div className={styles.actions}>
          <button
            className={styles.buttonDelete}
            onClick={() => bookRemove(book.id)}
          >
            Delete
          </button>
          <button
            className={styles.buttonToggle}
            onClick={() => bookToggleAvailAbility(book.id)}
          >
            Toggle Availability
          </button>
          <button
            className={styles.buttonEdit}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </div>
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
