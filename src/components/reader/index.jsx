import { connect } from "react-redux";
import { readersRemove } from "../../redux/actions";
import styles from "./styles.module.css";
function Reader({ reader, books, readersRemove }) {
  const borrowedBooks = books.filter((book) =>
    reader.borrowedBooks.includes(book.id),
  );
  return (
    <li className={styles.reader}>
      <p>Name: {reader.name}</p>

      <p>Email: {reader.email}</p>

      <p>Borrowed books:</p>

      {borrowedBooks.length === 0 ? (
        <p>No books borrowed</p>
      ) : (
        <ul className={styles.list}>
          {borrowedBooks.map((book) => (
            <li className={styles.item} key={book.id}>
              {book.title}
            </li>
          ))}
        </ul>
      )}

      <button className={styles.btn} onClick={() => readersRemove(reader.id)}>
        Remove reader
      </button>
    </li>
  );
}
const mapStateToProps = (state) => {
  return { books: state.books };
};
const mapDispatchToProps = {
  readersRemove,
};
export default connect(mapStateToProps, mapDispatchToProps)(Reader);
