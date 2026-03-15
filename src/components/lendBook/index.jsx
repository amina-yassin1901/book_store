import { useState } from "react";
import { connect } from "react-redux";
import styles from "./styles.module.css";
import { bookLendToReader, bookReturnFromReader } from "../../redux/actions";
function LendBook({ books, readers, bookLendToReader, bookReturnFromReader }) {
  const [lendBookId, setLendBookId] = useState("");
  const [lendReaderId, setLendReaderId] = useState("");

  const [returnBookId, setReturnBookId] = useState("");
  const [returnReaderId, setReturnReaderId] = useState("");
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3 className={styles.title}>Lend Book</h3>

        <div className={styles.controls}>
          <select
            className={styles.select}
            value={lendBookId}
            onChange={(e) => setLendBookId(e.target.value)}
          >
            <option value="">Select book</option>

            {books
              .filter((book) => book.isAvailable)
              .map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
          </select>

          <select
            className={styles.select}
            value={lendReaderId}
            onChange={(e) => setLendReaderId(e.target.value)}
          >
            <option value="">Select reader</option>

            {readers.map((reader) => (
              <option key={reader.id} value={reader.id}>
                {reader.name}
              </option>
            ))}
          </select>

          <button
            className={styles.button}
            onClick={() =>
              bookLendToReader(Number(lendBookId), Number(lendReaderId))
            }
          >
            Lend
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.title}>Return Book</h3>

        <div className={styles.controls}>
          <select
            className={styles.select}
            value={returnBookId}
            onChange={(e) => setReturnBookId(e.target.value)}
          >
            <option value="">Select book</option>

            {books
              .filter((book) => !book.isAvailable)
              .map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
          </select>

          <select
            className={styles.select}
            value={returnReaderId}
            onChange={(e) => setReturnReaderId(e.target.value)}
          >
            <option value="">Select reader</option>

            {readers.map((reader) => (
              <option key={reader.id} value={reader.id}>
                {reader.name}
              </option>
            ))}
          </select>

          <button
            className={`${styles.button} ${styles.buttonReturn}`}
            onClick={() =>
              bookReturnFromReader(Number(returnBookId), Number(returnReaderId))
            }
          >
            Return Book
          </button>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    books: state.books,
    readers: state.readers,
  };
};

const mapDispatchToProps = {
  bookLendToReader,
  bookReturnFromReader,
};
export default connect(mapStateToProps, mapDispatchToProps)(LendBook);
