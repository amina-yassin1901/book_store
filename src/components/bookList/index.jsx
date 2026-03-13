import { connect } from "react-redux";
import Book from "../book";

function BookList({ books }) {
  return (
    <div>
      <h2>Book List</h2>

      <ul>
        {books.length === 0 ? (
          <p>No books yet</p>
        ) : (
          books.map((book) => <Book key={book.id} book={book} />)
        )}
      </ul>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { books: state.books };
};
export default connect(mapStateToProps)(BookList);
