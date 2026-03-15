import { connect } from "react-redux";
import Book from "../book";
import styles from "./styles.module.css";

function BookList({ books }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Book List</h2>

      {books.length === 0 ? (
        <p>No books yet</p>
      ) : (
        <ul className={styles.list}>
          {books.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </ul>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return { books: state.books };
};
export default connect(mapStateToProps)(BookList);
